import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// This schema is the single source of truth for the site's content.
// Both the PCB detail pages AND the compatibility tool read from these
// collections, so adding one .md file updates the whole site automatically.

// Tolerant array: the CMS writes `null` when a list/multi-select is emptied,
// so coerce null / undefined / object into a real array. This keeps the build
// from breaking when an editor clears a field.
const arr = (inner) =>
  z.preprocess(
    (v) =>
      v == null ? [] : Array.isArray(v) ? v : typeof v === 'object' ? Object.values(v) : [v],
    z.array(inner)
  );

// Tolerant enum: an emptied optional select arrives as '' or null — fall back to
// the default instead of failing the build.
const optEnum = (values, def) =>
  z.preprocess((v) => (v === '' || v == null ? def : v), z.enum(values));

const pcbs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pcbs' }),
  schema: z.object({
    // Every field is optional — the CMS form mirrors this. The page routes by
    // the file name when `slug` is blank (see pages), so entries never break.
    name: z.string().default(''),
    slug: z.string().default(''),
    subtitle: z.string().default(''),
    rev: z.string().default(''),
    status: optEnum(['in-production', 'in-development', 'discontinued'], 'in-production'),
    layout: z.string().default(''),     // "60%", "65%", "75%", "TKL", "Full-Size", "Ergo", "Others"
    released: z.string().default(''),
    heroImage: z.string().optional(),
    layoutSvg: z.string().optional(),   // KLE "Download SVG" export, in /public/layouts
    lede: z.string().default(''),
    featured: z.preprocess((v) => (v == null || v === '' ? false : v), z.boolean()),

    // For the compatibility tool's filters:
    switches: arr(z.enum(['mx', 'lp'])),
    features: arr(z.string()),          // 'hot-swap','per-key-rgb','encoder','wireless'
    connection: optEnum(['wired', 'wireless'], 'wired'),
    connector: optEnum(['onboard', 'daughterboard'], 'onboard'),
    mount: arr(z.string()),

    specs: arr(z.object({
      key: z.string(),
      value: z.string(),
    })),

    downloads: arr(z.object({
      kind: z.string(),                 // "QMK Firmware", "VIA JSON", "3D Model"
      file: z.string(),                 // path under /public/files
      description: z.string(),
      external: z.string().url().optional(),
    })),

    compatibility: arr(z.object({
      title: z.string(),                // "Cases", "Plates", "Switches", "Stabilizers"
      body: z.string(),
    })),

    changelog: arr(z.object({
      rev: z.string(),
      date: z.string(),
      current: z.boolean().default(false),
      summary: z.string(),
      items: arr(z.object({
        kind: z.enum(['add', 'fix', 'chg', 'rm']),
        text: z.string(),
      })),
    })),

    vendors: arr(z.object({
      name: z.string(),
      region: z.string(),
      stock: z.enum(['in', 'low', 'out']),
      price: z.string(),
      shipping: z.string(),
      url: z.string().url(),
    })),
  }),
});

// Supported keyboards / cases database — powers the compatibility tool's search.
const keyboards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/keyboards' }),
  schema: z.object({
    name: z.string(),
    aliases: arr(z.string()),
    vendor: z.string(),
    layout: z.string(),
    connector: z.enum(['onboard', 'daughterboard']),
    matches: arr(z.object({
      pcb: z.string(),                  // slug of a PCB. Plain string (not a strict
                                        // reference) so deleting a PCB never breaks
                                        // the build — missing ones are skipped at render.
      fit: z.enum(['direct', 'mods']),
      note: z.string(),
    })),
  }),
});

// Build guides. Metadata lives in frontmatter; the rich body is written in the
// Markdown content (HTML blocks for callouts, code, screenshots, steps).
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lede: z.string(),
    platform: z.string().default(''),
    difficulty: z.string().default(''),
    time: z.string().default(''),
    updated: z.string().default(''),
    tag: z.string().default(''),
    order: z.number().default(99),
    toc: arr(z.object({
      id: z.string(),
      num: z.string(),
      label: z.string(),
    })),
  }),
});

export const collections = { pcbs, keyboards, guides };
