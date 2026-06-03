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
    // "stock" = drop-in for an existing keyboard; "commission" = made for a group buy.
    type: z.preprocess((v) => (v === '' || v == null ? undefined : v), z.enum(['stock', 'commission']).optional()),
    layout: z.string().default(''),     // "60%", "65%", "75%", "TKL", "Full-Size", "Ergo", "Others"
    released: z.string().default(''),
    heroImage: z.string().optional(),   // legacy single image (kept as a fallback)
    images: arr(z.string()),            // gallery — first is the main photo
    layoutSvg: z.string().optional(),   // legacy single layout SVG (kept as a fallback)
    layouts: arr(z.object({             // one diagram per layout version, each captioned
      svg: z.string().default(''),
      caption: z.string().default(''),
    })),
    lede: z.string().default(''),
    featured: z.preprocess((v) => (v == null || v === '' ? false : v), z.boolean()),

    switches: arr(z.enum(['mx', 'topre', 'he', 'alps'])),

    // Specifications: seven fixed fields (always offered in the form, in this
    // order) plus any number of custom key/value rows. Tolerates the legacy
    // array shape (treated as custom rows) and a missing value.
    specs: z.preprocess(
      (v) => (v == null ? {} : Array.isArray(v) ? { custom: v } : v),
      z.object({
        firmware: z.string().default(''),
        connector: z.string().default(''),
        mcu: z.string().default(''),
        rgb: z.string().default(''),
        thickness: z.string().default(''),
        material: z.string().default(''),
        solderMask: z.string().default(''),
        custom: arr(z.object({ key: z.string().default(''), value: z.string().default('') })),
      })
    ),

    // Downloads link out to GitHub (the source of truth) rather than hosting
    // copies. Each entry is a labeled link to a folder/file in the repo.
    downloads: arr(z.object({
      kind: z.string().default(''),     // label, e.g. "QMK Firmware", "VIA JSON"
      url: z.string().default(''),      // link to the PCB's folder/file on GitHub
      description: z.string().default(''),
      // legacy fields, tolerated but no longer offered in the form:
      file: z.string().optional(),
      external: z.string().optional(),
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
    slug: z.string().default(''),       // optional; defaults to the filename
    lede: z.string().default(''),
    platform: z.string().default(''),
    difficulty: z.string().default(''),
    time: z.string().default(''),
    updated: z.string().default(''),
    tag: z.string().default(''),
    order: z.number().default(99),
    // No `toc` field — the table of contents is generated from the body's headings.
  }),
});

// Editable site/page text (singletons). Home page lives at site/home.md.
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    eyebrow: z.string().default(''),
    headline: z.string().default(''),
    lede: z.string().default(''),
    searchPlaceholder: z.string().default(''),
    pathwaysTitle: z.string().default('Start here'),
    pathways: arr(z.object({
      title: z.string().default(''),
      description: z.string().default(''),
    })),
    featuredTitle: z.string().default('Featured PCBs'),
    guidesTitle: z.string().default('Build guides'),
  }),
});

export const collections = { pcbs, keyboards, guides, site };
