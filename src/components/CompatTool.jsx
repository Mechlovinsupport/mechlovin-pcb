import { useState, useMemo, useEffect, useRef } from 'react';
import { FEATURE_LABELS, CONNECTOR_LABELS, LAYOUTS, MECHLOVIN_DISCORD } from '../data/labels.js';

function StepHead({ num, title, sub }) {
  return (
    <div className="ct-step-head">
      <span className="ct-step-num">{num}</span>
      <div>
        <div className="ct-step-title">{title}</div>
        {sub && <div className="ct-step-sub">{sub}</div>}
      </div>
    </div>
  );
}

function FitBadge({ fit }) {
  const map = {
    direct: { cls: 'direct', label: 'Direct fit' },
    mods: { cls: 'mods', label: 'Fits with mods' },
  };
  const m = map[fit] || map.direct;
  return <span className={`fit-badge ${m.cls}`}>{m.label}</span>;
}

function DiscordCTA({ compact, reason }) {
  return (
    <a className={`discord-cta ${compact ? 'compact' : ''}`} href={MECHLOVIN_DISCORD} target="_blank" rel="noopener">
      <div className="discord-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19 19 0 0 0 15.6 3l-.2.5a14 14 0 0 1 3.7 1.9 13 13 0 0 0-11.2 0A14 14 0 0 1 11.6 3.5L11.4 3A19 19 0 0 0 6.7 4.4 19.7 19.7 0 0 0 3.3 17.4a19 19 0 0 0 5.8 2.9l.5-.7c-.6-.2-1.2-.5-1.7-.8l.4-.3a13.5 13.5 0 0 0 11.5 0l.4.3c-.5.3-1.1.6-1.7.8l.5.7a19 19 0 0 0 5.8-2.9 19.7 19.7 0 0 0-3.4-13zM9.5 14.7c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.7 1.9-1.7 1.9zm5 0c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.7 1.9-1.7 1.9z"/></svg>
      </div>
      <div className="discord-body">
        <div className="discord-title">{reason || 'Ask our team on Discord'}</div>
        <div className="discord-sub">Tell us your keyboard or case and we'll confirm what fits — usually same day.</div>
      </div>
      <span className="discord-arrow">→</span>
    </a>
  );
}

function PcbResultRow({ pcb, fit, note }) {
  if (!pcb) return null;
  return (
    <a className="pcb-result-row" href={`/pcb/${pcb.slug}`}>
      <div className="prr-thumb"><span className="mono">{pcb.name}</span></div>
      <div className="prr-main">
        <div className="prr-head">
          <span className="prr-name">{pcb.name}</span>
          <span className="pcb-card-layout">{pcb.layout}</span>
          <FitBadge fit={fit} />
        </div>
        <div className="prr-note">{note}</div>
        <div className="prr-meta mono">
          Rev. {pcb.rev} · {CONNECTOR_LABELS[pcb.connector]}
          {pcb.connection === 'wireless' ? ' · Wireless' : ''}
        </div>
      </div>
      <span className="prr-arrow">→</span>
    </a>
  );
}

function KeyboardResult({ kb, pcbBySlug }) {
  const hasMatches = kb.matches && kb.matches.length > 0;
  return (
    <div className="kb-result">
      <div className="kb-result-head">
        <div>
          <div className="kb-result-name">{kb.name}</div>
          <div className="kb-result-meta mono">
            {kb.vendor} · {kb.layout} · {CONNECTOR_LABELS[kb.connector]}
          </div>
        </div>
        <div className={`kb-verdict ${hasMatches ? 'ok' : 'none'}`}>
          {hasMatches
            ? `${kb.matches.length} compatible PCB${kb.matches.length === 1 ? '' : 's'}`
            : 'No match on record'}
        </div>
      </div>

      {hasMatches ? (
        <div className="pcb-result-list">
          {kb.matches.map((m) => <PcbResultRow key={m.pcb} pcb={pcbBySlug(m.pcb)} fit={m.fit} note={m.note} />)}
        </div>
      ) : (
        <div className="kb-result-empty">
          <p>
            We don't have a confirmed-compatible PCB for the <strong>{kb.name}</strong> on record yet.
            That doesn't always mean none fits — proprietary mounting (like Keychron / GMMK) often can't take a third-party PCB, but custom cases sometimes can with the right plate.
          </p>
          <DiscordCTA reason={`Ask us about the ${kb.name}`} />
        </div>
      )}
    </div>
  );
}

