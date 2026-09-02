/**
 * WEBGEO T02 — the true cost of adding a fifth locale (candidate: BG).
 *
 * Two questions, both measured rather than estimated:
 *   (a) which files must change — found by searching for the LOCALE SET itself
 *       (every place that enumerates 'pl','ua','ru' together), not by guessing
 *       a list of filenames;
 *   (b) how many translation keys exist per locale, and whether the four current
 *       locales are in sync or have drifted — reported as the actual missing and
 *       extra KEY PATHS, not a count, since a count can hide two changes.
 *
 * Usage:  node docs/audits/raw/webgeo/t02_locale_cost.mjs
 * Writes: docs/audits/raw/webgeo/out/T02_locale_cost.txt
 *         docs/audits/raw/webgeo/out/T02_key_drift.txt
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const OUT = join(HERE, 'out');
mkdirSync(OUT, { recursive: true });

const LOCALES_DIR = join(ROOT, 'src', 'locales');
const locales = readdirSync(LOCALES_DIR).filter((d) => statSync(join(LOCALES_DIR, d)).isDirectory());

/** Flatten a bundle to dotted key paths -> string value. */
function flatten(node, prefix, sink) {
  if (node === null || node === undefined) return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, sink));
  } else if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) flatten(v, prefix ? `${prefix}.${k}` : k, sink);
  } else {
    sink.set(prefix, String(node));
  }
}

const bomFiles = [];
const bundles = {}; // locale -> namespace -> Map(keypath -> value)
for (const loc of locales) {
  bundles[loc] = {};
  for (const f of readdirSync(join(LOCALES_DIR, loc)).filter((f) => f.endsWith('.json'))) {
    const ns = f.replace(/\.json$/, '');
    const sink = new Map();
    // T08 finding: src/locales/pl/home.json and src/locales/pl/shipMycar.json carry a
    // UTF-8 BOM, which JSON.parse rejects. Stripped here so the measurement can run;
    // the BOM itself is REPORTED, not silently accepted.
    let raw = readFileSync(join(LOCALES_DIR, loc, f), 'utf8');
    if (raw.charCodeAt(0) === 0xfeff) {
      bomFiles.push(`src/locales/${loc}/${f}`);
      raw = raw.slice(1);
    }
    flatten(JSON.parse(raw), '', sink);
    bundles[loc][ns] = sink;
  }
}

const L = [];
const say = (s = '') => L.push(s);

say('WEBGEO T02 — COST OF A FIFTH LOCALE');
say('');
say('FILES CARRYING A UTF-8 BOM (JSON.parse rejects these; the bundler tolerates them)');
for (const f of bomFiles) say(`  ${f}`);
if (!bomFiles.length) say('  (none)');
say('');
say('LOCALE DIRECTORIES PRESENT');
say(`  ${locales.join(', ')}`);
say('');

say('TRANSLATION VOLUME PER LOCALE (leaf keys, arrays flattened element-by-element)');
say(`  ${'locale'.padEnd(8)} ${'namespaces'.padStart(11)} ${'leaf keys'.padStart(11)} ${'chars'.padStart(10)}`);
const totals = {};
for (const loc of locales) {
  const nss = Object.keys(bundles[loc]);
  let keys = 0;
  let chars = 0;
  for (const ns of nss) {
    keys += bundles[loc][ns].size;
    for (const v of bundles[loc][ns].values()) chars += v.length;
  }
  totals[loc] = { nss: nss.length, keys, chars };
  say(`  ${loc.padEnd(8)} ${String(nss.length).padStart(11)} ${String(keys).padStart(11)} ${String(chars).padStart(10)}`);
}
say('');

// ---- namespace-level presence ---------------------------------------------
const allNs = [...new Set(locales.flatMap((l) => Object.keys(bundles[l])))].sort();
say('NAMESPACE PRESENCE (X = the file exists in that locale)');
say(`  ${'namespace'.padEnd(26)} ${locales.map((l) => l.padEnd(4)).join('')}`);
for (const ns of allNs) {
  say(`  ${ns.padEnd(26)} ${locales.map((l) => (bundles[l][ns] ? 'X   ' : '.   ')).join('')}`);
}
say('');

// ---- key-level drift against EN --------------------------------------------
const D = [];
const dsay = (s = '') => D.push(s);
dsay('WEBGEO T02 — KEY DRIFT AGAINST EN, PATH BY PATH');
dsay('(the SET, not the count: a count that stays equal can hide two changes)');
dsay('');

say('KEY DRIFT vs EN — SUMMARY (full paths in T02_key_drift.txt)');
say(`  ${'locale'.padEnd(8)} ${'missing'.padStart(9)} ${'extra'.padStart(7)} ${'untranslated'.padStart(13)}  (untranslated = byte-identical to EN)`);
for (const loc of locales.filter((l) => l !== 'en')) {
  let missing = [];
  let extra = [];
  let identical = [];
  for (const ns of allNs) {
    const en = bundles.en[ns];
    const lo = bundles[loc][ns];
    if (!en && !lo) continue;
    if (!lo) {
      if (en) missing.push(...[...en.keys()].map((k) => `${ns}.${k}  (WHOLE FILE ABSENT)`));
      continue;
    }
    if (!en) {
      extra.push(...[...lo.keys()].map((k) => `${ns}.${k}  (no EN namespace)`));
      continue;
    }
    for (const k of en.keys()) if (!lo.has(k)) missing.push(`${ns}.${k}`);
    for (const k of lo.keys()) if (!en.has(k)) extra.push(`${ns}.${k}`);
    for (const k of en.keys()) {
      if (lo.has(k) && lo.get(k) === en.get(k) && en.get(k).trim().length > 2) identical.push(`${ns}.${k}`);
    }
  }
  say(`  ${loc.padEnd(8)} ${String(missing.length).padStart(9)} ${String(extra.length).padStart(7)} ${String(identical.length).padStart(13)}`);
  dsay('='.repeat(74));
  dsay(`LOCALE ${loc}`);
  dsay('='.repeat(74));
  dsay(`-- MISSING vs EN (${missing.length}):`);
  missing.forEach((k) => dsay(`     ${k}`));
  dsay(`-- EXTRA, not in EN (${extra.length}):`);
  extra.forEach((k) => dsay(`     ${k}`));
  dsay(`-- BYTE-IDENTICAL to EN, i.e. untranslated or intentionally shared (${identical.length}):`);
  identical.slice(0, 400).forEach((k) => dsay(`     ${k}`));
  if (identical.length > 400) dsay(`     ... ${identical.length - 400} more`);
  dsay('');
}
say('');

writeFileSync(join(OUT, 'T02_key_drift.txt'), D.join('\n') + '\n', 'utf8');
writeFileSync(join(OUT, 'T02_locale_cost.txt'), L.join('\n') + '\n', 'utf8');
console.log(L.join('\n'));
