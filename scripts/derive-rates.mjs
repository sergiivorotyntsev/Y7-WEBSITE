// W2-T12 + SPRINT-T14: derive src/data/dispatchRates.js from the append-only
// source set src/data/rates/*.csv (real Central Dispatch carrier rates Sergii
// paid).
//
// APPEND-ONLY CONTRACT: drop any new export into src/data/rates/ and re-run
// `node scripts/derive-rates.mjs` — zero code changes required.
// Dedupe (T14): composite — by dispatch_id when the file carries the column,
// else by the (pickup_zip, dest_zip, miles, price_usd) tuple (legacy T12
// export has no ids). In-file repeats without ids are legitimate loads.
// Model basis: vehicle_class === 'standard' AND vehicle_count <= 1 only;
// van / premium / expedited / motorcycle rows are excluded from the model but
// kept in the sources for provenance.
//
// T14-B TWO-TIER MODEL (owner-approved):
//   Tier 1: global piecewise-linear $/mi decay curve over band midpoints of
//           per-row median $/mi; tail beyond the last breakpoint extrapolates
//           with the last segment slope, floored at $0.45/mi.
//   Tier 2: origin-state adjustment = clamp(median(price / curve(miles)) per
//           pickup_state, 0.85..1.15), applied only where n >= 8; else 1.00.
//   Runtime: mid = curve(miles) × originAdj(state); range = mid × band spread
//   ratios (p25/median .. p75/median). Destination-side factors deliberately
//   NOT modeled this sprint (port-dominated, collinear with origin).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { METROS, PORT_METROS, roadMiles } from '../src/data/metros.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC_DIR = path.join(ROOT, 'src/data/rates');
const OUT = path.join(ROOT, 'src/data/dispatchRates.js');

const BANDS = [
  [0, 50], [51, 150], [151, 300], [301, 500], [501, 800], [801, 1200], [1201, Infinity],
];
const TAIL_DPM_FLOOR = 0.45;
const ADJ_MIN_N = 8;
const ADJ_CLAMP = [0.85, 1.15];

function parseCsv(text) {
  const [head, ...lines] = text.replace(/^﻿/, '').trim().split(/\r?\n/);
  const cols = head.split(',');
  return lines.map(l => {
    const cells = l.split(',');
    return Object.fromEntries(cols.map((c, i) => [c.trim(), (cells[i] || '').trim()]));
  });
}

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.csv')).sort();
if (!files.length) throw new Error('no source csv files in src/data/rates');

const seen = new Set();
let all = [], perFile = {};
for (const f of files) {
  const rows = parseCsv(fs.readFileSync(path.join(SRC_DIR, f), 'utf8'));
  const fileKeys = new Set();
  let kept = 0, dup = 0;
  for (const r of rows) {
    const key = r.dispatch_id
      ? `id:${r.dispatch_id}`
      : [r.pickup_zip, r.dest_zip, r.miles, r.price_usd].join('|');
    if (seen.has(key)) { dup++; continue; }
    if (r.dispatch_id) seen.add(key); else fileKeys.add(key); // legacy: cross-file only
    all.push(r);
    kept++;
  }
  for (const k of fileKeys) seen.add(k);
  perFile[f] = { rows: rows.length, kept, dup };
}

const std = all.filter(r => r.vehicle_class === 'standard'
  && (!r.vehicle_count || Number(r.vehicle_count) <= 1)
  && Number(r.miles) >= 0 && r.miles !== '' && Number(r.price_usd) > 0);
const excluded = all.length - std.length;

const q = (v, p) => {
  const s = [...v].sort((a, b) => a - b);
  const k = (s.length - 1) * p, f = Math.floor(k), c = Math.min(f + 1, s.length - 1);
  return s[f] + (s[c] - s[f]) * (k - f);
};
const qr = (v, p) => Math.round(q(v, p));

