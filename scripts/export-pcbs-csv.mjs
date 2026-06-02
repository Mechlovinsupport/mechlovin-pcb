// Export every PCB's flat/editable fields to a CSV for bulk editing in
// Excel / Google Sheets. Re-import with import-pcbs-csv.mjs.
// Run: node scripts/export-pcbs-csv.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import jsyaml from 'js-yaml';

const PCB_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/content/pcbs');
// Written to the Desktop for easy access.
const OUT = join(process.env.USERPROFILE || process.env.HOME || '.', 'OneDrive', 'Desktop', 'mechlovin-pcbs-bulk-edit.csv');

// Columns the spreadsheet manages. `slug` is the key — do not change it.
const COLUMNS = [
  'slug', 'name', 'type', 'layout', 'subtitle', 'rev', 'released', 'featured', 'switches', 'lede',
  'spec_firmware', 'spec_connector', 'spec_mcu', 'spec_rgb', 'spec_thickness', 'spec_material', 'spec_solderMask',
];

function frontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? (jsyaml.load(m[1]) || {}) : {};
}
function csvCell(v) {
  const s = v == null ? '' : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const rows = [];
for (const file of readdirSync(PCB_DIR).filter((f) => f.endsWith('.md')).sort()) {
  const d = frontmatter(readFileSync(join(PCB_DIR, file), 'utf8'));
  const specs = (d.specs && !Array.isArray(d.specs)) ? d.specs : {};
  rows.push({
    slug: d.slug || file.replace(/\.md$/, ''),
    name: d.name || '',
    type: d.type || '',
    layout: d.layout || '',
    subtitle: d.subtitle || '',
    rev: d.rev || '',
    released: d.released || '',
    featured: d.featured ? 'TRUE' : 'FALSE',
    switches: Array.isArray(d.switches) ? d.switches.join(',') : (d.switches || ''),
    lede: d.lede || '',
    spec_firmware: specs.firmware || '',
    spec_connector: specs.connector || '',
    spec_mcu: specs.mcu || '',
    spec_rgb: specs.rgb || '',
    spec_thickness: specs.thickness || '',
    spec_material: specs.material || '',
    spec_solderMask: specs.solderMask || '',
  });
}

rows.sort((a, b) => a.name.localeCompare(b.name));
const lines = [COLUMNS.join(',')];
for (const r of rows) lines.push(COLUMNS.map((c) => csvCell(r[c])).join(','));
// UTF-8 BOM so Excel reads accents/symbols correctly.
writeFileSync(OUT, '﻿' + lines.join('\r\n') + '\r\n');
console.log(`Wrote ${rows.length} PCBs to:\n${OUT}`);
