// scripts/generateSitemap.js
// Regenerates public/sitemap.xml with reciprocal hreflang alternates on every
// translated URL — every language version of a page lists every other language
// version (including itself). Per Google's hreflang rules:
// https://developers.google.com/search/docs/specialty/international/localized-versions

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PORT_SLUGS } from '../src/pages/ports/portData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'public', 'sitemap.xml');
const BASE = 'https://www.y7agency.com';
const TODAY = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Translatable paths — each entry has the English-plus-3-locale slug mapping.
// These are 1:1 translations of the same content in 4 languages.
// ---------------------------------------------------------------------------
const TRANSLATABLE_PATHS = [
  { en: '/',          ua: '/ua',          pl: '/pl',          ru: '/ru' },
  { en: '/services',  ua: '/ua/services', pl: '/pl/services', ru: '/ru/services' },
  { en: '/dealers',   ua: '/ua/dealers',  pl: '/pl/dealers',  ru: '/ru/dealers' },
  { en: '/exporters', ua: '/ua/exporters',pl: '/pl/exporters',ru: '/ru/exporters' },
  { en: '/ship-my-car', ua: '/ua/ship-my-car', pl: '/pl/ship-my-car', ru: '/ru/ship-my-car' },
  { en: '/about',     ua: '/ua/about',    pl: '/pl/about',    ru: '/ru/about' },
  { en: '/contact',   ua: '/ua/contact',  pl: '/pl/contact',  ru: '/ru/contact' },
  { en: '/faq',       ua: '/ua/faq',      pl: '/pl/faq',      ru: '/ru/faq' },
  { en: '/track',     ua: '/ua/track',    pl: '/pl/track',    ru: '/ru/track' },
  { en: '/quote',     ua: '/ua/quote',    pl: '/pl/quote',    ru: '/ru/quote' },
];

// Localized port pages (SEO-P2B): 1:1 translations of each English port page
// in all four languages. Built from PORT_SLUGS so the list can't drift from the
// port data or the prerendered routes.
const PORT_GROUPS = PORT_SLUGS.map((s) => ({
  en: `/ports/${s}`,
  ua: `/ua/ports/${s}`,
  pl: `/pl/ports/${s}`,
  ru: `/ru/ports/${s}`,
}));

// ---------------------------------------------------------------------------
// English-only pages (no locale variants) — flat URL entries, no alternates.
// ---------------------------------------------------------------------------
const ENGLISH_ONLY = [
  // Legal / utility
  '/dealer-quote', '/privacy', '/terms', '/accessibility',

  // Carrier recruiting
  '/careers', '/careers/apply',

  // SEO service pages
  '/car-shipping-cost', '/enclosed-car-shipping', '/auction-car-shipping',
  '/auction-transport-savings',
  '/copart-shipping', '/iaai-transport', '/manheim-transport',
  '/door-to-port-auto-transport', '/dealer-auto-transport',
  '/salvage-car-shipping', '/open-car-shipping', '/state-to-state-car-shipping',

  // Location pages
  '/massachusetts-car-shipping', '/boston-car-shipping',
  '/newton-auto-transport', '/florida-car-shipping',
  '/new-jersey-auto-transport', '/texas-auto-transport',

  // Route pages
  '/massachusetts-to-florida-car-shipping', '/new-jersey-to-florida-car-shipping',
  '/texas-to-newark-port-auto-transport', '/chicago-to-port-newark-car-shipping',
  '/auction-to-port-transport',

  // EV / Tesla
  '/tesla-car-shipping', '/ev-auto-transport', '/cybertruck-shipping',
  '/electric-vehicle-port-delivery',

  // Guide pages
  '/how-to-ship-a-car-bought-at-auction', '/open-vs-enclosed-auto-transport',
  '/what-is-a-bill-of-lading',
  '/copart-storage-fees', '/copart-gate-pass-guide', '/copart-international-shipping',

  // Blog
  '/blog',
  '/blog/carrier-who-vanished',
  '/blog/carrier-coi-verification-guide',
  '/blog/fmcsa-2026-new-rules',
  '/blog/outbox-pattern-dispatch',
  '/blog/dealer-auction-pickup-guide',
  '/blog/exporter-documentation-checklist',
  '/blog/fmcsa-broker-recordkeeping-2026',
  '/blog/75000-bond-claims-guide',
  '/blog/copart-iaa-manheim-comparison',
  '/blog/auction-to-port-cost-breakdown-2026',
  '/blog/central-dispatch-listing-decoded',
  '/blog/enclosed-transport-when-to-skip',
  '/blog/non-running-vehicle-shipping-playbook',
  '/blog/winter-auto-transport-pricing',
  '/blog/bill-of-lading-pickup-delivery-guide',
  '/blog/port-specific-export-newark-houston-savannah',
  '/blog/copart-storage-fees-real-cost-2026',
  '/blog/copart-for-international-buyers-complete-guide',
];

