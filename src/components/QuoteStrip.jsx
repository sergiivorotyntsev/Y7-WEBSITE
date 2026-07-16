import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { lookupBand } from '../data/dispatchRates';
import { METROS, PORT_METROS, roadMiles } from '../data/metros';
import styles from './QuoteStrip.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2f from '../styles/v2/forms.module.css';

// DESIGN-V2-T13: the strip is now the working calculator (approved T12
// follow-up). Price source = the real-dispatch band model (dispatchRates.js);
// the V1 formula stays retired. Distance = haversine * ROAD_FACTOR (1.12,
// recalibrated against 37 known metro pairs in the ratings CSV; V1's 1.18
// leaned high). Multipliers carry V1 values (SUV 1.13 / Pickup 1.25 /
// Enclosed 1.4) — the CSV cannot validate them (no SUV/enclosed classes in
// the standard set), flagged in the sprint report. Honesty laws: typical
// range only, never a quote; fee named, not numbered. Default route renders
// fully in the prerender snapshot (selects with defaultValue are
// visible-by-default; interactivity is progressive enhancement — no
// hidden-at-rest state, T10a class). Signal Budget: the red range figure
// stays the strip's single accent.
const VEHICLES = [
  { key: 'sedan', mult: 1.0 },
  { key: 'suv', mult: 1.13 },
  { key: 'pickup', mult: 1.25 },
];
const TRANSPORTS = [
  { key: 'open', mult: 1.0 },
  { key: 'enclosed', mult: 1.4 },
];
const OTHER = '__other__';
const DEFAULT_FROM = 'Chicago, IL';
const DEFAULT_TO = 'Newark, NJ';

const round5 = (n) => Math.round(n / 5) * 5;
// Prerender gate (T10a pattern): snapshots serialize DOM without <select>
// value properties (the first option would render chosen). During the
// prerender pass we bake the T12-style STATIC fields with the default route
// (byte-comparable to the shipped strip); real selects are the browser's
// progressive enhancement.
const IS_PRERENDER = typeof window !== 'undefined' && window.__Y7_PRERENDER;

