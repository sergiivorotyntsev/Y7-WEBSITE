// SPRINT-T14-A: one-time transform of the shipper dispatch export
// cd_dispatches_2026-05-11_2026-06-12.csv into src/data/rates/ (append-only).
// Standard columns match the T12 schema; provenance columns (dispatch_id,
// status, dispatch_date, cod, vehicle_count, vehicle) are appended after them
// so the name-based parser in derive-rates.mjs reads both files uniformly.
// vehicle_class derivation (GO-approved): SPRINTER|TRANSIT|PROMASTER|VAN ->
// van; motorcycles (ROYAL ENFIELD / HARLEY / MOTORCYCLE) -> motorcycle (new
// class, excluded from rate derivation, retained for provenance); rest ->
// standard. ZIP leading zeros preserved (string passthrough).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = 'C:/Users/vorot/Downloads/cd_dispatches_2026-05-11_2026-06-12.csv';
const OUT = path.join(ROOT, 'src/data/rates/cd_2026-05-11_06-12.csv');

const text = fs.readFileSync(SRC, 'utf8').replace(/^﻿/, '').trim();
const [head, ...lines] = text.split(/\r?\n/);
const cols = head.split(',').map(c => c.trim());
const rows = lines.map(l => {
  const cells = l.split(',');
  if (cells.length !== cols.length) throw new Error('column count mismatch: ' + l);
  return Object.fromEntries(cols.map((c, i) => [c, (cells[i] || '').trim()]));
});

function vehicleClass(vehicle) {
  const v = vehicle.toUpperCase();
  if (/\b(SPRINTER|TRANSIT|PROMASTER|VAN)\b/.test(v)) return 'van';
  if (/(ROYAL ENFIELD|HARLEY|MOTORCYCLE)/.test(v)) return 'motorcycle';
  return 'standard';
}

const OUT_COLS = [
  'pickup_name', 'pickup_city', 'pickup_state', 'pickup_zip',
  'dest_name', 'dest_city', 'dest_state', 'dest_zip',
  'miles', 'price_usd', 'vehicle_class',
  'dispatch_id', 'status', 'dispatch_date', 'cod', 'vehicle_count', 'vehicle',
];

const out = [OUT_COLS.join(',')];
for (const r of rows) {
  if (!/^\d{5}$/.test(r.origin_zip) || !/^\d{5}$/.test(r.dest_zip)) {
    throw new Error('bad zip on ' + r.dispatch_id);
  }
  out.push([
    '', r.origin_city, r.origin_state, r.origin_zip,
    '', r.dest_city, r.dest_state, r.dest_zip,
    r.miles, r.price_usd, vehicleClass(r.vehicle),
    r.dispatch_id, r.status, r.dispatch_date, r.cod, r.vehicle_count, r.vehicle,
  ].join(','));
}
fs.writeFileSync(OUT, out.join('\n') + '\n');
const classes = {};
for (const r of rows) { const c = vehicleClass(r.vehicle); classes[c] = (classes[c] || 0) + 1; }
console.log('wrote', OUT, rows.length, 'rows; classes:', classes);
console.log('leading-zero zips:', rows.filter(r => r.origin_zip.startsWith('0') || r.dest_zip.startsWith('0')).length);
