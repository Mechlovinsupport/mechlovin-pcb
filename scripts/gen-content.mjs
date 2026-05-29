// One-time content generator. Reads the prototype catalog + keyboard DB and
// emits one Markdown file per PCB and per keyboard into src/content/.
// Adelais carries the full hand-authored detail; the rest get their real
// catalog fields plus a seed changelog. Empty sections (downloads, vendors,
// compatibility) are left blank for the owner to fill via the CMS.
//
// Run with:  node scripts/gen-content.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PCB_DIR = join(root, 'src/content/pcbs');
const KB_DIR = join(root, 'src/content/keyboards');
mkdirSync(PCB_DIR, { recursive: true });
mkdirSync(KB_DIR, { recursive: true });

// --- Catalog (verbatim from design-reference/pcb-data.js) ---
const CATALOG = [
  { slug: "adelais",    name: "Adelais",    layout: "65%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb"],                  mount: ["tray", "gasket"],          connection: "wired",    connector: "daughterboard", rev: "1.2", featured: true },
  { slug: "zed60",      name: "ZED60",      layout: "60%",    switches: ["mx"],        features: ["per-key-rgb"],                              mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "2.1", featured: true },
  { slug: "zed65",      name: "ZED65",      layout: "65%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder"],       mount: ["tray", "gasket"],          connection: "wired",    connector: "daughterboard", rev: "1.4", featured: true },
  { slug: "zed75",      name: "ZED75",      layout: "75%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder"],       mount: ["gasket"],                  connection: "wired",    connector: "daughterboard", rev: "1.3" },
  { slug: "zed80",      name: "ZED80",      layout: "TKL",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb"],                  mount: ["tray", "top-mount"],       connection: "wired",    connector: "daughterboard", rev: "1.1" },
  { slug: "foundation", name: "Foundation", layout: "60%",    switches: ["mx"],        features: ["per-key-rgb"],                              mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "3.0", featured: true },
  { slug: "olive",      name: "Olive",      layout: "65%",    switches: ["mx"],        features: ["hot-swap"],                                 mount: ["tray", "top-mount"],       connection: "wired",    connector: "daughterboard", rev: "1.2" },
  { slug: "hex",        name: "Hex",        layout: "60%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "wireless"],      mount: ["tray", "gasket"],          connection: "wireless", connector: "onboard",       rev: "2.0", featured: true },
  { slug: "constance",  name: "Constance",  layout: "75%",    switches: ["mx"],        features: ["per-key-rgb"],                              mount: ["top-mount", "integrated"], connection: "wired",    connector: "daughterboard", rev: "1.0" },
  { slug: "kanas",      name: "Kanas",      layout: "TKL",    switches: ["mx"],        features: ["per-key-rgb", "encoder"],                   mount: ["gasket", "top-mount"],     connection: "wired",    connector: "daughterboard", rev: "2.2" },
  { slug: "saphira",    name: "Saphira",    layout: "60%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder"],       mount: ["gasket"],                  connection: "wired",    connector: "daughterboard", rev: "1.0" },
  { slug: "lyra",       name: "Lyra",       layout: "65%",    switches: ["mx"],        features: ["hot-swap"],                                 mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "1.5" },
  { slug: "vega",       name: "Vega",       layout: "TKL",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb"],                  mount: ["tray", "gasket"],          connection: "wired",    connector: "daughterboard", rev: "1.3" },
  { slug: "polaris",    name: "Polaris",    layout: "75%",    switches: ["mx"],        features: ["hot-swap", "wireless"],                     mount: ["tray"],                    connection: "wireless", connector: "daughterboard", rev: "1.1" },
  { slug: "aurora",     name: "Aurora",     layout: "60%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder"],       mount: ["gasket"],                  connection: "wired",    connector: "daughterboard", rev: "2.0", featured: true },
  { slug: "sirius",     name: "Sirius",     layout: "65%",    switches: ["mx"],        features: ["hot-swap", "wireless"],                     mount: ["tray", "gasket"],          connection: "wireless", connector: "daughterboard", rev: "1.0" },
  { slug: "lumina",     name: "Lumina",     layout: "65%",    switches: ["lp"],        features: ["per-key-rgb"],                              mount: ["integrated"],              connection: "wired",    connector: "onboard",       rev: "1.0" },
  { slug: "nebula",     name: "Nebula",     layout: "75%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb"],                  mount: ["gasket"],                  connection: "wired",    connector: "daughterboard", rev: "1.2" },
  { slug: "orion",      name: "Orion",      layout: "TKL",    switches: ["mx"],        features: ["per-key-rgb", "encoder"],                   mount: ["top-mount"],               connection: "wired",    connector: "daughterboard", rev: "1.0" },
  { slug: "pegasus",    name: "Pegasus",    layout: "75%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb"],                  mount: ["tray", "gasket"],          connection: "wired",    connector: "daughterboard", rev: "1.4" },
  { slug: "cygnus",     name: "Cygnus",     layout: "60%",    switches: ["mx", "lp"],  features: ["hot-swap", "per-key-rgb"],                  mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "1.0" },
  { slug: "numpad-23",  name: "Numpad-23",  layout: "Numpad", switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder"],       mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "1.1" },
  { slug: "compose",    name: "Compose",    layout: "60%",    switches: ["mx"],        features: ["hot-swap"],                                 mount: ["tray"],                    connection: "wired",    connector: "onboard",       rev: "1.0" },
  { slug: "eclipse",    name: "Eclipse",    layout: "65%",    switches: ["mx"],        features: ["hot-swap", "per-key-rgb", "encoder", "wireless"], mount: ["gasket"],            connection: "wireless", connector: "daughterboard", rev: "1.0", featured: true },
];

