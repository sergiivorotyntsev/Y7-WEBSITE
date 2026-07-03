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
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// ---------------------------------------------------------------------------
// Security headers (SEC-H01) — first middleware, so every response (pages,
// assets, 301 redirects, 404s) carries them. Cloudflare currently sets none.
// ---------------------------------------------------------------------------
// - nosniff / X-Frame-Options: SAMEORIGIN / Referrer-Policy / HSTS on all responses.
// - HSTS: NO preload (hard to reverse); includeSubDomains is safe — www.y7agency.com
//   has no child subdomains (HSTS scopes to the setting host's subtree, not siblings).
// - Permissions-Policy omits `payment`: no Stripe/PaymentRequest on the marketing
//   site today, and we don't want to block a future customer-payment integration.
// - A full CSP is deferred (a missed source breaks the SPA); X-Frame-Options covers
//   clickjacking until a Report-Only CSP is rolled out later.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  next();
});

// ---------------------------------------------------------------------------
// Legacy diaspora redirects (9 rules, all 301 permanent)
// ---------------------------------------------------------------------------
// Order matters: exact root matches first, then wildcard sub-path matches.
// Each redirect preserves query string via req.originalUrl parsing.

const LEGACY_REDIRECTS = [
  // Legacy Wix URLs (still indexed by Google) — server-side 301 so crawlers follow.
  // NOTE: /blog redirect removed — blog section now active (BLOG sprint April 2026)
  { from: '/global-sourcing',         to: '/services' },
  // CAREERS-T05: /careers converted from legacy redirect to a React page
  // (carrier recruiting funnel). Removed redirect so SPA handles it.
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
// SEO-FND-T03: retire the legacy Ukrainian /uk/ prefix.
// The canonical Ukrainian prefix is now /ua/ (country-style segment). Old /uk/*
// URLs (e.g. /uk/about) are still indexed by Google and currently dead-end as
// 404s. Single-hop 301 /uk -> /ua and /uk/* -> /ua/* recovers their link equity
// and impressions; the /ua equivalent exists for the translatable pages, and any
// non-existent tail lands as a normal 404 (single hop, no chain). Query string
// preserved for parity with the diaspora rules above.
app.get(/^\/uk(\/.*)?$/, (req, res) => {
  const suffix = req.params[0] || '';
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(301, '/ua' + suffix + qs);
});

// ---------------------------------------------------------------------------
// HOTFIX-CONFIRM404-T02: /en/ quote-action links from already-sent emails.
// English lives at root ('en' is not a locale prefix), but every quote email
// sent before this fix carries /en/quote/confirm/{id}?token=... — redirect to
// the canonical unprefixed form (302: the /en/ form is not a page of its own,
// and we don't want the temporary mapping cached permanently). Query string
// (the confirm token) is preserved.
// ---------------------------------------------------------------------------
app.get(/^\/en\/(quote\/[^/]+\/[^/]+)$/, (req, res) => {
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(302, '/' + req.params[0] + qs);
});

// ---------------------------------------------------------------------------
// Cache headers (WEB-CACHE-RESILIENCE-T01)
// ---------------------------------------------------------------------------
// - HTML: no-cache => store but ALWAYS revalidate (ETag -> cheap 304). A browser
//   can never run a STALE index.html against a newer asset set — the root cause
//   of the 2026-06-05 chunk-load reload-loop incident. (We use `no-cache` rather
//   than `no-store` so the cheap ETag 304 still applies; revalidation is mandatory
//   either way, so it is never served stale.)
// - Everything under /assets/ is content-hashed by vite — images included — so
//   it is immutable by contract: 1 year (PSIFIX-T04; previously only js/css/
//   fonts got the long TTL and hashed images fell into the 1h bucket).
// - JS/CSS/fonts outside /assets/ (e.g. /fonts/*): same immutable 1 year —
//   the font files are versioned by filename and effectively never change.
// - Root static site-chrome (favicon, og images): 14 days (PSIFIX-T04; was 1h,
//   flagged by PSI "efficient cache lifetimes"). NOTE: Cloudflare's "Browser
//   Cache TTL" currently floors/overrides origin values (favicon served with
//   max-age=14400 while origin said 3600) — it must be set to "Respect
//   Existing Headers" in the CF dashboard for this header to reach browsers.
// - robots.txt / sitemap.xml: crawler-facing, keep the fresh-ish 1h.
app.use((req, res, next) => {
  const url = req.url.split('?')[0];
  if (url.endsWith('.html') || url === '/' || !path.extname(url)) {
    res.setHeader('Cache-Control', 'no-cache');
  } else if (url.startsWith('/assets/') || /\.(js|css|woff|woff2)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(svg|jpg|jpeg|png|webp|avif|ico)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=1209600');
  } else if (/\.(txt|xml)$/.test(url)) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
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
    res.setHeader('Cache-Control', 'no-cache');
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
// OVERNIGHT-T01: Proper 404 for unknown paths
// Prerender emits dist/valid-routes.json (list of every route React prerendered)
// and dist/404.html (prerendered NotFound page). Known routes return 200 +
// index.html; unknown routes return 404 + 404.html so Google sees a real
// not-found response instead of a soft 404.
// ---------------------------------------------------------------------------
let VALID_ROUTES = new Set();
try {
  const routesPath = path.join(DIST_DIR, 'valid-routes.json');
  if (existsSync(routesPath)) {
    VALID_ROUTES = new Set(JSON.parse(readFileSync(routesPath, 'utf8')));
  }
} catch (e) {
  console.warn('[server] could not load valid-routes.json:', e.message);
}

function isKnownPath(reqPath) {
  const p = reqPath.replace(/\/$/, '') || '/';

  // PORTAL-LAZY-FIX: SPA-only routes (auth-gated or parameterized).
  // These are valid React Router paths that are intentionally excluded
  // from prerendering because they require runtime auth state or
  // dynamic params that cannot be resolved at build time. Without this
  // whitelist, OVERNIGHT-T01 strict 404 handler returns 404 on direct
  // URL access (bookmarks, email links, copy-paste, social shares),
  // breaking deep-linking for authenticated users.
  //
  // Strip optional lang prefix (pl/ua/ru) before namespace check so
  // localized variants like /pl/agreement/:id are also recognized.
  const normalized = p.replace(/^\/(pl|ua|ru)/, '') || '/';
  const SPA_NAMESPACES = ['/portal', '/agreement', '/promo', '/review'];
  if (SPA_NAMESPACES.some(prefix =>
      normalized === prefix || normalized.startsWith(prefix + '/'))) {
    return true;
  }

  // [/:lang]/quote/:action/:orderId — parameterized quote action, localized OR
  // unprefixed English (HOTFIX-CONFIRM404-T02: quote emails link the unprefixed
  // form; /en/ arrives here only if the 302 above is bypassed). Only matches the
  // action+orderId form, NOT bare /quote or /:lang/quote (prerendered).
  if (/^\/((pl|ua|ru)\/)?quote\/[^/]+\/[^/]+$/.test(p)) return true;

  if (VALID_ROUTES.has(p) || VALID_ROUTES.has(p + '/')) return true;
  // Filesystem check for any prerendered directory (covers edge cases).
  if (existsSync(path.join(DIST_DIR, p, 'index.html'))) return true;
  return false;
}

app.get(/.*/, (req, res) => {
  if (isKnownPath(req.path)) {
    // SEO-FND-T01: never serve the generic SPA shell (Home's <head>) to a route
    // that has its OWN prerendered HTML. The directory middleware above already
    // serves dist/<path>/index.html when present; this is defense-in-depth so a
    // prerendered page (e.g. /blog/:slug) can never fall through to Home's
    // index.html and inherit its canonical=/ + Home <title>.
    const ownIndex = path.join(DIST_DIR, req.path, 'index.html');
    if (!path.extname(req.path) && existsSync(ownIndex)) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(ownIndex);
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
    return;
  }
  const notFoundFile = path.join(DIST_DIR, '404.html');
  if (existsSync(notFoundFile)) {
    res.status(404).sendFile(notFoundFile);
  } else {
    res.status(404).sendFile(path.join(DIST_DIR, 'index.html'));
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Y7-WEBSITE server listening on port ${PORT}`);
  console.log(`Serving: ${DIST_DIR}`);
  console.log(`Legacy redirects: ${LEGACY_REDIRECTS.length} exact + 3 wildcard fallbacks`);
});
