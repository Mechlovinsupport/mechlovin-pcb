// Remove Astro's content-layer cache before building. Without this, deleting
// every file in a collection leaves stale entries in .astro/data-store.json,
// so getCollection() keeps returning removed content (and CI build caches make
// it persist across deploys). Clearing it guarantees deletions take effect.
import { rmSync } from 'node:fs';
rmSync('.astro', { recursive: true, force: true });
console.log('Cleared .astro content cache.');
