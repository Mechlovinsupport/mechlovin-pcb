// One-time: move the legacy single `layoutSvg` into the new `layouts` list so
// every diagram is editable in the CMS list. Run: node scripts/migrate-layoutsvg.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import jsyaml from 'js-yaml';

const PCB_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/content/pcbs');
let migrated = 0;
for (const f of readdirSync(PCB_DIR).filter((f) => f.endsWith('.md'))) {
  const path = join(PCB_DIR, f);
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)?$/);
  if (!m) continue;
  const data = jsyaml.load(m[1]) || {};
  if (data.layoutSvg && !(Array.isArray(data.layouts) && data.layouts.length)) {
    data.layouts = [{ svg: data.layoutSvg, caption: '' }];
    delete data.layoutSvg;
    const out = '---\n' + jsyaml.dump(data, { lineWidth: -1, quotingType: '"' }).trimEnd() + '\n---' + (m[2] || '\n');
    writeFileSync(path, out);
    migrated++;
    console.log(`migrated ${f}`);
  }
}
console.log(`Done. Migrated ${migrated} file(s).`);
