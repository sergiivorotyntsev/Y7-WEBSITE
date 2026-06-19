import { useState, useEffect, useRef, useMemo } from 'react';
import s from './BaitQuote.module.css';

/* PHASE5A-MAGNET — public "bait-quote" magnet for Home (below hero).
 * Dark spotlight band; brand greens from --success* tokens. Client-side calibrated
 * marketing estimate (no backend). Icons inlined as SVG (no lucide-react dep).
 * Content is visible-by-default — entrance motion is CSS-only (runs without JS, ends
 * visible; reduced-motion shows the static state), so the prerendered HTML is never hidden.
 */

// ---- inline SVG icons (stroke=currentColor, lucide-style) ----
const Svg = (p) => (
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={p.style} aria-hidden="true">{p.children}</svg>
);
const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>;
const ShieldCheck = (p) => <Svg {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Svg>;
const TrendingDown = (p) => <Svg {...p}><path d="M16 17h6v-6" /><path d="m22 17-8.5-8.5-5 5L2 7" /></Svg>;
const EyeOff = (p) => <Svg {...p}><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></Svg>;
const Truck = (p) => <Svg {...p}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></Svg>;
const Lock = (p) => <Svg {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Svg>;
const ChevronDown = (p) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>;

// ---- calibrated model (verbatim from the approved mockup) ----
const METROS = {
  'Dallas, TX': [32.7767, -96.797], 'Newark, NJ': [40.7357, -74.1724],
  'Los Angeles, CA': [34.0522, -118.2437], 'Miami, FL': [25.7617, -80.1918],
  'Chicago, IL': [41.8781, -87.6298], 'Phoenix, AZ': [33.4484, -112.074],
  'Atlanta, GA': [33.749, -84.388], 'Seattle, WA': [47.6062, -122.3321],
  'Denver, CO': [39.7392, -104.9903], 'Boston, MA': [42.3601, -71.0589],
  'Houston, TX': [29.7604, -95.3698], 'New York, NY': [40.7128, -74.006],
};
const VEHICLES = { Sedan: 1.0, SUV: 1.13, 'Pickup truck': 1.25 };
const TRANSPORT = { Open: 1.0, Enclosed: 1.4 };

function haversine([la1, lo1], [la2, lo2]) {
  const R = 3958.8, t = (d) => (d * Math.PI) / 180;
  const dLa = t(la2 - la1), dLo = t(lo2 - lo1);
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(t(la1)) * Math.cos(t(la2)) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Calibrated to ~75 real Central Dispatch loads (May–June 2026). Concave curve, leans
// slightly high so the real quote usually lands at or below the estimate.
function carrierMid(miles, vMult, tMult) {
  const base = 115 + 10 * Math.pow(miles, 0.55);
  return Math.max(150, base) * vMult * tMult;
}

function useCountUp(target, ms = 750) {
  const [v, setV] = useState(target);
  const from = useRef(target), start = useRef(0), raf = useRef(0);
  useEffect(() => {
    from.current = v; start.current = 0;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const p = Math.min(1, (ts - start.current) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from.current + (target - from.current) * e));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
}

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

function Field({ label, children }) {
  return (
    <label className={s.field}>
      <span className={s.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options }) {
  return (
    <div className={s.selectWrap}>
      <select className={s.selectEl} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={17} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}

function Seg({ value, onChange, options }) {
  return (
    <div className={s.seg}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`${s.segBtn} ${o === value ? s.segBtnOn : ''}`}>{o}</button>
      ))}
    </div>
  );
}

function Row({ k, sub, v, accent, muted }) {
  return (
    <div className={s.row}>
      <div className={s.rowTop}>
        <span className={muted ? s.rowKMuted : s.rowK}>{k}</span>
        <span className={`${s.rowV} ${muted ? s.rowVMuted : ''} ${accent ? s.rowVAccent : ''}`}>{v}</span>
      </div>
      {sub && <p className={s.rowSub}>{sub}</p>}
    </div>
  );
}

export default function BaitQuote({ onPrimaryCta, onSecondaryCta }) {
  const [from, setFrom] = useState('Dallas, TX');
  const [to, setTo] = useState('Newark, NJ');
  const [vehicle, setVehicle] = useState('Sedan');
  const [transport, setTransport] = useState('Open');

  const calc = useMemo(() => {
    const miles = Math.round(haversine(METROS[from], METROS[to]) * 1.18);
    const mid = carrierMid(miles, VEHICLES[vehicle], TRANSPORT[transport]);
    const cLo = Math.round((mid * 0.95) / 25) * 25;
    const cHi = Math.round((mid * 1.12) / 25) * 25;
    const fee = 50;
    const yourLo = cLo + fee, yourHi = cHi + fee;
    const yourMid = (yourLo + yourHi) / 2;
    const brokerExtra = Math.max(100, Math.round((mid * 0.2) / 10) * 10);
    const brokerTotal = Math.round((yourMid + brokerExtra) / 10) * 10;
    return { miles, cLo, cHi, fee, yourLo, yourHi, brokerTotal, savings: brokerExtra, pct: Math.round((brokerExtra / mid) * 100) };
  }, [from, to, vehicle, transport]);

  const animTotal = useCountUp(calc.yourHi);
  const animBroker = useCountUp(calc.brokerTotal);
  const sameCity = from === to;
  const cta = onPrimaryCta || (() => {});
  const cta2 = onSecondaryCta || cta;

  return (
    <div className={s.band}>
      <div className={s.wrap}>
        <div className={s.blob + ' ' + s.blob1} aria-hidden="true" />
        <div className={s.blob + ' ' + s.blob2} aria-hidden="true" />

        <div className={s.inner}>
          <div className={`${s.rise}`}>
            <div className={s.badge}><ShieldCheck size={14} /> Dealer pricing · no markup on transport</div>
            <h2 className={s.headline}>
              See the <span className={s.headlineAccent}>honest</span> price before anyone calls you.
            </h2>
            <p className={s.subhead}>
              The carrier's real rate, plus our flat fee — itemized. No bundled markup, no sales call to find out what it costs.
            </p>
          </div>

          <div className={`${s.controls} ${s.rise} ${s.d1}`}>
            <Field label="Pick up"><Select value={from} onChange={setFrom} options={Object.keys(METROS)} /></Field>
            <div className={s.arrow}><ArrowRight size={18} /></div>
            <Field label="Deliver to"><Select value={to} onChange={setTo} options={Object.keys(METROS)} /></Field>
          </div>
          <div className={`${s.controls2} ${s.rise} ${s.d2}`}>
            <Field label="Vehicle"><Seg value={vehicle} onChange={setVehicle} options={Object.keys(VEHICLES)} /></Field>
            <Field label="Transport"><Seg value={transport} onChange={setTransport} options={Object.keys(TRANSPORT)} /></Field>
          </div>

          {sameCity ? (
            <div className={s.sameCity}>Pick two different cities to see your estimate.</div>
          ) : (
            <>
              <div className={s.meta}>
                <svg width="100%" height="14" className={s.metaLine} aria-hidden="true">
                  <line x1="2" y1="7" x2="99%" y2="7" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" className={s.metaDash} />
                </svg>
                <span className={s.metaText}>~{calc.miles.toLocaleString()} mi · {transport.toLowerCase()}</span>
              </div>

              <div className={`${s.grid} ${s.rise} ${s.d3}`}>
                <div className={s.y7card}>
                  <div className={s.y7cardInner}>
                    <div className={s.cardHead}>
                      <div className={`${s.iconBox} ${s.iconBoxY7}`}><Truck size={15} style={{ color: '#04150f' }} /></div>
                      <span className={s.cardHeadY7}>Y7 — what you actually pay</span>
                    </div>
                    <Row k="Carrier transport" sub="live market rate · paid to the carrier" v={`${money(calc.cLo)}–${money(calc.cHi)}`} />
                    <div className={s.hair} />
                    <Row k="Y7 dealer fee" sub="flat · our only earning · never hidden" v={money(calc.fee)} accent />
                    <div className={s.hairStrong} />
                    <div className={s.totalRow}>
                      <span className={s.totalLabel}>Your total</span>
                      <span className={s.totalVal}>{money(calc.yourLo)}–<span className={s.totalValHi}>{money(animTotal)}</span></span>
                    </div>
                  </div>
                </div>

                <div className={s.brokerCard}>
                  <div className={s.cardHead}>
                    <div className={`${s.iconBox} ${s.iconBoxBroker}`}><EyeOff size={15} style={{ color: '#6f8b82' }} /></div>
                    <span className={s.cardHeadBroker}>Typical broker</span>
                  </div>
                  <Row k="Carrier transport" sub="bundled — you can't see it" v="hidden" muted />
                  <div className={s.hairBroker} />
                  <Row k="Their markup" sub={`+${money(calc.savings)} (${calc.pct}%) baked in`} v="hidden" muted />
                  <div className={s.hairBrokerStrong} />
                  <div className={s.totalRow}>
                    <span className={s.totalLabelBroker}>One price</span>
                    <span className={s.totalValBroker}>~{money(animBroker)}</span>
                  </div>
                </div>
              </div>

              <div className={`${s.savings} ${s.rise} ${s.d4}`}>
                <div className={s.savingsShine} aria-hidden="true" />
                <TrendingDown size={19} style={{ color: 'var(--success-bright)', position: 'relative' }} />
                <span className={s.savingsText}>You save {money(calc.savings)}+ vs a typical broker</span>
              </div>

              <div className={`${s.disclaimer} ${s.rise} ${s.d5}`}>
                <ShieldCheck size={15} style={{ color: 'var(--success-bright)', flexShrink: 0, marginTop: 1 }} />
                <span>You pay the carrier directly at delivery. Y7 earns the flat fee for finding and managing them — nothing on the transport. Brokers typically add at least $100, or 20%, whichever is greater.</span>
              </div>

              <div className={`${s.ctas} ${s.rise} ${s.d6}`}>
                <button type="button" className={s.ctaPrimary} onClick={cta}><Lock size={17} /> Lock this rate — request pickup</button>
                <button type="button" className={s.ctaSecondary} onClick={cta2}>Talk to a dispatcher</button>
              </div>
              <p className={s.footnote}>
                Estimate based on current lane rates. Your locked price is confirmed before pickup — and you only pay the carrier once a truck is assigned.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