// ---- Bands (kept for provenance/back-compat; runtime uses the curve) ----
const bands = BANDS.map(([lo, hi]) => {
  const prices = std.filter(r => Number(r.miles) >= lo && Number(r.miles) <= hi)
    .map(r => Number(r.price_usd));
  return {
    minMiles: lo,
    maxMiles: hi === Infinity ? null : hi,
    n: prices.length,
    median: qr(prices, 0.5),
    p25: qr(prices, 0.25),
    p75: qr(prices, 0.75),
    loRatio: +(q(prices, 0.25) / q(prices, 0.5)).toFixed(4),
    hiRatio: +(q(prices, 0.75) / q(prices, 0.5)).toFixed(4),
  };
});

// ---- Tier 1: $/mi curve over band midpoints ----
// Per-row $/mi needs miles > 0; same-yard moves can't contribute to the curve.
const curveRows = std.filter(r => Number(r.miles) > 0);
const curvePoints = BANDS.map(([lo, hi]) => {
  const rows = curveRows.filter(r => Number(r.miles) >= lo && Number(r.miles) <= hi);
  if (!rows.length) return null;
  const dpm = q(rows.map(r => Number(r.price_usd) / Number(r.miles)), 0.5);
  const m = hi === Infinity
    ? q(rows.map(r => Number(r.miles)), 0.5)          // tail anchor = median miles of 1200+ rows
    : (lo + hi) / 2;
  return { m: Math.round(m), dpm: +dpm.toFixed(4), n: rows.length };
}).filter(Boolean);

function curveDpm(points, miles) {
  const pts = points;
  if (miles <= pts[0].m) return pts[0].dpm;
  for (let i = 0; i < pts.length - 1; i++) {
    if (miles <= pts[i + 1].m) {
      const a = pts[i], b = pts[i + 1];
      return a.dpm + (b.dpm - a.dpm) * ((miles - a.m) / (b.m - a.m));
    }
  }
  const a = pts[pts.length - 2], b = pts[pts.length - 1];
  // Flat-tail rule (owner ACK): never extrapolate an INCREASING $/mi — a
  // convex-noise positive tail slope is capped at 0 (flat), floor stays.
  const slope = Math.min(0, (b.dpm - a.dpm) / (b.m - a.m));
  return Math.max(TAIL_DPM_FLOOR, b.dpm + slope * (miles - b.m));
}
const rawCurveMid = (miles) => curveDpm(curvePoints, miles) * miles;

// RECENTERING (owner mandatory fix): piecewise-linear chords over a convex
// decreasing $/mi curve overestimate between anchors, biasing residual
// medians below 1 (n-weighted map mean ~0.93) and making fallback-1.00
// states quote ~7% high. Fix: scale the curve by the global median residual
// so state medians recenter around 1.00; covered unclamped states are
// invariant (curve x globalMed, adj / globalMed cancel).
const globalMed = q(curveRows.map(r => Number(r.price_usd) / rawCurveMid(Number(r.miles))), 0.5);
const scaledPoints = curvePoints.map(p => ({ ...p, dpm: +(p.dpm * globalMed).toFixed(4) }));
const curveMidLocal = (miles) => curveDpm(scaledPoints, miles) * miles;

// ---- Tier 2: origin-state adjustment ----
function originAdjFrom(rows) {
  const byState = {};
  for (const r of rows) {
    const m = Number(r.miles);
    if (m <= 0) continue;
    const ratio = Number(r.price_usd) / curveMidLocal(m);
    (byState[r.pickup_state] = byState[r.pickup_state] || []).push(ratio);
  }
  const out = {};
  for (const [st, ratios] of Object.entries(byState)) {
    if (ratios.length < ADJ_MIN_N) continue;
    const f = Math.min(ADJ_CLAMP[1], Math.max(ADJ_CLAMP[0], q(ratios, 0.5)));
    out[st] = { adj: +f.toFixed(3), n: ratios.length };
  }
  return out;
}
const originAdjPooled = originAdjFrom(curveRows);

