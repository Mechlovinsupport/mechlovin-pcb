// One-shot: multiply every `font-size` px value by 1.1 (~10% larger) across the
// stylesheets. Only touches px inside font-size declarations (em/% and other
// properties are left alone). Run once: node scripts/scale-fonts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/styles');
const files = ['styles.css', 'home-styles.css', 'compat-styles.css', 'guide-styles.css'];
const SCALE = 1.1;

for (const f of files) {
  const path = join(dir, f);
  let css = readFileSync(path, 'utf8');
  let count = 0;
  css = css.replace(/font-size:\s*([^;{}]+);/g, (whole, value) => {
    const scaled = value.replace(/(\d*\.?\d+)px/g, (mm, n) => {
      count++;
      return Math.round(parseFloat(n) * SCALE * 10) / 10 + 'px';
    });
    return `font-size: ${scaled};`;
  });
  writeFileSync(path, css);
  console.log(`${f}: scaled ${count} font-size px values`);
}