function Search({ keyboards, pcbBySlug }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const boxRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return keyboards.filter((kb) =>
      kb.name.toLowerCase().includes(q) ||
      (kb.aliases || []).some((a) => a.includes(q)) ||
      kb.vendor.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, keyboards]);

  const noHit = query.trim().length > 0 && suggestions.length === 0 && !selected;

  function choose(kb) {
    setSelected(kb);
    setQuery(kb.name);
    setOpen(false);
  }
  function clear() {
    setSelected(null);
    setQuery('');
    setOpen(false);
  }

  useEffect(() => {
    function onDoc(e) { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <section className="ct-step">
      <StepHead num="1" title="Find your keyboard or case" sub="Search the case or kit you already own — we'll tell you which Mechlovin PCBs fit." />

      <div className="compat-search-wrap" ref={boxRef}>
        <div className="compat-search">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input
            placeholder="e.g. Tofu65, Bakeneko60, GMMK Pro, GH60…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(null); setOpen(true); }}
            onFocus={() => setOpen(true)}
          />
          {query && <button className="compat-search-clear" onClick={clear} aria-label="Clear">×</button>}
        </div>

        {open && suggestions.length > 0 && !selected && (
          <div className="typeahead">
            {suggestions.map((kb) => (
              <button className="typeahead-item" key={kb.name} onClick={() => choose(kb)}>
                <span className="ta-name">{kb.name}</span>
                <span className="ta-meta mono">{kb.layout} · {kb.vendor}</span>
                <span className={`ta-count ${kb.matches.length ? '' : 'zero'}`}>
                  {kb.matches.length ? `${kb.matches.length} fit` : 'no match'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && <KeyboardResult kb={selected} pcbBySlug={pcbBySlug} />}

      {noHit && (
        <div className="ct-nohit">
          <div className="ct-nohit-title">No keyboard called "{query}" on file</div>
          <p>We may still have something that fits. Try matching by specs below, or ask our team directly.</p>
          <div className="ct-nohit-actions">
            <a className="btn btn-ghost btn-sm" href="#filter">Match by specs ↓</a>
            <a className="btn btn-primary btn-sm" href={MECHLOVIN_DISCORD} target="_blank" rel="noopener">Ask on Discord →</a>
          </div>
        </div>
      )}
    </section>
  );
}

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
        <div className="pcb-card-meta mono">{CONNECTOR_LABELS[pcb.connector]}</div>
        <div className="pcb-card-chips">
          {pcb.features.map((f) => <span className="chip" key={f}>{FEATURE_LABELS[f] ?? f}</span>)}
        </div>
      </div>
    </a>
  );
}

function SpecFilter({ pcbs }) {
  const [layout, setLayout] = useState('all');
  const [connector, setConnector] = useState('all');

  const filtered = useMemo(() => {
    return pcbs.filter((p) =>
      (layout === 'all' || p.layout === layout) &&
      (connector === 'all' || p.connector === connector)
    );
  }, [layout, connector, pcbs]);

  return (
    <section className="ct-step" id="filter">
      <StepHead num="2" title="Or match by specs" sub="No exact keyboard match? Narrow by layout and how the USB port is wired." />

      <div className="filter-bar">
        <div className="filter-bar-group">
          <span className="filter-bar-label">Layout</span>
          <div className="seg">
            <button className={`seg-btn ${layout === 'all' ? 'active' : ''}`} onClick={() => setLayout('all')}>All</button>
            {LAYOUTS.map((l) => (
              <button key={l} className={`seg-btn ${layout === l ? 'active' : ''}`} onClick={() => setLayout(l)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="filter-bar-group">
          <span className="filter-bar-label">Connector</span>
          <div className="seg">
            <button className={`seg-btn ${connector === 'all' ? 'active' : ''}`} onClick={() => setConnector('all')}>Either</button>
            <button className={`seg-btn ${connector === 'onboard' ? 'active' : ''}`} onClick={() => setConnector('onboard')}>Onboard USB-C</button>
            <button className={`seg-btn ${connector === 'daughterboard' ? 'active' : ''}`} onClick={() => setConnector('daughterboard')}>Daughterboard</button>
          </div>
        </div>
      </div>

      <div className="ct-result-meta mono">{filtered.length} PCB{filtered.length === 1 ? '' : 's'} match these specs</div>

      {filtered.length > 0 ? (
        <div className="pcb-grid">
          {filtered.map((p) => <PcbCard key={p.slug} pcb={p} />)}
        </div>
      ) : (
        <div className="ct-nohit">
          <div className="ct-nohit-title">Nothing matches that combination</div>
          <p>Try loosening the connector filter, or ask us — we can sometimes adapt a board.</p>
        </div>
      )}
    </section>
  );
}

function AskStep() {
  return (
    <section className="ct-step">
      <StepHead num="3" title="Still not sure?" sub="Compatibility can come down to a single standoff or USB cutout. When in doubt, ask." />
      <DiscordCTA />
    </section>
  );
}

// `pcbs` and `keyboards` are plain data arrays passed from the .astro page.
export default function CompatTool({ pcbs, keyboards }) {
  const bySlug = useMemo(() => {
    const m = new Map(pcbs.map((p) => [p.slug, p]));
    return (slug) => m.get(slug);
  }, [pcbs]);

  return (
    <div className="compat-tool">
      <Search keyboards={keyboards} pcbBySlug={bySlug} />
      <SpecFilter pcbs={pcbs} />
      <AskStep />
    </div>
  );
}