// T14 validation (amended after the bin-edge incident): all factors come from
// the SAME continuous interpolated curve the model emits (single source of
// truth) — band-step residuals are invalid in the steep short-haul region and
// the original reference numbers derived from them are void.
// Gate 1 (hard, owner domain prior): FL < 1.00 or abort.
// Gate 2 (NY bimodality): if NY's short(<=150mi)/long residual medians split
// across 1.0 against the smooth curve, NY is EXCLUDED (fallback 1.00) with
// the pending-1385-load-export flag; else it enters per normal rules.
const flAdj = originAdjPooled['FL']?.adj;
if (flAdj !== undefined && flAdj >= 1.0) {
  console.error('HARD PRIOR VIOLATED: FL adj must be < 1.00, got', flAdj);
  process.exit(1);
}
const nyRows = curveRows.filter(r => r.pickup_state === 'NY');
const nyRatio = (r) => Number(r.price_usd) / curveMidLocal(Number(r.miles));
const nyShort = nyRows.filter(r => Number(r.miles) <= 150).map(nyRatio);
const nyLong = nyRows.filter(r => Number(r.miles) > 150).map(nyRatio);
const nyCheck = {
  nShort: nyShort.length, medShort: nyShort.length ? +q(nyShort, 0.5).toFixed(3) : null,
  nLong: nyLong.length, medLong: nyLong.length ? +q(nyLong, 0.5).toFixed(3) : null,
};
const nySplit = nyCheck.nShort >= 3 && nyCheck.nLong >= 3
  && ((nyCheck.medShort < 1 && nyCheck.medLong > 1) || (nyCheck.medShort > 1 && nyCheck.medLong < 1));
if (nySplit && originAdjPooled['NY']) {
  delete originAdjPooled['NY']; // bimodal: pending the 1,385-load export
}
const nyStatus = nySplit ? 'EXCLUDED (bimodal short/long, pending 1,385-load export)'
  : (originAdjPooled['NY'] ? 'included' : 'n<8');

// Acceptance check (owner): after recentering, the map's n-weighted mean must
// land at ~1.00 (+/-0.02) — the systematic chord bias is gone.
const entries = Object.values(originAdjPooled);
const wMean = entries.reduce((s2, v) => s2 + v.adj * v.n, 0) / entries.reduce((s2, v) => s2 + v.n, 0);
if (Math.abs(wMean - 1) > 0.02) {
  console.error('RECENTERING ACCEPTANCE FAILED: n-weighted adj mean', +wMean.toFixed(4));
  process.exit(1);
}

// ---- Default route (prerender bake must equal runtime; asserted here) ----
const find = (n) => PORT_METROS.find(m => m.name === n) || METROS.find(m => m.name === n);
const DEF_FROM = 'Chicago, IL', DEF_TO = 'Newark, NJ';
const defMiles = Math.round(roadMiles(find(DEF_FROM), find(DEF_TO)));
const defBand = bands.find(b => defMiles >= b.minMiles && (b.maxMiles === null || defMiles <= b.maxMiles));
const defAdj = originAdjPooled['IL'] ? originAdjPooled['IL'].adj : 1;
const defMid = curveMidLocal(defMiles) * defAdj;
const round5 = (n) => Math.round(n / 5) * 5;
const defaultRoute = {
  from: DEF_FROM, to: DEF_TO, miles: defMiles,
  lo: round5(defMid * defBand.loRatio), hi: round5(defMid * defBand.hiRatio),
};

