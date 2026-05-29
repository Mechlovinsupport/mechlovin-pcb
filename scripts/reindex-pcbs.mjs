// Reindex PCBs from support.mechlovin.studio. Wipes src/content/pcbs and writes
// one name-only Markdown file per board (name + slug; everything else left for
// the owner to fill in via /admin). Run: node scripts/reindex-pcbs.mjs
import { writeFileSync, readdirSync, unlinkSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PCB_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/content/pcbs');
mkdirSync(PCB_DIR, { recursive: true });

// PCB names exactly as listed on the live category pages (60/65/75/tkl/full-size/ergo + others).
const NAMES = [
  // 60%
  'Jay60', 'Kay60', 'Kay60 - E6 - UTD 356Mini', 'Kay60 - CAKE RGB & HHKB', 'Zed60', 'A7X Nika-S', 'ZED60 - Derivative',
  // 65%
  'Kay65', 'Zed65', 'Zed65-RGB', 'Zed65 - Haku', 'Merisi Sessantacinque', 'Hannah 910', 'Haus', "Mechlovin' 9",
  'Ori CLS-2//65', 'Ori CLS-3//65', 'GAF x TGR 910', 'Dolch65', 'Retro66', 'Stellar65 (R1 & R2 Space65)',
  'GSK x TGR 910', 'Protozoa PZ65', 'RAE Adamas 65',
  // 75%
  'Hex 4B Rev. 1', 'Hex 4B Rev. 2', 'Olly Octagon', 'Olly TCV3', 'ZED75 - Tomo', 'Artkey AK75',
  // TKL
  'Infinity 87-88 Hotswap', 'Infinity 87.5', 'Infinity 87', 'Infinity CE/88', 'Rogue (UTD 360C Compatible)',
  'Rouge (OTD Compatible)', 'KMAC TKL', 'NRD Kaze', 'Protozoa Foundation', 'Olly Orion', 'A7X Nika',
  'Dnworks Ryujin', 'Densus Alveus', 'Ori CLS-3//88', 'Infinity 87 Rev. 3 (SM Studio Jane Commission)',
  'TGR Shi (87 & 88)', 'Saevus Duality', 'JJW Cloudline 2', 'Merisi 500C/M',
  // Full-Size
  'Hex 6C', 'Hex 6C Rev. 2', 'Olly BB', 'Olly JF', 'LZ Ghost CP',
  // Ergo
  'Adelais Standard Rev. 4/5', 'Adelais En Ciel (Rev. 1 & Rev. 2)', 'Adelais En Ciel Rev. 3', 'LZ ErGhost', 'Aster Ergo',
  // Other
  'No.23 Neonbox PCB',
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Wipe existing PCB entries.
for (const f of readdirSync(PCB_DIR)) {
  if (f.endsWith('.md')) unlinkSync(join(PCB_DIR, f));
}

const seen = new Map();
let count = 0;
for (const name of NAMES) {
  let slug = slugify(name);
  // Guard against slug collisions.
  if (seen.has(slug)) {
    const n = seen.get(slug) + 1;
    seen.set(slug, n);
    slug = `${slug}-${n}`;
  } else {
    seen.set(slug, 1);
  }
  const fm = `---\nname: ${JSON.stringify(name)}\nslug: ${JSON.stringify(slug)}\n---\n`;
  writeFileSync(join(PCB_DIR, `${slug}.md`), fm);
  count++;
}

console.log(`Wrote ${count} name-only PCB files (slugs unique: ${new Set([...readdirSync(PCB_DIR)]).size}).`);
