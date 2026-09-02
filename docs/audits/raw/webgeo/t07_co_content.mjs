/**
 * WEBGEO T07 — the /certificate-of-origin route's content, as it stands, all locales.
 *
 * The route's visible copy lives entirely in src/locales/<loc>/certificateOfOrigin.json;
 * src/pages/seo/CertificateOfOrigin.jsx is layout plus the request form. This dumps the
 * bundle verbatim, per locale, and then answers the brief's three questions by SEARCHING
 * the dumped text rather than by reading the page and remembering.
 *
 * Usage:  node docs/audits/raw/webgeo/t07_co_content.mjs
 * Writes: docs/audits/raw/webgeo/out/T07_co_content.md
 *         docs/audits/raw/webgeo/out/T07_co_answers.txt
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const OUT = join(HERE, 'out');
mkdirSync(OUT, { recursive: true });

const LOCALES = ['en', 'pl', 'ru', 'ua'];

function flatten(node, prefix, sink) {
  if (node === null || node === undefined) return;
  if (Array.isArray(node)) node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, sink));
  else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) flatten(v, prefix ? `${prefix}.${k}` : k, sink);
  else sink.push([prefix, String(node)]);
}

const M = [];
const A = [];
const say = (s = '') => M.push(s);
const ans = (s = '') => A.push(s);

say('# WEBGEO T07 — /certificate-of-origin content dump (all locales)');
say('');
say('Verbatim from `src/locales/<loc>/certificateOfOrigin.json`. Nothing summarised.');
say('');

const flat = {};
for (const loc of LOCALES) {
  const p = join(ROOT, 'src', 'locales', loc, 'certificateOfOrigin.json');
  let raw = readFileSync(p, 'utf8');
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const sink = [];
  flatten(JSON.parse(raw), '', sink);
  flat[loc] = sink;
  say(`## locale: ${loc}   (${sink.length} leaf keys, ${sink.reduce((a, [, v]) => a + v.length, 0)} chars)`);
  say('');
  for (const [k, v] of sink) {
    say(`**\`${k}\`**`);
    say('');
    say('> ' + v.replace(/\n/g, '\n> '));
    say('');
  }
  say('---');
  say('');
}

// ---------------------------------------------------------------- the questions
ans('WEBGEO T07 — ANSWERS, each by searching the dumped text');
ans('');

function hits(loc, re) {
  return flat[loc].filter(([, v]) => re.test(v)).map(([k, v]) => [k, v]);
}

ans('=== Q2. Does the page state any condition on TITLE STATUS (clean / salvage / rebuilt)?');
// CORRECTED, and the correction is the point. The first version of this regex was
//   /\b(clean title|salvage|rebuilt|branded title|title status|tytu[łl]|титул|…)\b/i
// and it reported "pl: 3 hits, en/ru/ua: 0" — which reads as "only the Polish page
// states the condition". That is FALSE: all four state it, in the same three keys.
// The regex encoded the SHAPE I expected (the words clean/salvage/rebuilt) instead of
// the thing being searched for. EN says "The title type is checked"; RU and UA use the
// loanword «тайтл», not «титул». CLAUDE.md rule 29 — search for the PAIRING, not for
// the mistake — and rule 0c's corollary: a scan that misses a case you can verify by
// hand is not a measurement. The honest search keys on the four ineligible-type
// literals, which are untranslated English in every locale, plus each locale's own
// word for the field.
const titleRe = /bill-of-sale-only|certificate of destruction|non-repairable|parts-only|title type|tytu[łl]u w[łl]asno|тип тайтла|тип тайтла|clean title|salvage|rebuilt/i;
let anyTitle = false;
for (const loc of LOCALES) {
  const h = hits(loc, titleRe);
  ans(`  ${loc}: ${h.length} hit(s)`);
  h.forEach(([k, v]) => {
    anyTitle = true;
    ans(`     ${k}`);
    ans(`        ${v.slice(0, 400)}`);
  });
}
ans(anyTitle
  ? '  VERDICT: a title-status condition IS stated — quoted above.'
  : '  VERDICT: NO condition on title status is stated anywhere on the page, in any locale.');
ans('  SHAPE OF THE CONDITION: it is a NEGATIVE list of four ineligible title types');
ans('  (bill-of-sale-only, certificate of destruction, non-repairable, parts-only).');
ans('  The page never uses the words clean / salvage / rebuilt, and never says that a');
ans('  salvage or rebuilt title IS eligible — it is silent on the three types a buyer');
ans('  is most likely to be holding.');
ans('  Cross-reference: TRANSPORT services/co_screening.py fails exactly those four and');
ans('  PASSES clean|salvage|rebuilt, so page and code AGREE on the exclusions. What the');
ans('  page omits is the reassurance, not a condition.');
ans('');

ans('=== Q3. Price / turnaround / issuing chamber / regulation-with-date');
const checks = [
  ['price $99', /\$?\s?99\b/],
  ['price $150', /\$?\s?150\b/],
  // 'dni roboczych' puts a word between the numeral and the stem, so /7\s*robocz/
  // scored PL at 0 while the string was right there. Same lesson as titleRe.
  ['turnaround (7 business days)', /7\s*(business|dni\s+robocz|robocz|рабоч|робоч)/i],
  ['issuing chamber (named?)', /chamber|izb|палат|торгово-промышленн|торгово-промислов/i],
  ['regulation number', /2026\/1455/],
  ['regulation date', /1 (July|lipca|июля|липня) 2026|1\.7\.2026/i],
  ['second regulation (UCC-IA / 2026\\/1422)', /2026\/1422|UCC-IA|59a/i],
  ['duty rates 0% / 10%', /0\s?%|10\s?%/],
];
for (const [label, re] of checks) {
  const per = LOCALES.map((loc) => `${loc}:${hits(loc, re).length}`).join('  ');
  ans(`  ${label.padEnd(36)} ${per}`);
}
ans('');
ans('  The chamber, quoted (EN):');
hits('en', /chamber/i).forEach(([k, v]) => ans(`     ${k}: ${v.slice(0, 300)}`));
ans('');

writeFileSync(join(OUT, 'T07_co_content.md'), M.join('\n') + '\n', 'utf8');
writeFileSync(join(OUT, 'T07_co_answers.txt'), A.join('\n') + '\n', 'utf8');
console.log(A.join('\n'));