const KEYBOARD_DB = [
  { name: "KBDfans Tofu65", aliases: ["tofu65", "tofu 65"], vendor: "KBDfans", layout: "65%", connector: "daughterboard",
    matches: [
      { slug: "zed65", fit: "direct", note: "Drop-in. Factory standoff spacing." },
      { slug: "olive", fit: "direct", note: "Drop-in." },
      { slug: "adelais", fit: "mods", note: "Relocate daughterboard to front-right standoff." },
    ] },
  { name: "KBDfans Tofu60", aliases: ["tofu60", "tofu 60"], vendor: "KBDfans", layout: "60%", connector: "onboard",
    matches: [
      { slug: "zed60", fit: "direct", note: "Drop-in." },
      { slug: "foundation", fit: "direct", note: "Drop-in." },
      { slug: "compose", fit: "direct", note: "Drop-in." },
    ] },
  { name: "Bakeneko65", aliases: ["bakeneko65", "bakeneko 65", "bkn65"], vendor: "CannonKeys", layout: "65%", connector: "daughterboard",
    matches: [
      { slug: "zed65", fit: "direct", note: "Gasket socks recommended." },
      { slug: "olive", fit: "direct", note: "Drop-in." },
      { slug: "adelais", fit: "direct", note: "Drop-in with gasket strips." },
    ] },
  { name: "Bakeneko60", aliases: ["bakeneko60", "bakeneko 60", "bkn60"], vendor: "CannonKeys", layout: "60%", connector: "daughterboard",
    matches: [
      { slug: "saphira", fit: "direct", note: "Gasket-mount, drop-in." },
      { slug: "aurora", fit: "direct", note: "Drop-in." },
    ] },
  { name: "KBD67 Lite", aliases: ["kbd67 lite", "kbd67lite", "kbd67"], vendor: "KBDfans", layout: "65%", connector: "daughterboard",
    matches: [
      { slug: "zed65", fit: "mods", note: "Requires the KBD67 Lite-cut plate." },
      { slug: "olive", fit: "mods", note: "Use Lite-specific gasket pads." },
    ] },
  { name: "NK65", aliases: ["nk65", "novelkeys nk65", "entry edition"], vendor: "NovelKeys", layout: "65%", connector: "daughterboard",
    matches: [
      { slug: "zed65", fit: "mods", note: "Mount points align; USB cutout needs check." },
    ] },
  { name: "Mode SixtyFive", aliases: ["mode sixtyfive", "mode65", "mode 65"], vendor: "Mode Designs", layout: "65%", connector: "daughterboard",
    matches: [
      { slug: "adelais", fit: "direct", note: "Drop-in with Mode flex cuts." },
      { slug: "zed65", fit: "direct", note: "Drop-in." },
    ] },
  { name: "GH60 / DZ60-compatible", aliases: ["gh60", "dz60", "60% universal", "poker"], vendor: "Universal 60%", layout: "60%", connector: "onboard",
    matches: [
      { slug: "zed60", fit: "direct", note: "Standard GH60 footprint." },
      { slug: "foundation", fit: "direct", note: "Standard GH60 footprint." },
      { slug: "compose", fit: "direct", note: "Standard GH60 footprint." },
      { slug: "cygnus", fit: "direct", note: "Standard GH60 footprint." },
    ] },
  { name: "KBD75 V2/V3", aliases: ["kbd75", "kbd75v2", "kbd75v3"], vendor: "KBDfans", layout: "75%", connector: "daughterboard",
    matches: [
      { slug: "zed75", fit: "direct", note: "Drop-in." },
      { slug: "constance", fit: "mods", note: "Check top-mount post alignment." },
      { slug: "pegasus", fit: "direct", note: "Drop-in." },
    ] },
  { name: "NK87", aliases: ["nk87", "novelkeys nk87"], vendor: "NovelKeys", layout: "TKL", connector: "daughterboard",
    matches: [
      { slug: "zed80", fit: "mods", note: "TKL footprint matches; verify USB-C cutout." },
      { slug: "vega", fit: "direct", note: "Drop-in." },
    ] },
  { name: "Frog TKL", aliases: ["frog tkl", "frogtkl"], vendor: "PaperKeys", layout: "TKL", connector: "daughterboard",
    matches: [
      { slug: "zed80", fit: "direct", note: "Drop-in." },
      { slug: "kanas", fit: "direct", note: "Drop-in." },
    ] },
  { name: "KBDfans D65 (Low-Profile)", aliases: ["d65", "kbd d65", "low profile 65"], vendor: "KBDfans", layout: "65%", connector: "onboard",
    matches: [
      { slug: "lumina", fit: "direct", note: "Low-profile PCB; matches LP case height." },
    ] },
  { name: "GMMK Pro", aliases: ["gmmk pro", "glorious gmmk"], vendor: "Glorious", layout: "75%", connector: "daughterboard", matches: [] },
  { name: "Keychron Q1", aliases: ["keychron q1", "q1"], vendor: "Keychron", layout: "75%", connector: "daughterboard", matches: [] },
  { name: "Mojo68", aliases: ["mojo68", "mojo 68"], vendor: "Vortex", layout: "65%", connector: "onboard", matches: [] },
  { name: "Qwertykeys QK65", aliases: ["qk65", "qwertykeys qk65"], vendor: "Qwertykeys", layout: "65%", connector: "daughterboard", matches: [] },
];

