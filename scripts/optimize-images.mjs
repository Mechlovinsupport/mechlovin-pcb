// One-shot: resize + convert every image in public/images to web-friendly WebP
// (max 1600px wide, quality 80), and rewrite content references to the .webp
// path. Run after migrate-imgur.mjs. Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, basename } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'public/images');
const CONTENT = join(root, 'src/content');
const MAXW = 1600;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const images = readdirSync(IMG).filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f));
const renames = {}; // "/images/x.png" -> "/images/x.webp"
let before = 0, after = 0, done = 0;

for (const f of images) {
  const src = join(IMG, f);
  const ext = extname(f).toLowerCase();
  const id = basename(f, extname(f));
  const outName = `${id}.webp`;
  const out = join(IMG, `${id}.__opt.webp`); // temp, avoids read/write same path
  before += statSync(src).size;
  try {
    let img = sharp(src, ext === '.gif' ? { animated: true } : {});
    const meta = await img.metadata();
    if (meta.width && meta.width > MAXW) img = img.resize({ width: MAXW, withoutEnlargement: true });
    await img.webp({ quality: 80, effort: 4 }).toFile(out);
    unlinkSync(src);
    const final = join(IMG, outName);
    writeFileSync(final, readFileSync(out));
    unlinkSync(out);
    after += statSync(final).size;
    if (outName !== f) renames[`/images/${f}`] = `/images/${outName}`;
    done++;
    process.stdout.write('.');
  } catch (e) {
    process.stdout.write('x');
    console.error(`\nFailed ${f}: ${e.message}`);
  }
}
process.stdout.write('\n');

// Rewrite content references to the new .webp filenames.
let refs = 0, filesChanged = 0;
for (const md of walk(CONTENT)) {
  let txt = readFileSync(md, 'utf8');
  let changed = false;
  for (const [oldRef, newRef] of Object.entries(renames)) {
    if (txt.includes(oldRef)) { txt = txt.split(oldRef).join(newRef); changed = true; refs++; }
  }
  if (changed) { writeFileSync(md, txt); filesChanged++; }
}

const mb = (b) => (b / 1048576).toFixed(1) + ' MB';
console.log(`Optimized ${done} images.`);
console.log(`Size: ${mb(before)} -> ${mb(after)}  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
console.log(`Rewrote ${refs} references in ${filesChanged} files.`);
