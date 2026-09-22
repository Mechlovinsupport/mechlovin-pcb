// One-shot: download every i.imgur.com image referenced in content into
// public/images/ and rewrite the references to the local /images/<id>.<ext>
// path, so images are served from our own site instead of Imgur.
// Run: node scripts/migrate-imgur.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(root, 'src/content');
const OUT = join(root, 'public/images');
const RE = /https?:\/\/i\.imgur\.com\/([A-Za-z0-9]+)\.(jpe?g|png|gif|webp)/gi;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

// Collect every .md file under content.
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const files = walk(CONTENT);

// Gather unique imgur URLs.
const urls = new Set();
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  for (const m of txt.matchAll(RE)) urls.add(m[0]);
}
console.log(`Found ${urls.size} unique Imgur images across ${files.length} content files.`);

// Download one image; returns { ok, localPath, reason }.
async function download(url) {
  const m = url.match(/i\.imgur\.com\/([A-Za-z0-9]+)\.(jpe?g|png|gif|webp)/i);
  const name = `${m[1]}.${m[2].toLowerCase()}`;
  const dest = join(OUT, name);
  const local = `/images/${name}`;
  if (existsSync(dest) && statSync(dest).size > 1000) return { ok: true, url, local, cached: true };
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/*' }, redirect: 'follow' });
      // Imgur serves a "removed" placeholder (redirect to removed.png) for dead images.
      if (!res.ok) { if (attempt) return { ok: false, url, reason: `HTTP ${res.status}` }; continue; }
      if (/removed/i.test(res.url)) return { ok: false, url, reason: 'image no longer on Imgur (removed placeholder)' };
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) return { ok: false, url, reason: `suspiciously small (${buf.length} bytes) — likely a placeholder` };
      writeFileSync(dest, buf);
      return { ok: true, url, local };
    } catch (e) {
      if (attempt) return { ok: false, url, reason: e.message };
    }
  }
  return { ok: false, url, reason: 'unknown' };
}

// Download with limited concurrency.
const list = [...urls];
const map = {}; // url -> local path (only successful)
const failed = [];
const POOL = 8;
let i = 0;
async function worker() {
  while (i < list.length) {
    const url = list[i++];
    const r = await download(url);
    if (r.ok) { map[url] = r.local; process.stdout.write('.'); }
    else { failed.push(r); process.stdout.write('x'); }
  }
}
await Promise.all(Array.from({ length: POOL }, worker));
process.stdout.write('\n');

// Rewrite files: replace every successfully-downloaded URL with its local path.
let filesChanged = 0, refsChanged = 0;
for (const f of files) {
  let txt = readFileSync(f, 'utf8');
  let changed = false;
  for (const [url, local] of Object.entries(map)) {
    if (txt.includes(url)) {
      txt = txt.split(url).join(local);
      changed = true;
      refsChanged++;
    }
  }
  if (changed) { writeFileSync(f, txt); filesChanged++; }
}

console.log(`\nDownloaded ${Object.keys(map).length} images → public/images/`);
console.log(`Rewrote ${refsChanged} references in ${filesChanged} files.`);
if (failed.length) {
  console.log(`\n⚠️  ${failed.length} image(s) could NOT be migrated (left as Imgur links):`);
  for (const r of failed) console.log(`   - ${r.url}  (${r.reason})`);
}
