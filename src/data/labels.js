// Shared label maps and ordering — used by both .astro components and the
// React islands. Ported verbatim from design-reference/pcb-data.js.

export const TYPE_LABELS = {
  stock: 'Stock',
  commission: 'Commission',
};

export const SWITCH_LABELS = {
  mx: 'MX',
  topre: 'Topre',
  he: 'HE',
  alps: 'ALPS',
};

export const FEATURE_LABELS = {
  'hot-swap': 'Hot-swap',
  'per-key-rgb': 'Per-key RGB',
  'encoder': 'Encoder',
  'wireless': 'Wireless',
};

export const MOUNT_LABELS = {
  tray: 'Tray',
  gasket: 'Gasket',
  'top-mount': 'Top-mount',
  integrated: 'Integrated',
};

export const CONNECTOR_LABELS = {
  onboard: 'Onboard USB',
  daughterboard: 'Daughterboard (JST)',
};

export const LAYOUTS = ['60%', '65%', '75%', 'TKL', 'Full-Size', 'Ergo', 'Others'];

export const LAYOUT_ORDER = { '60%': 0, '65%': 1, '75%': 2, 'TKL': 3, 'Full-Size': 4, 'Ergo': 5, 'Others': 6 };

export const MECHLOVIN_DISCORD = 'https://discord.gg/mechlovin';
