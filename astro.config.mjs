// @ts-check
import { defineConfig } from 'astro/config';
import { rmSync } from 'node:fs';

import react from '@astrojs/react';

// Top-level side effect: runs the instant Astro loads this config — before the
// content layer syncs. Clears the cached content store so deleting every file in
// a collection actually takes effect (the glob loader won't purge a now-empty
// collection, and CI build caches otherwise resurrect deleted entries). This must
// be top-level (not an integration hook, which runs after the store is read) so
// it works on any `astro build`, however it's invoked.
// The store lives under node_modules/.astro, which CI build caches reuse.
for (const p of ['node_modules/.astro/data-store.json', '.astro/data-store.json']) {
  rmSync(p, { force: true });
}

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
});