// ---------------------------------------------------------------------------
// Unique intl landing pages — distinct content per locale, NOT translations
// of English pages. Each listed as a standalone URL without alternates.
// ---------------------------------------------------------------------------
const UNIQUE_INTL_PATHS = [
  '/ua/import-z-usa', '/ua/copart-ta-iaai', '/ua/dostavka-avto-z-usa',
  '/pl/transport-z-usa', '/pl/transport-z-aukcji', '/pl/wysylka-auta-z-usa',
  '/ru/dostavka-avto-iz-usa', '/ru/copart-i-iaai', '/ru/perevozka-avto',
];

// ---------------------------------------------------------------------------
// Priority / changefreq policy
// ---------------------------------------------------------------------------
function metaFor(path) {
  if (path === '/' || /^\/(ua|pl|ru)$/.test(path)) {
    return { priority: '1.0', changefreq: 'daily' };
  }
  if (/^(\/ua|\/pl|\/ru)?\/(dealers|exporters|ship-my-car|services|quote)$/.test(path)) {
    return { priority: '0.9', changefreq: 'weekly' };
  }
  if (path.startsWith('/blog/')) {
    return { priority: '0.6', changefreq: 'monthly' };
  }
  if (path === '/blog') {
    return { priority: '0.7', changefreq: 'weekly' };
  }
  if (path.startsWith('/ports/')) {
    return { priority: '0.7', changefreq: 'monthly' };
  }
  if (/privacy|terms|accessibility/.test(path)) {
    return { priority: '0.3', changefreq: 'yearly' };
  }
  return { priority: '0.7', changefreq: 'monthly' };
}

// ---------------------------------------------------------------------------
// URL block builders
// ---------------------------------------------------------------------------
function buildAlternates(group) {
  // x-default is the English version (Google's recommendation).
  return [
    `    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${group.en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="uk" href="${BASE}${group.ua}"/>`,
    `    <xhtml:link rel="alternate" hreflang="pl" href="${BASE}${group.pl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="ru" href="${BASE}${group.ru}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${group.en}"/>`,
  ].join('\n');
}

function translatedUrlBlock(loc, group) {
  const { priority, changefreq } = metaFor(loc);
  return [
    '  <url>',
    `    <loc>${BASE}${loc}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    buildAlternates(group),
    '  </url>',
  ].join('\n');
}

function flatUrlBlock(path) {
  const { priority, changefreq } = metaFor(path);
  return [
    '  <url>',
    `    <loc>${BASE}${path}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------
const sections = [];

// 1. Translatable pages — every locale variant gets the full alternates block
sections.push('  <!-- Translated pages: reciprocal hreflang alternates on every URL -->');
for (const group of TRANSLATABLE_PATHS) {
  sections.push(translatedUrlBlock(group.en, group));
  sections.push(translatedUrlBlock(group.ua, group));
  sections.push(translatedUrlBlock(group.pl, group));
  sections.push(translatedUrlBlock(group.ru, group));
}

// 1b. Localized port pages — same reciprocal-hreflang treatment as above.
sections.push('');
sections.push('  <!-- Translated port pages: reciprocal hreflang alternates on every URL -->');
for (const group of PORT_GROUPS) {
  sections.push(translatedUrlBlock(group.en, group));
  sections.push(translatedUrlBlock(group.ua, group));
  sections.push(translatedUrlBlock(group.pl, group));
  sections.push(translatedUrlBlock(group.ru, group));
}

// 2. English-only pages
sections.push('');
sections.push('  <!-- English-only pages (no locale variants) -->');
for (const path of ENGLISH_ONLY) {
  sections.push(flatUrlBlock(path));
}

// 3. Unique intl landing pages (distinct content, not translations)
sections.push('');
sections.push('  <!-- Unique international landing pages (distinct content per locale) -->');
for (const path of UNIQUE_INTL_PATHS) {
  sections.push(flatUrlBlock(path));
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  '',
  ...sections,
  '',
  '</urlset>',
  '',
].join('\n');

writeFileSync(OUT_FILE, xml, 'utf-8');

const total = (xml.match(/<url>/g) || []).length;
const alt = (xml.match(/xhtml:link/g) || []).length;
console.log(`[generateSitemap] wrote ${OUT_FILE}`);
console.log(`  Total <url> entries: ${total}`);
console.log(`  Total xhtml:link alternates: ${alt}`);
const groupCount = TRANSLATABLE_PATHS.length + PORT_GROUPS.length;
console.log(`  Translated URL groups: ${groupCount} (× 4 locales × 5 alternates = ${groupCount * 4 * 5})`);