export default function QuoteStrip({ onCta }) {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);
  const [vehicle, setVehicle] = useState('sedan');
  const [transport, setTransport] = useState('open');

  const deliverList = useMemo(
    () => [...PORT_METROS, ...METROS.filter(m => !PORT_METROS.some(p => p.name.startsWith(m.name.split(',')[0])))],
    []
  );
  const findMetro = (name) =>
    PORT_METROS.find(m => m.name === name) || METROS.find(m => m.name === name) || null;

  const calc = useMemo(() => {
    if (from === OTHER || to === OTHER) return { other: true };
    const a = findMetro(from), b = findMetro(to);
    if (!a || !b || from === to) return { same: from === to };
    const miles = roadMiles(a, b);
    const band = lookupBand(miles);
    if (!band) return {};
    const vMult = VEHICLES.find(v => v.key === vehicle).mult;
    const tMult = TRANSPORTS.find(x => x.key === transport).mult;
    // Raw band quantiles ship untouched (keeps the T12 default $503-$550
    // byte-stable); $5 rounding applies only to multiplied figures.
    const mult = vMult * tMult;
    const lo = mult === 1 ? band.p25 : round5(band.p25 * mult);
    const hi = mult === 1 ? band.p75 : round5(band.p75 * mult);
    return { miles, lo, hi, range: `$${lo}-$${hi}` };
  }, [from, to, vehicle, transport]);

  const isDefault = from === DEFAULT_FROM && to === DEFAULT_TO;

  const go = (e) => {
    e.preventDefault();
    // Default path stays byte-identical to the shipped behavior: anchor scroll.
    // A chosen route carries prefill ZIPs into the existing /quote query
    // pattern (pickup_zip/delivery_zip — the same params QuoteFormCompact
    // sends; zero /quote code changes).
    if (isDefault || calc.other || calc.same) {
      if (onCta) onCta();
      return;
    }
    const a = findMetro(from), b = findMetro(to);
    const params = new URLSearchParams({ pickup_zip: a.zip, delivery_zip: b.zip });
    navigate(`/quote?${params.toString()}#top`);
  };

  const selectProps = {
    className: `${v2f.inputOnPaper} ${styles.select}`,
  };

  return (
    <div className={styles.strip}>
      {/* No eyebrow here (opener varies): the strip's Signal Budget is spent by
          the red result value + the serve block's rule-line below. */}
      <div className={styles.copy}>
        <h2 className={`${v2t.sectionDisplay} ${styles.title}`}>{t('quoteStrip.title')}</h2>
        <p className={`${v2t.lede} ${v2t.ledeOnPaper}`}>{t('quoteStrip.desc')}</p>
        <a href="#quote-section" onClick={go} className={`${v2b.ghostOnPaper} ${styles.cta}`}>
          {t('quoteStrip.cta')}
        </a>
        <p className={`${v2t.monoMicro} ${styles.ctaHedge}`}>{t('quoteStrip.ctaHedge')}</p>
      </div>

      {/* One fused instrument: four controls flow into the terminal result
          tile (connector column between them). */}
      <div className={styles.calc}>
        <div className={styles.controls}>
          {IS_PRERENDER ? (
            <>
              <div className={styles.field}>
                <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.pickupLabel')}</span>
                <strong className={styles.staticValue}>{DEFAULT_FROM}</strong>
              </div>
              <div className={styles.field}>
                <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.deliverLabel')}</span>
                <strong className={styles.staticValue}>{DEFAULT_TO}</strong>
              </div>
              <div className={styles.field}>
                <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.vehicleLabel')}</span>
                <strong className={styles.staticValue}>{t('quoteStrip.vehicle_sedan')}</strong>
              </div>
              <div className={styles.field}>
                <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.transportLabel')}</span>
                <strong className={styles.staticValue}>{t('quoteStrip.transport_open')}</strong>
              </div>
            </>
          ) : (
            <>
          <label className={styles.field}>
            <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.pickupLabel')}</span>
            <select {...selectProps} value={from} onChange={(e) => setFrom(e.target.value)}>
              {METROS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
              <option value={OTHER}>{t('quoteStrip.otherOption')}</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.deliverLabel')}</span>
            <select {...selectProps} value={to} onChange={(e) => setTo(e.target.value)}>
              {deliverList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
              <option value={OTHER}>{t('quoteStrip.otherOption')}</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.vehicleLabel')}</span>
            <select {...selectProps} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              {VEHICLES.map(v => <option key={v.key} value={v.key}>{t(`quoteStrip.vehicle_${v.key}`)}</option>)}
            </select>
          </label>
          <label className={styles.field}>
            <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{t('quoteStrip.transportLabel')}</span>
            <select {...selectProps} value={transport} onChange={(e) => setTransport(e.target.value)}>
              {TRANSPORTS.map(x => <option key={x.key} value={x.key}>{t(`quoteStrip.transport_${x.key}`)}</option>)}
            </select>
          </label>
            </>
          )}
        </div>

        <div className={styles.connector} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
          </svg>
        </div>

        <a href="#quote-section" onClick={go} className={styles.result}>
          <span className={`${v2t.monoMicro} ${styles.resultLabel}`}>{t('quoteStrip.resultLabel')}</span>
          {calc.range ? (
            <>
              <b className={styles.resultValue}>{calc.range}</b>
              <span className={`${v2t.monoMicro} ${styles.resultMiles}`}>~{calc.miles.toLocaleString('en-US')} mi</span>
            </>
          ) : (
            <b className={styles.resultValueSm}>{t(calc.other ? 'quoteStrip.otherResult' : 'quoteStrip.sameCity')}</b>
          )}
          <span className={`${v2t.monoMicro} ${styles.resultHedge}`}>{t('quoteStrip.resultHedge')}</span>
          <span className={`${v2t.monoMicro} ${styles.resultFee}`}>{t('quoteStrip.resultFee')}</span>
        </a>
      </div>
    </div>
  );
}