const body = `// GENERATED by scripts/derive-rates.mjs — do not edit by hand.
// Regenerate: node scripts/derive-rates.mjs   (reads src/data/rates/*.csv, append-only)
//
// Source set: ${files.join(', ')}
// Rows: ${all.length} after dedupe (${Object.entries(perFile).map(([f, s]) => `${f}: ${s.rows} rows, ${s.dup} dup`).join('; ')})
// Model basis: vehicle_class=standard, single-vehicle (${std.length} rows; ${excluded} excluded:
// van/premium/expedited/motorcycle/multi-vehicle kept in sources for provenance).
// Figures are CARRIER rates actually paid (open transport). Y7's dispatch fee
// is quoted per customer and never derived from this table.
//
// T14-B TWO-TIER MODEL: mid(miles, originState) = curve(miles) × originAdj.
// curve = piecewise-linear $/mi over band-midpoint medians; tail beyond the
// last anchor extrapolates the last slope, floored at $${TAIL_DPM_FLOOR}/mi.
// originAdj = clamp(median(price/curve(miles)) per pickup_state, ${ADJ_CLAMP[0]}..${ADJ_CLAMP[1]}),
// only where n >= ${ADJ_MIN_N}. Destination factors deliberately not modeled (T14 GO).
// Range = mid × per-band [p25/median .. p75/median] spread ratios.
// UI LAW: all figures hedged as "typical range from recent dispatches",
// never a guaranteed price (DESIGN.md honesty laws).

export const DISPATCH_RATE_BANDS = ${JSON.stringify(bands, null, 2)};

// Superseded by estimateRange (T14) — kept for provenance and any legacy reads.
export function lookupBand(miles) {
  return DISPATCH_RATE_BANDS.find(
    (b) => miles >= b.minMiles && (b.maxMiles === null || miles <= b.maxMiles)
  ) || null;
}

export const RATE_CURVE = ${JSON.stringify(scaledPoints)}; // recentered: raw x globalMed ${globalMed.toFixed(4)}
export const TAIL_FLOOR_DPM = ${TAIL_DPM_FLOOR};
export const ORIGIN_ADJ = ${JSON.stringify(Object.fromEntries(Object.entries(originAdjPooled).map(([k, v]) => [k, v.adj])))};

export function curveMid(miles) {
  const pts = RATE_CURVE;
  let dpm;
  if (miles <= pts[0].m) dpm = pts[0].dpm;
  else {
    dpm = null;
    for (let i = 0; i < pts.length - 1; i++) {
      if (miles <= pts[i + 1].m) {
        const a = pts[i], b = pts[i + 1];
        dpm = a.dpm + (b.dpm - a.dpm) * ((miles - a.m) / (b.m - a.m));
        break;
      }
    }
    if (dpm === null) {
      const a = pts[pts.length - 2], b = pts[pts.length - 1];
      const slope = Math.min(0, (b.dpm - a.dpm) / (b.m - a.m)); // flat-tail rule
      dpm = Math.max(TAIL_FLOOR_DPM, b.dpm + slope * (miles - b.m));
    }
  }
  return dpm * miles;
}

const _round5 = (n) => Math.round(n / 5) * 5;

// T14 runtime entry point: typical carrier range for a route.
// mult folds the vehicle/transport multipliers in (1 = none).
export function estimateRange(miles, originState, mult = 1) {
  if (!(miles > 0)) return null;
  const band = lookupBand(miles);
  const adj = (originState && ORIGIN_ADJ[originState]) || 1;
  const mid = curveMid(miles) * adj * mult;
  return {
    miles,
    mid: Math.round(mid),
    lo: _round5(mid * band.loRatio),
    hi: _round5(mid * band.hiRatio),
  };
}

// Statically baked default route (prerender). derive-rates.mjs asserts this
// equals the runtime model output for the same inputs — no drift possible.
export const DEFAULT_ROUTE = ${JSON.stringify(defaultRoute)};
`;
const DRY = process.argv.includes('--dry-run');
if (!DRY) fs.writeFileSync(OUT, body);

// ---- Post-write assertion: emitted module must reproduce defaultRoute ----
const mod = DRY ? null : await import(pathToFileUrl(OUT));
function pathToFileUrl(p) { return 'file:///' + p.replace(/\\/g, '/'); }
if (!DRY) {
  const rt = mod.estimateRange(defaultRoute.miles, 'IL');
  if (rt.lo !== defaultRoute.lo || rt.hi !== defaultRoute.hi) {
    console.error('DEFAULT ROUTE DRIFT:', { baked: defaultRoute, runtime: rt });
    process.exit(1);
  }
}

console.log('wrote', OUT);
console.log(JSON.stringify({
  files: perFile, total: all.length, standard: std.length,
  curvePoints, scaledPoints, globalMed: +globalMed.toFixed(4), wMean: +wMean.toFixed(4), originAdjPooled, nyCheck, nyStatus, flAdj, defaultRoute, dryRun: DRY,
}, null, 1));
