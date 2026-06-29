// scripts/generateSitemap.js
// Regenerates public/sitemap.xml with reciprocal hreflang alternates on every
// translated URL — every language version of a page lists every other language
// version (including itself). Per Google's hreflang rules:
// https://developers.google.com/search/docs/specialty/international/localized-versions

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PORT_SLUGS } from '../src/pages/ports/portData.js';
import articles from '../src/data/blogArticles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'public', 'sitemap.xml');
const REPO_ROOT = join(__dirname, '..');
const BASE = 'https://www.y7agency.com';

// ---------------------------------------------------------------------------
// SEO-FND-T05: real per-URL <lastmod> (replaces the perpetually-"today" stamp,
// which Google learns to ignore). Strategy:
//   - Blog articles: the SSOT dateISO from blogArticles.js (real publish/update).
//   - Every other URL: the git commit date of its backing source file.
// Git is NOT available in the Docker build (alpine, no git) and `prebuild` runs
// there, so resolved dates are persisted to a committed manifest
// (scripts/sitemap-lastmod.json): local runs populate it from git, the Docker
// build reads it back. BUILD_DATE is the last-resort fallback for brand-new URLs.
// ---------------------------------------------------------------------------
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const MANIFEST_FILE = join(__dirname, 'sitemap-lastmod.json');

let manifest = {};
try {
  if (existsSync(MANIFEST_FILE)) manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'));
} catch {
  manifest = {};
}

let GIT_OK = false;
try {
  execSync('git rev-parse --is-inside-work-tree', { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'ignore'] });
  GIT_OK = true;
} catch {
  GIT_OK = false;
}

function gitDate(relFile) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relFile}"`, {
      cwd: REPO_ROOT,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

// URL -> backing source file. Locale-prefixed translatable pages share the
// English component, so they resolve via their locale-stripped base path.
const PAGE_SOURCE = {
  '/': 'src/pages/Home.jsx',
  '/services': 'src/pages/Services.jsx',
  '/dealers': 'src/pages/Dealers.jsx',
  '/exporters': 'src/pages/Exporters.jsx',
  '/ship-my-car': 'src/pages/ShipMyCar.jsx',
  '/about': 'src/pages/About.jsx',
  '/contact': 'src/pages/Contact.jsx',
  '/faq': 'src/pages/FAQ.jsx',
  '/track': 'src/pages/Track.jsx',
  '/quote': 'src/pages/Quote.jsx',
  '/dealer-quote': 'src/pages/DealerQuote.jsx',
  '/privacy': 'src/pages/PrivacyPolicy.jsx',
  '/terms': 'src/pages/Terms.jsx',
  '/accessibility': 'src/pages/Accessibility.jsx',
  '/careers': 'src/pages/Careers.jsx',
  '/careers/apply': 'src/pages/CareerApplication.jsx',
  '/car-shipping-cost': 'src/pages/seo/CarShippingCost.jsx',
  '/enclosed-car-shipping': 'src/pages/seo/EnclosedCarShipping.jsx',
  '/auction-car-shipping': 'src/pages/seo/AuctionCarShipping.jsx',
  '/auction-transport-savings': 'src/pages/seo/AuctionTransportSavings.jsx',
  '/copart-shipping': 'src/pages/seo/CopartShipping.jsx',
  '/iaai-transport': 'src/pages/seo/IaaiTransport.jsx',
  '/manheim-transport': 'src/pages/seo/ManheimTransport.jsx',
  '/door-to-port-auto-transport': 'src/pages/seo/DoorToPort.jsx',
  '/dealer-auto-transport': 'src/pages/seo/DealerAutoTransport.jsx',
  '/salvage-car-shipping': 'src/pages/seo/SalvageCarShipping.jsx',
  '/open-car-shipping': 'src/pages/seo/OpenCarShipping.jsx',
  '/state-to-state-car-shipping': 'src/pages/seo/StateToState.jsx',
  '/massachusetts-car-shipping': 'src/pages/seo/locations/MassachusettsCarShipping.jsx',
  '/boston-car-shipping': 'src/pages/seo/locations/BostonCarShipping.jsx',
  '/newton-auto-transport': 'src/pages/seo/locations/NewtonAutoTransport.jsx',
  '/florida-car-shipping': 'src/pages/seo/locations/FloridaCarShipping.jsx',
  '/new-jersey-auto-transport': 'src/pages/seo/locations/NewJerseyAutoTransport.jsx',
  '/texas-auto-transport': 'src/pages/seo/locations/TexasAutoTransport.jsx',
  '/massachusetts-to-florida-car-shipping': 'src/pages/seo/routes/MassachusettsToFlorida.jsx',
  '/new-jersey-to-florida-car-shipping': 'src/pages/seo/routes/NewJerseyToFlorida.jsx',
  '/texas-to-newark-port-auto-transport': 'src/pages/seo/routes/TexasToNewark.jsx',
  '/chicago-to-port-newark-car-shipping': 'src/pages/seo/routes/ChicagoToNewark.jsx',
  '/auction-to-port-transport': 'src/pages/seo/routes/AuctionToPort.jsx',
  '/tesla-car-shipping': 'src/pages/seo/TeslaCarShipping.jsx',
  '/ev-auto-transport': 'src/pages/seo/EVAutoTransport.jsx',
  '/cybertruck-shipping': 'src/pages/seo/CybertruckShipping.jsx',
  '/electric-vehicle-port-delivery': 'src/pages/seo/ElectricVehiclePortDelivery.jsx',
  '/how-to-ship-a-car-bought-at-auction': 'src/pages/seo/guides/HowToShipAuctionCar.jsx',
  '/open-vs-enclosed-auto-transport': 'src/pages/seo/guides/OpenVsEnclosed.jsx',
  '/what-is-a-bill-of-lading': 'src/pages/seo/guides/BillOfLading.jsx',
  '/copart-storage-fees': 'src/pages/seo/guides/CopartStorageFees.jsx',
  '/copart-gate-pass-guide': 'src/pages/seo/guides/CopartGatePassGuide.jsx',
  '/copart-international-shipping': 'src/pages/seo/guides/CopartInternationalShipping.jsx',
  '/blog': 'src/pages/blog/BlogIndex.jsx',
  // Unique intl landing pages (distinct content, own components).
  '/pl/transport-z-usa': 'src/pages/intl/PolandHome.jsx',
  '/pl/transport-z-aukcji': 'src/pages/intl/PolandCopart.jsx',
  '/pl/wysylka-auta-z-usa': 'src/pages/intl/PolandShipMyCar.jsx',
  '/ua/import-z-usa': 'src/pages/intl/UkraineHome.jsx',
  '/ua/copart-ta-iaai': 'src/pages/intl/UkraineCopart.jsx',
  '/ua/dostavka-avto-z-usa': 'src/pages/intl/UkraineShipMyCar.jsx',
  '/ru/dostavka-avto-iz-usa': 'src/pages/intl/RussiaHome.jsx',
  '/ru/copart-i-iaai': 'src/pages/intl/RussiaCopart.jsx',
  '/ru/perevozka-avto': 'src/pages/intl/RussiaShipMyCar.jsx',
};