const FEATURE_LABELS = { "hot-swap": "Hot-swap", "per-key-rgb": "per-key RGB", "encoder": "an encoder", "wireless": "wireless" };

// --- Full hand-authored Adelais detail (from app.jsx + adelais.md) ---
const ADELAIS = {
  subtitle: "65% hot-swap PCB · MLV-AD-65-V12",
  status: "in-production",
  released: "Mar 2024",
  heroImage: "",
  layoutSvg: "/layouts/zed60-layout.svg",
  lede: "A 65% layout PCB with south-facing hot-swap sockets, per-key RGB, USB-C via daughterboard, and QMK / VIA support.",
  specs: [
    { key: "Layout", value: "65% · 68 keys" },
    { key: "PCB size", value: "317.5 × 105.0 mm" },
    { key: "Thickness", value: "1.6 mm" },
    { key: "Finish", value: "ENIG · matte black" },
    { key: "Switch type", value: "MX-style" },
    { key: "Hot-swap sockets", value: "Kailh CPG151101S11" },
    { key: "Spacebar orientation", value: "South-facing" },
    { key: "Encoder", value: "Optional · EC11 footprint" },
    { key: "MCU", value: "ATmega32U4 @ 16 MHz · 32 KB flash" },
    { key: "Connector", value: "USB-C via daughterboard" },
    { key: "RGB", value: "68 × SK6812-Mini-E (per-key) + underglow header" },
  ],
  downloads: [
    { kind: "QMK Firmware", file: "/files/adelais-v0.24.3.hex", description: "Latest QMK build with VIA support. Flash with QMK Toolbox.", external: "https://github.com/mechlovin/adelais" },
    { kind: "VIA JSON", file: "/files/adelais.json", description: "Keymap definition. Load in the VIA web app.", external: "https://usevia.app" },
    { kind: "3D Model", file: "/files/adelais.step", description: "PCB model for case designers and clearance checks." },
  ],
  compatibility: [
    { title: "Cases", body: "Designed for the Adelais Tray Mount and Adelais Gasket Edition cases. Also drops into the KBDfans Tofu65 if you relocate the daughterboard to the front-right standoff (cable will reach). The Qwertykeys QK65 is NOT compatible — mount points differ." },
    { title: "Plates", body: "FR4, polycarbonate, and brass plates are all confirmed. Aluminum plates work but mind the plate-to-PCB clearance — the south-facing diodes can foul if your case uses an integrated plate." },
    { title: "Switches", body: "All MX-style 3-pin and 5-pin switches work. Kailh Box switches confirmed. Low-profile switches are not supported — this is a full-height-only PCB." },
    { title: "Stabilizers", body: "PCB-mount screw-in stabilizers (Cherry, Durock, C³ Equalz, GMK) all fit. Plate-mount stabs are not supported. 2u stabilizers required for Backspace and Right Shift; 6.25u for Spacebar." },
  ],
  changelog: [
    { rev: "Rev. 1.2", date: "Mar 2025", current: true, summary: "Quality-of-life revision focused on flashing reliability and per-key RGB consistency on the bottom row.", items: [
      { kind: "fix", text: "Resolved bootloader timing issue on first flash from blank ATmega32U4." },
      { kind: "fix", text: "Corrected RGB chain order on bottom row (LEDs 56–68 were reversed)." },
      { kind: "chg", text: "Daughterboard ribbon changed from 6-pin JST to 5-pin Molex Pico-Clasp." },
      { kind: "add", text: "On-board reset button accessible without case removal." },
    ] },
    { rev: "Rev. 1.1", date: "Sep 2024", current: false, summary: "Layout flexibility expansion. Adds split-shift and split-backspace options.", items: [
      { kind: "add", text: "Split backspace footprint with optional 1u + 1u stab." },
      { kind: "add", text: "Split left-shift footprint (1.25u + 1u)." },
      { kind: "chg", text: "South-facing diodes for unobstructed Cherry-profile clearance." },
    ] },
    { rev: "Rev. 1.0", date: "Mar 2024", current: false, summary: "Initial production release.", items: [
      { kind: "add", text: "ANSI 65% hot-swap PCB with per-key RGB." },
      { kind: "add", text: "USB-C daughterboard with JST connector." },
      { kind: "add", text: "QMK / VIA support at launch." },
    ] },
  ],
  vendors: [
    { name: "Mechlovin Store", region: "Vietnam · Direct", stock: "in", price: "$59.00", shipping: "Worldwide · 5–9 d", url: "https://mechlovin.studio/products/adelais" },
    { name: "KBDfans", region: "CN", stock: "in", price: "$65.00", shipping: "International · 7–14 d", url: "https://kbdfans.com" },
    { name: "Cannonkeys", region: "USA", stock: "low", price: "$69.00", shipping: "Domestic · 2–4 d", url: "https://cannonkeys.com" },
    { name: "Mykeyboard.eu", region: "EU", stock: "in", price: "€62.00", shipping: "EU · 3–5 d", url: "https://mykeyboard.eu" },
    { name: "Daily Clack", region: "USA", stock: "out", price: "$72.00", shipping: "—", url: "https://dailyclack.com" },
    { name: "Ilumkb", region: "CN", stock: "in", price: "$58.00", shipping: "International · 10–18 d", url: "https://ilumkb.com" },
  ],
};

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function fm(obj) {
  // Emit YAML frontmatter using JSON flow syntax (valid YAML) for safe quoting.
  const lines = Object.entries(obj).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

function ledeFor(p) {
  const feats = p.features.map((f) => FEATURE_LABELS[f]).filter(Boolean);
  const featText = feats.length ? feats.join(', ').replace(/, ([^,]*)$/, ' and $1') : 'QMK / VIA support';
  const conn = p.connector === 'onboard' ? 'onboard USB-C' : 'USB-C via daughterboard';
  return `A ${p.layout} layout PCB with ${featText}, ${conn}, and QMK / VIA support.`;
}

function subtitleFor(p) {
  const bits = [p.layout];
  if (p.features.includes('hot-swap')) bits.push('hot-swap');
  if (p.switches.includes('lp')) bits.push('low-profile');
  return `${bits.join(' ')} PCB`;
}

function specsFor(p) {
  const specs = [
    { key: 'Layout', value: p.layout },
    { key: 'Switch type', value: p.switches.includes('lp') && !p.switches.includes('mx') ? 'Low-profile' : 'MX-style' },
    { key: 'Hot-swap', value: p.features.includes('hot-swap') ? 'Yes' : 'No (solder)' },
    { key: 'Connector', value: p.connector === 'onboard' ? 'Onboard USB-C' : 'USB-C via daughterboard' },
    { key: 'Connection', value: p.connection === 'wireless' ? 'Wireless + USB-C' : 'Wired (USB-C)' },
    { key: 'Firmware', value: 'QMK · VIA' },
  ];
  if (p.features.includes('per-key-rgb')) specs.push({ key: 'RGB', value: 'Per-key + underglow' });
  if (p.features.includes('encoder')) specs.push({ key: 'Encoder', value: 'Optional · EC11 footprint' });
  return specs;
}

let count = 0;
for (const p of CATALOG) {
  let data;
  if (p.slug === 'adelais') {
    data = {
      name: p.name, slug: p.slug, subtitle: ADELAIS.subtitle, rev: `Rev. ${p.rev}`,
      status: ADELAIS.status, layout: p.layout, released: ADELAIS.released,
      layoutSvg: ADELAIS.layoutSvg, lede: ADELAIS.lede, featured: !!p.featured,
      switches: p.switches, features: p.features, connection: p.connection,
      connector: p.connector, mount: p.mount,
      specs: ADELAIS.specs, downloads: ADELAIS.downloads,
      compatibility: ADELAIS.compatibility, changelog: ADELAIS.changelog, vendors: ADELAIS.vendors,
    };
  } else {
    data = {
      name: p.name, slug: p.slug, subtitle: subtitleFor(p), rev: `Rev. ${p.rev}`,
      status: 'in-production', layout: p.layout, released: '2024',
      lede: ledeFor(p), featured: !!p.featured,
      switches: p.switches, features: p.features, connection: p.connection,
      connector: p.connector, mount: p.mount,
      specs: specsFor(p),
      downloads: [],
      compatibility: [],
      changelog: [
        { rev: `Rev. ${p.rev}`, date: '2024', current: true, summary: 'Initial production release.', items: [
          { kind: 'add', text: `${p.layout} ${p.features.includes('hot-swap') ? 'hot-swap ' : ''}PCB with QMK / VIA support.` },
        ] },
      ],
      vendors: [],
    };
    if (p.slug === 'zed60') data.layoutSvg = '/layouts/zed60-layout.svg';
  }
  const body = `\n<!-- Optional free-form notes about this PCB. The page renders the frontmatter above. -->\n`;
  writeFileSync(join(PCB_DIR, `${p.slug}.md`), fm(data) + body);
  count++;
}

let kbCount = 0;
for (const kb of KEYBOARD_DB) {
  const data = {
    name: kb.name, aliases: kb.aliases, vendor: kb.vendor, layout: kb.layout, connector: kb.connector,
    matches: kb.matches.map((m) => ({ pcb: m.slug, fit: m.fit, note: m.note })),
  };
  writeFileSync(join(KB_DIR, `${slugify(kb.name)}.md`), fm(data) + '\n');
  kbCount++;
}

console.log(`Wrote ${count} PCB files and ${kbCount} keyboard files.`);
