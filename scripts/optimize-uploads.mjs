// Image optimizer — run by the GitHub Action (.github/workflows/optimize-images.yml)
// on every push that adds images, and runnable by hand (`node scripts/optimize-uploads.mjs`).
// When the owner uploads a photo through /admin, Decap commits the raw file
// (e.g. a 6 MB phone JPG/PNG) into public/images. This converts any such NON-webp
// image to web-friendly WebP (max 1600px wide, quality 80), deletes the original,
// and rewrites the content references to the new .webp path. The Action then commits
// the result back, so the repo, the /admin editor, and the live site all agree on
// the same .webp file — exactly like the images migrated from Imgur.
//
// It SKIPS files that are already .webp, so a run with no new uploads does nothing.
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const IMG = 'public/images';
const CONTENT = 'src/content';
const MAXW = 1600;

function walkMarkdown(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMarkdown(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

export async function optimizeUploads() {
  if (!existsSync(IMG)) return;
  const originals = readdirSync(IMG).filter((f) => /\.(jpe?g|png|gif)$/i.test(f));
  if (originals.length === 0) return; // nothing new to convert — fast path

  const sharp = (await import('sharp')).default;
  const renames = {}; // "/images/x.png" -> "/images/x.webp"

  for (const f of originals) {
    const src = join(IMG, f);
    const ext = extname(f).toLowerCase();
    const id = basename(f, ext);
    const outName = `${id}.webp`;
    const out = join(IMG, outName); // .webp always differs from the non-webp src
    try {
      let img = sharp(src, ext === '.gif' ? { animated: true } : {});
      const meta = await img.metadata();
      if (meta.width && meta.width > MAXW) img = img.resize({ width: MAXW, withoutEnlargement: true });
      await img.webp({ quality: 80, effort: 4 }).toFile(out);
      unlinkSync(src);
      renames[`/images/${f}`] = `/images/${outName}`;
      console.log(`[img-opt] ${f} -> ${outName}`);
    } catch (e) {
      console.error(`[img-opt] failed ${f}: ${e.message} (left as-is)`);
    }
  }

  const pairs = Object.entries(renames);
  if (pairs.length === 0) return;
  let refs = 0;
  for (const md of walkMarkdown(CONTENT)) {
    let txt = readFileSync(md, 'utf8');
    let changed = false;
    for (const [oldRef, newRef] of pairs) {
      if (txt.includes(oldRef)) { txt = txt.split(oldRef).join(newRef); changed = true; refs++; }
    }
    if (changed) writeFileSync(md, txt);
  }
  console.log(`[img-opt] converted ${pairs.length} upload(s), rewrote ${refs} reference(s).`);
}

// Run when invoked directly (node scripts/optimize-uploads.mjs), not when imported.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  optimizeUploads();
}