const blogBySlug = new Map(articles.map((a) => [a.slug, a]));

function lastmodFor(path) {
  // Blog articles — real per-article date from the data SSOT.
  const blog = path.match(/^\/blog\/(.+)$/);
  if (blog) {
    const a = blogBySlug.get(blog[1]);
    if (a?.dateISO) return a.dateISO;
  }
  // Resolve the backing source file (ports share portData.js; locale variants
  // share their English component).
  let file;
  if (/^(\/(ua|pl|ru))?\/ports\//.test(path)) {
    file = 'src/pages/ports/portData.js';
  } else {
    const base = path.replace(/^\/(ua|pl|ru)(?=\/|$)/, '') || '/';
    file = PAGE_SOURCE[path] || PAGE_SOURCE[base];
  }

  if (GIT_OK && file) {
    const d = gitDate(file);
    if (d) {
      manifest[path] = d;
      return d;
    }
  }
  if (manifest[path]) return manifest[path];
  manifest[path] = BUILD_DATE;
  return BUILD_DATE;
}

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
  // SEO-FND-T04: /blog/outbox-pattern-dispatch is noindex,follow (off-topic
  // software-engineering article) — excluded from the sitemap so it only lists
  // indexable URLs. The route still prerenders + serves, just with noindex.
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
    `    <lastmod>${lastmodFor(loc)}</lastmod>`,
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
    `    <lastmod>${lastmodFor(path)}</lastmod>`,
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

// SEO-FND-T05: persist resolved per-URL dates so the git-less Docker build can
// read them back (sorted keys for stable, review-friendly diffs).
const sortedManifest = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
writeFileSync(MANIFEST_FILE, JSON.stringify(sortedManifest, null, 2) + '\n', 'utf-8');

const total = (xml.match(/<url>/g) || []).length;
const alt = (xml.match(/xhtml:link/g) || []).length;
console.log(`[generateSitemap] wrote ${OUT_FILE}`);
console.log(`  Total <url> entries: ${total}`);
console.log(`  Total xhtml:link alternates: ${alt}`);
console.log(`  lastmod source: ${GIT_OK ? 'git commit dates' : 'manifest/build-date fallback (no git)'}`);
console.log(`  Manifest entries: ${Object.keys(sortedManifest).length} -> ${MANIFEST_FILE}`);
const groupCount = TRANSLATABLE_PATHS.length + PORT_GROUPS.length;
console.log(`  Translated URL groups: ${groupCount} (× 4 locales × 5 alternates = ${groupCount * 4 * 5})`);
