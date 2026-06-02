// Import the edited bulk-edit CSV back into the PCB Markdown files. Matches rows
// to files by `slug`; updates only the spreadsheet's columns and preserves
// everything else (photos, layout SVG, downloads, compatibility, changelog,
// vendors, custom specs). Run: node scripts/import-pcbs-csv.mjs [path-to-csv]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import jsyaml from 'js-yaml';

const PCB_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/content/pcbs');
const CSV = process.argv[2] || join(process.env.USERPROFILE || process.env.HOME || '.', 'OneDrive', 'Desktop', 'mechlovin-pcbs-bulk-edit.csv');

function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function splitFM(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)?$/);
  if (!m) return null;
  return { data: jsyaml.load(m[1]) || {}, body: m[2] || '\n' };
}
const set = (obj, key, val) => { if (val && String(val).trim()) obj[key] = String(val).trim(); else delete obj[key]; };

// Map each PCB file by its slug (frontmatter slug, or filename).
const bySlug = {};
for (const f of readdirSync(PCB_DIR).filter((f) => f.endsWith('.md'))) {
  const fm = splitFM(readFileSync(join(PCB_DIR, f), 'utf8'));
  if (fm) bySlug[fm.data.slug || f.replace(/\.md$/, '')] = f;
}

const rows = parseCSV(readFileSync(CSV, 'utf8'));
const header = rows.shift().map((h) => h.trim());
const idx = (name) => header.indexOf(name);

let updated = 0, missing = [];
for (const r of rows) {
  if (!r.length || !r[idx('slug')]) continue;
  const slug = r[idx('slug')].trim();
  const file = bySlug[slug];
  if (!file) { missing.push(slug); continue; }
  const path = join(PCB_DIR, file);
  const { data, body } = splitFM(readFileSync(path, 'utf8'));
  const v = (col) => (idx(col) >= 0 ? (r[idx(col)] ?? '') : '');

  set(data, 'name', v('name'));
  set(data, 'type', v('type').toLowerCase());      // stock | commission | (blank)
  set(data, 'layout', v('layout'));
  set(data, 'subtitle', v('subtitle'));
  set(data, 'rev', v('rev'));
  set(data, 'released', v('released'));
  set(data, 'lede', v('lede'));
  data.featured = /^(true|1|yes|x)$/i.test(v('featured').trim());
  const sw = v('switches').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (sw.length) data.switches = sw; else delete data.switches;

  const specs = (data.specs && !Array.isArray(data.specs)) ? data.specs : {};
  set(specs, 'firmware', v('spec_firmware'));
  set(specs, 'connector', v('spec_connector'));
  set(specs, 'mcu', v('spec_mcu'));
  set(specs, 'rgb', v('spec_rgb'));
  set(specs, 'thickness', v('spec_thickness'));
  set(specs, 'material', v('spec_material'));
  set(specs, 'solderMask', v('spec_solderMask'));
  if (Object.keys(specs).length) data.specs = specs; else delete data.specs;

  const out = '---\n' + jsyaml.dump(data, { lineWidth: -1, quotingType: '"' }).trimEnd() + '\n---' + body;
  writeFileSync(path, out);
  updated++;
}

console.log(`Updated ${updated} PCB files.`);
if (missing.length) console.log(`Skipped ${missing.length} unmatched slug(s): ${missing.join(', ')}`);
