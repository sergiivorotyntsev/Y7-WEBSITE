// server.js
// Express static server for Y7-WEBSITE with legacy diaspora URL redirects.
// Replaces http-server to enable server-side 301 redirects.
//
// Legacy redirects (from Sprint 5 refactor):
//   /pl-us/*  -> /pl/*
//   /ua-us/*  -> /ua/*
//   /ru-us/*  -> /ru/*
//
// These were the pre-refactor diaspora routes. They now redirect to the merged
// 4-language structure (EN/PL/UA/RU). Handled server-side so crawlers see real 301.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// ---------------------------------------------------------------------------
// Legacy diaspora redirects (9 rules, all 301 permanent)
// ---------------------------------------------------------------------------
// Order matters: exact root matches first, then wildcard sub-path matches.
// Each redirect preserves query string via req.originalUrl parsing.

const LEGACY_REDIRECTS = [
  // Legacy Wix URLs (still indexed by Google) — server-side 301 so crawlers follow.
  // NOTE: /blog redirect removed — blog section now active (BLOG sprint April 2026)
  { from: '/global-sourcing',         to: '/services' },
  { from: '/careers',                 to: '/' },
  { from: '/privacy-policy',          to: '/privacy' },
  { from: '/terms-and-conditions',    to: '/terms' },
  { from: '/accessibility-statement', to: '/accessibility' },
  // Legacy diaspora URLs (pre-Sprint 5 refactor).
  { from: '/pl-us',                   to: '/pl' },
  { from: '/pl-us/copart-shipping',   to: '/pl/transport-z-aukcji' },
  { from: '/pl-us/ship-my-car',       to: '/pl/ship-my-car' },
  { from: '/ua-us',                   to: '/ua' },
  { from: '/ua-us/copart-shipping',   to: '/ua/copart-ta-iaai' },
  { from: '/ua-us/ship-my-car',       to: '/ua/ship-my-car' },
  { from: '/ru-us',                   to: '/ru' },
  { from: '/ru-us/copart-shipping',   to: '/ru/copart-i-iaai' },
  { from: '/ru-us/ship-my-car',       to: '/ru/ship-my-car' },
  // SEO-ARCH (Sprint April 2026): old /{lang}/copart-shipping URLs now
  // map to the new unique native-slug intl landing pages.
  { from: '/ua/copart-shipping',      to: '/ua/copart-ta-iaai' },
  { from: '/pl/copart-shipping',      to: '/pl/transport-z-aukcji' },
  { from: '/ru/copart-shipping',      to: '/ru/copart-i-iaai' },
];

for (const { from, to } of LEGACY_REDIRECTS) {
  app.get(from, (req, res) => {
    const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    res.redirect(301, to + qs);
  });
}

// Catch-all sub-path redirects for legacy prefixes.
// Example: /pl-us/anything-not-listed-above -> /pl/anything-not-listed-above
// This is defensive: if someone linked to a diaspora URL we didn't enumerate,
// they still land on the right language root area.
app.get(/^\/pl-us(\/.*)?$/, (req, res) => {
  const suffix = req.params[0] || '';
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(301, '/pl' + suffix + qs);
});
app.get(/^\/ua-us(\/.*)?$/, (req, res) => {
  const suffix = req.params[0] || '';
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(301, '/ua' + suffix + qs);
});
app.get(/^\/ru-us(\/.*)?$/, (req, res) => {
  const suffix = req.params[0] || '';
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(301, '/ru' + suffix + qs);
});

// ---------------------------------------------------------------------------
// Cache headers (mirrors old serve.json policy)
// ---------------------------------------------------------------------------
// - HTML: no cache (prerendered pages may update between deploys)
// - JS/CSS/fonts: immutable 1 year (vite adds content hashes)
// - Images: 1 week
app.use((req, res, next) => {
  const url = req.url.split('?')[0];
  if (url.endsWith('.html') || url === '/' || !path.extname(url)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else if (/\.(js|css|woff|woff2)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(svg|jpg|jpeg|png|webp|avif|ico)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=604800');
  }
  next();
});

// ---------------------------------------------------------------------------
// Serve prerendered directory pages without 301 redirect
// ---------------------------------------------------------------------------
// express.static redirects /pl to /pl/ (301) when dist/pl/ is a directory.
// http-server served index.html directly. This middleware does the same.
app.use((req, res, next) => {
  if ((req.method !== 'GET' && req.method !== 'HEAD') || path.extname(req.path) || req.path.endsWith('/')) return next();
  const indexPath = path.join(DIST_DIR, req.path, 'index.html');
  if (existsSync(indexPath)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.sendFile(indexPath);
  }
  next();
});

// ---------------------------------------------------------------------------
// Static files (prerendered HTML + assets from dist/)
// ---------------------------------------------------------------------------
app.use(
  express.static(DIST_DIR, {
    extensions: ['html'],
    index: 'index.html',
    redirect: false,
  })
);

// ---------------------------------------------------------------------------
// SPA fallback: any unmatched route returns index.html, React Router takes over
// ---------------------------------------------------------------------------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Y7-WEBSITE server listening on port ${PORT}`);
  console.log(`Serving: ${DIST_DIR}`);
  console.log(`Legacy redirects: ${LEGACY_REDIRECTS.length} exact + 3 wildcard fallbacks`);
});
