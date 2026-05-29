import { useState, useMemo, useEffect } from 'react';
import { FEATURE_LABELS, LAYOUTS, LAYOUT_ORDER } from '../data/labels.js';

function PcbCard({ pcb }) {
  return (
    <a className="pcb-card" href={`/pcb/${pcb.slug}`}>
      <div className="pcb-card-image">
        {pcb.heroImage
          ? <img src={pcb.heroImage} alt={pcb.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="placeholder"><span className="mono">{pcb.name}</span></div>}
      </div>
      <div className="pcb-card-body">
        <div className="pcb-card-head">
          <span className="pcb-card-name">{pcb.name}</span>
          <span className="pcb-card-layout">{pcb.layout}</span>
        </div>
        <div className="pcb-card-meta mono">Rev. {pcb.rev} · {pcb.connection === 'wireless' ? 'Wireless · USB-C' : 'USB-C'}</div>
        <div className="pcb-card-chips">
          {pcb.features.map((f) => <span className="chip" key={f}>{FEATURE_LABELS[f] ?? f}</span>)}
        </div>
      </div>
    </a>
  );
}

// `pcbs` is the full catalog (plain data objects) passed from the .astro page.
export default function LayoutFilter({ pcbs }) {
  const initial = typeof window !== 'undefined'
    ? decodeURIComponent((window.location.hash || '').replace('#', ''))
    : '';
  const [layout, setLayout] = useState(LAYOUTS.includes(initial) ? initial : 'all');

  useEffect(() => {
    const onHash = () => {
      const h = decodeURIComponent((window.location.hash || '').replace('#', ''));
      if (LAYOUTS.includes(h)) setLayout(h);
      else if (!h) setLayout('all');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const counts = useMemo(() => {
    const c = { all: pcbs.length };
    for (const l of LAYOUTS) c[l] = pcbs.filter((p) => p.layout === l).length;
    return c;
  }, [pcbs]);

  const filtered = useMemo(() => {
    const list = layout === 'all' ? pcbs : pcbs.filter((p) => p.layout === layout);
    return [...list].sort((a, b) =>
      (LAYOUT_ORDER[a.layout] - LAYOUT_ORDER[b.layout]) || a.name.localeCompare(b.name));
  }, [layout, pcbs]);

  function pick(l) {
    setLayout(l);
    if (l === 'all') history.replaceState(null, '', window.location.pathname);
    else window.location.hash = encodeURIComponent(l);
  }

  return (
    <>
      <div className="layout-tabs">
        <button className={`layout-tab ${layout === 'all' ? 'active' : ''}`} onClick={() => pick('all')}>
          All <span className="cnt">{counts.all}</span>
        </button>
        {LAYOUTS.map((l) => (
          <button key={l} className={`layout-tab ${layout === l ? 'active' : ''}`} onClick={() => pick(l)}>
            {l} <span className="cnt">{counts[l]}</span>
          </button>
        ))}
      </div>
      <div className="pcb-grid">
        {filtered.map((p) => <PcbCard key={p.slug} pcb={p} />)}
      </div>
    </>
  );
}
