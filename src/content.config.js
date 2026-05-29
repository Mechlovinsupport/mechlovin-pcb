import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// This schema is the single source of truth for the site's content.
// Both the PCB detail pages AND the compatibility tool read from these
// collections, so adding one .md file updates the whole site automatically.

const pcbs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pcbs' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    subtitle: z.string(),
    rev: z.string(),
    status: z.enum(['in-production', 'in-development', 'discontinued']),
    layout: z.string(),                 // "60%", "65%", "75%", "TKL", "Numpad"
    released: z.string(),
    heroImage: z.string().optional(),
    layoutSvg: z.string().optional(),   // KLE "Download SVG" export, in /public/layouts
    lede: z.string(),
    featured: z.boolean().default(false),

    // For the compatibility tool's filters:
    switches: z.array(z.enum(['mx', 'lp'])).default(['mx']),
    features: z.array(z.string()).default([]),     // 'hot-swap','per-key-rgb','encoder','wireless'
    connection: z.enum(['wired', 'wireless']).default('wired'),
    connector: z.enum(['onboard', 'daughterboard']).default('onboard'),
    mount: z.array(z.string()).default([]),

    specs: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })).default([]),

    downloads: z.array(z.object({
      kind: z.string(),                 // "QMK Firmware", "VIA JSON", "3D Model"
      file: z.string(),                 // path under /public/files
      description: z.string(),
      external: z.string().url().optional(),
    })).default([]),

    compatibility: z.array(z.object({
      title: z.string(),                // "Cases", "Plates", "Switches", "Stabilizers"
      body: z.string(),
    })).default([]),

    changelog: z.array(z.object({
      rev: z.string(),
      date: z.string(),
      current: z.boolean().default(false),
      summary: z.string(),
      items: z.array(z.object({
        kind: z.enum(['add', 'fix', 'chg', 'rm']),
        text: z.string(),
      })).default([]),
    })).default([]),

    vendors: z.array(z.object({
      name: z.string(),
      region: z.string(),
      stock: z.enum(['in', 'low', 'out']),
      price: z.string(),
      shipping: z.string(),
      url: z.string().url(),
    })).default([]),
  }),
});

// Supported keyboards / cases database — powers the compatibility tool's search.
const keyboards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/keyboards' }),
  schema: z.object({
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    vendor: z.string(),
    layout: z.string(),
    connector: z.enum(['onboard', 'daughterboard']),
    matches: z.array(z.object({
      pcb: reference('pcbs'),           // slug of a PCB in the pcbs collection
      fit: z.enum(['direct', 'mods']),
      note: z.string(),
    })).default([]),
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
    toc: z.array(z.object({
      id: z.string(),
      num: z.string(),
      label: z.string(),
    })).default([]),
  }),
});

export const collections = { pcbs, keyboards, guides };
