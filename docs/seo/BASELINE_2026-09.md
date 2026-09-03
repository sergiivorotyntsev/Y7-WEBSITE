# Y7 Logistics SEO/GEO Baseline

**Audit date:** 2026-09-02  
**Repository:** `Y7-WEBSITE`  
**Commit audited:** `a9ea55dad2db952cae6d81447a76fd51424d1a9f` (`main`, aligned with `origin/main` at preflight)  
**Production origin:** `https://www.y7agency.com`  
**Scope:** CODEX-01 only, read-only inventory and measurement  
**State-changing remediation:** none

## 0. Executive baseline

### Verified facts

1. The production sitemap has 138 URLs and every one is included in the 143-route prerender registry. The audited build produced all 143 HTML files, with no missing file, no file below 20 KB, and `143 OK, 0 failed`.
2. The four route registries do not have equal scope, but no sitemap-to-prerender indexing defect was found. `src/App.jsx` includes public, private, redirect, and dynamic routes; `PUBLIC_ROUTES` is the finite prerender inventory; the sitemap excludes five intentional `noindex`/utility prerenders; the SEO snapshot harness samples only 11 routes.
3. The highest-confidence live indexing defect is the private SPA fallback. Representative `/portal/*`, `/agreement/*`, `/review/*`, and localized quote-action URLs return HTTP 200 with the home shell, `canonical=/`, and `robots=index, follow`. `robots.txt` disallows several of those paths, but a crawl disallow is not a noindex control.
4. Slashless and trailing-slash versions both return 200. Canonicals on prerendered public pages point to the slashless URL, but the server does not redirect `/x/` to `/x`.
5. The tested unknown path returns a real HTTP 404; no soft-404 was observed in the live matrix.
6. The runtime entity graph is materially cleaner than the historical documentation: the root Organization/LocalBusiness node uses `Y7 Logistics`, legal name `Y7 Consulting Inc`, and `6 Harding Rd, Natick, MA 01760`. No runtime `02458` occurrence was found. Newton is represented as a service area, not the headquarters.
7. One runtime legal-name defect remains: `src/pages/ports/PortPage.jsx:254` renders `Y7 Logistics LLC`.
8. Pricing is audience-specific in runtime copy, but it conflicts with the current operational rule. Individual pricing is consistently represented as the greater of `$75` or `10%` of carrier price. Multiple public surfaces still state `$60 when Y7 handles carrier payment` for dealers/exporters, and `MoneyPageSchema` publishes `$50-$60`, while the current project rule is a flat `$50 per vehicle` for dealers/exporters.
9. Built HTML contains 143 LocalBusiness nodes, 123 BreadcrumbList nodes, 54 Service nodes, 58 FAQPage nodes, one JobPosting, one CollectionPage, and 18 BlogPosting nodes. No `aggregateRating` was found. All 74 Service/Job/Collection/Blog nodes reference `#organization`; BreadcrumbList and FAQPage nodes do not.
10. The static generic Twitter description is not present on most pages, but it survives on eight built pages.
11. CI builds and checks the expected sitemap/prerender counts, but does not run lint, unit tests, or `seo:check`. The current lint run fails with 7 errors, and `seo:check` reports stale snapshots for all 11 sampled routes.
12. The sitemap generator mutates two tracked files during a normal build because 87 stored last-modified entries are stale. The audit restored those build side effects; this is a reproducibility/dirty-tree risk, not a change delivered by CODEX-01.
13. Five built pages contain 23 literal Unicode escape strings such as `\u2019` in rendered HTML, rather than the intended punctuation.

### Prioritized evidence, not remediation

| Priority | Baseline finding | Evidence | Risk |
|---|---|---|---|
| P0 | Private/dynamic namespaces can emit indexable home-shell HTML | Live 200 responses and server fallback behavior; representative paths have `index, follow` and canonical `/` | Index pollution, duplicate/canonical confusion, login/transaction URLs entering crawl queues |
| P0 | Public dealer/exporter pricing contradicts the current flat `$50` rule | `MoneyPageSchema`, FAQ locales, and SEO pages publish a conditional `$60` fee | Financial and trust accuracy; structured-data inconsistency |
| P1 | Both `/x` and `/x/` are 200 | 50-request live HTTP matrix | Duplicate URL surface and diluted crawl signals |
| P1 | Runtime legal suffix `Y7 Logistics LLC` | `src/pages/ports/PortPage.jsx:254` | Entity reconciliation error across search and AI systems |
| P1 | SEO regression harness is stale and non-blocking | `npm run seo:check` reports 22 changes; workflow does not call it | Regressions can merge without detection |
| P1 | Lint is red | 7 errors and 28 warnings | Existing correctness defect includes undefined `orderId` in portal code |
| P2 | Build rewrites tracked lastmod data | 87 URL date entries changed during the successful build | Non-reproducible builds and unrelated diffs |
| P2 | Generic Twitter description survives on eight routes | Built-head extraction | Weak social previews on affected pages |
| P2 | Literal Unicode escape strings in five built pages | 23 rendered occurrences of `\u2013`, `\u2014`, `\u2019`, `\u201c`, or `\u201d` | Visible copy corruption and lower extraction quality |
| P2 | CI/local/runtime Node versions drift | CI 20, Docker 22, audit machine 24.14.1 | Environment-specific build behavior |

## 1. Stack, versions, and npm scripts

### Resolved versions

| Item | Declared in project | Resolved/audited value |
|---|---|---|
| Local Node.js | not pinned in `package.json` | `v24.14.1` |
| Local npm | not pinned in `package.json` | `11.11.0` |
| React | `^19.2.4` | `19.2.6` |
| React Router DOM | `^7.13.2` | `7.15.0` |
| Vite | `^8.0.1` | `8.0.12` |
| React Helmet Async | `^3.0.0` | `3.0.0` |
| i18next | `^26.0.3` | `26.1.0` |
| Express | `^5.2.1` | `5.2.1` |
| CI Node.js | workflow literal `20` | `20` |
| Docker build/runtime Node.js | Docker image `22-alpine` | `22-alpine` |

The package ranges are not all pinned to the installed versions; the table above is the resolved dependency state audited through `npm ls`.

### `package.json` scripts, verbatim

```json
{
  "dev": "vite",
  "prebuild": "node scripts/generateSitemap.js",
  "build": "vite build && node scripts/prerender.mjs",
  "build:no-prerender": "vite build",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "preview": "vite preview",
  "start": "node server.js",
  "seo:snapshot": "node scripts/seo-snapshot.mjs --write",
  "seo:check": "node scripts/seo-snapshot.mjs --check"
}
```

## 2. React Router inventory

`src/App.jsx` contains 123 `<Route>` elements: 122 path declarations plus one pathless layout route. The 122 declarations comprise 112 literal path declarations and 10 locale-factory declarations; the factory expands across `ua`, `pl`, and `ru`, producing 30 registrations. Sixteen declarations are parameterized and unbounded, and one path is the `*` catch-all.

Most page modules are loaded through `lazyWithRetry`. Eager page modules are `Home`, `NotFound`, `Careers`, `CareerApplication`, and `AcceptInvitation`; routing wrappers such as `Layout`, `ProtectedRoute`, `LangGuard`, and redirect `Navigate` are also eager.

**Dynamic declarations:** `/promo/:code`, `/agreement/:orderId`, `/ports/:slug`, `/:lang/ports/:slug`, `/:lang/dealer-quote`, `/review/:token`, `/:lang/certificate-of-origin`, `/:lang/quote`, `/quote/:action/:orderId`, `/:lang/quote/:action/:orderId`, `/:lang/agreement/:orderId`, `/blog/:slug`, `/portal/magic/:token`, `/portal/order/:id`, `/portal/order/:id/dispatch-details`, `/portal/co/requests/:id`.

**Catch-all:** `* -> NotFound`.

### Exhaustive `<Route>` declaration table

Locale-factory declarations show all three effective paths. “Lazy” is derived from the actual `lazyWithRetry` declarations in `src/App.jsx`.

| Source line | Declared path | Effective path(s) | Page/redirect | Loading |
|---:|---|---|---|---|
| 183 | /daytonacargo | /daytonacargo | DaytonaCargoPage | lazyWithRetry |
| 184 | (pathless) | (layout wrapper) | Layout | eager |
| 186 | / | / | Home | eager |
| 187 | /services | /services | Services | lazyWithRetry |
| 188 | /dealers | /dealers | Dealers | lazyWithRetry |
| 189 | /exporters | /exporters | Exporters | lazyWithRetry |
| 190 | /ship-my-car | /ship-my-car | ShipMyCar | lazyWithRetry |
| 191 | /track | /track | Track | lazyWithRetry |
| 192 | /contact | /contact | Contact | lazyWithRetry |
| 193 | /faq | /faq | FAQ | lazyWithRetry |
| 194 | /about | /about | About | lazyWithRetry |
| 195 | /careers | /careers | Careers | eager |
| 196 | /careers/apply | /careers/apply | CareerApplication | eager |
| 201 | /${lang} | /ua<br>/pl<br>/ru | Home | eager |
| 202 | /${lang}/services | /ua/services<br>/pl/services<br>/ru/services | Services | lazyWithRetry |
| 203 | /${lang}/dealers | /ua/dealers<br>/pl/dealers<br>/ru/dealers | Dealers | lazyWithRetry |
| 204 | /${lang}/exporters | /ua/exporters<br>/pl/exporters<br>/ru/exporters | Exporters | lazyWithRetry |
| 205 | /${lang}/ship-my-car | /ua/ship-my-car<br>/pl/ship-my-car<br>/ru/ship-my-car | ShipMyCar | lazyWithRetry |
| 206 | /${lang}/track | /ua/track<br>/pl/track<br>/ru/track | Track | lazyWithRetry |
| 207 | /${lang}/contact | /ua/contact<br>/pl/contact<br>/ru/contact | Contact | lazyWithRetry |
| 208 | /${lang}/faq | /ua/faq<br>/pl/faq<br>/ru/faq | FAQ | lazyWithRetry |
| 209 | /${lang}/about | /ua/about<br>/pl/about<br>/ru/about | About | lazyWithRetry |
| 210 | /${lang}/quote | /ua/quote<br>/pl/quote<br>/ru/quote | Quote | lazyWithRetry |
| 212 | /privacy | /privacy | PrivacyPolicy | lazyWithRetry |
| 213 | /terms | /terms | Terms | lazyWithRetry |
| 214 | /accessibility | /accessibility | Accessibility | lazyWithRetry |
| 215 | /promo/:code | /promo/:code | PromoLanding | eager |
| 216 | /agreement | /agreement | Agreement | lazyWithRetry |
| 217 | /agreement/:orderId | /agreement/:orderId | Agreement | lazyWithRetry |
| 218 | /ports/:slug | /ports/:slug | PortPage | lazyWithRetry |
| 219 | /:lang/ports/:slug | /:lang/ports/:slug | PortPage | lazyWithRetry |
| 220 | /dealer-quote | /dealer-quote | DealerQuote | lazyWithRetry |
| 221 | /:lang/dealer-quote | /:lang/dealer-quote | DealerQuote | lazyWithRetry |
| 223 | /car-shipping-cost | /car-shipping-cost | CarShippingCost | lazyWithRetry |
| 224 | /enclosed-car-shipping | /enclosed-car-shipping | EnclosedCarShipping | lazyWithRetry |
| 225 | /auction-car-shipping | /auction-car-shipping | AuctionCarShipping | lazyWithRetry |
| 226 | /auction-transport-savings | /auction-transport-savings | AuctionTransportSavings | lazyWithRetry |
| 227 | /copart-shipping | /copart-shipping | CopartShipping | lazyWithRetry |
| 228 | /iaai-transport | /iaai-transport | IaaiTransport | lazyWithRetry |
| 229 | /manheim-transport | /manheim-transport | ManheimTransport | lazyWithRetry |
| 230 | /door-to-port-auto-transport | /door-to-port-auto-transport | DoorToPort | lazyWithRetry |
| 231 | /dealer-auto-transport | /dealer-auto-transport | DealerAutoTransport | lazyWithRetry |
| 232 | /salvage-car-shipping | /salvage-car-shipping | SalvageCarShipping | lazyWithRetry |
| 233 | /open-car-shipping | /open-car-shipping | OpenCarShipping | lazyWithRetry |
| 234 | /state-to-state-car-shipping | /state-to-state-car-shipping | StateToState | lazyWithRetry |
| 236 | /massachusetts-car-shipping | /massachusetts-car-shipping | MassachusettsCarShipping | lazyWithRetry |
| 237 | /boston-car-shipping | /boston-car-shipping | BostonCarShipping | lazyWithRetry |
| 238 | /newton-auto-transport | /newton-auto-transport | NewtonAutoTransport | lazyWithRetry |
| 239 | /florida-car-shipping | /florida-car-shipping | FloridaCarShipping | lazyWithRetry |
| 240 | /new-jersey-auto-transport | /new-jersey-auto-transport | NewJerseyAutoTransport | lazyWithRetry |
| 241 | /nj-export-warehouse-shipping-cost | /nj-export-warehouse-shipping-cost | NjExportWarehouseShippingCost | lazyWithRetry |
| 242 | /texas-auto-transport | /texas-auto-transport | TexasAutoTransport | lazyWithRetry |
| 244 | /massachusetts-to-florida-car-shipping | /massachusetts-to-florida-car-shipping | MassachusettsToFlorida | lazyWithRetry |
| 245 | /new-jersey-to-florida-car-shipping | /new-jersey-to-florida-car-shipping | NewJerseyToFlorida | lazyWithRetry |
| 246 | /texas-to-newark-port-auto-transport | /texas-to-newark-port-auto-transport | TexasToNewark | lazyWithRetry |
| 247 | /chicago-to-port-newark-car-shipping | /chicago-to-port-newark-car-shipping | ChicagoToNewark | lazyWithRetry |
| 248 | /auction-to-port-transport | /auction-to-port-transport | AuctionToPort | lazyWithRetry |
| 249 | /atlanta-to-savannah-port-auto-transport | /atlanta-to-savannah-port-auto-transport | AtlantaToSavannah | lazyWithRetry |
| 250 | /dallas-to-port-houston-auto-transport | /dallas-to-port-houston-auto-transport | DallasToHouston | lazyWithRetry |
| 251 | /florida-to-jacksonville-port-car-shipping | /florida-to-jacksonville-port-car-shipping | FloridaToJacksonville | lazyWithRetry |
| 253 | /tesla-car-shipping | /tesla-car-shipping | TeslaCarShipping | lazyWithRetry |
| 254 | /ev-auto-transport | /ev-auto-transport | EVAutoTransport | lazyWithRetry |
| 255 | /cybertruck-shipping | /cybertruck-shipping | CybertruckShipping | lazyWithRetry |
| 256 | /electric-vehicle-port-delivery | /electric-vehicle-port-delivery | ElectricVehiclePortDelivery | lazyWithRetry |
| 258 | /review/:token | /review/:token | ReviewSubmit | lazyWithRetry |
| 260 | /how-to-ship-a-car-bought-at-auction | /how-to-ship-a-car-bought-at-auction | HowToShipAuctionCar | lazyWithRetry |
| 261 | /open-vs-enclosed-auto-transport | /open-vs-enclosed-auto-transport | OpenVsEnclosed | lazyWithRetry |
| 262 | /what-is-a-bill-of-lading | /what-is-a-bill-of-lading | BillOfLading | lazyWithRetry |
| 263 | /copart-storage-fees | /copart-storage-fees | CopartStorageFees | lazyWithRetry |
| 264 | /copart-gate-pass-guide | /copart-gate-pass-guide | CopartGatePassGuide | lazyWithRetry |
| 265 | /copart-international-shipping | /copart-international-shipping | CopartInternationalShipping | lazyWithRetry |
| 266 | /certificate-of-origin | /certificate-of-origin | CertificateOfOrigin | lazyWithRetry |
| 267 | /:lang/certificate-of-origin | /:lang/certificate-of-origin | CertificateOfOrigin | lazyWithRetry |
| 268 | /quote | /quote | Quote | lazyWithRetry |
| 269 | /quote-verified | /quote-verified | QuoteVerified | lazyWithRetry |
| 270 | /quote-verification-failed | /quote-verification-failed | QuoteVerificationFailed | lazyWithRetry |
| 271 | /:lang/quote | /:lang/quote | Quote | lazyWithRetry |
| 275 | /quote/:action/:orderId | /quote/:action/:orderId | QuoteAction | lazyWithRetry |
| 276 | /:lang/quote/:action/:orderId | /:lang/quote/:action/:orderId | QuoteAction | lazyWithRetry |
| 277 | /:lang/agreement/:orderId | /:lang/agreement/:orderId | Agreement | lazyWithRetry |
| 279 | /blog | /blog | BlogIndex | lazyWithRetry |
| 280 | /blog/:slug | /blog/:slug | BlogArticle | lazyWithRetry |
| 282 | /portal/login | /portal/login | Login | lazyWithRetry |
| 285 | /portal/accept-invitation | /portal/accept-invitation | AcceptInvitation | eager |
| 286 | /portal/register | /portal/register | RegisterRedirect | eager |
| 289 | /portal/magic/:token | /portal/magic/:token | MagicLogin | lazyWithRetry |
| 291 | /portal/dashboard | /portal/dashboard | Dashboard | lazyWithRetry |
| 292 | /portal/order/:id | /portal/order/:id | OrderDetail | lazyWithRetry |
| 293 | /portal/order/:id/dispatch-details | /portal/order/:id/dispatch-details | DispatchDetails | lazyWithRetry |
| 294 | /portal/new-order | /portal/new-order | NewOrder | lazyWithRetry |
| 295 | /portal/billing | /portal/billing | Billing | lazyWithRetry |
| 296 | /portal/locations/setup | /portal/locations/setup | LocationSetup | lazyWithRetry |
| 297 | /portal/locations | /portal/locations | Locations | lazyWithRetry |
| 298 | /portal/application | /portal/application | DealerApplication | lazyWithRetry |
| 299 | /portal/profile | /portal/profile | Profile | lazyWithRetry |
| 302 | /portal/onboarding | /portal/onboarding | Onboarding | lazyWithRetry |
| 306 | /portal/co | /portal/co | CoRequests | lazyWithRetry |
| 307 | /portal/co/companies | /portal/co/companies | CoCompanies | lazyWithRetry |
| 308 | /portal/co/requests/:id | /portal/co/requests/:id | CoRequestDetail | lazyWithRetry |
| 309 | /portal/co/start | /portal/co/start | CoStart | lazyWithRetry |
| 312 | /pl/transport-z-usa | /pl/transport-z-usa | PolandHome | lazyWithRetry |
| 313 | /pl/transport-z-aukcji | /pl/transport-z-aukcji | PolandCopart | lazyWithRetry |
| 314 | /pl/wysylka-auta-z-usa | /pl/wysylka-auta-z-usa | PolandShipMyCar | lazyWithRetry |
| 315 | /ua/import-z-usa | /ua/import-z-usa | UkraineHome | lazyWithRetry |
| 316 | /ua/copart-ta-iaai | /ua/copart-ta-iaai | UkraineCopart | lazyWithRetry |
| 317 | /ua/dostavka-avto-z-usa | /ua/dostavka-avto-z-usa | UkraineShipMyCar | lazyWithRetry |
| 318 | /ru/dostavka-avto-iz-usa | /ru/dostavka-avto-iz-usa | RussiaHome | lazyWithRetry |
| 319 | /ru/copart-i-iaai | /ru/copart-i-iaai | RussiaCopart | lazyWithRetry |
| 320 | /ru/perevozka-avto | /ru/perevozka-avto | RussiaShipMyCar | lazyWithRetry |
| 325 | /pl/copart-shipping | /pl/copart-shipping | Navigate to /pl/transport-z-aukcji | redirect (eager) |
| 326 | /ua/copart-shipping | /ua/copart-shipping | Navigate to /ua/copart-ta-iaai | redirect (eager) |
| 327 | /ru/copart-shipping | /ru/copart-shipping | Navigate to /ru/copart-i-iaai | redirect (eager) |
| 328 | /pl-us | /pl-us | Navigate to /pl | redirect (eager) |
| 329 | /pl-us/copart-shipping | /pl-us/copart-shipping | Navigate to /pl/transport-z-aukcji | redirect (eager) |
| 330 | /pl-us/ship-my-car | /pl-us/ship-my-car | Navigate to /pl/ship-my-car | redirect (eager) |
| 331 | /ua-us | /ua-us | Navigate to /ua | redirect (eager) |
| 332 | /ua-us/copart-shipping | /ua-us/copart-shipping | Navigate to /ua/copart-ta-iaai | redirect (eager) |
| 333 | /ua-us/ship-my-car | /ua-us/ship-my-car | Navigate to /ua/ship-my-car | redirect (eager) |
| 334 | /ru-us | /ru-us | Navigate to /ru | redirect (eager) |
| 335 | /ru-us/copart-shipping | /ru-us/copart-shipping | Navigate to /ru/copart-i-iaai | redirect (eager) |
| 336 | /ru-us/ship-my-car | /ru-us/ship-my-car | Navigate to /ru/ship-my-car | redirect (eager) |
| 338 | /404 | /404 | NotFound | eager |
| 339 | * | * | NotFound | eager |

## 3. Prerender system and readiness

`scripts/prerender.mjs` defines 143 exact `PUBLIC_ROUTES`; `SKIP_PATTERNS` is empty. The successful audit build prerendered all 143 routes.

The readiness sequence is:

1. wait for `DOMContentLoaded`;
2. wait 800 ms;
3. wait up to 5 seconds for `document.__PRERENDER_READY` or the `prerender-ready` event;
4. wait up to 5 seconds for a Helmet-managed head tag;
5. wait two animation frames;
6. wait up to 5 seconds for the canonical pathname to match the route; a miss is non-fatal.

`App` sets the prerender-ready signal from a React effect. The script writes route HTML, `dist/valid-routes.json`, and the 404 artifact. It reported `143 OK, 0 failed` in 877.5 seconds. Every entry in `valid-routes.json` had a corresponding HTML file, and no snapshot was below 20 KB.

## 4. Hosting and serving configuration

The production image uses a Node 22 Alpine multi-stage Docker build. It runs `npm ci`, `npm run build`, installs production dependencies in the runtime stage, exposes port 3000, and launches `node server.js`. Railway uses the Dockerfile builder, health path `/`, a 900-second health timeout, and `ON_FAILURE` restart behavior.

The Express server serves `dist` with `redirect: false`, applies explicit legacy redirects, and uses `dist/valid-routes.json` plus dynamic namespace rules to decide whether to serve a prerender file, the SPA shell, or a strict 404. There is no trailing-slash normalization middleware. Private/dynamic routes that are allowed as SPA routes therefore receive `dist/index.html` before client-side routing.

### Dockerfile, verbatim

```dockerfile
FROM node:22-alpine AS build
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=https://dispatch.y7agency.com
ENV VITE_API_URL=$VITE_API_URL

# GA4 measurement ID — injected by Railway at build time
ARG VITE_GA4_MEASUREMENT_ID
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID

RUN npm run build

FROM node:22-alpine
WORKDIR /app

# Copy package files and install ONLY production deps (including express)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy prerendered dist and server
COPY --from=build /app/dist ./dist
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
```

### `railway.toml`, verbatim

```toml
[build]
builder = "dockerfile"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 900
restartPolicyType = "on_failure"
```

### `server.js`, verbatim

```javascript
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
// [WEBFIX2-T01] Retire the phantom /en/ prefix, generally.
// English lives at root; /en was never a route. The sitemap emitted
// hreflang="en" alternates at /en, /en/quote, /en/faq until 8ce9c87 [S5R-16]
// (2026-04-06) and Google still requests /en/, /en/ports/houston,
// /en/ports/baltimore (GSC, last crawled May 2026) - 404 today. One rule,
// not a list: /en -> / and /en/<anything> -> /<anything>, 301, query kept.
// ORDER MATTERS: the 302 for /en/quote/<action>/<id> above must stay above
// this block; Express matches in registration order and this pattern would
// otherwise swallow it with a 301 (and a chain).
// ---------------------------------------------------------------------------
app.get(/^\/en(\/.*)?$/, (req, res) => {
  const suffix = req.params[0] || '';
  const qs = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  res.redirect(301, (suffix || '/') + qs);
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
```

**Exact runtime command:** `node server.js`.

## 5. Cross-registry route reconciliation

| Registry | Measured scope |
|---|---:|
| `<Route>` elements | 123 |
| Path declarations | 122 |
| Finite non-dynamic App registrations after locale expansion | 125 |
| Dynamic declarations | 16 |
| Catch-all declarations | 1 |
| Prerender routes | 143 |
| Sitemap URLs | 138 |
| SEO snapshot routes | 11 |

### Reconciliation results

- **Sitemap -> prerender:** complete. All 138 sitemap URLs are prerendered.
- **Prerender but not sitemap:** exactly five routes: `/quote-verified`, `/quote-verification-failed`, `/daytonacargo`, `/blog/outbox-pattern-dispatch`, `/404`. All five are intentional noindex/utility surfaces in built output.
- **Snapshot harness:** its 11 routes are all prerendered, but it omits 132 prerender routes.
- **App exact finite routes not prerendered:** 27. These are private/application routes and legacy redirects, listed below.
- **Prerender routes matched through dynamic declarations:** 45: six English port pages, eighteen English blog articles, three localized certificate pages, and eighteen localized port pages.

**Exact App routes not prerendered:** `/agreement`, `/portal/login`, `/portal/accept-invitation`, `/portal/register`, `/portal/dashboard`, `/portal/new-order`, `/portal/billing`, `/portal/locations/setup`, `/portal/locations`, `/portal/application`, `/portal/profile`, `/portal/onboarding`, `/portal/co`, `/portal/co/companies`, `/portal/co/start`, `/pl/copart-shipping`, `/ua/copart-shipping`, `/ru/copart-shipping`, `/pl-us`, `/pl-us/copart-shipping`, `/pl-us/ship-my-car`, `/ua-us`, `/ua-us/copart-shipping`, `/ua-us/ship-my-car`, `/ru-us`, `/ru-us/copart-shipping`, `/ru-us/ship-my-car`.

**Snapshot harness routes:** `/`, `/services`, `/exporters`, `/ports/newark`, `/new-jersey-auto-transport`, `/nj-export-warehouse-shipping-cost`, `/auction-to-port-transport`, `/door-to-port-auto-transport`, `/texas-to-newark-port-auto-transport`, `/chicago-to-port-newark-car-shipping`, `/new-jersey-to-florida-car-shipping`.

**Conclusion:** the counts are intentionally different and not by themselves a defect. The live defect is the combination of broad SPA fallback behavior and missing server-level noindex/canonical handling for private/dynamic namespaces.

### Exhaustive finite registry membership matrix

The union contains 170 concrete paths. Dynamic declarations are inherently unbounded and are listed in the routing section; where a concrete prerender/sitemap URL is covered by one, this table names the matching pattern.

| Concrete route | App coverage | Prerender | Sitemap | SEO snapshot |
|---|---|---:|---:|---:|
| / | exact | yes | yes | yes |
| /404 | exact | yes | — | — |
| /about | exact | yes | yes | — |
| /accessibility | exact | yes | yes | — |
| /agreement | exact | — | — | — |
| /atlanta-to-savannah-port-auto-transport | exact | yes | yes | — |
| /auction-car-shipping | exact | yes | yes | — |
| /auction-to-port-transport | exact | yes | yes | yes |
| /auction-transport-savings | exact | yes | yes | — |
| /blog | exact | yes | yes | — |
| /blog/75000-bond-claims-guide | dynamic /blog/:slug | yes | yes | — |
| /blog/auction-to-port-cost-breakdown-2026 | dynamic /blog/:slug | yes | yes | — |
| /blog/bill-of-lading-pickup-delivery-guide | dynamic /blog/:slug | yes | yes | — |
| /blog/carrier-coi-verification-guide | dynamic /blog/:slug | yes | yes | — |
| /blog/carrier-who-vanished | dynamic /blog/:slug | yes | yes | — |
| /blog/central-dispatch-listing-decoded | dynamic /blog/:slug | yes | yes | — |
| /blog/copart-for-international-buyers-complete-guide | dynamic /blog/:slug | yes | yes | — |
| /blog/copart-iaa-manheim-comparison | dynamic /blog/:slug | yes | yes | — |
| /blog/copart-storage-fees-real-cost-2026 | dynamic /blog/:slug | yes | yes | — |
| /blog/dealer-auction-pickup-guide | dynamic /blog/:slug | yes | yes | — |
| /blog/enclosed-transport-when-to-skip | dynamic /blog/:slug | yes | yes | — |
| /blog/exporter-documentation-checklist | dynamic /blog/:slug | yes | yes | — |
| /blog/fmcsa-2026-new-rules | dynamic /blog/:slug | yes | yes | — |
| /blog/fmcsa-broker-recordkeeping-2026 | dynamic /blog/:slug | yes | yes | — |
| /blog/non-running-vehicle-shipping-playbook | dynamic /blog/:slug | yes | yes | — |
| /blog/outbox-pattern-dispatch | dynamic /blog/:slug | yes | — | — |
| /blog/port-specific-export-newark-houston-savannah | dynamic /blog/:slug | yes | yes | — |
| /blog/winter-auto-transport-pricing | dynamic /blog/:slug | yes | yes | — |
| /boston-car-shipping | exact | yes | yes | — |
| /car-shipping-cost | exact | yes | yes | — |
| /careers | exact | yes | yes | — |
| /careers/apply | exact | yes | yes | — |
| /certificate-of-origin | exact | yes | yes | — |
| /chicago-to-port-newark-car-shipping | exact | yes | yes | yes |
| /contact | exact | yes | yes | — |
| /copart-gate-pass-guide | exact | yes | yes | — |
| /copart-international-shipping | exact | yes | yes | — |
| /copart-shipping | exact | yes | yes | — |
| /copart-storage-fees | exact | yes | yes | — |
| /cybertruck-shipping | exact | yes | yes | — |
| /dallas-to-port-houston-auto-transport | exact | yes | yes | — |
| /daytonacargo | exact | yes | — | — |
| /dealer-auto-transport | exact | yes | yes | — |
| /dealer-quote | exact | yes | yes | — |
| /dealers | exact | yes | yes | — |
| /door-to-port-auto-transport | exact | yes | yes | yes |
| /electric-vehicle-port-delivery | exact | yes | yes | — |
| /enclosed-car-shipping | exact | yes | yes | — |
| /ev-auto-transport | exact | yes | yes | — |
| /exporters | exact | yes | yes | yes |
| /faq | exact | yes | yes | — |
| /florida-car-shipping | exact | yes | yes | — |
| /florida-to-jacksonville-port-car-shipping | exact | yes | yes | — |
| /how-to-ship-a-car-bought-at-auction | exact | yes | yes | — |
| /iaai-transport | exact | yes | yes | — |
| /manheim-transport | exact | yes | yes | — |
| /massachusetts-car-shipping | exact | yes | yes | — |
| /massachusetts-to-florida-car-shipping | exact | yes | yes | — |
| /new-jersey-auto-transport | exact | yes | yes | yes |
| /new-jersey-to-florida-car-shipping | exact | yes | yes | yes |
| /newton-auto-transport | exact | yes | yes | — |
| /nj-export-warehouse-shipping-cost | exact | yes | yes | yes |
| /open-car-shipping | exact | yes | yes | — |
| /open-vs-enclosed-auto-transport | exact | yes | yes | — |
| /pl | exact locale factory | yes | yes | — |
| /pl-us | redirect | — | — | — |
| /pl-us/copart-shipping | redirect | — | — | — |
| /pl-us/ship-my-car | redirect | — | — | — |
| /pl/about | exact locale factory | yes | yes | — |
| /pl/certificate-of-origin | dynamic /:lang/certificate-of-origin | yes | yes | — |
| /pl/contact | exact locale factory | yes | yes | — |
| /pl/copart-shipping | redirect | — | — | — |
| /pl/dealers | exact locale factory | yes | yes | — |
| /pl/exporters | exact locale factory | yes | yes | — |
| /pl/faq | exact locale factory | yes | yes | — |
| /pl/ports/baltimore | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/ports/houston | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/ports/jacksonville | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/ports/los-angeles | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/ports/newark | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/ports/savannah | dynamic /:lang/ports/:slug | yes | yes | — |
| /pl/quote | exact locale factory | yes | yes | — |
| /pl/services | exact locale factory | yes | yes | — |
| /pl/ship-my-car | exact locale factory | yes | yes | — |
| /pl/track | exact locale factory | yes | yes | — |
| /pl/transport-z-aukcji | exact | yes | yes | — |
| /pl/transport-z-usa | exact | yes | yes | — |
| /pl/wysylka-auta-z-usa | exact | yes | yes | — |
| /portal/accept-invitation | exact | — | — | — |
| /portal/application | exact | — | — | — |
| /portal/billing | exact | — | — | — |
| /portal/co | exact | — | — | — |
| /portal/co/companies | exact | — | — | — |
| /portal/co/start | exact | — | — | — |
| /portal/dashboard | exact | — | — | — |
| /portal/locations | exact | — | — | — |
| /portal/locations/setup | exact | — | — | — |
| /portal/login | exact | — | — | — |
| /portal/new-order | exact | — | — | — |
| /portal/onboarding | exact | — | — | — |
| /portal/profile | exact | — | — | — |
| /portal/register | exact | — | — | — |
| /ports/baltimore | dynamic /ports/:slug | yes | yes | — |
| /ports/houston | dynamic /ports/:slug | yes | yes | — |
| /ports/jacksonville | dynamic /ports/:slug | yes | yes | — |
| /ports/los-angeles | dynamic /ports/:slug | yes | yes | — |
| /ports/newark | dynamic /ports/:slug | yes | yes | yes |
| /ports/savannah | dynamic /ports/:slug | yes | yes | — |
| /privacy | exact | yes | yes | — |
| /quote | exact | yes | yes | — |
| /quote-verification-failed | exact | yes | — | — |
| /quote-verified | exact | yes | — | — |
| /ru | exact locale factory | yes | yes | — |
| /ru-us | redirect | — | — | — |
| /ru-us/copart-shipping | redirect | — | — | — |
| /ru-us/ship-my-car | redirect | — | — | — |
| /ru/about | exact locale factory | yes | yes | — |
| /ru/certificate-of-origin | dynamic /:lang/certificate-of-origin | yes | yes | — |
| /ru/contact | exact locale factory | yes | yes | — |
| /ru/copart-i-iaai | exact | yes | yes | — |
| /ru/copart-shipping | redirect | — | — | — |
| /ru/dealers | exact locale factory | yes | yes | — |
| /ru/dostavka-avto-iz-usa | exact | yes | yes | — |
| /ru/exporters | exact locale factory | yes | yes | — |
| /ru/faq | exact locale factory | yes | yes | — |
| /ru/perevozka-avto | exact | yes | yes | — |
| /ru/ports/baltimore | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/ports/houston | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/ports/jacksonville | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/ports/los-angeles | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/ports/newark | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/ports/savannah | dynamic /:lang/ports/:slug | yes | yes | — |
| /ru/quote | exact locale factory | yes | yes | — |
| /ru/services | exact locale factory | yes | yes | — |
| /ru/ship-my-car | exact locale factory | yes | yes | — |
| /ru/track | exact locale factory | yes | yes | — |
| /salvage-car-shipping | exact | yes | yes | — |
| /services | exact | yes | yes | yes |
| /ship-my-car | exact | yes | yes | — |
| /state-to-state-car-shipping | exact | yes | yes | — |
| /terms | exact | yes | yes | — |
| /tesla-car-shipping | exact | yes | yes | — |
| /texas-auto-transport | exact | yes | yes | — |
| /texas-to-newark-port-auto-transport | exact | yes | yes | yes |
| /track | exact | yes | yes | — |
| /ua | exact locale factory | yes | yes | — |
| /ua-us | redirect | — | — | — |
| /ua-us/copart-shipping | redirect | — | — | — |
| /ua-us/ship-my-car | redirect | — | — | — |
| /ua/about | exact locale factory | yes | yes | — |
| /ua/certificate-of-origin | dynamic /:lang/certificate-of-origin | yes | yes | — |
| /ua/contact | exact locale factory | yes | yes | — |
| /ua/copart-shipping | redirect | — | — | — |
| /ua/copart-ta-iaai | exact | yes | yes | — |
| /ua/dealers | exact locale factory | yes | yes | — |
| /ua/dostavka-avto-z-usa | exact | yes | yes | — |
| /ua/exporters | exact locale factory | yes | yes | — |
| /ua/faq | exact locale factory | yes | yes | — |
| /ua/import-z-usa | exact | yes | yes | — |
| /ua/ports/baltimore | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/ports/houston | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/ports/jacksonville | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/ports/los-angeles | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/ports/newark | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/ports/savannah | dynamic /:lang/ports/:slug | yes | yes | — |
| /ua/quote | exact locale factory | yes | yes | — |
| /ua/services | exact locale factory | yes | yes | — |
| /ua/ship-my-car | exact locale factory | yes | yes | — |
| /ua/track | exact locale factory | yes | yes | — |
| /what-is-a-bill-of-lading | exact | yes | yes | — |

## 6. `PageMeta` and document-head behavior

`src/components/PageMeta.jsx` emits:

- `<html lang>`;
- title and meta description;
- Open Graph title, description, URL, type, site name, image, and locale;
- optional article published time, author, and section;
- Twitter card, title, description, and image;
- canonical URL;
- optional `robots=noindex, follow`;
- optional JSON-LD.

`index.html` provides static defaults for title, description, Open Graph title/description/type/URL/site name/image/image dimensions, Twitter card/title/description/image, `robots=index, follow`, and the root LocalBusiness node. The static shell is reused for non-prerendered SPA responses.

Built extraction found a title, description, and exactly one H1 on every one of the 143 prerender routes. Canonical is present on 141; only `/quote-verified` and `/quote-verification-failed` omit it. All present canonicals use the expected slashless production URL.

The generic static Twitter description (`Licensed auto transport broker. Verified carriers, shipment status updates.`) remains on eight routes: `/quote-verified`, `/quote-verification-failed`, `/daytonacargo`, `/pl/transport-z-usa`, `/pl/transport-z-aukcji`, `/ru/dostavka-avto-iz-usa`, `/ru/copart-i-iaai`, and `/ru/perevozka-avto`. It is therefore not a site-wide majority defect.

### Per-page versus static-default mapping

| Head field | PageMeta behavior | index.html default |
|---|---|---|
| title | Per-page title prop; Y7 Logistics suffix is added unless already present | Y7 Logistics \| Nationwide Auto Transport |
| description | Per-page description prop | Generic home description |
| canonical | Current pathname at the production base URL | Root URL |
| og:title, og:description, og:url | Per-page/current route | Generic root values |
| og:type | Per-page optional, default website | website |
| og:site_name | Constant Y7 Logistics | Same constant |
| og:image | Optional per-page image, otherwise shared /og-image.svg | Shared /og-image.svg with dimensions |
| og:locale | Derived from route locale | Not present in static default |
| article:* | Conditional per article | Not present |
| twitter:card | Constant summary_large_image | Same constant |
| twitter:title, twitter:description | Per-page whenever PageMeta mounts | Generic root values |
| twitter:image | Optional per-page image, otherwise shared image | Shared image |
| robots | Only emits noindex, follow when noindex=true | index, follow |
| JSON-LD | Optional per-page schema plus static root node | Root LocalBusiness node |

### `PageMeta.jsx`, verbatim

```jsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE = 'https://www.y7agency.com';

const OG_LOCALE = { en: 'en_US', uk: 'uk_UA', pl: 'pl_PL', ru: 'ru_RU' };
const HTML_LANG = { en: 'en', ua: 'uk', pl: 'pl', ru: 'ru' };

function detectLocale(pathname) {
  const m = pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  return m ? m[1] : 'en';
}

/**
 * PageMeta — SEO head tags. Title, description, og, canonical, optional schema.
 *
 * Locale-aware: canonical/og:url derive from the actual current URL (not the
 * legacy `path` prop), so /ua/services gets canonical=/ua/services and
 * og:locale=uk_UA. Callers may still pass `path` for backwards compatibility
 * but it is only used as a fallback when useLocation is unavailable.
 *
 * Hreflang is intentionally NOT handled here — HreflangTags auto-mounts in
 * Layout for every translatable path.
 */
export default function PageMeta({ title, description, path = '', schema, ogType, ogImage, articlePublishedTime, articleAuthor, articleSection, noindex = false }) {
  const location = useLocation();
  const pathname = location?.pathname || path || '/';
  const locale = detectLocale(pathname);
  const htmlLang = HTML_LANG[locale] || 'en';
  const ogLocale = OG_LOCALE[htmlLang] || 'en_US';

  const fullTitle = title
    ? (title.endsWith('| Y7 Logistics') ||
       title.endsWith('- Y7 Logistics') ||
       title.endsWith('— Y7 Logistics')
        ? title
        : `${title} | Y7 Logistics`)
    : 'Y7 Logistics | Nationwide Auto Transport';
  const canonical = `${BASE}${pathname}`;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:site_name" content="Y7 Logistics" />
      <meta property="og:image" content={ogImage || `${BASE}/og-image.svg`} />
      <meta property="og:locale" content={ogLocale} />
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {/* EXPORTERS-CO-T03: page-level Twitter card text. Without these two,
          every PageMeta route fell back to the static index.html defaults
          (the prerender keep-last dedup already handles the collapse). */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${BASE}/og-image.svg`} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
```

### Static `index.html` defaults, verbatim

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <!-- DESIGN-V2-W1-T03: preload the display face's latin-700 (hero H1 = LCP element).
         Cyrillic/latin-ext resolve via inline-critical @font-face unicode-range at parse
         time, so locale pages discover their subset immediately without extra preloads. -->
    <link rel="preload" as="font" type="font/woff2" href="/fonts/oswald-latin-700-normal.woff2" crossorigin />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Y7 Logistics — Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates." />
    <title>Y7 Logistics | Nationwide Auto Transport</title>
    <!-- Open Graph -->
    <meta property="og:title" content="Y7 Logistics | Nationwide Auto Transport" />
    <meta property="og:description" content="Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.y7agency.com" />
    <meta property="og:site_name" content="Y7 Logistics" />
    <meta property="og:image" content="https://www.y7agency.com/og-image.svg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Y7 Logistics | Nationwide Auto Transport" />
    <meta name="twitter:description" content="Licensed auto transport broker. Verified carriers, shipment status updates." />
    <meta name="twitter:image" content="https://www.y7agency.com/og-image.svg" />
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.y7agency.com/#organization",
      "name": "Y7 Logistics",
      "legalName": "Y7 Consulting Inc",
      "url": "https://www.y7agency.com",
      "logo": "https://www.y7agency.com/y7-logo-512.png",
      "image": "https://www.y7agency.com/y7-og-image.png",
      "email": "info@y7agency.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6 Harding Rd",
        "addressLocality": "Natick",
        "addressRegion": "MA",
        "postalCode": "01760",
        "addressCountry": "US"
      },
      "description": "Licensed FMCSA auto transport broker. Nationwide vehicle shipping, auction pickup, and port delivery.",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "priceRange": "$$",
      "identifier": [
        { "@type": "PropertyValue", "name": "USDOT", "value": "4427359" },
        { "@type": "PropertyValue", "name": "MC", "value": "1741537" }
      ],
      "sameAs": [
        "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=MC_MX&query_string=1741537"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "info@y7agency.com",
          "availableLanguage": ["English", "Russian", "Ukrainian", "Polish"]
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Auto Transport Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Open Carrier Transport" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enclosed Carrier Transport" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auction Pickup (IAAI, Copart, Manheim)" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Port Delivery for Export" } }
        ]
      }
    }
    </script>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: system-ui, -apple-system, sans-serif; color: #2C2C2A; background: #f4f0e8; -webkit-font-smoothing: antialiased; }
      a { color: inherit; text-decoration: none; }
      input, select, textarea, button { font-family: inherit; }
    </style>
    <meta name="robots" content="index, follow" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <div style="max-width:600px;margin:40px auto;padding:24px;font-family:system-ui,sans-serif;color:#2C2C2A">
        <p><strong>Y7 Logistics — Nationwide Auto Transport</strong></p>
        <p>Licensed auto transport broker. Ship your vehicle door-to-door or to any US port.</p>
        <p>USDOT #4427359 | MC #1741537</p>
        <p>Contact: <a href="mailto:info@y7agency.com">info@y7agency.com</a></p>
        <p>This site requires JavaScript to function. Please enable JavaScript in your browser settings.</p>
      </div>
    </noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 7. Per-page metadata and heading baseline

The following table is extracted from the built HTML, not inferred from source declarations. H2 entries preserve document order.

The extraction also found 23 literal Unicode escape strings on five routes: `/new-jersey-auto-transport` (3), `/texas-auto-transport` (1), `/massachusetts-to-florida-car-shipping` (5), `/new-jersey-to-florida-car-shipping` (4), and `/auction-to-port-transport` (10). These are literal backslash-u sequences in built HTML, not merely source-code notation.

| Route | Title | Meta description | Canonical | H1 | Ordered H2s |
|---|---|---|---|---|---|
| / | Y7 Logistics \| Nationwide Auto Transport | Licensed FMCSA auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates. $75,000 BMC-84 surety bond. | https://www.y7agency.com/ | Auto Transport Dispatch for Dealers & Exporters | 1. See the dispatch price before you book.<br>2. Transport for Every Buyer<br>3. Why Shippers Choose Y7<br>4. How It Works<br>5. Where We Ship<br>6. Get Your Free Quote |
| /services | Auto Transport Services \| Y7 Logistics | Auction pickup (IAAI, Copart, Manheim), dealer trades, enclosed transport, US port delivery. Licensed FMCSA broker with 700+ verified carriers nationwide. | https://www.y7agency.com/services | Our Services | 1. What We Offer<br>2. Every service we offer<br>3. Locations We Serve<br>4. Popular Routes<br>5. Electric Vehicle Transport<br>6. Ready to move your vehicle? |
| /dealers | Outsourced Dispatch Department for Auto Dealers \| Y7 Logistics | Skip the $90k internal dispatcher. Y7 runs your dealer auto transport dispatch — flat per-vehicle fee, Copart/IAA/Manheim coverage, weekly billing, BOL archival. Licensed & bonded FMCSA broker MC #1741537. | https://www.y7agency.com/dealers | Your Outsourced Dispatch Department | 1. Internal dispatch is expensive. Generic brokers don't scale with your operation.<br>2. What a Dispatch Department Does<br>3. How It Works — Day by Day<br>4. Two Ways to Pay — Both Flat Fee<br>5. Your Operations Dashboard<br>6. We Pick Up from Every Major US Auction Network<br>7. Five Dealer Scenarios, Every Week<br>8. Built for Dealer Accounting<br>9. When a Carrier Flakes — Here's What You Get<br>10. Dealerships We Run Dispatch For<br>11. Y7 vs Internal Dispatcher vs Generic Broker<br>12. Dealer FAQ<br>13. Ready to outsource dealer dispatch? |
| /exporters | Auto Export Services — Auction to Port Delivery Nationwide \| Y7 Logistics | Vehicle export logistics for international buyers. Auction to port delivery, gate pass coordination, warehouse drop-off. Newark, Houston, Savannah, LA, Baltimore, Jacksonville. | https://www.y7agency.com/exporters | Dispatch & Logistics for Vehicle Exporters | 1. Why Exporters Choose Y7<br>2. The Exporter Program<br>3. How routing decisions get made<br>4. Service Fee Structure<br>5. How It Works<br>6. Port Coverage<br>7. Request Our Service Rates<br>8. What the port warehouse expects at drop-off<br>9. Certificates of Origin for EU-bound vehicles<br>10. Where we send vehicles most often<br>11. Shipping auction vehicles for your dealership?<br>12. Operational questions exporters ask us |
| /ship-my-car | Ship My Car — Nationwide Auto Transport \| Door to Door \| Y7 Logistics | Door-to-door car shipping across all 50 states. Open and enclosed transport, status updates at every milestone, FMCSA-vetted carriers. Licensed broker MC #1741537. Free instant quote. | https://www.y7agency.com/ship-my-car | Ship Your Car Anywhere in the US | 1. How It Works<br>2. What Determines Your Shipping Cost<br>3. What it costs to ship a standard vehicle<br>4. Seasonal Pricing Patterns<br>5. Prices move with the calendar<br>6. How to Prepare Your Car for Shipping<br>7. What to Expect at Pickup<br>8. What to Expect at Delivery<br>9. Open vs Enclosed Transport<br>10. Get Your Free Quote<br>11. From Quote to Delivery<br>12. Frequently Asked Questions<br>13. Ready to ship your car? |
| /quote | Get a Free Quote \| Y7 Logistics | Request a free auto transport quote from Y7 Logistics. Replies within 1 hour during business hours. No obligation. Licensed FMCSA broker with verified carriers and flat-fee pricing. | https://www.y7agency.com/quote | Get a Free Quote | 1. From Quote to Delivery |
| /quote-verified | Email Verified — Y7 Logistics | Y7 Logistics — Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates. | MISSING | Email verified | — |
| /quote-verification-failed | Verification Failed — Y7 Logistics | Y7 Logistics — Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates. | MISSING | Verification failed | — |
| /track | Track Your Shipment \| Y7 Logistics | Track your Y7 Logistics vehicle shipment. Enter your reference number or VIN to see shipment status, pickup, delivery, and carrier info. Fast status updates. | https://www.y7agency.com/track | Track Your Shipment | 1. Already a customer? Use one of these: |
| /contact | Contact Us \| Y7 Logistics | Contact Y7 Logistics for vehicle transport. Email info@y7agency.com, Telegram, customer portal. 6 Harding Rd, Natick MA. Licensed & bonded FMCSA broker, responses within 1 hour during business hours. | https://www.y7agency.com/contact | Contact Us | 1. How to reach us<br>2. Send us a message |
| /faq | Auto Transport FAQ — Broker vs Carrier, Pricing, Auctions & Export \| Y7 Logistics | Answers on how our flat-fee broker model works, who insures your car, auction pickups (Copart/IAAI/Manheim), and US-port export. Licensed FMCSA broker, MC #1741537. | https://www.y7agency.com/faq | Frequently Asked Questions | 1. General Questions<br>2. For Dealers<br>3. For Exporters |
| /about | About Y7 Logistics \| Y7 Logistics | Licensed & bonded FMCSA auto transport broker based in Natick, MA. MC #1741537, USDOT #4427359, $75,000 BMC-84 surety bond. Verified carriers, transparent fixed pricing. | https://www.y7agency.com/about | Licensed & Bonded FMCSA Auto Transport Broker | 1. Why we built Y7<br>2. How We Work<br>3. What sets Y7 apart<br>4. How Y7 Communicates<br>5. Our Commitments<br>6. FMCSA Registration<br>7. Contact |
| /careers | Carrier Application — Join Y7 Auto Transport Network \| Y7 Logistics | Apply to the Y7 Logistics carrier network. Auto transport loads from Copart/IAA/Manheim. Licensed & bonded FMCSA broker MC #1741537. Fast Zelle/ACH payment. 5-minute application. | https://www.y7agency.com/careers | Become a Y7 Carrier Partner | 1. What you get as a Y7 carrier partner<br>2. What we look for<br>3. From apply to active in about one business day<br>4. From dispatch to delivery, operationally<br>5. Payment terms, transparently<br>6. Four tabs, everything you need<br>7. Per-load confirmation — one link, two minutes<br>8. What Y7 does not do<br>9. Questions carriers ask<br>10. Ready to join the network? |
| /careers/apply | Carrier Application Form \| Y7 Logistics | Submit your carrier application: MC#, USDOT#, COI, W9. Quick 3-step form. Secure onboarding portal for ACH banking setup. | https://www.y7agency.com/careers/apply | Carrier Application | 1. Company & authority |
| /dealer-quote | Dealer Partnership \| Y7 Logistics | Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates. | https://www.y7agency.com/dealer-quote | Apply for a Dealer Partnership | — |
| /daytonacargo | DaytonaCargo — US Auctions to Rotterdam, One Chain | Vehicle shipping from US auctions to Rotterdam as one itemized chain: bidding, land haul, ocean freight, paperwork. Send us your shipment and get an itemized quote in 24h. | https://www.y7agency.com/daytonacargo | Daytona Cargo. | 1. Scroll, and the ship sails<br>2. One fee, not a stack<br>3. Our own brokerage runs the land leg.<br>4. Yard to Rotterdam<br>5. On time, or you hear it first.<br>6. The decision pack.<br>7. Arrived. Now compare. |
| /privacy | Privacy Policy \| Y7 Logistics | Y7 Consulting Inc d/b/a Y7 Logistics privacy policy. Data collection, SMS terms, your rights. | https://www.y7agency.com/privacy | Privacy Policy | 1. 1. Controller and Contact Information<br>2. 2. Scope<br>3. 3. Categories of Personal Information Collected<br>4. 4. Sources of Personal Information<br>5. 5. Legal Basis for Processing (GDPR Article 6)<br>6. 6. Purposes of Processing<br>7. 7. Automated Decision-Making and Profiling<br>8. 8. Recipients and Third-Party Sharing<br>9. 9. International Data Transfers<br>10. 10. Retention Schedule<br>11. 11. Your Rights<br>12. 12. How to Exercise Your Rights<br>13. 13. Security Measures<br>14. 14. Cookies and Tracking<br>15. 15. Children's Privacy<br>16. 16. California Residents (CCPA/CPRA)<br>17. 17. Updates to This Privacy Policy<br>18. 18. Contact |
| /terms | Terms of Service \| Y7 Logistics | Terms of Service for Y7 Logistics auto transport brokerage services. | https://www.y7agency.com/terms | Terms of Service | 1. 1. Acceptance of Terms<br>2. 2. Description of Services<br>3. 3. User Accounts and Registration<br>4. 4. Service Fees and Payment<br>5. 5. Acceptable Use and Prohibited Conduct<br>6. 6. Intellectual Property Rights<br>7. 7. Third-Party Services and Links<br>8. 8. Disclaimer of Warranties<br>9. 9. Limitation of Liability<br>10. 10. Indemnification<br>11. 11. Termination<br>12. 12. Notices and Electronic Communications<br>13. 13. Dispute Resolution and Arbitration<br>14. 14. Governing Law<br>15. 15. Miscellaneous<br>16. 16. Contact |
| /accessibility | Accessibility \| Y7 Logistics | Y7 Logistics accessibility commitment and WCAG 2.1 Level AA compliance. | https://www.y7agency.com/accessibility | Accessibility Statement | 1. Our Commitment<br>2. What We've Done<br>3. Known Limitations<br>4. Feedback<br>5. Third-Party Content<br>6. Continuous Improvement |
| /car-shipping-cost | How Much Does Car Shipping Cost? \| Y7 Logistics | Car shipping costs depend on distance, vehicle type, transport method, and season. Get a free quote from Y7 Logistics — licensed auto transport broker. | https://www.y7agency.com/car-shipping-cost | How Much Does Car Shipping Cost? | 1. Shipping one vehicle door-to-door?<br>2. Cost by Distance: What the Numbers Actually Look Like<br>3. How Vehicle Size Affects Your Price<br>4. Open vs. Enclosed Transport<br>5. Inoperable Vehicle Surcharges<br>6. Seasonal Pricing Patterns<br>7. First Mile and Last Mile: Location Matters<br>8. Why Prices Vary Between Brokers<br>9. When You Need This<br>10. How It Works<br>11. What You Need<br>12. Our Capabilities<br>13. Frequently Asked Questions<br>14. Shipping auction vehicles for your dealership?<br>15. Ready to get started? |
| /enclosed-car-shipping | Enclosed Car Shipping — Covered Auto Transport \| Y7 Logistics | Enclosed auto transport for luxury, classic, exotic, and high-value vehicles. Hardside/softside trailers, $250K–$500K cargo insurance. Licensed FMCSA broker. | https://www.y7agency.com/enclosed-car-shipping | Enclosed Car Shipping — Premium Covered Auto Transport | 1. Shipping one vehicle door-to-door?<br>2. What Enclosed Transport Actually Is<br>3. When to Choose Enclosed Transport<br>4. Cost Comparison: Open vs Enclosed<br>5. Types of Enclosed Trailers<br>6. Insurance and Handling Standards<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /auction-car-shipping | Auction Car Shipping — Copart, IAAI & Manheim Pickup \| Y7 Logistics | Ship vehicles from Copart, IAAI, Manheim, and other US auto auctions. Gate pass coordination, storage fee prevention. Licensed broker Y7 Logistics. | https://www.y7agency.com/auction-car-shipping | Auction Car Shipping — Pickup from Any US Auction | 1. Getting this car to a port?<br>2. US Auto Auctions: What You Need to Know<br>3. Auction-to-Home: How the Process Works<br>4. Auction-to-Port: Export Shipments<br>5. What Can Go Wrong — and How We Handle It<br>6. Real Scenarios<br>7. Storage Fee Prevention<br>8. When You Need This<br>9. How It Works<br>10. What You Need<br>11. Our Capabilities<br>12. Frequently Asked Questions<br>13. Shipping one vehicle door-to-door?<br>14. Ready to get started?<br>15. Related Guides |
| /auction-transport-savings | Save on Auction Car Transport — Broker Direct, Skip the Markup \| Y7 Logistics | The auction | https://www.y7agency.com/auction-transport-savings | What You Save Shipping Auction Cars Broker-Direct | 1. Why the auction's quote is higher<br>2. Side by side: auction quote vs. broker direct<br>3. How Y7 keeps it honest<br>4. Be realistic about timing<br>5. Frequently Asked Questions<br>6. Shipping auction vehicles for your dealership?<br>7. Ready to get started?<br>8. Related Guides |
| /copart-shipping | Copart Shipping Cost & Transport — All 200+ Yards \| Y7 Logistics | Copart auction shipping from $400. Gate pass coordination, non-running vehicle winch loading, export-to-port routing. Licensed FMCSA broker MC #1741537. Quote before you bid. | https://www.y7agency.com/copart-shipping | Copart Shipping — Vehicle Transport from Copart Auctions | 1. Getting this car to a port?<br>2. The Copart Purchase-to-Pickup Process<br>3. Copart Storage Fees — What You Need to Know Before Bidding<br>4. How Much Does Copart Shipping Actually Cost?<br>5. Vehicle Condition Reality Check<br>6. Copart Gate Pass & Dispatch Requirements<br>7. Copart Yard Locations — Where We Operate<br>8. Copart to Port — Export Specialty<br>9. Copart vs IAAI — Real Differences for Transport<br>10. Dealer Volume — Multi-Vehicle Copart Pickups<br>11. Why Y7 for Copart Transport<br>12. Real Scenario: Copart Dallas to Houston (Lane Cooperating)<br>13. When You Need This<br>14. How It Works<br>15. What You Need<br>16. Our Capabilities<br>17. Frequently Asked Questions<br>18. Shipping one vehicle door-to-door?<br>19. Ready to get started?<br>20. Related Guides |
| /iaai-transport | IAA Auction Transport \| Y7 Logistics | Vehicle transport from IAA (Insurance Auto Auctions) locations nationwide. Gate pass coordination, salvage vehicles, fast pickup. Y7 Logistics. | https://www.y7agency.com/iaai-transport | IAA Transport — Ship Your Vehicle from IAA Auctions | 1. Getting this car to a port?<br>2. IAA: What Changed and What Stayed the Same<br>3. The IAA Gate Pass Process: Different from Copart<br>4. IAA vs Copart: What Actually Differs for Transport<br>5. Buyer ID Requirements at IAA<br>6. IAA Storage Fees: Know Your Window<br>7. IAA Transport (In-House) vs. Independent Broker<br>8. Most IAA Vehicles Are Non-Running: Plan Accordingly<br>9. Top IAA Yard Locations by State<br>10. When You Need This<br>11. How It Works<br>12. What You Need<br>13. Our Capabilities<br>14. Frequently Asked Questions<br>15. Shipping one vehicle door-to-door?<br>16. Ready to get started?<br>17. Related Guides |
| /manheim-transport | Manheim Auction Transport \| Y7 Logistics | Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics. | https://www.y7agency.com/manheim-transport | Manheim Transport — Dealer Auction Vehicle Shipping | 1. Shipping auction vehicles for your dealership?<br>2. Manheim Is Dealer-Only: Why That Matters for Transport<br>3. Ready Logistics vs. Independent Broker: The Real Comparison<br>4. Common Dealer Scenarios We Handle<br>5. Manheim OVE and Simulcast: Buying Without Being There<br>6. Volume Pricing: How Consistent Shipping Lowers Your Cost<br>7. Manheim's Footprint: 70+ Locations Nationwide<br>8. When You Need This<br>9. How It Works<br>10. What You Need<br>11. Our Capabilities<br>12. Frequently Asked Questions<br>13. Shipping one vehicle door-to-door?<br>14. Ready to get started?<br>15. Related Guides |
| /door-to-port-auto-transport | Door-to-Port Auto Transport Cost & Transit Time to US Ports \| Y7 Logistics | Door-to-port auto transport cost and dispatch-to-delivery transit times to the six major US export ports — Newark, Houston, Savannah, LA, Baltimore, Jacksonville. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/door-to-port-auto-transport | Door-to-Port Auto Transport — Vehicle Delivery to US Ports | 1. Getting this car to a port?<br>2. Major US Export Ports: What to Know<br>3. What Y7 Handles vs. What You Handle<br>4. Warehouse vs. Direct Terminal Delivery<br>5. What Door-to-Port Costs (New Jersey Corridor)<br>6. The Door Premium: Auction Yard vs. a Private or Dealer Address<br>7. Transit Times and Scheduling<br>8. Where the Time Actually Goes: Sourcing vs. Driving<br>9. Common Export Corridors<br>10. When You Need This<br>11. How It Works<br>12. What You Need<br>13. Our Capabilities<br>14. Frequently Asked Questions<br>15. Shipping auction vehicles for your dealership?<br>16. Ready to get started?<br>17. Related Guides |
| /dealer-auto-transport | Dealer Auto Transport \| Y7 Logistics | Auto transport for car dealerships. Volume pricing, auction pickup, dealer trades, dedicated dispatcher. Licensed broker Y7 Logistics. | https://www.y7agency.com/dealer-auto-transport | Dealer Auto Transport — Vehicle Shipping for Dealerships | 1. Shipping auction vehicles for your dealership?<br>2. Dealer Workflows We Handle Every Day<br>3. Multi-Vehicle Moves<br>4. Contract Pricing and Volume Tiers<br>5. Compliance and Carrier Verification<br>6. Technology: Dealer Portal and Tracking<br>7. Common Dealer Scenarios<br>8. When You Need This<br>9. How It Works<br>10. What You Need<br>11. Our Capabilities<br>12. Frequently Asked Questions<br>13. Getting this car to a port?<br>14. Ready to get started?<br>15. Related Guides |
| /salvage-car-shipping | Salvage Car Shipping — Copart & IAAI Total-Loss Transport \| Y7 Logistics | Salvage-title and total-loss vehicle transport from Copart, IAAI, and home addresses. Winch and forklift loading, condition-matched carriers. Licensed FMCSA broker, free quote in 1 hour. | https://www.y7agency.com/salvage-car-shipping | Salvage & Non-Running Car Shipping | 1. Shipping one vehicle door-to-door?<br>2. What Salvage & Non-Running Shipping Involves<br>3. Auction-to-Home for Salvage Buyers<br>4. Non-Running Does Not Mean Non-Shippable<br>5. Disclose All Damage at Quote Time<br>6. Popular Salvage Corridors<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Getting this car to a port?<br>13. Ready to get started?<br>14. Related Guides |
| /open-car-shipping | Open Car Shipping — Open Trailer Auto Transport \| Y7 Logistics | Open-trailer auto transport across all 50 states. Most affordable and most common shipping method. Licensed FMCSA broker. Free quote in under 1 hour. | https://www.y7agency.com/open-car-shipping | Open Car Shipping — The Standard for Auto Transport | 1. Shipping one vehicle door-to-door?<br>2. What Open Car Transport Is<br>3. When Open Transport Is Right for You<br>4. How Open Carriers Actually Work<br>5. Open Transport Pricing<br>6. Protection, Insurance, and Weather Reality<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /state-to-state-car-shipping | State to State Car Shipping — Interstate Auto Transport \| Y7 Logistics | State to state car shipping across all 50 states. Licensed FMCSA broker, verified carriers, transparent pricing. Quote in 1 hour. | https://www.y7agency.com/state-to-state-car-shipping | State-to-State Car Shipping — Interstate Auto Transport | 1. Shipping one vehicle door-to-door?<br>2. How Interstate Transport Works<br>3. Pricing by Distance Tier<br>4. Most Popular Interstate Corridors<br>5. Transit Time Expectations by Distance<br>6. State-Specific Regulations<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started? |
| /massachusetts-car-shipping | Massachusetts Car Shipping \| Y7 Logistics | Auto transport across Massachusetts — Boston metro to Berkshires and Cape Cod. Pickup from any MA address. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/massachusetts-car-shipping | Massachusetts Car Shipping — Statewide Auto Transport | 1. Shipping one vehicle door-to-door?<br>2. Auto Transport Across Massachusetts<br>3. Massachusetts Pricing by Region<br>4. Massachusetts to Top Destinations<br>5. Massachusetts Auction Locations<br>6. Winter Shipping from Massachusetts<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /boston-car-shipping | Boston Car Shipping \| Y7 Logistics | Boston car shipping from licensed FMCSA broker. Pickup from any Boston address or dealership. Top corridors: FL, NYC, TX, CA, Port Newark. | https://www.y7agency.com/boston-car-shipping | Boston Car Shipping — Vehicle Transport in Greater Boston | 1. Shipping one vehicle door-to-door?<br>2. Car Shipping in Greater Boston<br>3. Boston Pickup & Delivery Considerations<br>4. Popular Routes from Boston<br>5. Boston's Auto Auction Market<br>6. College Season: Shipping Cars for Students<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /newton-auto-transport | Newton MA Auto Transport \| Y7 Logistics | Licensed auto transport broker serving Newton, MA. Pickup from all Newton villages + Greater Boston. Y7 Logistics MC #1741537 / USDOT #4427359. | https://www.y7agency.com/newton-auto-transport | Newton Auto Transport — Your Local Car Shipping Company | 1. Shipping one vehicle door-to-door?<br>2. Auto Transport from Newton, Massachusetts<br>3. Why Newton Is a Strategic Transport Hub<br>4. Serving the Greater Newton Area<br>5. How Pickup Works in Newton<br>6. Seasonal Patterns for Newton Shippers<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /florida-car-shipping | Florida Car Shipping — Auto Transport To and From FL \| Y7 Logistics | Car shipping to and from Florida. Miami, Orlando, Tampa, Jacksonville. Snowbird corridor specialist. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/florida-car-shipping | Florida Car Shipping — Auto Transport to and from FL | 1. Shipping one vehicle door-to-door?<br>2. Florida as the #1 Auto Transport Destination<br>3. Pricing To and From Florida<br>4. Key Florida Destinations<br>5. Port Delivery in Florida (JAXPORT)<br>6. Summer Reverse Flow: FL to Northeast<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Getting this car to a port?<br>13. Ready to get started?<br>14. Related Guides |
| /new-jersey-auto-transport | New Jersey Auto Transport — NJ Car Shipping \| Y7 Logistics | NJ auto transport with Port Newark gate pass coordination. Dealer-dense market expertise. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/new-jersey-auto-transport | New Jersey Auto Transport — Vehicle Shipping in NJ | 1. Shipping one vehicle door-to-door?<br>2. New Jersey as the East Coast Export Gateway<br>3. Dealer-Dense Market: Newark, Jersey City, Edison<br>4. Pricing From and To New Jersey<br>5. Port Newark Gate Pass Process<br>6. NJ Auction Locations<br>7. The NJ Export-Warehouse Market<br>8. When You Need This<br>9. How It Works<br>10. What You Need<br>11. Our Capabilities<br>12. Frequently Asked Questions<br>13. Getting this car to a port?<br>14. Ready to get started? |
| /nj-export-warehouse-shipping-cost | NJ Export-Warehouse Shipping Cost — How Carrier Pricing Is Formed \| Y7 Logistics | How auto-transport carrier pricing to the New Jersey export warehouses is actually formed, measured on 586 real dispatches. Distance, pickup type, auction brand, vehicle size. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/nj-export-warehouse-shipping-cost | NJ Export-Warehouse Shipping Cost: How the Carrier Rate Is Formed | 1. Getting this car to a port?<br>2. What Actually Sets the Price<br>3. Why the Cost Per Mile Falls as the Haul Gets Longer<br>4. What Each Distance Band Costs<br>5. Auction Pickup Versus a Dealer or Private Address<br>6. Which Auction You Buy From Does Not Matter<br>7. Vehicle Size<br>8. Where in New Jersey You Deliver Does Not Matter<br>9. What Moves the Market<br>10. Where the Cars Come From<br>11. What the Carrier Rate Does Not Include<br>12. Frequently Asked Questions<br>13. Shipping auction vehicles for your dealership?<br>14. Ready to get started? |
| /texas-auto-transport | Texas Auto Transport — TX Car Shipping \| Y7 Logistics | Texas auto transport with Houston, Dallas, San Antonio coverage. Port of Houston exports, auction pickups. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/texas-auto-transport | Texas Auto Transport — Car Shipping in TX | 1. Shipping one vehicle door-to-door?<br>2. Texas Auto Transport Overview<br>3. Port of Houston and the Export Corridor<br>4. Internal Texas Distances and Intra-State Pricing<br>5. Texas Heat Considerations<br>6. Popular Texas Corridors<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Getting this car to a port?<br>13. Ready to get started? |
| /massachusetts-to-florida-car-shipping | Massachusetts to Florida Car Shipping \| Y7 Logistics | MA to FL car shipping on the #1 snowbird corridor. Boston to Miami, Orlando, Tampa. Licensed FMCSA broker. Free quote in 1 hour. | https://www.y7agency.com/massachusetts-to-florida-car-shipping | Massachusetts to Florida Car Shipping | 1. Shipping one vehicle door-to-door?<br>2. The #1 Snowbird Corridor in America<br>3. Pricing and Transit<br>4. Seasonal Pricing Calendar<br>5. The Route: I-95 Corridor and Alternates<br>6. Auction Pickups on the MA to FL Corridor<br>7. Booking Tips for the MA to FL Lane<br>8. When You Need This<br>9. How It Works<br>10. What You Need<br>11. Our Capabilities<br>12. Frequently Asked Questions<br>13. Shipping auction vehicles for your dealership?<br>14. Ready to get started?<br>15. Related Guides |
| /new-jersey-to-florida-car-shipping | New Jersey to Florida Car Shipping \| Y7 Logistics | NJ to FL auto transport. Port Newark area to Miami, Orlando, Tampa. Dealer volume pricing. Licensed FMCSA broker MC #1741537. | https://www.y7agency.com/new-jersey-to-florida-car-shipping | New Jersey to Florida Car Shipping | 1. Shipping one vehicle door-to-door?<br>2. NJ to FL as a Dealer Trade Corridor<br>3. Pricing and Transit<br>4. Seasonal Pricing<br>5. The Route: I-95 Primary, I-81 Alternate<br>6. Dealer Volume Discounts<br>7. When You Need This<br>8. How It Works<br>9. What You Need<br>10. Our Capabilities<br>11. Frequently Asked Questions<br>12. Shipping auction vehicles for your dealership?<br>13. Ready to get started?<br>14. Related Guides |
| /texas-to-newark-port-auto-transport | TX to Port Newark Vehicle Shipping \| Y7 Logistics | Vehicle transport from Texas to Port Newark for export. Auction pickup in TX, door-to-port delivery. All documentation handled. | https://www.y7agency.com/texas-to-newark-port-auto-transport | Texas to Port Newark Auto Transport | 1. Shipping one vehicle door-to-door?<br>2. Texas Auction Yards Feeding This Corridor<br>3. Newark vs Houston: Choosing the Port from Texas<br>4. When You Need This<br>5. How It Works<br>6. What You Need<br>7. Our Capabilities<br>8. Frequently Asked Questions<br>9. Getting this car to a port?<br>10. Ready to get started?<br>11. Related Guides |
| /chicago-to-port-newark-car-shipping | Chicago to Port Newark Auto Transport \| Y7 Logistics | Ship vehicles from Chicago area to Port Newark. Auction pickup, dealer transport, export delivery. ~800 miles, 3-4 days. | https://www.y7agency.com/chicago-to-port-newark-car-shipping | Chicago to Port Newark Car Shipping | 1. Shipping one vehicle door-to-door?<br>2. Why This Corridor Is an Export Lane First<br>3. Chicagoland Auction Pickup Mechanics<br>4. When You Need This<br>5. How It Works<br>6. What You Need<br>7. Our Capabilities<br>8. Frequently Asked Questions<br>9. Getting this car to a port?<br>10. Ready to get started?<br>11. Related Guides |
| /auction-to-port-transport | Auction to Port Car Transport — Copart to Port Shipping \| Y7 Logistics | Auction to port vehicle transport with gate pass coordination. Copart, IAAI, Manheim to Port Newark, Houston, Savannah. Licensed FMCSA broker. | https://www.y7agency.com/auction-to-port-transport | Auction to Port Transport — Direct from Auction to Export Port | 1. Getting this car to a port?<br>2. The Complete Workflow<br>3. Y7\u2019s Role as Broker<br>4. Gate Pass Coordination<br>5. Popular Auction-to-Port Corridors<br>6. New Jersey Export-Warehouse Pricing, Explained<br>7. Timing and Storage Fees<br>8. Documents and Handoff<br>9. When You Need This<br>10. How It Works<br>11. What You Need<br>12. Our Capabilities<br>13. Frequently Asked Questions<br>14. Shipping auction vehicles for your dealership?<br>15. Ready to get started?<br>16. Related Guides |
| /atlanta-to-savannah-port-auto-transport | Atlanta to Savannah Port Auto Transport — Auction to Ship \| Y7 Logistics | Vehicle transport from Atlanta auctions to the Port of Savannah. Copart, IAA, and Manheim pickup, Garden City Terminal delivery, gate pass coordination. Licensed FMCSA broker. | https://www.y7agency.com/atlanta-to-savannah-port-auto-transport | Atlanta to Savannah Port Auto Transport | 1. Getting this car to a port?<br>2. The Southeast's Auction-to-Export Corridor<br>3. Release Mechanics by Auction<br>4. Timing the Port Handoff<br>5. When You Need This<br>6. How It Works<br>7. What You Need<br>8. Our Capabilities<br>9. Frequently Asked Questions<br>10. Shipping one vehicle door-to-door?<br>11. Ready to get started?<br>12. Related Guides |
| /dallas-to-port-houston-auto-transport | Dallas to Port Houston Auto Transport — Auction to Ship \| Y7 Logistics | Vehicle transport from Dallas auctions to the Port of Houston. Copart and IAA pickup, port warehouse delivery, gate pass coordination, $300-500 typical. Licensed FMCSA broker. | https://www.y7agency.com/dallas-to-port-houston-auto-transport | Dallas to Port Houston Auto Transport | 1. Getting this car to a port?<br>2. The Default Texas Export Leg<br>3. Auction Release, Then Dispatch<br>4. The Port Handoff<br>5. When You Need This<br>6. How It Works<br>7. What You Need<br>8. Our Capabilities<br>9. Frequently Asked Questions<br>10. Shipping one vehicle door-to-door?<br>11. Ready to get started?<br>12. Related Guides |
| /florida-to-jacksonville-port-car-shipping | Florida Auctions to Jacksonville Port Car Shipping — RoRo Export \| Y7 Logistics | Vehicle transport from Florida Copart and IAA yards to JAXPORT for RoRo and container export. Gate pass coordination, $250-500 intra-Florida floors. Licensed FMCSA broker. | https://www.y7agency.com/florida-to-jacksonville-port-car-shipping | Florida Auctions to Jacksonville Port Car Shipping | 1. Getting this car to a port?<br>2. Why Florida Export Volume Runs Through JAXPORT<br>3. Auction Release and Pickup Mechanics<br>4. The RoRo Handoff<br>5. When You Need This<br>6. How It Works<br>7. What You Need<br>8. Our Capabilities<br>9. Frequently Asked Questions<br>10. Shipping one vehicle door-to-door?<br>11. Ready to get started?<br>12. Related Guides |
| /tesla-car-shipping | Tesla Car Shipping \| Y7 Logistics | Professional Tesla transport service. Licensed & Bonded FMCSA Broker handling Model S, 3, X, Y, and Cybertruck shipping with specialized carriers. Free quotes nationwide. | https://www.y7agency.com/tesla-car-shipping | Tesla Shipping — Specialized Transport for Every Tesla Model | 1. Shipping one vehicle door-to-door?<br>2. Tesla Model Shipping Specifications<br>3. Why Tesla Shipping Needs Specialized Carriers<br>4. Transport Options for Your Tesla<br>5. From Tesla Factory to Your Door<br>6. Tesla Sales & Salvage Auction Experience<br>7. Frequently Asked Questions<br>8. Getting this car to a port?<br>9. Ready to get started?<br>10. Related Guides |
| /ev-auto-transport | EV Auto Transport \| Y7 Logistics | Expert electric vehicle transport for Tesla, Rivian, Lucid, BMW i-Series, Porsche Taycan, Ford Lightning & more. Licensed broker, specialized EV carriers, nationwide. | https://www.y7agency.com/ev-auto-transport | Electric Vehicle Transport — Every EV Safely Shipped | 1. Shipping one vehicle door-to-door?<br>2. Supported Electric Vehicle Brands<br>3. Why EVs Need Experienced Carriers<br>4. EV-Specific Pricing<br>5. EV Charging During Transit<br>6. EV Transport Services We Offer<br>7. Frequently Asked Questions<br>8. Getting this car to a port?<br>9. Ready to get started?<br>10. Related Guides |
| /cybertruck-shipping | Cybertruck Shipping \| Y7 Logistics | Professional Cybertruck shipping service. Specialized heavy-duty carriers, stainless steel safe handling, enclosed options available. Licensed broker, nationwide delivery. | https://www.y7agency.com/cybertruck-shipping | Cybertruck Shipping — Specialized Transport for the Heaviest Tesla | 1. Shipping one vehicle door-to-door?<br>2. Cybertruck Specifications<br>3. Why Cybertruck Shipping Is Different<br>4. Y7 Cybertruck Transport Options<br>5. From Austin Gigafactory to Your Driveway<br>6. Preparing Your Cybertruck for Transport<br>7. Frequently Asked Questions<br>8. Getting this car to a port?<br>9. Ready to get started?<br>10. Related Guides |
| /electric-vehicle-port-delivery | EV Port Delivery \| Y7 Logistics | Ship electric vehicles from US auctions and dealers to major US ports for international export. Tesla, Rivian, Lucid, and more. Specialized EV port delivery service. | https://www.y7agency.com/electric-vehicle-port-delivery | Electric Vehicle Delivery to US Ports for Export | 1. Getting this car to a port?<br>2. Why Export EVs from the USA<br>3. Supported Ports for EV Export<br>4. EV-Specific Export Considerations<br>5. EV Port Delivery Workflow<br>6. EV Port Delivery Pricing<br>7. Frequently Asked Questions<br>8. Shipping one vehicle door-to-door?<br>9. Ready to get started?<br>10. Related Guides |
| /how-to-ship-a-car-bought-at-auction | How to Ship a Car Bought at Auction \| Y7 Logistics | Complete guide to shipping a vehicle purchased at Copart, IAAI, or Manheim auction. Step-by-step process from winning bid to delivery. | https://www.y7agency.com/how-to-ship-a-car-bought-at-auction | How to Ship a Car Bought at Auction: Complete Guide | 1. Understanding the Auction Landscape<br>2. Step 1: Win the Auction and Complete Payment<br>3. Step 2: Obtain Your Title and Gate Pass<br>4. Step 3: Choose a Transport Broker<br>5. Step 4: Coordinate Pickup<br>6. Step 5: Track Your Shipment<br>7. Step 6: Receive and Inspect Your Vehicle<br>8. Common Mistakes to Avoid<br>9. Auction to Port: For Export Buyers<br>10. Ready to Ship Your Auction Vehicle? |
| /open-vs-enclosed-auto-transport | Open vs Enclosed Auto Transport \| Y7 Logistics | Compare open and enclosed auto transport. Cost differences, risk factors, and when to choose each option. Expert guide from Y7 Logistics. | https://www.y7agency.com/open-vs-enclosed-auto-transport | Open vs Enclosed Auto Transport: Which Is Right for Your Vehicle? | 1. What Is Open Auto Transport?<br>2. What Is Enclosed Auto Transport?<br>3. Cost Comparison<br>4. When to Choose Open Transport<br>5. When to Choose Enclosed Transport<br>6. Risk Factors: How Safe Is Open Transport?<br>7. Insurance Coverage<br>8. Get a Quote for Open or Enclosed Transport |
| /what-is-a-bill-of-lading | What Is a Bill of Lading? \| Y7 Logistics | Understanding the Bill of Lading in vehicle shipping. What it includes, why it matters, and how to use it to protect yourself during auto transport. | https://www.y7agency.com/what-is-a-bill-of-lading | What Is a Bill of Lading (BOL) in Auto Transport? | 1. Definition: What Exactly Is a Bill of Lading?<br>2. What Information Is on a Bill of Lading?<br>3. Why the Bill of Lading Matters<br>4. What to Look for at Pickup<br>5. What to Look for at Delivery<br>6. If There Is Damage: What to Do<br>7. Ship with Confidence |
| /copart-storage-fees | Copart Storage Fees Explained — Planning Guide Before You Bid \| Y7 Logistics | How Copart storage fees work: free window rules, fee schedule by yard, weekend counting, and what brokers can (and cannot) do. Honest pre-bid planning guide. | https://www.y7agency.com/copart-storage-fees | Copart Storage Fees Explained — What Every Buyer Should Know Before Bidding | 1. How much are Copart storage fees per day?<br>2. How the free window actually works<br>3. Does Copart charge storage fees on weekends?<br>4. Fee schedule by yard type<br>5. When fees become unavoidable<br>6. 5 practical steps to minimize (not eliminate) risk<br>7. What brokers can and cannot do — honestly<br>8. A real cost example<br>9. The quote-before-bidding workflow<br>10. Related |
| /copart-gate-pass-guide | Copart Gate Pass Guide — How It Works, Common Failures, Yard Cutoffs \| Y7 Logistics | Technical guide to Copart gate passes. Generation timing, payment clearance, Transporter App requirements, common failure modes, and yard cutoff times that control pickup. | https://www.y7agency.com/copart-gate-pass-guide | The Copart Gate Pass: How It Works, Why It Fails, and Why Yard Cutoffs Control Pickup | 1. What a Copart gate pass actually is<br>2. How much is the Copart gate fee in 2026?<br>3. When the gate pass issues<br>4. What the carrier needs at the gate<br>5. Transporter App requirements<br>6. Common failure modes<br>7. Yard hours — the 4:30 PM rule<br>8. When carriers refuse certain yards<br>9. If the gate turns the carrier away<br>10. Related |
| /copart-international-shipping | Copart International Shipping — US Auction to Forwarder Warehouse, Then Worldwide \| Y7 Logistics | End-to-end Copart export: auction win through ocean freight to destination port. Container vs RoRo, typical timelines, cost breakdown, and the Y7 full-cycle workflow. | https://www.y7agency.com/copart-international-shipping | Buying from Copart Abroad: The Complete Export Playbook | 1. Why Copart is #1 for international buyers<br>2. The 7-step auction-to-destination journey<br>3. Container vs RoRo — which do you pick?<br>4. Common destinations and timelines<br>5. Top US export ports we deliver to<br>6. Document flow<br>7. Cost breakdown example — Copart NJ to Odesa (container, shared)<br>8. Common mistakes international buyers make<br>9. How Y7 handles it end-to-end<br>10. Related |
| /certificate-of-origin | Certificate of Origin: 0% EU Import Duty on US Vehicles \| Y7 Logistics | US-origin vehicles enter the EU at 0% import duty under EU Regulation 2026/1455 with a Certificate of Origin. Y7 prepares and files as standing agent: $99 for established exporter clients, $150 one-off, issued eCO in 7 business days. | https://www.y7agency.com/certificate-of-origin | Certificate of Origin for US Vehicle Exports to the EU | 1. Getting this car to a port?<br>2. What a Certificate of Origin Does at EU Import<br>3. The Twin Proof: US Origin and Direct Transport (Article 59a UCC-IA)<br>4. Who Qualifies: The Eligibility Checklist<br>5. Pricing and Turnaround<br>6. The Document Checklist<br>7. How the Filing Works<br>8. Request a Certificate of Origin<br>9. Frequently Asked Questions<br>10. Ready to get started?<br>11. Related Guides |
| /ports/newark | Auto Transport to Port Newark, NJ \| Y7 Logistics | Vehicle shipping to Port Newark-Elizabeth Marine Terminal. Door-to-port auto transport for export. Licensed broker, verified carriers. | https://www.y7agency.com/ports/newark | Port Newark | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port Newark<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port Newark<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /ports/houston | Auto Transport to Port of Houston, TX \| Y7 Logistics | Vehicle shipping to Port of Houston. Largest US vehicle export port. Door-to-port auto transport with verified carriers. | https://www.y7agency.com/ports/houston | Port of Houston | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port of Houston<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port of Houston<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /ports/savannah | Auto Transport to Port of Savannah, GA \| Y7 Logistics | Vehicle shipping to Port of Savannah. Southeast hub for auto export. Competitive rates to Europe and Africa. | https://www.y7agency.com/ports/savannah | Port of Savannah | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port of Savannah<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port of Savannah<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /ports/los-angeles | Auto Transport to Port of Los Angeles, CA \| Y7 Logistics | Vehicle shipping to Port of Los Angeles. Pacific gateway for auto export to Asia, Australia. Door-to-port transport. | https://www.y7agency.com/ports/los-angeles | Port of Los Angeles | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port of Los Angeles<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port of Los Angeles<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /ports/baltimore | Auto Transport to Port of Baltimore, MD \| Y7 Logistics | Vehicle shipping to Port of Baltimore Dundalk Terminal. Top RoRo port for European vehicle export. Licensed broker. | https://www.y7agency.com/ports/baltimore | Port of Baltimore | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port of Baltimore<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port of Baltimore<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /ports/jacksonville | Auto Transport to Port of Jacksonville, FL \| Y7 Logistics | Vehicle shipping to JAXPORT Jacksonville. Caribbean and South America gateway. Door-to-port auto transport. | https://www.y7agency.com/ports/jacksonville | Port of Jacksonville | 1. About This Port<br>2. Address & Gate Hours<br>3. Popular Routes to Port of Jacksonville<br>4. Documents Required<br>5. Storage & Demurrage<br>6. Shipping Destinations<br>7. Auction-to-Port Pipeline<br>8. Tips for Port of Jacksonville<br>9. Related Services<br>10. Get a Port Delivery Quote |
| /blog | Blog — Dispatches from the Road \| Y7 Logistics | Auto transport industry insights from a licensed FMCSA broker. Carrier stories, compliance guides, dealer tips, and exporter checklists. | https://www.y7agency.com/blog | Real Stories. Real Loads. No Sugarcoating. | 1. Browse by role<br>2. Copart Storage Fees: The Real Cost in 2026 (and How to Stop Being Surprised by Them)<br>3. The International Buyer’s Copart Playbook: Winning Bid to Destination Port<br>4. Copart vs IAA vs Manheim: Which Auction Platform Is Best for Your Use Case<br>5. The True Cost of Shipping a Car from Auction to Port: A 2026 Breakdown<br>6. How to Read a Central Dispatch Load Listing Like a Pro<br>7. Why Enclosed Transport Is Not Always the Right Choice (Even for Expensive Cars)<br>8. Shipping a Non-Running Vehicle: The Complete Playbook<br>9. Winter Auto Transport: Why Rates Spike and How to Plan Around It<br>10. The Bill of Lading: What Every Shipper Needs to Verify at Pickup and Delivery<br>11. Understanding Port-Specific Export Process: Newark vs Houston vs Savannah<br>12. The Carrier Who Vanished: What 3,674 Messages Taught Us About Trust<br>13. Why Your Carrier's COI Might Be Worthless — And How to Actually Verify Insurance<br>14. FMCSA 2026: The New Rules That Change Everything for Brokers<br>15. The Outbox Pattern: How We Stopped Losing Loads to Dead Events<br>16. Stop Losing Money on Auction Pickup: A Dealer's Guide to Faster Transport<br>17. Auction to Port: The Documentation Checklist That Prevents Vessel Misses<br>18. FMCSA Broker Recordkeeping: How to Survive an Audit in 2026<br>19. The $75,000 Bond: What Happens When Someone Files a Claim Against You |
| /blog/carrier-who-vanished | Carrier Communication Lessons \| Y7 Logistics | What 3,674 carrier messages taught us about trust, response times, and cross-channel intelligence in auto transport dispatch. | https://www.y7agency.com/blog/carrier-who-vanished | The Carrier Who Vanished: What 3,674 Messages Taught Us About Trust | 1. The 4-Hour Rule<br>2. Reliability Is a Composite Score<br>3. Cross-Channel Linking: One Carrier, Many Threads<br>4. The Fake Carrier Problem<br>5. Sentiment as Early Warning |
| /blog/carrier-coi-verification-guide | Carrier COI Verification Guide \| Y7 Logistics | How to verify carrier insurance beyond the ACORD 25 form. Exclusions, loopholes, and the 4-step protocol every broker should follow. | https://www.y7agency.com/blog/carrier-coi-verification-guide | Why Your Carrier's COI Might Be Worthless — And How to Actually Verify Insurance | 1. What an ACORD 25 Actually Is<br>2. Auto Liability: The Numbers That Matter<br>3. Cargo Insurance: The Verification Gap<br>4. The 4-Step Verification Protocol<br>5. The Safety Net: Contingent Cargo<br>6. Related Articles |
| /blog/fmcsa-2026-new-rules | FMCSA 2026 New Broker Rules \| Y7 Logistics | January 2026 FMCSA rules: 7-day bond replenishment, identity proofing, surety changes. What brokers need to know now. | https://www.y7agency.com/blog/fmcsa-2026-new-rules | FMCSA 2026: The New Rules That Change Everything for Brokers | 1. What Are the FMCSA Freight Broker Authority Requirements in 2026?<br>2. Bond Replenishment: 30 Days Became 7<br>3. Surety Provider Accountability<br>4. Identity Proofing: No More Anonymous Registrations<br>5. BMC-85 Trust Fund Restrictions<br>6. MC Number Transition and the Motus System<br>7. What This Means for Small Brokerages<br>8. Related Articles |
| /blog/outbox-pattern-dispatch | Outbox Pattern for Dispatch \| Y7 Logistics | How the transactional outbox pattern eliminated dead events and failed Central Dispatch listings in our auto transport brokerage. | https://www.y7agency.com/blog/outbox-pattern-dispatch | The Outbox Pattern: How We Stopped Losing Loads to Dead Events | 1. The Problem with Direct API Calls<br>2. The Outbox Pattern<br>3. Dead Letters: When Events Cannot Succeed<br>4. Payload Snapshots and Stale Data<br>5. Idempotency: The Guard Against Duplicates<br>6. Fire-and-Forget AI<br>7. Technology as Table Stakes<br>8. Related Articles |
| /blog/dealer-auction-pickup-guide | How Dealers Cut Auction Pickup Costs & Storage Fees (2026) \| Y7 Logistics | A dealer | https://www.y7agency.com/blog/dealer-auction-pickup-guide | Stop Losing Money on Auction Pickup: A Dealer's Guide to Faster Transport | 1. The Gate Pass Problem Nobody Talks About<br>2. The "Runs and Drives" Myth<br>3. Storage Fees: The Silent Margin Killer<br>4. Volume Pricing and Contract Rates<br>5. What a Modern Dealer Portal Looks Like<br>6. Related Articles |
| /blog/exporter-documentation-checklist | Exporter Documentation Checklist \| Y7 Logistics | Complete auction-to-port documentation checklist for vehicle exporters. Title, BOL, AES, and port-specific requirements. | https://www.y7agency.com/blog/exporter-documentation-checklist | Auction to Port: The Documentation Checklist That Prevents Vessel Misses | 1. The Document Chain<br>2. Title Timing: The Bottleneck You Cannot Rush<br>3. BOL and Photo Documentation<br>4. Port-Specific Requirements<br>5. The Inland Transport Leg<br>6. Related Articles |
| /blog/fmcsa-broker-recordkeeping-2026 | FMCSA Broker Recordkeeping 2026 \| Y7 Logistics | FMCSA broker recordkeeping requirements for 2026. Required documents, retention periods, ELD awareness, and audit preparation. | https://www.y7agency.com/blog/fmcsa-broker-recordkeeping-2026 | FMCSA Broker Recordkeeping: How to Survive an Audit in 2026 | 1. The Three Categories of Required Records<br>2. Safety Data: Not Just for Carriers<br>3. ELD Compliance: The January 2026 Deadline<br>4. Automated Logging vs. Manual Spreadsheets<br>5. Related Articles |
| /blog/75000-bond-claims-guide | $75K Broker Bond Claims Guide \| Y7 Logistics | What happens when a claim is filed against your $75K broker bond. Timeline, 7-day rule, BMC-84 vs BMC-85, and protection strategies. | https://www.y7agency.com/blog/75000-bond-claims-guide | The $75,000 Bond: What Happens When Someone Files a Claim Against You | 1. Anatomy of a Bond Claim<br>2. BMC-84 vs. BMC-85: Two Instruments, Different Risk Profiles<br>3. Protection Strategies That Actually Work<br>4. The Surety's Obligation to Report<br>5. Related Articles |
| /blog/copart-iaa-manheim-comparison | Copart vs IAA vs Manheim — Which Auto Auction Should You Use in 2026 \| Y7 Logistics | Complete comparison of Copart, IAA, and Manheim for auto dealers and exporters. Fees, inventory, gate pass, and when to choose each auction platform. | https://www.y7agency.com/blog/copart-iaa-manheim-comparison | Copart vs IAA vs Manheim: Which Auction Platform Is Best for Your Use Case | 1. Copart: The Salvage Giant Everyone Already Knows<br>2. IAA: Similar Playbook, Different Seller Relationships<br>3. What Is the Difference Between IAA and Copart for Salvage Buyers?<br>4. Fees Nobody Explains Upfront<br>5. Choosing by Use Case — a Decision Matrix<br>6. How a Broker Handles Multi-Auction Loads<br>7. Related Articles |
| /blog/auction-to-port-cost-breakdown-2026 | Auction to Port Cost Breakdown 2026 — Full Export Transport Pricing Guide \| Y7 Logistics | Complete 2026 cost breakdown for shipping cars from US auction to port. Transport, gate pass, storage, warehouse fees. Real case study included. | https://www.y7agency.com/blog/auction-to-port-cost-breakdown-2026 | The True Cost of Shipping a Car from Auction to Port: A 2026 Breakdown | 1. The Four Cost Buckets<br>2. Auction Transport Pricing by Distance to Port<br>3. Gate Pass Fees and How to Avoid Them<br>4. Storage Fees at Auctions<br>5. Port Warehouse Charges<br>6. Hidden Costs That Blow Budgets<br>7. Case Study: 2015 BMW X5 from Chicago IAA to Port Newark to Ukraine<br>8. How to Budget Correctly<br>9. Related Articles |
| /blog/central-dispatch-listing-decoded | How to Read a Central Dispatch Load Listing — Broker's Guide 2026 \| Y7 Logistics | Decode every field of a Central Dispatch load listing. Red flags, carrier psychology, and how to write listings that get picked up fast. | https://www.y7agency.com/blog/central-dispatch-listing-decoded | How to Read a Central Dispatch Load Listing Like a Pro | 1. The Anatomy of a Listing<br>2. Red Flags in Poorly-Written Listings<br>3. What Carrier Rate Actually Means<br>4. Pickup Date Fields — the Three Shapes<br>5. Location Types and Why They Matter<br>6. The 5 Things Brokers Get Wrong<br>7. How to Write a Listing That Gets Picked Up Fast<br>8. Related Articles |
| /blog/enclosed-transport-when-to-skip | Enclosed vs Open Car Transport — When to Skip the Premium (2026 Guide) \| Y7 Logistics | Not every expensive car needs enclosed transport. Decision framework, real cost numbers, and edge cases where open trailer is the smart choice. | https://www.y7agency.com/blog/enclosed-transport-when-to-skip | Why Enclosed Transport Is Not Always the Right Choice (Even for Expensive Cars) | 1. The Enclosed vs Open Myth<br>2. When Enclosed Is Absolutely Worth It<br>3. When Open Is Fine<br>4. Real Numbers — What the Premium Costs<br>5. Edge Cases That Flip the Calculation<br>6. Insurance Differences<br>7. The Three-Question Decision Framework<br>8. Related Articles |
| /blog/non-running-vehicle-shipping-playbook | How to Ship a Non-Running Vehicle — Complete 2026 Playbook \| Y7 Logistics | Complete guide to shipping inoperable, non-running, and salvage vehicles. Equipment, pricing, and how to avoid surprise fees at pickup. | https://www.y7agency.com/blog/non-running-vehicle-shipping-playbook | Shipping a Non-Running Vehicle: The Complete Playbook | 1. What "Inoperable" Actually Means to a Carrier<br>2. The Three Categories of Inoperable<br>3. Equipment Required<br>4. Why Inop Loads Cost More<br>5. Common Mistakes That Trigger Surprise Fees<br>6. How to Properly Communicate Vehicle Condition<br>7. The "Runs and Drives" Problem at Auctions<br>8. How We Verify Carrier Capability<br>9. Related Articles |
| /blog/winter-auto-transport-pricing | Winter Auto Transport Pricing 2026 — Why Rates Spike & How to Save \| Y7 Logistics | Winter car shipping costs 15-40% more. Snowbird season, carrier capacity, and timing strategies to save money on Oct-Feb transport. | https://www.y7agency.com/blog/winter-auto-transport-pricing | Winter Auto Transport: Why Rates Spike and How to Plan Around It | 1. The Snowbird Migration Pattern<br>2. Lane-Specific Winter Pricing<br>3. Why Capacity Tightens in Winter<br>4. How to Time Your Shipment to Save Money<br>5. Weather Contingencies<br>6. Enclosed vs Open in Winter<br>7. Case Study: NY → FL Rate Through a Full Year<br>8. Related Articles |
| /blog/bill-of-lading-pickup-delivery-guide | Bill of Lading Guide — Verify Your Car Shipment at Pickup & Delivery \| Y7 Logistics | Complete Bill of Lading guide for auto transport. 12-point pickup inspection, damage documentation, delivery checklist, and claim timing. | https://www.y7agency.com/blog/bill-of-lading-pickup-delivery-guide | The Bill of Lading: What Every Shipper Needs to Verify at Pickup and Delivery | 1. What a BOL Is (and Isn't)<br>2. The Pickup Inspection — 12 Things to Check<br>3. Vehicle Condition Notations<br>4. Common Pickup Mistakes<br>5. Delivery Inspection — When the Clock Starts<br>6. The 5-Minute Rule<br>7. Digital vs Paper BOL<br>8. When to Refuse Delivery<br>9. Related Articles |
| /blog/port-specific-export-newark-houston-savannah | US Port Export Comparison — Newark vs Houston vs Savannah for Auto Export \| Y7 Logistics | Complete comparison of Port Newark, Houston, and Savannah for vehicle exports. Vessel schedules, destinations, costs, and how to choose the right port. | https://www.y7agency.com/blog/port-specific-export-newark-houston-savannah | Understanding Port-Specific Export Process: Newark vs Houston vs Savannah | 1. Why Port Selection Matters More Than Most Realize<br>2. Port Newark (NJ) — the East Coast Giant<br>3. Port Houston (TX) — the Gulf Hub<br>4. Port Savannah (GA) — the Fast-Growing European Lane<br>5. Comparison Table (2026 Data)<br>6. How to Choose<br>7. Related Articles |
| /blog/copart-storage-fees-real-cost-2026 | The Real Cost of Copart Storage Fees in 2026 — A Broker’s Honest Breakdown \| Y7 Logistics | Honest guide to Copart storage fees: $20-40/day by yard type, business-day counting rules, why brokers cannot guarantee free-window pickup, and the pre-bid quote that defends against surprise fees. | https://www.y7agency.com/blog/copart-storage-fees-real-cost-2026 | Copart Storage Fees: The Real Cost in 2026 (and How to Stop Being Surprised by Them) | 1. Wait, HOW MUCH per day?<br>2. What counts as a "business day"?<br>3. Why can't a broker just pick it up faster?<br>4. My situation is weird — can I avoid these?<br>5. What does a real storage-fee disaster look like?<br>6. The pre-bid quote that saves you<br>7. 5 things I tell every new auction buyer<br>8. Related Articles |
| /blog/copart-for-international-buyers-complete-guide | How International Buyers Ship Cars from Copart — Step-by-Step 2026 Playbook \| Y7 Logistics | How international buyers ship from Copart end-to-end: document flow, container vs RoRo decision, 6-11 week timelines by region, cost breakdown Copart NJ to Odesa, common mistakes. | https://www.y7agency.com/blog/copart-for-international-buyers-complete-guide | The International Buyer’s Copart Playbook: Winning Bid to Destination Port | 1. Why Copart is #1 for international buyers<br>2. The 7-step journey from auction win to destination port<br>3. Document flow — what moves with the vehicle<br>4. Container vs RoRo — the decision that saves or costs thousands<br>5. Timeline realities by destination region<br>6. Example cost breakdown: Copart NJ to Odesa (shared container)<br>7. Common mistakes international buyers make<br>8. How Y7 handles this end-to-end<br>9. Related Articles |
| /ua | Y7 Logistics \| Nationwide Auto Transport | Ліцензований FMCSA брокер перевезення авто. Доставка від дверей до дверей або до будь-якого порту США. Розрахунок за робочу годину, перевірені перевізники США. | https://www.y7agency.com/ua | Доставка авто по США для дилерів та експортерів | 1. Дізнайтеся ціну доставки перед замовленням.<br>2. Транспорт для кожного покупця<br>3. Чому нас обирають<br>4. Як це працює<br>5. Куди ми доставляємо<br>6. Отримайте безкоштовний розрахунок |
| /ua/services | Послуги перевезення авто \| Y7 Logistics | Забір з аукціонів (IAAI, Copart, Manheim), дилерські обміни, закриті трейлери, доставка в порти США. Ліцензований FMCSA брокер із 700+ перевізниками США. | https://www.y7agency.com/ua/services | Наші послуги | 1. Що ми пропонуємо<br>2. Усі послуги, що ми надаємо<br>3. Локації, які ми обслуговуємо<br>4. Популярні маршрути<br>5. Перевезення електромобілів<br>6. Готові перевезти авто? |
| /ua/dealers | Відділ диспетчингу на аутсорсі для автодилерів \| Y7 Logistics | Економте $90k на внутрішньому диспетчері. Y7 веде диспетчинг дилерських перевезень — фікс. плата за авто, покриття Copart/IAA/Manheim, тижневий білінг, архів BOL. Ліцензований FMCSA-брокер MC #1741537. | https://www.y7agency.com/ua/dealers | Ваш відділ диспетчингу на аутсорсі | 1. Внутрішній диспетчер дорогий. Універсальний брокер не масштабується з вашими операціями.<br>2. Що робить відділ диспетчингу<br>3. Як це працює: день за днем<br>4. Два способи оплати — обидва з фіксованою платою<br>5. Ваша операційна панель<br>6. Забираємо з кожної великої аукціонної мережі США<br>7. П'ять дилерських сценаріїв щотижня<br>8. Створено для дилерської бухгалтерії<br>9. Коли перевізник підводить: ось що ви отримуєте<br>10. Дилери, для яких ми ведемо диспетчинг<br>11. Y7 проти внутрішнього диспетчера і універсального брокера<br>12. FAQ для дилерів<br>13. Готові вивести диспетчинг на аутсорс? |
| /ua/exporters | Експорт авто з США до порту \| Доставка з аукціону \| Y7 Logistics | Логістика експорту авто з США. Доставка з аукціону до порту, координація gate pass, склад. Порти: Newark, Houston, Savannah, LA, Baltimore, Jacksonville. | https://www.y7agency.com/ua/exporters | Диспетчеризація та логістика для експортерів автомобілів | 1. Чому експортери обирають Y7<br>2. Програма для експортерів<br>3. Як ухвалюються рішення щодо маршруту<br>4. Структура сервісних зборів<br>5. Як це працює<br>6. Покриття портів<br>7. Запитати наші тарифи<br>8. Що склад порту очікує при передачі<br>9. Сертифікати походження для авто в ЄС<br>10. Куди ми відправляємо найчастіше<br>11. Перевозите авто з аукціонів для дилерського центру?<br>12. Операційні питання, які ставлять експортери |
| /ua/ship-my-car | Доставка та перевезення авто по США \| Door-to-Door \| Y7 Logistics | Перевезення авто по всіх 50 штатах США. Відкриті та закриті трейлери, сповіщення про статус на ключових етапах, перевірені перевізники. Ліцензія FMCSA MC #1741537. | https://www.y7agency.com/ua/ship-my-car | Доставка авто між штатами США — від дверей до дверей | 1. Як це працює<br>2. Що впливає на вартість перевезення<br>3. Скільки коштує перевезти стандартне авто<br>4. Сезонні закономірності цін<br>5. Ціни залежать від календаря<br>6. Як підготувати авто до перевезення<br>7. Що очікувати при заборі<br>8. Що очікувати при доставці<br>9. Відкритий чи закритий автовоз: що обрати<br>10. Отримайте безкоштовний розрахунок<br>11. Від розрахунку до доставки<br>12. Часті запитання про перевезення авто по США<br>13. Готові перевезти авто? |
| /ua/track | Відстежити доставку \| Y7 Logistics | Перевірте статус перевезення вашого авто від Y7 Logistics. Введіть номер заявки або VIN, щоб побачити статус, дату забору, доставку та інформацію про перевізника. | https://www.y7agency.com/ua/track | Відстежити перевезення | 1. Вже клієнт? Скористайтеся одним із каналів: |
| /ua/contact | Контакти \| Y7 Logistics | Зв | https://www.y7agency.com/ua/contact | Контакти | 1. Як з нами зв'язатися<br>2. Надішліть нам повідомлення |
| /ua/faq | FAQ з автоперевезень — брокер чи перевізник, ціни, аукціони та експорт \| Y7 Logistics | Відповіді про те, як працює наша модель брокера з фіксованою платою, хто страхує ваше авто, забір з аукціонів (Copart/IAAI/Manheim) та експорт через порти США. Ліцензований брокер FMCSA, MC #1741537. | https://www.y7agency.com/ua/faq | Поширені запитання | 1. Загальні запитання<br>2. Для дилерів<br>3. Для експортерів |
| /ua/about | Про Y7 Logistics \| Y7 Logistics | Ліцензований FMCSA брокер перевезення авто в Натіку, Массачусеттс. MC #1741537, USDOT #4427359. Перевірені перевізники, прозорі фіксовані ціни, 24/7 підтримка. | https://www.y7agency.com/ua/about | Ліцензований FMCSA авто-брокер | 1. Навіщо ми створили Y7<br>2. Як ми працюємо<br>3. Що вирізняє Y7<br>4. Як Y7 спілкується з клієнтами<br>5. Наші зобов'язання<br>6. Реєстрація FMCSA<br>7. Контакти |
| /ua/quote | Отримати безкоштовний розрахунок \| Y7 Logistics | Замовте безкоштовний розрахунок на перевезення авто від Y7 Logistics. Відповідаємо протягом години в робочий час. Без зобов | https://www.y7agency.com/ua/quote | Отримайте безкоштовний розрахунок | 1. Від розрахунку до доставки |
| /ua/certificate-of-origin | Сертифікат походження для авто з США до ЄС: мито 0% \| Y7 Logistics | Автомобілі американського виробництва ввозяться до ЄС з митом 0% за регламентом (ЄС) 2026/1455; сертифікат походження залишається практичним способом це довести. Y7 готує та подає документи як постійний агент: $99 для постійних клієнтів-експортерів, $150 разово, eCO за 7 робочих днів. | https://www.y7agency.com/ua/certificate-of-origin | Сертифікат походження для експорту авто з США до ЄС | 1. Потрібна доставка до порту?<br>2. Що дає сертифікат походження при імпорті до ЄС<br>3. Подвійний доказ: походження США і прямий транспорт (стаття 59a UCC-IA)<br>4. Хто проходить: перелік умов<br>5. Ціни та строки<br>6. Перелік документів<br>7. Як відбувається подання<br>8. Замовити сертифікат походження<br>9. Часті запитання<br>10. Готові почати? |
| /pl | Y7 Logistics \| Nationwide Auto Transport | Licencjonowany broker FMCSA transportu aut. Dostawa od drzwi do drzwi lub do dowolnego portu USA. Wycena w godzinę roboczą, zweryfikowani przewoźnicy, aktualizacje statusu. | https://www.y7agency.com/pl | Transport aut po USA dla dealerów i eksporterów | 1. Poznaj cenę transportu przed zleceniem.<br>2. Transport dla każdego kupującego<br>3. Dlaczego klienci nas wybierają<br>4. Jak to działa<br>5. Dokąd dostarczamy<br>6. Otrzymaj darmową wycenę |
| /pl/services | Usługi transportu aut \| Y7 Logistics | Odbiór z aukcji (IAAI, Copart, Manheim), wymiany dilerskie, zamknięte lawety, dostawa do portów USA. Licencjonowany broker FMCSA z 700+ przewoźnikami. | https://www.y7agency.com/pl/services | Nasze usługi | 1. Co oferujemy<br>2. Wszystkie nasze usługi<br>3. Obsługiwane lokalizacje<br>4. Popularne trasy<br>5. Transport samochodów elektrycznych<br>6. Gotowy na transport auta? |
| /pl/dealers | Zewnętrzny dział dyspozytury dla dealerów aut \| Y7 Logistics | Oszczędź $90k na wewnętrznym dyspozytorze. Y7 prowadzi dyspozyturę transportu dla dealerów — stała opłata za pojazd, pokrycie Copart/IAA/Manheim, tygodniowy billing, archiwum BOL. Licencjonowany broker FMCSA MC #1741537. | https://www.y7agency.com/pl/dealers | Twój zewnętrzny dział dyspozytury | 1. Wewnętrzny dyspozytor jest drogi. Ogólny broker nie skaluje się z Twoją operacją.<br>2. Co robi dział dyspozytury<br>3. Jak to działa — dzień po dniu<br>4. Dwa sposoby płatności — oba ze stałą opłatą<br>5. Twój pulpit operacyjny<br>6. Odbieramy z każdej dużej sieci aukcyjnej w USA<br>7. Pięć scenariuszy dealerskich, co tydzień<br>8. Zbudowane pod księgowość dealera<br>9. Gdy przewoźnik zawiedzie — oto co dostajesz<br>10. Dealerzy, dla których prowadzimy dyspozyturę<br>11. Y7 kontra wewnętrzny dyspozytor kontra ogólny broker<br>12. FAQ dla dealerów<br>13. Gotów przekazać dyspozyturę na outsourcing? |
| /pl/exporters | Transport aut z USA do portu \| Wysyłka z aukcji \| Y7 Logistics | Logistyka eksportu aut z USA. Dostawa z aukcji do portu, koordynacja gate pass, magazyn. Porty: Newark, Houston, Savannah, LA, Baltimore, Jacksonville. | https://www.y7agency.com/pl/exporters | Dyspozycja i logistyka dla eksporterów pojazdów | 1. Dlaczego eksporterzy wybierają Y7<br>2. Program dla eksporterów<br>3. Jak zapadają decyzje o trasie<br>4. Struktura opłat serwisowych<br>5. Jak to działa<br>6. Zasięg portów<br>7. Zapytaj o nasze stawki<br>8. Co magazyn portu wymaga przy przekazaniu<br>9. Świadectwa pochodzenia dla aut do UE<br>10. Dokąd wysyłamy najczęściej<br>11. Transportujesz auta z aukcji dla swojego salonu?<br>12. Operacyjne pytania eksporterów |
| /pl/ship-my-car | Transport i przewóz aut po USA \| Door-to-Door \| Y7 Logistics | Transport aut po wszystkich 50 stanach USA. Otwarte i zamknięte przyczepy, aktualizacje statusu na każdym etapie, sprawdzeni przewoźnicy. Licencja FMCSA MC #1741537. | https://www.y7agency.com/pl/ship-my-car | Transport auta między stanami USA — od drzwi do drzwi | 1. Jak to działa<br>2. Co wpływa na koszt transportu<br>3. Ile kosztuje transport standardowego auta<br>4. Sezonowe wzorce cen<br>5. Ceny idą za kalendarzem<br>6. Jak przygotować auto do transportu<br>7. Czego oczekiwać przy odbiorze<br>8. Czego oczekiwać przy dostawie<br>9. Transport otwarty czy zamknięty<br>10. Otrzymaj darmową wycenę<br>11. Od wyceny do dostawy<br>12. Często zadawane pytania o transport aut w USA<br>13. Gotów na transport auta? |
| /pl/track | Śledź przesyłkę \| Y7 Logistics | Sprawdź status transportu swojego auta od Y7 Logistics. Wprowadź numer referencyjny lub VIN, aby zobaczyć status, odbiór, dostawę i informacje o przewoźniku. | https://www.y7agency.com/pl/track | Śledź transport | 1. Już klient? Skorzystaj z jednego z kanałów: |
| /pl/contact | Kontakt \| Y7 Logistics | Skontaktuj się z Y7 Logistics w sprawie transportu auta. Email info@y7agency.com, Telegram, panel klienta. Natick, MA. Odpowiedź w ciągu godziny w godzinach pracy, FMCSA broker. | https://www.y7agency.com/pl/contact | Kontakt | 1. Jak się z nami skontaktować<br>2. Wyślij nam wiadomość |
| /pl/faq | FAQ transportu aut — broker a przewoźnik, ceny, aukcje i eksport \| Y7 Logistics | Odpowiedzi o tym, jak działa nasz model brokera ze stałą opłatą, kto ubezpiecza Twoje auto, odbiory z aukcji (Copart/IAAI/Manheim) i eksport do portów USA. Licencjonowany broker FMCSA, MC #1741537. | https://www.y7agency.com/pl/faq | Najczęściej zadawane pytania | 1. Pytania ogólne<br>2. Dla dealerów<br>3. Dla eksporterów |
| /pl/about | O Y7 Logistics \| Y7 Logistics | Licencjonowany broker FMCSA transportu aut z siedzibą w Natick, Massachusetts. MC #1741537, USDOT #4427359. Zweryfikowani przewoźnicy, przejrzyste ceny. | https://www.y7agency.com/pl/about | Licencjonowany broker transportu samochodowego FMCSA | 1. Dlaczego zbudowaliśmy Y7<br>2. Jak pracujemy<br>3. Co wyróżnia Y7<br>4. Jak Y7 komunikuje się z klientami<br>5. Nasze zobowiązania<br>6. Rejestracja FMCSA<br>7. Kontakt |
| /pl/quote | Uzyskaj bezpłatną wycenę \| Y7 Logistics | Zamów bezpłatną wycenę transportu auta od Y7 Logistics. Odpowiadamy w ciągu godziny w godzinach pracy. Bez zobowiązań. Licencjonowany broker FMCSA z przewoźnikami, stałe ceny. | https://www.y7agency.com/pl/quote | Uzyskaj darmową wycenę | 1. Od wyceny do dostawy |
| /pl/certificate-of-origin | Świadectwo pochodzenia dla aut z USA do UE: 0% cła \| Y7 Logistics | Pojazdy wyprodukowane w USA wjeżdżają do UE z cłem 0% na mocy rozporządzenia (UE) 2026/1455; świadectwo pochodzenia jest praktycznym sposobem, by to udowodnić. Y7 przygotowuje i składa dokumenty jako stały agent: $99 dla stałych klientów-eksporterów, $150 jednorazowo, eCO w 7 dni roboczych. | https://www.y7agency.com/pl/certificate-of-origin | Świadectwo pochodzenia dla aut eksportowanych z USA do UE | 1. Potrzebujesz dostawy do portu?<br>2. Co daje świadectwo pochodzenia przy imporcie do UE<br>3. Podwójny dowód: pochodzenie z USA i bezpośredni transport (art. 59a UCC-IA)<br>4. Kto się kwalifikuje: lista warunków<br>5. Cennik i terminy<br>6. Lista dokumentów<br>7. Jak przebiega zgłoszenie<br>8. Zamów świadectwo pochodzenia<br>9. Najczęstsze pytania<br>10. Zaczynamy? |
| /ru | Y7 Logistics \| Nationwide Auto Transport | Лицензированный брокер авто-транспорта. Перевозка от двери до двери или в любой порт США. Расчёт за рабочий час, проверенные перевозчики, статусы на каждом этапе. | https://www.y7agency.com/ru | Доставка авто по США для дилеров и экспортеров | 1. Узнайте цену доставки до оформления заявки.<br>2. Транспорт для каждого покупателя<br>3. Почему нас выбирают<br>4. Как это работает<br>5. Куда мы доставляем<br>6. Получите бесплатный расчёт |
| /ru/services | Услуги перевозки авто \| Y7 Logistics | Забор с аукционов (IAAI, Copart, Manheim), дилерские обмены, закрытые трейлеры, доставка в порты США. Лицензированный FMCSA брокер с 700+ перевозчиками. | https://www.y7agency.com/ru/services | Наши услуги | 1. Что мы предлагаем<br>2. Все услуги, которые мы предоставляем<br>3. Обслуживаемые локации<br>4. Популярные маршруты<br>5. Перевозка электромобилей<br>6. Готовы перевезти авто? |
| /ru/dealers | Отдел диспатчинга на аутсорсе для автодилеров \| Y7 Logistics | Экономьте $90k на внутреннем диспатчере. Y7 ведёт диспатчинг дилерских перевозок — фикс. плата за авто, покрытие Copart/IAA/Manheim, недельный биллинг, архив BOL. Лицензированный FMCSA-брокер MC #1741537. | https://www.y7agency.com/ru/dealers | Ваш отдел диспатчинга на аутсорсе | 1. Внутренний диспатчер дорог. Универсальный брокер не масштабируется с вашими операциями.<br>2. Что делает отдел диспатчинга<br>3. Как это работает — день за днём<br>4. Два способа оплаты — оба с фиксированной платой<br>5. Ваша панель операций<br>6. Забираем с каждой крупной аукционной сети США<br>7. Пять дилерских сценариев, каждую неделю<br>8. Сделано под дилерскую бухгалтерию<br>9. Когда перевозчик срывается — вот что вы получаете<br>10. Для каких дилеров мы ведём диспатч<br>11. Y7 против внутреннего диспатчера и универсального брокера<br>12. FAQ для дилеров<br>13. Готовы вывести диспатчинг на аутсорс? |
| /ru/exporters | Экспорт авто из США в порт \| Доставка с аукциона \| Y7 Logistics | Логистика экспорта авто из США. Доставка с аукциона в порт, координация gate pass, склад. Порты: Newark, Houston, Savannah, LA, Baltimore, Jacksonville. | https://www.y7agency.com/ru/exporters | Диспетчеризация и логистика для экспортёров автомобилей | 1. Почему экспортёры выбирают Y7<br>2. Программа для экспортёров<br>3. Как принимаются решения по маршруту<br>4. Структура сервисных сборов<br>5. Как это работает<br>6. Покрытие портов<br>7. Запросить наши тарифы<br>8. Что ожидает склад порта при сдаче<br>9. Сертификаты происхождения для авто в ЕС<br>10. Куда мы отправляем чаще всего<br>11. Перевозите авто с аукционов для дилерского центра?<br>12. Операционные вопросы, которые задают экспортёры |
| /ru/ship-my-car | Доставка и перевозка авто по США \| Door-to-Door \| Y7 Logistics | Перевозка авто по всем 50 штатам США. Открытые и закрытые трейлеры, уведомления о статусе на ключевых этапах, проверенные перевозчики. FMCSA лицензия MC #1741537. | https://www.y7agency.com/ru/ship-my-car | Перевозка авто между штатами США — от двери до двери | 1. Как это работает<br>2. Что влияет на стоимость перевозки<br>3. Сколько стоит перевезти стандартную машину<br>4. Сезонные закономерности цен<br>5. Цены зависят от календаря<br>6. Как подготовить авто к перевозке<br>7. Чего ожидать при заборе<br>8. Чего ожидать при доставке<br>9. Открытый или закрытый автовоз: что выбрать<br>10. Получите бесплатный расчёт<br>11. От расчёта до доставки<br>12. Частые вопросы о перевозке авто по США<br>13. Готовы перевезти авто? |
| /ru/track | Отследить доставку \| Y7 Logistics | Проверьте статус перевозки вашего авто от Y7 Logistics. Введите номер заявки или VIN, чтобы увидеть статус, дату забора, доставку и информацию о перевозчике. | https://www.y7agency.com/ru/track | Отследить перевозку | 1. Уже клиент? Используйте один из каналов: |
| /ru/contact | Контакты \| Y7 Logistics | Свяжитесь с Y7 Logistics по вопросам перевозки авто. Email info@y7agency.com, Telegram, личный кабинет. Натик, Массачусетс. Ответ в течение часа в рабочее время, FMCSA брокер. | https://www.y7agency.com/ru/contact | Контакты | 1. Как с нами связаться<br>2. Отправьте нам сообщение |
| /ru/faq | FAQ по автоперевозкам — брокер или перевозчик, цены, аукционы и экспорт \| Y7 Logistics | Ответы о том, как работает наша модель брокера с фиксированной платой, кто страхует вашу машину, заборе с аукционов (Copart/IAAI/Manheim) и экспорте через порты США. Лицензированный брокер FMCSA, MC #1741537. | https://www.y7agency.com/ru/faq | Часто задаваемые вопросы | 1. Общие вопросы<br>2. Для дилеров<br>3. Для экспортёров |
| /ru/about | О Y7 Logistics \| Y7 Logistics | Лицензированный FMCSA брокер авто-транспорта в Натике, Массачусетс. MC #1741537, USDOT #4427359. Проверенные перевозчики, прозрачные фиксированные цены. | https://www.y7agency.com/ru/about | Лицензированный FMCSA авто-брокер | 1. Зачем мы создали Y7<br>2. Как мы работаем<br>3. Что отличает Y7<br>4. Как Y7 общается с клиентами<br>5. Наши обязательства<br>6. Регистрация FMCSA<br>7. Контакты |
| /ru/quote | Получить бесплатный расчёт \| Y7 Logistics | Запросите бесплатный расчёт на перевозку авто от Y7 Logistics. Отвечаем в течение часа в рабочее время. Без обязательств. Лицензированный FMCSA брокер, перевозчики, цены. | https://www.y7agency.com/ru/quote | Получите бесплатный расчёт | 1. От расчёта до доставки |
| /ru/certificate-of-origin | Сертификат происхождения авто из США в ЕС: пошлина 0% \| Y7 Logistics | Автомобили американского производства ввозятся в ЕС с пошлиной 0% по регламенту (ЕС) 2026/1455; сертификат происхождения остаётся практическим способом это доказать. Y7 готовит и подаёт документы как постоянный агент: $99 для постоянных клиентов-экспортёров, $150 разово, eCO за 7 рабочих дней. | https://www.y7agency.com/ru/certificate-of-origin | Сертификат происхождения для экспорта авто из США в ЕС | 1. Нужна доставка в порт?<br>2. Что даёт сертификат происхождения при импорте в ЕС<br>3. Двойное доказательство: происхождение США и прямая перевозка (статья 59a UCC-IA)<br>4. Кто проходит: перечень условий<br>5. Цены и сроки<br>6. Перечень документов<br>7. Как проходит подача<br>8. Заказать сертификат происхождения<br>9. Частые вопросы<br>10. Готовы начать? |
| /ua/ports/newark | Доставка авто в порт Newark (Ньюарк), NJ \| Y7 Logistics | Транспортування авто в термінал Port Newark-Elizabeth. Доставка з аукціону та будь-якої локації в США до порту. Ліцензований брокер, перевірені перевізники. | https://www.y7agency.com/ua/ports/newark | Port Newark | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port Newark<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port Newark<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /ua/ports/houston | Доставка авто в порт Houston (Х'юстон), TX \| Y7 Logistics | Транспортування авто в Порт Houston — найбільший порт експорту авто в США. Доставка в порт з перевіреними перевізниками. | https://www.y7agency.com/ua/ports/houston | Port of Houston | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port of Houston<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port of Houston<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /ua/ports/savannah | Доставка авто в порт Savannah (Саванна), GA \| Y7 Logistics | Транспортування авто в Порт Savannah — хаб експорту на південному сході США. Конкурентні ставки в Європу та Африку. | https://www.y7agency.com/ua/ports/savannah | Port of Savannah | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port of Savannah<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port of Savannah<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /ua/ports/los-angeles | Доставка авто в порт Los Angeles (Лос-Анджелес), CA \| Y7 Logistics | Транспортування авто в Порт Los Angeles — ворота на Тихий океан, експорт в Азію та Австралію. Доставка з аукціону й локації в порт. | https://www.y7agency.com/ua/ports/los-angeles | Port of Los Angeles | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port of Los Angeles<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port of Los Angeles<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /ua/ports/baltimore | Доставка авто в порт Baltimore (Балтимор), MD \| Y7 Logistics | Транспортування авто в термінал Dundalk, Порт Baltimore — провідний Ro-Ro порт на експорт у Європу. Ліцензований брокер. | https://www.y7agency.com/ua/ports/baltimore | Port of Baltimore | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port of Baltimore<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port of Baltimore<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /ua/ports/jacksonville | Доставка авто в порт Jacksonville (Джексонвілл), FL \| Y7 Logistics | Транспортування авто в JAXPORT (Jacksonville) — ворота на Кариби та в Південну Америку. Доставка в порт. | https://www.y7agency.com/ua/ports/jacksonville | Port of Jacksonville | 1. Про порт<br>2. Адреса та години роботи термінала<br>3. Популярні маршрути — Port of Jacksonville<br>4. Необхідні документи<br>5. Зберігання та демередж<br>6. Напрямки морської доставки<br>7. Auction-to-Port Pipeline<br>8. Поради — Port of Jacksonville<br>9. Пов'язані послуги<br>10. Отримайте розрахунок доставки в порт |
| /pl/ports/newark | Transport auta do portu Newark, NJ \| Y7 Logistics | Transport aut do terminalu Port Newark-Elizabeth. Dostawa z aukcji i dowolnej lokalizacji w USA do portu. Licencjonowany broker, zweryfikowani przewoźnicy. | https://www.y7agency.com/pl/ports/newark | Port Newark | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port Newark<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port Newark<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /pl/ports/houston | Transport auta do portu Houston, TX \| Y7 Logistics | Transport aut do Portu Houston – największego portu eksportu pojazdów w USA. Dostawa do portu ze zweryfikowanymi przewoźnikami. | https://www.y7agency.com/pl/ports/houston | Port of Houston | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port of Houston<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port of Houston<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /pl/ports/savannah | Transport auta do portu Savannah, GA \| Y7 Logistics | Transport aut do Portu Savannah – hub eksportu na południowym wschodzie USA. Konkurencyjne stawki do Europy i Afryki. | https://www.y7agency.com/pl/ports/savannah | Port of Savannah | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port of Savannah<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port of Savannah<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /pl/ports/los-angeles | Transport auta do portu Los Angeles, CA \| Y7 Logistics | Transport aut do Portu Los Angeles – brama na Pacyfik, eksport do Azji i Australii. Dostawa z aukcji i lokalizacji do portu. | https://www.y7agency.com/pl/ports/los-angeles | Port of Los Angeles | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port of Los Angeles<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port of Los Angeles<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /pl/ports/baltimore | Transport auta do portu Baltimore, MD \| Y7 Logistics | Transport aut do terminalu Dundalk w Porcie Baltimore – czołowy port Ro-Ro na eksport do Europy. Licencjonowany broker. | https://www.y7agency.com/pl/ports/baltimore | Port of Baltimore | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port of Baltimore<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port of Baltimore<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /pl/ports/jacksonville | Transport auta do portu Jacksonville, FL \| Y7 Logistics | Transport aut do JAXPORT (Jacksonville) – brama na Karaiby i do Ameryki Południowej. Dostawa do portu. | https://www.y7agency.com/pl/ports/jacksonville | Port of Jacksonville | 1. O porcie<br>2. Adres i godziny pracy terminalu<br>3. Popularne trasy — Port of Jacksonville<br>4. Wymagane dokumenty<br>5. Magazynowanie i demurrage<br>6. Kierunki wysyłki morskiej<br>7. Auction-to-Port Pipeline<br>8. Wskazówki — Port of Jacksonville<br>9. Powiązane usługi<br>10. Uzyskaj wycenę dostawy do portu |
| /ru/ports/newark | Доставка авто в порт Newark (Ньюарк), NJ \| Y7 Logistics | Транспортировка авто в терминал Port Newark-Elizabeth. Доставка с аукциона и из любой локации в США до порта. Лицензированный брокер, проверенные перевозчики. | https://www.y7agency.com/ru/ports/newark | Port Newark | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port Newark<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port Newark<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /ru/ports/houston | Доставка авто в порт Houston (Хьюстон), TX \| Y7 Logistics | Транспортировка авто в Порт Houston — крупнейший порт экспорта авто в США. Доставка в порт с проверенными перевозчиками. | https://www.y7agency.com/ru/ports/houston | Port of Houston | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port of Houston<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port of Houston<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /ru/ports/savannah | Доставка авто в порт Savannah (Саванна), GA \| Y7 Logistics | Транспортировка авто в Порт Savannah — хаб экспорта на юго-востоке США. Конкурентные ставки в Европу и Африку. | https://www.y7agency.com/ru/ports/savannah | Port of Savannah | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port of Savannah<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port of Savannah<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /ru/ports/los-angeles | Доставка авто в порт Los Angeles (Лос-Анджелес), CA \| Y7 Logistics | Транспортировка авто в Порт Los Angeles — ворота на Тихий океан, экспорт в Азию и Австралию. Доставка с аукциона и из локации в порт. | https://www.y7agency.com/ru/ports/los-angeles | Port of Los Angeles | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port of Los Angeles<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port of Los Angeles<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /ru/ports/baltimore | Доставка авто в порт Baltimore (Балтимор), MD \| Y7 Logistics | Транспортировка авто в терминал Dundalk, Порт Baltimore — ведущий Ro-Ro порт на экспорт в Европу. Лицензированный брокер. | https://www.y7agency.com/ru/ports/baltimore | Port of Baltimore | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port of Baltimore<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port of Baltimore<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /ru/ports/jacksonville | Доставка авто в порт Jacksonville (Джексонвилл), FL \| Y7 Logistics | Транспортировка авто в JAXPORT (Jacksonville) — ворота на Карибы и в Южную Америку. Доставка в порт. | https://www.y7agency.com/ru/ports/jacksonville | Port of Jacksonville | 1. О порте<br>2. Адрес и часы работы терминала<br>3. Популярные маршруты — Port of Jacksonville<br>4. Необходимые документы<br>5. Хранение и демередж<br>6. Направления морской доставки<br>7. Auction-to-Port Pipeline<br>8. Советы — Port of Jacksonville<br>9. Сопутствующие услуги<br>10. Получите расчёт доставки в порт |
| /pl/transport-z-usa | Sprowadzanie aut z USA do Polski — Y7 Logistics & DaytonaCargo | Y7 Logistics (FMCSA, MC #1741537) i DaytonaCargo — kompleksowe sprowadzanie aut z USA do Polski. Od Copart i IAAI przez transport lądowy w USA po fracht morski i dostawę pod dom. Przejrzyste ceny, realny czas realizacji. | https://www.y7agency.com/pl/transport-z-usa | Sprowadzanie aut z USA do Polski — od licytacji po dostawę pod dom | 1. Dwie firmy, jeden łańcuch logistyczny<br>2. Jak wygląda cały proces — krok po kroku<br>3. Rzeczywiste koszty — cztery składowe<br>4. Kiedy import z USA się opłaca<br>5. Pułapki, o których nikt nie mówi wprost<br>6. Najczęściej zadawane pytania<br>7. Mieszkasz w Stanach? Obsługujemy transport również u Ciebie<br>8. Potrzebujesz dostawy do portu?<br>9. Rozważasz sprowadzenie auta z USA? |
| /pl/transport-z-aukcji | Sprowadzanie aut z Copart do Polski — przewodnik 2026 \| Y7 & DaytonaCargo | Kompleksowy przewodnik po sprowadzaniu aut z aukcji Copart do Polski. Realne koszty, terminy, pułapki. Y7 Logistics obsługuje transport w USA, DaytonaCargo zajmuje się frachtem i dostawą do Polski. | https://www.y7agency.com/pl/transport-z-aukcji | Sprowadzanie aut z Copart do Polski — przewodnik bez marketingowego lukru | 1. Czym tak naprawdę jest Copart<br>2. Copart czy IAAI — różnica dla polskiego importera<br>3. Opłaty Copart — czego nie pokazuje cena wyświetlana na licytacji<br>4. Transport z placu Copart do portu — rola Y7 Logistics<br>5. Siedem pułapek przy kupowaniu na Copart<br>6. Jak wygląda współpraca z Y7 i DaytonaCargo<br>7. Pytania, które słyszymy najczęściej<br>8. Kupujesz na Copart i mieszkasz w USA? Dostarczymy pod dom<br>9. Potrzebujesz dostawy do portu?<br>10. Masz wybrane auto na Copart? |
| /pl/wysylka-auta-z-usa | Zamów transport auta z USA — dla Polski i Polonii w USA \| Y7 Logistics | Zamów transport auta z aukcji Copart lub IAAI. Y7 Logistics (broker FMCSA MC #1741537) obsługuje transport lądowy w USA. Dla importu do Polski — siostrzana firma DaytonaCargo. Wycena w 1 godzinę. | https://www.y7agency.com/pl/wysylka-auta-z-usa | Zamów transport auta z USA — prosto, bez ukrytych opłat | 1. Co przygotować przed złożeniem zlecenia<br>2. Jak wygląda proces importu do Polski — krok po kroku<br>3. Orientacyjne koszty transportu do Polski<br>4. Dlaczego warto zaufać Y7 × DaytonaCargo<br>5. Skontaktuj się z nami<br>6. Mieszkasz w Stanach? Transport w USA bez wysyłki do Polski<br>7. Najczęściej zadawane pytania<br>8. Potrzebujesz dostawy do portu?<br>9. Gotowy do zamówienia transportu? |
| /ua/import-z-usa | Пригін авто з США в Україну \| Y7 Logistics — ліцензований FMCSA-брокер | Пригін авто з аукціонів Copart та IAAI в Україну. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Три маршрути доставки, прозорі ціни, розрахунок за 1 годину. | https://www.y7agency.com/ua/import-z-usa | Пригін авто з США в Україну — чесно, прозоро, з українськомовною підтримкою | 1. Чому варто обрати Y7 Logistics<br>2. Три маршрути доставки в Україну<br>3. Як виглядає процес — крок за кроком<br>4. Орієнтовні витрати на логістику<br>5. Живете в Штатах? Перевозимо авто по всій країні<br>6. Зв’яжіться з нами<br>7. Часті запитання<br>8. Потрібна доставка до порту?<br>9. Готові почати? |
| /ua/copart-ta-iaai | Copart — пригін авто з аукціону в Україну \| Y7 Logistics | Copart пригін авто в Україну: реальна ціна, три маршрути доставки (Гдиня, Клайпеда, Констанца), українськомовна підтримка. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537). | https://www.y7agency.com/ua/copart-ta-iaai | Пригін авто з Copart в Україну — чесний гайд без маркетингу | 1. Що таке Copart насправді<br>2. Copart vs IAAI — у чому різниця<br>3. На що звернути увагу до ставки<br>4. Реальний приклад: Copart Dallas → Одеса<br>5. Коли вам потрібен Y7 для Copart<br>6. Як це працює<br>7. Що потрібно від вас<br>8. Наші можливості<br>9. Орієнтовні витрати на логістику<br>10. Чому Y7 Logistics<br>11. Для діаспори в США — Copart під дім<br>12. Часті запитання |
| /ua/dostavka-avto-z-usa | Замовити пригін авто з США в Україну \| Y7 Logistics | Замовте пригін авто з аукціонів Copart або IAAI. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Розрахунок за 1 годину, без прихованих комісій. | https://www.y7agency.com/ua/dostavka-avto-z-usa | Замовте пригін авто з США — просто і без прихованих комісій | 1. Що підготувати перед замовленням<br>2. Як виглядає процес замовлення — крок за кроком<br>3. Орієнтовні витрати<br>4. Звʼяжіться з нами<br>5. Типові замовлення від діаспори<br>6. Часті запитання<br>7. Потрібна доставка до порту?<br>8. Готові замовити пригін? |
| /ru/dostavka-avto-iz-usa | Перевозка автомобилей по США — Y7 Logistics | Y7 Logistics (MC #1741537) — перевозка авто по всем 50 штатам. Доставка с Copart и IAAI, до порта, дилерские маршруты. Русскоязычная поддержка. | https://www.y7agency.com/ru/dostavka-avto-iz-usa | Перевозка автомобилей по всей территории США — от аукциона до вашего адреса | 1. Наши услуги<br>2. Как это работает<br>3. Ориентировочная стоимость<br>4. Примеры реальных маршрутов<br>5. На что обратить внимание<br>6. Часто задаваемые вопросы<br>7. Что говорят клиенты<br>8. Работаем с основными портами США<br>9. Нужна доставка в порт?<br>10. Готовы перевезти автомобиль? |
| /ru/copart-i-iaai | Доставка с Copart и IAAI по США — Y7 Logistics | Перевозка авто с аукционов Copart и IAAI по всей территории США. Забор с площадки, доставка до адреса или порта. Брокер FMCSA MC #1741537. | https://www.y7agency.com/ru/copart-i-iaai | Перевозка автомобилей с аукционов Copart и IAAI по всей территории США | 1. Что такое Copart и IAAI<br>2. Сравнение Copart и IAAI<br>3. Какие расходы учитывать<br>4. Популярные маршруты с аукционов<br>5. 7 ошибок при покупке на аукционе<br>6. Как заказать перевозку с аукциона<br>7. Часто задаваемые вопросы<br>8. Нужна доставка в порт?<br>9. Выиграли лот? Закажите перевозку |
| /ru/perevozka-avto | Заказать перевозку авто по США — Y7 Logistics | Закажите перевозку авто по США: от аукциона до двери, между городами, до порта. Расчёт за минуты, фиксированная цена. MC #1741537. | https://www.y7agency.com/ru/perevozka-avto | Заказать перевозку автомобиля по США | 1. Что подготовить перед заказом<br>2. Как оформить заказ<br>3. Почему Y7 Logistics<br>4. Свяжитесь с нами<br>5. Открытый или закрытый автовоз — что выбрать<br>6. Что влияет на итоговую цену<br>7. Высокий сезон — о чём стоит знать<br>8. Как проходит забор и доставка<br>9. Часто задаваемые вопросы<br>10. Готовы заказать перевозку? |
| /404 | Page not found \| Y7 Logistics | The page you | https://www.y7agency.com/404 | Page not found | 1. Ship My Car<br>2. For Dealers<br>3. For Exporters |

## 8. JSON-LD inventory

| `@type` | Node count | Routes with type | Organization relationship |
|---|---:|---:|---|
| LocalBusiness | 143 | 143 | Root node itself, `@id=https://www.y7agency.com/#organization` |
| BreadcrumbList | 123 | 123 | No organization reference |
| Service | 54 | 53 | All 54 reference `#organization`; `/copart-shipping` has two Service nodes |
| FAQPage | 58 | 58 | No organization reference |
| JobPosting | 1 | 1 | References `#organization` |
| CollectionPage | 1 | 1 | References `#organization` |
| BlogPosting | 18 | 18 | All reference `#organization` |

There were no JSON parse errors and no `aggregateRating` property anywhere in built JSON-LD. Across dependent schema, 74 nodes reference `#organization`; 181 BreadcrumbList/FAQPage nodes are structurally floating with respect to the organization. The root LocalBusiness node is present in all 143 pages because it originates in the shared HTML template.

### Exhaustive built schema ledger

The order in the “nodes” column follows the order of JSON-LD scripts/nodes in each HTML document. “Own org ID” counts the LocalBusiness node’s own `@id`; “org refs” counts dependent references to that ID.

| Route | JSON-LD nodes in document order | Own org ID | Org refs | aggregateRating |
|---|---|---:|---:|---:|
| / | LocalBusiness | 1 | 0 | 0 |
| /services | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /dealers | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /exporters | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /ship-my-car | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /quote | LocalBusiness | 1 | 0 | 0 |
| /quote-verified | LocalBusiness | 1 | 0 | 0 |
| /quote-verification-failed | LocalBusiness | 1 | 0 | 0 |
| /track | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /contact | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /faq | LocalBusiness → BreadcrumbList → FAQPage | 1 | 0 | 0 |
| /about | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /careers | LocalBusiness → BreadcrumbList → JobPosting → FAQPage | 1 | 1 | 0 |
| /careers/apply | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /dealer-quote | LocalBusiness | 1 | 0 | 0 |
| /daytonacargo | LocalBusiness | 1 | 0 | 0 |
| /privacy | LocalBusiness | 1 | 0 | 0 |
| /terms | LocalBusiness | 1 | 0 | 0 |
| /accessibility | LocalBusiness | 1 | 0 | 0 |
| /car-shipping-cost | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /enclosed-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /auction-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /auction-transport-savings | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /copart-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service → Service | 1 | 2 | 0 |
| /iaai-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /manheim-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /door-to-port-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /dealer-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /salvage-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /open-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /state-to-state-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /massachusetts-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /boston-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /newton-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /florida-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /new-jersey-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /nj-export-warehouse-shipping-cost | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /texas-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /massachusetts-to-florida-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /new-jersey-to-florida-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /texas-to-newark-port-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /chicago-to-port-newark-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /auction-to-port-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /atlanta-to-savannah-port-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /dallas-to-port-houston-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /florida-to-jacksonville-port-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /tesla-car-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /ev-auto-transport | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /cybertruck-shipping | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /electric-vehicle-port-delivery | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /how-to-ship-a-car-bought-at-auction | LocalBusiness | 1 | 0 | 0 |
| /open-vs-enclosed-auto-transport | LocalBusiness | 1 | 0 | 0 |
| /what-is-a-bill-of-lading | LocalBusiness | 1 | 0 | 0 |
| /copart-storage-fees | LocalBusiness → BreadcrumbList → FAQPage | 1 | 0 | 0 |
| /copart-gate-pass-guide | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /copart-international-shipping | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /certificate-of-origin | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /ports/newark | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ports/houston | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ports/savannah | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ports/los-angeles | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ports/baltimore | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ports/jacksonville | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /blog | LocalBusiness → CollectionPage → BreadcrumbList | 1 | 1 | 0 |
| /blog/carrier-who-vanished | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/carrier-coi-verification-guide | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/fmcsa-2026-new-rules | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/outbox-pattern-dispatch | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/dealer-auction-pickup-guide | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/exporter-documentation-checklist | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/fmcsa-broker-recordkeeping-2026 | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/75000-bond-claims-guide | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/copart-iaa-manheim-comparison | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/auction-to-port-cost-breakdown-2026 | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/central-dispatch-listing-decoded | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/enclosed-transport-when-to-skip | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/non-running-vehicle-shipping-playbook | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/winter-auto-transport-pricing | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/bill-of-lading-pickup-delivery-guide | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/port-specific-export-newark-houston-savannah | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /blog/copart-storage-fees-real-cost-2026 | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 2 | 0 |
| /blog/copart-for-international-buyers-complete-guide | LocalBusiness → BlogPosting → BreadcrumbList | 1 | 1 | 0 |
| /ua | LocalBusiness | 1 | 0 | 0 |
| /ua/services | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /ua/dealers | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /ua/exporters | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /ua/ship-my-car | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /ua/track | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/contact | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/faq | LocalBusiness → BreadcrumbList → FAQPage | 1 | 0 | 0 |
| /ua/about | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/quote | LocalBusiness | 1 | 0 | 0 |
| /ua/certificate-of-origin | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /pl | LocalBusiness | 1 | 0 | 0 |
| /pl/services | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /pl/dealers | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /pl/exporters | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /pl/ship-my-car | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /pl/track | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/contact | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/faq | LocalBusiness → BreadcrumbList → FAQPage | 1 | 0 | 0 |
| /pl/about | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/quote | LocalBusiness | 1 | 0 | 0 |
| /pl/certificate-of-origin | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /ru | LocalBusiness | 1 | 0 | 0 |
| /ru/services | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /ru/dealers | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /ru/exporters | LocalBusiness → BreadcrumbList → Service → FAQPage | 1 | 1 | 0 |
| /ru/ship-my-car | LocalBusiness → BreadcrumbList → Service | 1 | 1 | 0 |
| /ru/track | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/contact | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/faq | LocalBusiness → BreadcrumbList → FAQPage | 1 | 0 | 0 |
| /ru/about | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/quote | LocalBusiness | 1 | 0 | 0 |
| /ru/certificate-of-origin | LocalBusiness → BreadcrumbList → FAQPage → Service | 1 | 1 | 0 |
| /ua/ports/newark | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/ports/houston | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/ports/savannah | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/ports/los-angeles | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/ports/baltimore | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ua/ports/jacksonville | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/newark | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/houston | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/savannah | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/los-angeles | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/baltimore | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/ports/jacksonville | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/newark | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/houston | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/savannah | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/los-angeles | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/baltimore | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /ru/ports/jacksonville | LocalBusiness → BreadcrumbList | 1 | 0 | 0 |
| /pl/transport-z-usa | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /pl/transport-z-aukcji | LocalBusiness → FAQPage → Service | 1 | 1 | 0 |
| /pl/wysylka-auta-z-usa | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /ua/import-z-usa | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /ua/copart-ta-iaai | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /ua/dostavka-avto-z-usa | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /ru/dostavka-avto-iz-usa | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /ru/copart-i-iaai | LocalBusiness → FAQPage → Service → BreadcrumbList | 1 | 1 | 0 |
| /ru/perevozka-avto | LocalBusiness → FAQPage → BreadcrumbList | 1 | 0 | 0 |
| /404 | LocalBusiness | 1 | 0 | 0 |

## 9. Entity, address, authority, phone, and pricing inventory

### Runtime conclusions

- The canonical runtime entity is `Y7 Logistics`; the root structured-data `legalName` is `Y7 Consulting Inc`.
- The canonical public address is `6 Harding Rd, Natick, MA 01760` and appears in the root schema and localized contact/address copy.
- Runtime `02458`: zero occurrences.
- Runtime `Y7 Logistics LLC`: one occurrence, `src/pages/ports/PortPage.jsx:254`.
- Newton occurrences describe the `/newton-auto-transport` service area. The page explicitly states that Y7 is based in Natick. `Chestnut` runtime occurrences are Chestnut Hill neighborhood references, not the superseded office address.
- No fixed public Y7 telephone number or public telephone JSON-LD field is present. Phone-like values are input examples/placeholders or authenticated driver data. The repository safety workflow explicitly asserts that the public site has no phone number.
- MC `1741537` and USDOT `4427359` are the active identifiers found on public surfaces.

### Pricing baseline

**FACT from current project policy:** dealers and exporters pay a flat `$50 per vehicle`; individuals pay the greater of `$75` or `10% of the carrier price`. Carrier rate is separate.

**FACT from runtime:** individual pricing matches that rule on the audited surfaces. Dealer/exporter public copy does not: `MoneyPageSchema.jsx` publishes `$50-$60`, and EN/PL/RU/UA FAQ plus several SEO pages state `$60 when Y7 also handles carrier payment`. `IaaiTransport.jsx` still says `$40-$60 dispatch fee`. These are measured inconsistencies; CODEX-01 does not choose or apply a correction.

#### Exact pricing-policy conflicts

| File and line | Runtime statement |
|---|---|
| `src/components/MoneyPageSchema.jsx:19-21` | Dealer fee comment says `$50/load, $60 when Y7 pays the carrier`; structured `priceRange` is `$50-$60` |
| `src/locales/en/faq.json:24` | Flat $50, conditional $60, and individual max($75, 10%) |
| `src/locales/pl/faq.json:28` | Localized equivalent |
| `src/locales/ru/faq.json:28` | Localized equivalent |
| `src/locales/ua/faq.json:28` | Localized equivalent |
| `src/pages/seo/AuctionTransportSavings.jsx:92,122,192` | Conditional $60 dealer/exporter fee |
| `src/pages/seo/DoorToPort.jsx:206` | Conditional $60 dealer/exporter fee |
| `src/pages/seo/NjExportWarehouseShippingCost.jsx:11,58,292` | Conditional $60 dealer/exporter fee |
| `src/pages/seo/IaaiTransport.jsx:30` | Retired generic `$40-$60 dispatch fee` |

Individual price logic is also represented in portal code at `src/pages/portal/NewOrder.jsx:244,1192` and `src/pages/portal/OrderDetail.jsx:941,946` as the greater of $75 or 10% of carrier price.

### Exhaustive tracked-text grep ledger

Scope is every Git-tracked text/code file with a standard source, configuration, documentation, style, JSON, HTML, XML, or text extension. Line inventories are compact: `123x2` means two occurrences on line 123. “Runtime/generated” covers `src/`, `public/`, `scripts/`, `index.html`, and `server.js`; the second group preserves historical/documentary conflicts without treating them as live output.

#### Y7 Consulting

Total exact regex occurrences: **126** across **35** tracked text files.

- **runtime/generated:** 76 occurrences
  - index.html: 34
  - public/llms.txt: 3
  - src/locales/en/about.json: 6, 72
  - src/locales/en/agreement_dealer.json: 7, 41
  - src/locales/en/agreement.json: 6x2, 9, 116, 125
  - src/locales/en/common.json: 47, 69, 173
  - src/locales/en/privacy.json: 5, 8, 181
  - src/locales/en/quote.json: 99, 101
  - src/locales/en/terms.json: 5x2, 55, 59, 77, 93, 125
  - src/locales/pl/about.json: 6, 72
  - src/locales/pl/agreement_dealer.json: 7, 41
  - src/locales/pl/agreement.json: 7, 15x2, 19, 31, 35, 41
  - src/locales/pl/common.json: 47, 69, 170
  - src/locales/pl/quote.json: 99, 101
  - src/locales/ru/about.json: 6, 72
  - src/locales/ru/agreement_dealer.json: 7, 41
  - src/locales/ru/agreement.json: 7, 15x2, 19, 31, 35, 41
  - src/locales/ru/common.json: 47, 69, 170
  - src/locales/ru/quote.json: 99, 101
  - src/locales/ua/about.json: 6, 72
  - src/locales/ua/agreement_dealer.json: 7, 41
  - src/locales/ua/agreement.json: 7, 15x2, 19, 31, 35, 41
  - src/locales/ua/common.json: 47, 69, 170
  - src/locales/ua/quote.json: 99, 101
  - src/pages/intl/RussiaShipMyCar.jsx: 321
  - src/pages/PrivacyPolicy.jsx: 21
- **documentation/config/history:** 50 occurrences
  - .github/workflows/safety-check.yml: 66
  - AGENTS.md: 139
  - audit/footer.md: 17
  - CAREERS_TRANSPORT_FOLLOWUP.md: 368
  - DESIGN.md: 260
  - docs/audits/raw/wave0/T02b_matches_all.txt: 27, 105
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 66, 71, 111, 114, 218, 362x2, 363, 364, 382, 383, 384, 385x2, 386, 387, 389, 390, 407, 408, 425, 426, 584x2, 585, 586, 597, 598, 599, 600x2, 601, 602, 604, 605, 616, 617, 628, 629, 678
  - LEGAL_ACCURACY_REPORT.md: 5, 118
  - P2_TRUST_REPORT.md: 102

#### Y7 Logistics

Total exact regex occurrences: **836** across **145** tracked text files.

- **runtime/generated:** 368 occurrences
  - index.html: 11, 12, 14, 18, 24, 33, 93
  - public/llms.txt: 1, 3, 18, 119, 133, 147
  - public/robots.txt: 2
  - scripts/seo-baseline.json: 3, 119, 125, 134, 330, 336, 353, 477, 483, 504, 588, 594, 607, 702, 708, 729, 800, 806, 827, 942, 948, 969, 1052, 1058, 1079, 1150, 1156, 1177, 1248, 1254, 1275, 1350, 1356
  - src/components/AccountTypeModal.jsx: 252
  - src/components/AnimatedLogo.jsx: 7
  - src/components/PageMeta.jsx: 33, 34, 35, 37, 38, 50
  - src/locales/en/about.json: 2, 6
  - src/locales/en/agreement_dealer.json: 7, 15, 35
  - src/locales/en/agreement.json: 6
  - src/locales/en/certificateOfOrigin.json: 3, 7, 11
  - src/locales/en/common.json: 30, 47, 70, 118, 124, 127, 128, 131, 133, 134, 135, 136
  - src/locales/en/dealers.json: 4
  - src/locales/en/exporters.json: 4
  - src/locales/en/faq.json: 3, 6, 15
  - src/locales/en/ports.json: 8, 40
  - src/locales/en/quote.json: 101, 146, 153
  - src/locales/en/terms.json: 5, 59
  - src/locales/pl/about.json: 2, 6
  - src/locales/pl/agreement_dealer.json: 7, 15, 35
  - src/locales/pl/agreement.json: 7
  - src/locales/pl/certificateOfOrigin.json: 3, 7, 11
  - src/locales/pl/common.json: 30, 47, 70, 118, 124, 127, 128, 131, 133
  - src/locales/pl/dealers.json: 4
  - src/locales/pl/exporters.json: 4
  - src/locales/pl/faq.json: 3, 8, 10, 19
  - src/locales/pl/ports.json: 8, 40
  - src/locales/pl/quote.json: 146, 153
  - src/locales/ru/about.json: 2, 6
  - src/locales/ru/agreement_dealer.json: 7, 15, 35
  - src/locales/ru/agreement.json: 7
  - src/locales/ru/certificateOfOrigin.json: 3, 7, 11
  - src/locales/ru/common.json: 30, 47, 70, 118, 124, 127, 128, 131, 133
  - src/locales/ru/dealers.json: 4
  - src/locales/ru/exporters.json: 4
  - src/locales/ru/faq.json: 3, 8, 10, 19
  - src/locales/ru/ports.json: 8, 40
  - src/locales/ru/quote.json: 146, 153
  - src/locales/ua/about.json: 2, 6
  - src/locales/ua/agreement_dealer.json: 7, 15, 35
  - src/locales/ua/agreement.json: 7
  - src/locales/ua/certificateOfOrigin.json: 3, 7, 11
  - src/locales/ua/common.json: 30, 47, 70, 118, 124, 127, 128, 131, 133
  - src/locales/ua/dealers.json: 4
  - src/locales/ua/exporters.json: 4
  - src/locales/ua/faq.json: 3, 8, 10, 19
  - src/locales/ua/ports.json: 8, 40
  - src/locales/ua/quote.json: 146, 153
  - src/pages/Accessibility.jsx: 10, 23
  - src/pages/blog/articles/BondClaimsGuide.jsx: 149
  - src/pages/blog/articles/CarrierCOIVerification.jsx: 152
  - src/pages/blog/articles/CarrierWhoVanished.jsx: 152
  - src/pages/blog/articles/CopartInternationalBuyersGuide.jsx: 144
  - src/pages/blog/articles/DealerAuctionPickupGuide.jsx: 103
  - src/pages/blog/articles/ExporterDocumentationChecklist.jsx: 130
  - src/pages/blog/articles/FMCSA2026NewRules.jsx: 26, 155
  - src/pages/blog/articles/FMCSABrokerRecordkeeping.jsx: 122
  - src/pages/blog/articles/OutboxPatternDispatch.jsx: 150
  - src/pages/blog/BlogArticle.jsx: 175, 196
  - src/pages/blog/BlogIndex.jsx: 23, 29
  - src/pages/CareerApplication.jsx: 139, 168, 382
  - src/pages/Careers.jsx: 78, 85, 112, 113, 125, 334
  - src/pages/FAQ.jsx: 107
  - src/pages/intl/PolandCopart.jsx: 54, 57, 97, 148, 307, 312, 462, 528
  - src/pages/intl/PolandHome.jsx: 40, 43, 95, 98, 100, 125, 202, 272, 553
  - src/pages/intl/PolandShipMyCar.jsx: 13, 45, 61, 69, 131, 174, 177, 181, 390
  - src/pages/intl/RussiaCopart.jsx: 72, 202, 205, 230, 256, 283
  - src/pages/intl/RussiaHome.jsx: 45, 48, 69, 200, 217, 218, 220, 245, 252
  - src/pages/intl/RussiaShipMyCar.jsx: 138, 141, 224
  - src/pages/intl/UkraineCopart.jsx: 248, 251, 255, 271, 309, 531, 533
  - src/pages/intl/UkraineHome.jsx: 56, 75, 263, 266, 270, 273, 286, 319, 376, 380
  - src/pages/intl/UkraineShipMyCar.jsx: 45, 61, 190, 193, 197, 200, 213, 236, 366, 369
  - src/pages/MagicLogin.jsx: 161
  - src/pages/portal/AcceptInvitation.jsx: 142
  - src/pages/portal/Onboarding.jsx: 67, 853
  - src/pages/ports/PortPage.jsx: 254
  - src/pages/PrivacyPolicy.jsx: 21
  - src/pages/ReviewSubmit.jsx: 51, 70x2
  - src/pages/seo/AuctionCarShipping.jsx: 19, 25
  - src/pages/seo/AuctionTransportSavings.jsx: 99, 105
  - src/pages/seo/CarShippingCost.jsx: 44, 50, 92, 251
  - src/pages/seo/CopartShipping.jsx: 169, 176, 180
  - src/pages/seo/CybertruckShipping.jsx: 33, 147
  - src/pages/seo/DealerAutoTransport.jsx: 19, 25, 134
  - src/pages/seo/DoorToPort.jsx: 31, 39, 43, 155
  - src/pages/seo/ElectricVehiclePortDelivery.jsx: 42
  - src/pages/seo/EnclosedCarShipping.jsx: 8, 16
  - src/pages/seo/EVAutoTransport.jsx: 46
  - src/pages/seo/guides/BillOfLading.jsx: 113, 127
  - src/pages/seo/guides/CopartStorageFees.jsx: 16
  - src/pages/seo/guides/HowToShipAuctionCar.jsx: 12, 89, 110, 113, 148, 160
  - src/pages/seo/guides/OpenVsEnclosed.jsx: 14, 145, 157
  - src/pages/seo/IaaiTransport.jsx: 20, 26, 30, 128, 233
  - src/pages/seo/locations/BostonCarShipping.jsx: 16, 88
  - src/pages/seo/locations/FloridaCarShipping.jsx: 8, 16
  - src/pages/seo/locations/MassachusettsCarShipping.jsx: 8, 16, 111
  - src/pages/seo/locations/NewJerseyAutoTransport.jsx: 9, 17
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 35, 41, 114
  - src/pages/seo/locations/TexasAutoTransport.jsx: 8, 16
  - src/pages/seo/ManheimTransport.jsx: 19, 25, 29, 129
  - src/pages/seo/NjExportWarehouseShippingCost.jsx: 21, 29
  - src/pages/seo/OpenCarShipping.jsx: 8, 16, 103
  - src/pages/seo/routes/AtlantaToSavannah.jsx: 10, 18, 22
  - src/pages/seo/routes/AuctionToPort.jsx: 10, 18, 22
  - src/pages/seo/routes/DallasToHouston.jsx: 10, 18, 22
  - src/pages/seo/routes/FloridaToJacksonville.jsx: 10, 18, 22
  - src/pages/seo/routes/MassachusettsToFlorida.jsx: 10, 18
  - src/pages/seo/routes/NewJerseyToFlorida.jsx: 10, 18
  - src/pages/seo/routes/TexasToNewark.jsx: 18
  - src/pages/seo/SalvageCarShipping.jsx: 8, 16
  - src/pages/seo/StateToState.jsx: 8, 16, 97
  - src/pages/seo/TeslaCarShipping.jsx: 41, 44, 136
  - src/pages/Terms.jsx: 24
- **documentation/config/history:** 468 occurrences
  - .github/workflows/safety-check.yml: 66
  - AGENTS.md: 1, 137, 139
  - audit/cross_links.md: 13
  - CAREERS_TRANSPORT_FOLLOWUP.md: 293, 351, 368
  - CLAUDE.md: 1
  - DESIGN_SPRINT_1_REPORT.md: 149, 185
  - DESIGN.json: 4, 473
  - DESIGN.md: 2, 98, 260x3
  - docs/audits/LEGAL_DISCLAIMER_CONTACT_AUDIT.md: 106
  - docs/audits/NJPORTS_PHASE0_AUDIT.md: 198, 210, 215, 220, 222, 227, 229
  - docs/audits/raw/wave0/T02b_matches_all.txt: 27, 59, 60, 63, 82, 105, 139, 143, 147, 155, 162, 164, 167, 170, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 214, 215, 216, 218, 237, 241, 245, 249, 254, 261, 263, 266, 269
  - docs/audits/raw/wave0/T03_mutation_proof.txt: 14, 20
  - docs/audits/raw/webfix/P0_dist_crawl.txt: 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 39x4
  - docs/audits/raw/webfix/P1_dist_crawl_after.txt: 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34
  - docs/audits/raw/webfix/P2_dist_crawl_close.txt: 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34
  - docs/audits/raw/webfix2/P0_not_indexed.txt: 3, 5, 6, 10, 11, 13, 14, 16, 17, 18
  - docs/audits/raw/webfix2/P1_dist_crawl.txt: 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34
  - docs/audits/raw/webfix2/P1_not_indexed_after.txt: 3, 5, 6, 10, 11, 13, 14, 16, 17, 18
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 31, 32, 35, 36, 41, 42, 43, 44, 45, 46, 48, 49, 83, 84, 85, 111, 114x3, 115, 116, 117, 118, 119, 121, 123, 125, 138, 140, 141, 142, 143, 144, 150, 152, 153, 157, 159, 160, 161, 167, 168, 169, 173, 175, 176, 177, 183, 184, 185, 189, 191, 192, 193, 218, 252, 256, 260, 268, 275, 277, 280, 283, 362, 364, 365, 366, 367, 372, 375, 377, 378, 379, 384, 385, 389, 390, 391, 392, 393, 399, 401, 402, 403, 407, 408, 409, 410, 411, 417, 419, 420, 421, 425, 426, 427, 428, 429, 435, 437, 438, 439, 448, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 468, 469, 475, 476, 477, 488, 491, 492, 493, 501, 507, 509, 512, 513, 515, 524, 526, 527, 529, 531, 532, 533, 534, 536, 538, 540, 541, 543, 545, 546, 548, 551, 554, 556, 558, 560, 562, 563, 564, 565, 566, 567, 569, 584, 586, 587, 588, 592, 593, 594, 595, 599, 600, 604, 605, 606, 607, 610, 611, 612, 613, 616, 617, 618, 619, 622, 623, 624, 625, 628, 629, 630, 631, 634, 635, 636, 637, 660, 661, 662, 663, 664, 666, 669, 671, 672, 675, 689, 692, 693, 694, 695, 696, 697, 698, 700, 701, 704, 709, 710, 712, 714, 716, 718, 719, 721, 722, 723, 724, 725, 726, 727
  - docs/audits/raw/webgeo/out/T07_co_answers.txt: 47, 48
  - docs/audits/raw/webgeo/out/T07_co_content.md: 9, 21, 33, 421, 433, 445, 833, 845, 857, 1245, 1257, 1269
  - docs/audits/WEBGEO_PHASE0.md: 666, 669, 676, 695, 696, 699, 843
  - docs/sprints/NJPORTS_2_REPORT.md: 109
  - docs/sprints/NJPORTS_3_REPORT.md: 106
  - docs/sprints/VIS2_VERIFICATION.md: 25
  - FULL_SITE_AUDIT.md: 115, 125, 144, 163, 209x4, 228
  - INTL_FIX_REPORT.md: 19, 190, 200
  - LEGAL_ACCURACY_REPORT.md: 118
  - NAV_UX_REPORT.md: 27, 128, 129, 198, 318
  - OVERNIGHT_SPRINT_REPORT.md: 54
  - P2_TRUST_REPORT.md: 77, 103
  - PRODUCT.md: 9, 21

#### Y7 Logistics LLC

Total exact regex occurrences: **1** across **1** tracked text files.

- **runtime/generated:** 1 occurrences
  - src/pages/ports/PortPage.jsx: 254
- **documentation/config/history:** 0 occurrences
  - none

#### LLC

Total exact regex occurrences: **29** across **14** tracked text files.

- **runtime/generated:** 11 occurrences
  - src/locales/en/privacy.json: 78
  - src/pages/CareerApplication.jsx: 210
  - src/pages/intl/PolandCopart.jsx: 57, 150
  - src/pages/intl/PolandHome.jsx: 43, 134, 223
  - src/pages/intl/PolandShipMyCar.jsx: 45, 231, 422
  - src/pages/ports/PortPage.jsx: 254
- **documentation/config/history:** 18 occurrences
  - AGENTS.md: 142
  - CLAUDE.md: 48
  - docs/audits/raw/webfix/BUILD.txt: 102
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 468, 476
  - docs/sprints/VIS2_VERIFICATION.md: 97
  - docs/sprints/VIS2_WALKTHROUGH.md: 30, 34, 44, 51, 52, 78, 96, 174, 180
  - FULL_SITE_AUDIT.md: 116, 117
  - PRODUCT.md: 15

#### Newton

Total exact regex occurrences: **681** across **55** tracked text files.

- **runtime/generated:** 93 occurrences
  - public/llms.txt: 52x3
  - public/sitemap.xml: 879
  - scripts/generateSitemap.js: 93, 209
  - scripts/prerender.mjs: 517
  - scripts/seo-baseline.json: 254
  - scripts/sitemap-lastmod.json: 41
  - src/App.jsx: 238
  - src/components/CoverageMap.jsx: 17x2
  - src/components/Footer.jsx: 68x2
  - src/data/relatedGuides.js: 11, 102x3, 107x3, 110
  - src/locales/en/common.json: 225x2
  - src/locales/en/services.json: 142, 143
  - src/locales/pl/common.json: 221x2
  - src/locales/pl/services.json: 142, 143
  - src/locales/ru/common.json: 221x2
  - src/locales/ru/services.json: 142, 143
  - src/locales/ua/common.json: 221x2
  - src/locales/ua/services.json: 142, 143
  - src/pages/seo/locations/BostonCarShipping.jsx: 40, 74x2, 115, 118
  - src/pages/seo/locations/MassachusettsCarShipping.jsx: 81x2
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 33, 35x2, 36, 40, 41x2, 43, 46, 54, 58, 65, 67, 74, 75, 78, 82, 83x2, 86, 90, 91x6, 94, 105, 107, 110, 122, 124, 125, 155, 157, 158x3, 159x3, 170, 172, 173, 186, 196
  - src/pages/Services.jsx: 45
- **documentation/config/history:** 588 occurrences
  - .github/workflows/safety-check.yml: 156, 165x2, 170, 175, 183x2, 184x3, 185x2, 190x4
  - audit/cross_links.md: 24
  - audit/footer.md: 19
  - CAREERS_TRANSPORT_FOLLOWUP.md: 369
  - DESIGN_SPRINT_1_REPORT.md: 152, 189
  - DESIGN_SPRINT_2_REPORT.md: 198
  - docs/audits/NJPORTS_PHASE0_AUDIT.md: 86
  - docs/audits/raw/wave0/render_check.mjs: 46
  - docs/audits/raw/wave0/T02b_build.txt: 235
  - docs/audits/raw/wave0/T02b_matches_all.txt: 5x3, 7, 8, 9, 10, 11, 12, 14, 15x2, 16, 17, 18, 19, 27, 28, 29, 30, 31x2, 32x2, 33x3, 34, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46x2, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65x2, 66x2, 67, 68x2, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93x2, 94, 95, 96, 97, 105, 106, 107, 108, 109x2, 110x2, 111x3, 112, 114, 115, 116, 117, 118, 119, 120, 122, 123x3, 124, 125, 126, 127, 128, 129, 131, 132x2, 133x2, 134, 135x3, 136x3, 137, 138x2, 139, 140, 141, 142x2, 143, 144, 145, 146x2, 147, 148, 149, 150x2, 151, 152, 153, 154, 155, 156, 157, 158x2, 159, 160, 161, 162, 163x2, 164, 166, 167x2, 168, 169, 170x2, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181x2, 182, 183, 184x6, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195x3, 196x3, 197, 198, 199, 201, 202, 203, 204, 205, 206, 207, 208x2, 211, 212, 213, 214, 215, 216x2, 219, 220, 221x3, 222, 223, 224, 225, 226, 227, 229, 230x2, 231x2, 232, 233x3, 234x3, 235, 236x2, 237, 238, 239, 240x2, 241, 242, 243, 244x2, 245, 246, 247, 248x2, 249, 250, 251, 252, 253, 254, 255, 256, 257x2, 258, 259, 260, 261, 262x2, 263, 265, 266x2, 267, 268, 269x2, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280x2, 281, 282, 283x6, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294x3, 295x3, 296, 297, 298, 300, 301
  - docs/audits/raw/wave0/T02b_render_check.txt: 17
  - docs/audits/raw/wave0/T03_mutation_proof.txt: 11, 14, 17, 20, 31, 32
  - docs/audits/raw/webfix/BUILD.txt: 238
  - docs/audits/raw/webfix/BUILD2.txt: 233
  - docs/audits/raw/webfix/P1_dist_crawl_after.txt: 38
  - docs/audits/raw/webfix/P1_render_check.txt: 45
  - docs/audits/raw/webfix/P2_dist_crawl_close.txt: 38
  - docs/audits/raw/webfix/P2_render_check.txt: 45
  - docs/audits/raw/webfix2/BUILD.txt: 238
  - docs/audits/raw/webfix2/P1_dist_crawl.txt: 38
  - docs/audits/raw/webfix2/P1_render_check.txt: 45
  - docs/audits/raw/webgeo/out/T01_build.txt: 233
  - docs/audits/raw/webgeo/out/T01_route_sources.txt: 86
  - docs/audits/raw/webgeo/out/T01_routes.txt: 60
  - docs/audits/raw/webgeo/out/T02_key_drift.txt: 341, 773, 1183
  - docs/audits/raw/webgeo/out/T04_structured_data.txt: 94
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 84, 195, 197, 198, 199, 200, 201, 202, 203, 205, 206x2, 207, 208, 209, 210, 218, 219, 220, 221, 222x2, 223x2, 224x3, 225, 227, 228, 229, 230, 231, 232, 233, 235, 236x3, 237, 238, 239, 240, 241, 242, 244, 245x2, 246x2, 247, 248x3, 249x3, 250, 251x2, 252, 253, 254, 255x2, 256, 257, 258, 259x2, 260, 261, 262, 263x2, 264, 265, 266, 267, 268, 269, 270, 271x2, 272, 273, 274, 275, 276x2, 277, 279, 280x2, 281, 282, 283x2, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294x2, 295, 296, 297x6, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308x3, 309x3, 310, 311, 312, 314, 315, 378, 402, 420, 438, 551, 556x2, 594, 612, 624, 636, 712, 716x2
  - docs/audits/WEBGEO_PHASE0.md: 72, 73x2, 556, 678, 681, 683, 685, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701x2, 705x2, 707, 713x2, 717, 837
  - FULL_SITE_AUDIT.md: 123, 212x2, 235, 386
  - LEGAL_ACCURACY_REPORT.md: 18, 43, 118, 119, 130
  - P2_TRUST_REPORT.md: 104
  - SEO_DEEP_REPORT.md: 36x2, 58x2, 59x3, 104, 212
  - SEO_LINKS_REPORT.md: 15, 36, 64, 171

#### Chestnut

Total exact regex occurrences: **92** across **7** tracked text files.

- **runtime/generated:** 5 occurrences
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 83, 91, 159, 173, 185
- **documentation/config/history:** 87 occurrences
  - .github/workflows/safety-check.yml: 182x2, 190
  - CAREERS_TRANSPORT_FOLLOWUP.md: 369
  - docs/audits/raw/wave0/T02b_matches_all.txt: 5, 7, 8, 9, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 48, 50x2, 70, 83, 84, 85, 86, 87, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 181, 184, 196, 199, 200, 219, 220, 280, 283, 295, 298, 299
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 195, 197, 198, 199, 200, 209, 210, 211, 212, 214, 215, 216, 217, 218, 219, 220, 294, 297, 309, 312, 313
  - docs/audits/WEBGEO_PHASE0.md: 678, 681x2, 837
  - LEGAL_ACCURACY_REPORT.md: 18, 43, 48, 54, 58, 59, 62, 117, 118, 119, 130

#### 02458

Total exact regex occurrences: **16** across **6** tracked text files.

- **runtime/generated:** 0 occurrences
  - none
- **documentation/config/history:** 16 occurrences
  - .github/workflows/safety-check.yml: 182, 190
  - docs/audits/raw/wave0/T02b_matches_all.txt: 5, 21, 30, 49, 84, 99, 108, 220
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 197, 212, 221
  - docs/audits/WEBGEO_PHASE0.md: 680
  - LEGAL_ACCURACY_REPORT.md: 54
  - P2_TRUST_REPORT.md: 104

#### Natick

Total exact regex occurrences: **93** across **30** tracked text files.

- **runtime/generated:** 43 occurrences
  - index.html: 42
  - public/llms.txt: 4
  - public/robots.txt: 4
  - src/locales/en/common.json: 48, 71, 125, 127, 166, 183
  - src/locales/en/faq.json: 6
  - src/locales/en/privacy.json: 8
  - src/locales/en/terms.json: 5, 93
  - src/locales/pl/common.json: 48, 71, 125, 127, 162, 180
  - src/locales/pl/faq.json: 10
  - src/locales/ru/common.json: 71, 162, 180
  - src/locales/ua/common.json: 71, 162, 180
  - src/pages/intl/PolandHome.jsx: 205
  - src/pages/seo/AuctionTransportSavings.jsx: 105
  - src/pages/seo/EnclosedCarShipping.jsx: 16
  - src/pages/seo/locations/BostonCarShipping.jsx: 16, 44, 84
  - src/pages/seo/locations/FloridaCarShipping.jsx: 16
  - src/pages/seo/locations/MassachusettsCarShipping.jsx: 16, 111
  - src/pages/seo/locations/NewJerseyAutoTransport.jsx: 17
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 41, 115
  - src/pages/seo/locations/TexasAutoTransport.jsx: 16
  - src/pages/seo/OpenCarShipping.jsx: 16
  - src/pages/seo/routes/MassachusettsToFlorida.jsx: 18
  - src/pages/seo/SalvageCarShipping.jsx: 16
  - src/pages/seo/StateToState.jsx: 16
- **documentation/config/history:** 50 occurrences
  - .github/workflows/safety-check.yml: 155, 156, 158, 190
  - docs/audits/raw/wave0/T02b_matches_all.txt: 8, 20, 67, 70, 86, 98
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 34, 35, 199, 211, 370, 382, 385, 386, 396, 524, 532, 538, 540, 541, 548, 554, 560, 567, 589, 597, 600, 601, 608, 694, 698, 700, 701, 710, 714, 719, 726
  - docs/audits/WEBGEO_PHASE0.md: 58, 75, 505, 707, 837, 858
  - docs/sprints/co5w_evidence_2026-08/smoke_results.json: 110
  - LEGAL_ACCURACY_REPORT.md: 44, 48

#### Harding

Total exact regex occurrences: **38** across **13** tracked text files.

- **runtime/generated:** 13 occurrences
  - index.html: 41
  - src/locales/en/common.json: 73, 127, 166
  - src/locales/en/privacy.json: 8
  - src/locales/en/terms.json: 5, 93
  - src/locales/pl/common.json: 73, 162
  - src/locales/ru/common.json: 73, 162
  - src/locales/ua/common.json: 73, 162
- **documentation/config/history:** 25 occurrences
  - .github/workflows/safety-check.yml: 155, 158, 190
  - docs/audits/raw/wave0/T02b_matches_all.txt: 8, 20, 67, 70, 86, 98
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 35, 199, 211, 382, 385, 386, 597, 600, 601
  - docs/audits/WEBGEO_PHASE0.md: 707, 837, 858
  - docs/sprints/co5w_evidence_2026-08/smoke_results.json: 109, 118
  - LEGAL_ACCURACY_REPORT.md: 44, 48

#### 01760

Total exact regex occurrences: **35** across **13** tracked text files.

- **runtime/generated:** 12 occurrences
  - index.html: 44
  - src/locales/en/common.json: 71, 166
  - src/locales/en/privacy.json: 8
  - src/locales/en/terms.json: 5, 93
  - src/locales/pl/common.json: 71, 162
  - src/locales/ru/common.json: 71, 162
  - src/locales/ua/common.json: 71, 162
- **documentation/config/history:** 23 occurrences
  - .github/workflows/safety-check.yml: 155, 158, 190
  - docs/audits/raw/wave0/T02b_matches_all.txt: 8, 20, 67, 70, 86, 98
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 199, 211, 382, 385, 386, 597, 600, 601
  - docs/audits/WEBGEO_PHASE0.md: 707, 837, 858
  - docs/sprints/co5w_evidence_2026-08/smoke_results.json: 110
  - LEGAL_ACCURACY_REPORT.md: 44, 48

#### MC authority token

Total exact regex occurrences: **798** across **146** tracked text files.

- **runtime/generated:** 261 occurrences
  - index.html: 55, 95
  - public/llms.txt: 4
  - public/robots.txt: 4
  - scripts/seo-baseline.json: 608, 730, 970, 1276
  - src/components/CoverageMap.jsx: 82
  - src/components/EntityTldr.jsx: 8
  - src/components/Footer.jsx: 33
  - src/components/TrustBadges.jsx: 11
  - src/components/VerificationStrip.jsx: 19x2, 51
  - src/data/blogArticles.js: 18, 24
  - src/locales/en/about.json: 37
  - src/locales/en/agreement_dealer.json: 7, 35
  - src/locales/en/certificateOfOrigin.json: 7, 11
  - src/locales/en/common.json: 119, 123, 125, 129, 135, 137, 164x2
  - src/locales/en/dealers.json: 4, 7, 26
  - src/locales/en/exporters.json: 4
  - src/locales/en/faq.json: 6, 15
  - src/locales/en/home.json: 7, 95
  - src/locales/en/privacy.json: 181
  - src/locales/en/quote.json: 101
  - src/locales/en/terms.json: 93, 125
  - src/locales/pl/about.json: 37
  - src/locales/pl/agreement_dealer.json: 7, 35
  - src/locales/pl/agreement.json: 7
  - src/locales/pl/certificateOfOrigin.json: 7, 11
  - src/locales/pl/common.json: 119, 123, 125, 129, 160x2
  - src/locales/pl/dealers.json: 4, 7, 37
  - src/locales/pl/exporters.json: 4
  - src/locales/pl/faq.json: 10, 19
  - src/locales/pl/home.json: 7, 95
  - src/locales/ru/about.json: 37
  - src/locales/ru/agreement_dealer.json: 7, 35
  - src/locales/ru/agreement.json: 7
  - src/locales/ru/certificateOfOrigin.json: 7, 11
  - src/locales/ru/common.json: 119, 123, 125, 129, 160x2
  - src/locales/ru/dealers.json: 4, 7, 37
  - src/locales/ru/exporters.json: 4
  - src/locales/ru/faq.json: 10, 19
  - src/locales/ru/home.json: 7, 95
  - src/locales/ua/about.json: 37
  - src/locales/ua/agreement_dealer.json: 7, 35
  - src/locales/ua/agreement.json: 7
  - src/locales/ua/certificateOfOrigin.json: 7, 11
  - src/locales/ua/common.json: 119, 123, 125, 129, 160x2
  - src/locales/ua/dealers.json: 4, 7, 37
  - src/locales/ua/exporters.json: 4
  - src/locales/ua/faq.json: 10, 19
  - src/locales/ua/home.json: 7, 95
  - src/pages/About.jsx: 35, 162
  - src/pages/blog/articles/BondClaimsGuide.jsx: 149
  - src/pages/blog/articles/CarrierCOIVerification.jsx: 152
  - src/pages/blog/articles/CarrierWhoVanished.jsx: 152
  - src/pages/blog/articles/CopartInternationalBuyersGuide.jsx: 144
  - src/pages/blog/articles/DealerAuctionPickupGuide.jsx: 103
  - src/pages/blog/articles/ExporterDocumentationChecklist.jsx: 130
  - src/pages/blog/articles/FMCSA2026NewRules.jsx: 19, 26, 91, 124, 128, 130, 131, 155
  - src/pages/blog/articles/FMCSABrokerRecordkeeping.jsx: 48, 122
  - src/pages/blog/articles/OutboxPatternDispatch.jsx: 150
  - src/pages/blog/BlogBanners.jsx: 156
  - src/pages/blog/BlogIndex.jsx: 65
  - src/pages/CareerApplication.jsx: 18, 115, 169, 216, 221
  - src/pages/Careers.jsx: 17, 21, 32, 94, 113, 130
  - src/pages/Contact.jsx: 118
  - src/pages/DealerQuote.jsx: 369
  - src/pages/intl/PolandCopart.jsx: 312, 531
  - src/pages/intl/PolandHome.jsx: 43, 98, 101, 132, 169, 206, 556
  - src/pages/intl/PolandShipMyCar.jsx: 13, 45, 177, 187, 227, 395, 403, 508
  - src/pages/intl/RussiaCopart.jsx: 99, 166x2, 203, 206, 258, 448
  - src/pages/intl/RussiaHome.jsx: 48, 105, 191x2, 200, 218, 252, 504
  - src/pages/intl/RussiaShipMyCar.jsx: 139, 142, 226, 237, 318, 499
  - src/pages/intl/UkraineCopart.jsx: 251, 310, 537, 542, 571
  - src/pages/intl/UkraineHome.jsx: 127, 266, 276, 319, 390, 564
  - src/pages/intl/UkraineShipMyCar.jsx: 45, 193, 203, 236, 373, 381, 450
  - src/pages/portal/components/LoginCard.jsx: 245, 746
  - src/pages/portal/DealerApplication.jsx: 15, 17, 27, 179, 192
  - src/pages/portal/OrderDetail.jsx: 1215, 1287
  - src/pages/ports/PortPage.jsx: 102, 256
  - src/pages/PromoLanding.jsx: 123
  - src/pages/Quote.jsx: 39
  - src/pages/seo/AuctionTransportSavings.jsx: 105
  - src/pages/seo/CopartShipping.jsx: 170, 176, 180, 534
  - src/pages/seo/DealerAutoTransport.jsx: 134, 137
  - src/pages/seo/DoorToPort.jsx: 33, 43
  - src/pages/seo/EnclosedCarShipping.jsx: 16
  - src/pages/seo/guides/BillOfLading.jsx: 64
  - src/pages/seo/guides/CopartInternationalShipping.jsx: 239
  - src/pages/seo/guides/CopartStorageFees.jsx: 16
  - src/pages/seo/guides/HowToShipAuctionCar.jsx: 92
  - src/pages/seo/IaaiTransport.jsx: 30
  - src/pages/seo/locations/BostonCarShipping.jsx: 88
  - src/pages/seo/locations/FloridaCarShipping.jsx: 10, 16, 50
  - src/pages/seo/locations/MassachusettsCarShipping.jsx: 10, 16, 51
  - src/pages/seo/locations/NewJerseyAutoTransport.jsx: 11, 17, 46
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 35, 70, 114
  - src/pages/seo/locations/TexasAutoTransport.jsx: 10, 16, 45
  - src/pages/seo/ManheimTransport.jsx: 29
  - src/pages/seo/NjExportWarehouseShippingCost.jsx: 23, 29, 295
  - src/pages/seo/OpenCarShipping.jsx: 16, 49
  - src/pages/seo/routes/AtlantaToSavannah.jsx: 22
  - src/pages/seo/routes/AuctionToPort.jsx: 18, 22
  - src/pages/seo/routes/DallasToHouston.jsx: 22
  - src/pages/seo/routes/FloridaToJacksonville.jsx: 22
  - src/pages/seo/routes/MassachusettsToFlorida.jsx: 18
  - src/pages/seo/routes/NewJerseyToFlorida.jsx: 12, 18
  - src/pages/seo/SalvageCarShipping.jsx: 16
  - src/pages/seo/StateToState.jsx: 16, 46, 65x2, 92, 97, 99
  - src/styles/v2/PREVIEW.html: 47, 87, 145
- **documentation/config/history:** 537 occurrences
  - .github/workflows/safety-check.yml: 43, 51x2
  - AGENTS.md: 3
  - audit/content_quality.md: 26, 27, 28, 29x2
  - audit/footer.md: 16
  - audit/translation_completeness.md: 37
  - audit/trust_signals.md: 11, 12, 13, 14
  - CAREERS_SPRINT_REPORT.md: 47, 68, 75, 110, 147, 158
  - CAREERS_TRANSPORT_FOLLOWUP.md: 149, 166, 167x2, 204, 229, 237, 322, 370, 380, 381
  - CLAUDE.md: 3
  - COPART_DOMINANCE_REPORT.md: 73
  - DESIGN_SPRINT_1_REPORT.md: 147, 158, 160, 161, 163, 181x3
  - DESIGN_SPRINT_2_REPORT.md: 71
  - DESIGN.json: 212
  - DESIGN.md: 110, 180
  - docs/audits/NJPORTS_PHASE0_AUDIT.md: 217
  - docs/audits/raw/wave0/T02b_matches_all.txt: 53, 82, 139, 143, 147, 162, 167, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 237, 241, 245, 249, 261, 266
  - docs/audits/raw/webfix/P0_safety_checks_local.txt: 1
  - docs/audits/raw/webfix/P1_safety_checks_local.txt: 1
  - docs/audits/raw/webfix/P2_safety_checks_local.txt: 1
  - docs/audits/raw/webfix2/P1_safety_checks_local.txt: 1
  - docs/audits/raw/webgeo/out/T02_key_drift.txt: 334, 767, 1177
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 31, 32, 33, 34, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 49, 50, 53, 72, 74, 84, 85, 252, 256, 260, 275, 280, 344, 346x2, 347, 349, 350, 351, 352, 353, 355, 357x2, 358, 359, 360, 361, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374x2, 375, 376, 377, 378, 379, 380, 381, 383, 384, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398x2, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416x2, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434x2, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490x2, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 574, 576, 577, 578, 583, 586, 587, 588, 589, 590, 592, 593, 594, 595, 596, 598, 599, 601, 602, 603, 604, 605, 606, 607, 608, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 634, 635, 636, 637, 638, 645, 650, 652, 653, 657, 658, 659, 660, 661, 662, 663, 664, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 679, 682, 685, 686, 688, 689, 690, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 731, 733x2, 741, 757
  - docs/audits/raw/webgeo/out/T07_co_answers.txt: 48
  - docs/audits/raw/webgeo/out/T07_co_content.md: 21, 33, 433, 445, 845, 857, 1257, 1269
  - docs/audits/WEBGEO_PHASE0.md: 321, 689, 726, 728x2, 732, 735, 853
  - docs/sprints/NJPORTS_2_REPORT.md: 49
  - docs/sprints/NJPORTS_3_REPORT.md: 71, 107
  - docs/sprints/VIS2_WALKTHROUGH.md: 1, 44, 51, 59x2, 133, 147, 155x2, 156, 157, 169, 174, 175, 178, 180
  - FULL_SITE_AUDIT.md: 124, 143, 157, 162, 210, 237, 316, 330, 331, 335, 337x2
  - INTL_FIX_REPORT.md: 14, 16, 18, 199
  - LEGAL_ACCURACY_REPORT.md: 70, 88, 90, 107
  - NAV_UX_REPORT.md: 129
  - OVERNIGHT_PROGRESS.md: 14, 20
  - OVERNIGHT_SPRINT_REPORT.md: 58, 69, 162
  - P2_TRUST_REPORT.md: 111, 146, 152, 248
  - package-lock.json: 300
  - PRODUCT.md: 21, 57
  - SEO_CONTENT_REPORT.md: 30, 81
  - SEO_DEEP_REPORT.md: 27, 99, 135, 193

#### USDOT

Total exact regex occurrences: **524** across **125** tracked text files.

- **runtime/generated:** 152 occurrences
  - index.html: 54, 95
  - public/llms.txt: 4
  - public/robots.txt: 4
  - src/components/CoverageMap.jsx: 82
  - src/components/EntityTldr.jsx: 8
  - src/components/Footer.jsx: 32
  - src/components/VerificationStrip.jsx: 5, 18x2, 47
  - src/locales/en/about.json: 37
  - src/locales/en/agreement_dealer.json: 7, 35
  - src/locales/en/agreement.json: 6, 116
  - src/locales/en/certificateOfOrigin.json: 7
  - src/locales/en/common.json: 125, 137, 163x2
  - src/locales/en/dealers.json: 4
  - src/locales/en/exporters.json: 4
  - src/locales/en/faq.json: 6, 15
  - src/locales/en/home.json: 95
  - src/locales/en/privacy.json: 8, 181
  - src/locales/en/quote.json: 101
  - src/locales/en/terms.json: 5, 93, 125
  - src/locales/pl/about.json: 37
  - src/locales/pl/agreement_dealer.json: 7, 35
  - src/locales/pl/agreement.json: 7
  - src/locales/pl/certificateOfOrigin.json: 7
  - src/locales/pl/common.json: 125, 159x2
  - src/locales/pl/dealers.json: 4
  - src/locales/pl/exporters.json: 4
  - src/locales/pl/faq.json: 10, 19
  - src/locales/pl/home.json: 95
  - src/locales/ru/about.json: 37
  - src/locales/ru/agreement_dealer.json: 7, 35
  - src/locales/ru/agreement.json: 7
  - src/locales/ru/certificateOfOrigin.json: 7
  - src/locales/ru/common.json: 125, 159x2
  - src/locales/ru/dealers.json: 4
  - src/locales/ru/exporters.json: 4
  - src/locales/ru/faq.json: 10, 19
  - src/locales/ru/home.json: 95
  - src/locales/ua/about.json: 37
  - src/locales/ua/agreement_dealer.json: 7, 35
  - src/locales/ua/agreement.json: 7
  - src/locales/ua/certificateOfOrigin.json: 7
  - src/locales/ua/common.json: 125, 159x2
  - src/locales/ua/dealers.json: 4
  - src/locales/ua/exporters.json: 4
  - src/locales/ua/faq.json: 10, 19
  - src/locales/ua/home.json: 95
  - src/pages/About.jsx: 34, 163
  - src/pages/blog/articles/BondClaimsGuide.jsx: 149
  - src/pages/blog/articles/CarrierCOIVerification.jsx: 152
  - src/pages/blog/articles/CarrierWhoVanished.jsx: 152
  - src/pages/blog/articles/DealerAuctionPickupGuide.jsx: 103
  - src/pages/blog/articles/ExporterDocumentationChecklist.jsx: 130
  - src/pages/blog/articles/FMCSA2026NewRules.jsx: 20, 26, 128, 131, 155
  - src/pages/blog/articles/FMCSABrokerRecordkeeping.jsx: 48, 122
  - src/pages/blog/articles/OutboxPatternDispatch.jsx: 150
  - src/pages/blog/BlogBanners.jsx: 156
  - src/pages/CareerApplication.jsx: 169, 226, 233
  - src/pages/Careers.jsx: 17, 22, 94
  - src/pages/Contact.jsx: 118
  - src/pages/Exporters.jsx: 392, 412
  - src/pages/intl/PolandHome.jsx: 206
  - src/pages/intl/RussiaCopart.jsx: 448
  - src/pages/intl/RussiaHome.jsx: 48, 504
  - src/pages/intl/RussiaShipMyCar.jsx: 237, 321, 499
  - src/pages/intl/UkraineCopart.jsx: 545
  - src/pages/intl/UkraineHome.jsx: 390
  - src/pages/intl/UkraineShipMyCar.jsx: 384
  - src/pages/portal/components/LoginCard.jsx: 245, 746
  - src/pages/ports/PortPage.jsx: 101, 256
  - src/pages/PromoLanding.jsx: 123
  - src/pages/Quote.jsx: 39
  - src/pages/seo/CopartShipping.jsx: 180, 534, 535
  - src/pages/seo/DealerAutoTransport.jsx: 134
  - src/pages/seo/DoorToPort.jsx: 43
  - src/pages/seo/EnclosedCarShipping.jsx: 16
  - src/pages/seo/guides/BillOfLading.jsx: 64
  - src/pages/seo/guides/HowToShipAuctionCar.jsx: 92
  - src/pages/seo/IaaiTransport.jsx: 30
  - src/pages/seo/locations/BostonCarShipping.jsx: 88
  - src/pages/seo/locations/FloridaCarShipping.jsx: 16, 50
  - src/pages/seo/locations/MassachusettsCarShipping.jsx: 16, 51
  - src/pages/seo/locations/NewJerseyAutoTransport.jsx: 17, 46
  - src/pages/seo/locations/NewtonAutoTransport.jsx: 35, 70, 114
  - src/pages/seo/locations/TexasAutoTransport.jsx: 16, 45
  - src/pages/seo/ManheimTransport.jsx: 29
  - src/pages/seo/NjExportWarehouseShippingCost.jsx: 29
  - src/pages/seo/OpenCarShipping.jsx: 16, 49
  - src/pages/seo/routes/AtlantaToSavannah.jsx: 22
  - src/pages/seo/routes/AuctionToPort.jsx: 18, 22
  - src/pages/seo/routes/DallasToHouston.jsx: 22
  - src/pages/seo/routes/FloridaToJacksonville.jsx: 22
  - src/pages/seo/routes/MassachusettsToFlorida.jsx: 18
  - src/pages/seo/routes/NewJerseyToFlorida.jsx: 18
  - src/pages/seo/SalvageCarShipping.jsx: 16
  - src/pages/seo/StateToState.jsx: 16, 46, 92, 97, 99, 101
  - src/styles/v2/PREVIEW.html: 87
- **documentation/config/history:** 372 occurrences
  - AGENTS.md: 3
  - audit/content_quality.md: 26, 29x2
  - audit/footer.md: 16
  - audit/translation_completeness.md: 37
  - audit/trust_signals.md: 11, 12, 14
  - CAREERS_SPRINT_REPORT.md: 47, 110
  - CAREERS_TRANSPORT_FOLLOWUP.md: 206, 323, 370, 380
  - CLAUDE.md: 3
  - COPART_DOMINANCE_REPORT.md: 73
  - DESIGN_SPRINT_1_REPORT.md: 161, 163, 181x2
  - DESIGN_SPRINT_2_REPORT.md: 71
  - design-audit/AUDIT_REPORT.md: 181
  - DESIGN.json: 212
  - DESIGN.md: 110, 180
  - docs/audits/raw/wave0/T02b_matches_all.txt: 53, 82, 139, 143, 147, 162, 167, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 237, 241, 245, 249, 261, 266
  - docs/audits/raw/webgeo/out/T02_key_drift.txt: 333, 766, 1176
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 31, 34, 41, 43, 45, 47, 84, 85, 252, 256, 260, 275, 280, 344, 349, 361, 362, 363, 364, 365, 366, 370, 373, 375, 377, 378, 379, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 396, 399, 401, 402, 403, 405, 406, 407, 408, 409, 410, 414, 417, 419, 420, 421, 423, 424, 425, 426, 427, 428, 432, 435, 437, 438, 439, 441, 445, 446, 450, 452, 453, 454, 456, 457, 458, 460, 461, 462, 463, 464, 465, 473, 487, 488, 494, 498, 500, 510, 520, 521, 523, 527, 528, 529, 531, 532, 533, 534, 536, 538, 539, 540, 541, 542, 543, 546, 548, 549, 551, 552, 554, 555, 556, 557, 558, 560, 561, 562, 563, 564, 565, 566, 567, 569, 571, 573, 574, 575, 576, 577, 578, 579, 580, 581x2, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591x2, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609x2, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621x2, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633x2, 634, 635, 636, 637, 638, 639, 640, 645, 646, 649, 650, 651, 652, 653, 654, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 682, 683, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728
  - docs/audits/raw/webgeo/out/T07_co_content.md: 21, 433, 845, 1257
  - docs/audits/WEBGEO_PHASE0.md: 689, 726, 728
  - docs/sprints/PHASE5D_REPORT.md: 64
  - FULL_SITE_AUDIT.md: 124, 143, 157, 162, 211, 237, 316, 330, 331, 337x2
  - INTL_FIX_REPORT.md: 18
  - LEGAL_ACCURACY_REPORT.md: 70, 88, 90, 107
  - OVERNIGHT_PROGRESS.md: 14, 20
  - OVERNIGHT_SPRINT_REPORT.md: 69, 162
  - P2_TRUST_REPORT.md: 110
  - PRODUCT.md: 21, 57
  - SEO_CONTENT_REPORT.md: 30, 81
  - SEO_DEEP_REPORT.md: 27, 99, 135

#### phone-like values

Total exact regex occurrences: **36** across **18** tracked text files.

- **runtime/generated:** 10 occurrences
  - src/components/PhoneInput.jsx: 211
  - src/locales/en/home.json: 148
  - src/locales/pl/home.json: 153
  - src/locales/ru/home.json: 153
  - src/locales/ua/home.json: 153
  - src/pages/blog/BlogBanners.jsx: 17, 21
  - src/pages/CareerApplication.jsx: 299
  - src/pages/ConfirmQuotePanel.jsx: 430
  - src/pages/portal/Onboarding.jsx: 686
- **documentation/config/history:** 26 occurrences
  - .claude/skills/design-taste-frontend/SKILL.md: 618
  - .github/workflows/safety-check.yml: 103
  - docs/audits/raw/webfix/P0_safety_checks_local.txt: 7, 14
  - docs/audits/raw/webfix/P1_safety_checks_local.txt: 7, 14
  - docs/audits/raw/webfix/P2_safety_checks_local.txt: 7, 14
  - docs/audits/raw/webfix2/P1_safety_checks_local.txt: 7, 14
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 337
  - docs/audits/WEBGEO_PHASE0.md: 724x3
  - docs/sprints/co5w_evidence_2026-08/api_payloads.json: 303

#### street-address-like values

Total exact regex occurrences: **101** across **32** tracked text files.

- **runtime/generated:** 34 occurrences
  - index.html: 41
  - src/data/warehouseFields.js: 86
  - src/locales/en/common.json: 73, 127, 166
  - src/locales/en/dealers.json: 42
  - src/locales/en/exporters.json: 208
  - src/locales/en/faq.json: 41
  - src/locales/en/privacy.json: 8
  - src/locales/en/terms.json: 5
  - src/locales/pl/common.json: 73, 162
  - src/locales/ru/common.json: 73, 162
  - src/locales/ua/common.json: 73, 162
  - src/pages/blog/articles/CopartInternationalBuyersGuide.jsx: 44
  - src/pages/DealerQuote.jsx: 235
  - src/pages/portal/DispatchDetails.jsx: 485, 622
  - src/pages/portal/Locations.jsx: 104
  - src/pages/portal/LocationSetup.jsx: 158
  - src/pages/portal/NewOrder.jsx: 105
  - src/pages/ports/portData.js: 6, 19, 32, 45, 71
  - src/pages/seo/OpenCarShipping.jsx: 70, 95, 245
  - src/pages/seo/routes/AtlantaToSavannah.jsx: 22
  - src/pages/seo/routes/MassachusettsToFlorida.jsx: 168
  - src/pages/seo/routes/NewJerseyToFlorida.jsx: 171
- **documentation/config/history:** 67 occurrences
  - .github/workflows/safety-check.yml: 158, 190x2
  - CAREERS_TRANSPORT_FOLLOWUP.md: 369
  - docs/audits/NJPORTS_PHASE0_AUDIT.md: 78
  - docs/audits/raw/wave0/T02b_matches_all.txt: 7, 8x2, 9, 18, 19, 21, 23, 24, 26, 27, 28, 29, 70, 85, 86x2, 87, 96, 97, 99, 101, 102, 104, 105, 106, 107
  - docs/audits/raw/webgeo/out/T06_copy_sweep.txt: 35, 198, 199x2, 200, 209, 210, 212, 214, 215, 217, 218, 219, 220, 382, 385, 562, 597, 600, 721
  - docs/audits/WEBGEO_PHASE0.md: 837
  - docs/sprints/CAPTURE_S1_WEBSITE_REPORT.md: 32
  - docs/sprints/co5w_evidence_2026-08/api_payloads.json: 297
  - docs/sprints/co5w_evidence_2026-08/smoke_results.json: 109, 118
  - LEGAL_ACCURACY_REPORT.md: 18, 43, 44, 54, 58, 59, 117, 118, 119, 130

## 10. Robots policy and production parity

The checked-in and live production robots files are text-equivalent after CRLF/LF normalization. The local file is 6,628 bytes and the live response is 6,389 bytes. `OAI-SearchBot` is explicitly present. Twenty-four user-agent blocks, including the wildcard, are present: `*`, `Googlebot`, `Googlebot-Image`, `Google-Extended`, `Bingbot`, `Slurp`, `DuckDuckBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Applebot`, `GPTBot`, `anthropic-ai`, `ClaudeBot`, `CCBot`, `Bytespider`, `FacebookBot`, `Amazonbot`, `cohere-ai`, `AhrefsBot`, `SemrushBot`, `MJ12bot`, `DotBot`, and `PetalBot`.

### `public/robots.txt`, verbatim

```text
# ============================================================
# Y7 Logistics — www.y7agency.com
# Licensed FMCSA Auto Transport Broker
# MC #1741537 | USDOT #4427359 | Natick, MA
# ============================================================

# ── Default: all search engines welcome ──────────────────────
User-agent: *
Allow: /

# Protected / non-content paths. /promo/ [WEBFIX-T02]: promo-code landings are
# an SPA namespace (server.js), API-driven and outside the sitemap - same
# class as /portal/ and /review/, and the only one of the four that was open.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# [WEBFIX-T02] /assets/ is OPEN for every crawler. It used to be closed here
# for "*" only (hashed Vite bundles, cosmetic) - but a crawler with no group
# of its own reads THIS group, and that set includes Claude-SearchBot,
# Claude-User, Perplexity-User, DuckAssistBot and YandexBot: exactly the
# answer engines the file is written to welcome. Disallow never kept a URL
# out of an index; it only stopped rendering. Measured with a real parser
# before the change (docs/audits/raw/webfix/NEW1_robots_groups.txt).

# ── Google ────────────────────────────────────────────────────
# Googlebot: full access to all content including JS/CSS for rendering
User-agent: Googlebot
Allow: /
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

User-agent: Googlebot-Image
Allow: /
# [WEBFIX2-T03] same protected paths as "*"; a group of its own never reads "*".
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Google-Extended (Gemini / Vertex AI training) — INTENTIONALLY OPENED (compromise-(b))
User-agent: Google-Extended
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# ── Bing / Yahoo / DuckDuckGo ────────────────────────────────
User-agent: Bingbot
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

User-agent: Slurp
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

User-agent: DuckDuckBot
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# ── AI Search Bots (ALLOW — we want to appear in AI answers) ─
# OpenAI ChatGPT Search
User-agent: OAI-SearchBot
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# OpenAI browsing (when users ask ChatGPT to visit a page)
User-agent: ChatGPT-User
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Perplexity search
User-agent: PerplexityBot
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Apple AI / Siri
User-agent: Applebot
Allow: /
Allow: /assets/
# [WEBFIX-T11] same protected paths as "*": a group of its own means the "*"
# rules never apply, so these were open to this crawler until now.
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# ── AI Training Bots — INTENTIONALLY OPENED (compromise-(b)) ──
# y7agency.com WANTS presence in future model weights; these training crawlers
# get the SAME private-path exclusions as the global * block. Junk/parasite
# scrapers below stay blocked. Reversible anytime if a crawler misbehaves.
# OpenAI training crawler
User-agent: GPTBot
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Anthropic training crawler
User-agent: anthropic-ai
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/
User-agent: ClaudeBot
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Common Crawl (used for training many AI models)
User-agent: CCBot
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# ByteDance / TikTok crawler — KEPT BLOCKED (junk/parasite scraper)
User-agent: Bytespider
Disallow: /

# Meta / Facebook training
User-agent: FacebookBot
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Amazon AI
User-agent: Amazonbot
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# Cohere AI
User-agent: cohere-ai
Allow: /
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

# ── Known low-value / aggressive scrapers ─────────────────────
User-agent: AhrefsBot
Crawl-delay: 10
# [WEBFIX2-T03] same protected paths as "*"; a group of its own never reads "*".
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

User-agent: SemrushBot
Crawl-delay: 10
# [WEBFIX2-T03] same protected paths as "*"; a group of its own never reads "*".
Disallow: /portal/
Disallow: /agreement
Disallow: /api/
Disallow: /review/
Disallow: /promo/

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: PetalBot
Disallow: /

# ── Sitemaps ──────────────────────────────────────────────────
Sitemap: https://www.y7agency.com/sitemap.xml
```

## 11. Sitemap inventory

The sitemap contains 138 `<url>` entries and 340 alternate-link elements across 17 multilingual groups.

| Category | URL count |
|---|---:|
| 11 shared route groups × 4 locales | 44 |
| 6 port route groups × 4 locales | 24 |
| English-only pages | 61 |
| Unique international pages | 9 |
| **Total** | **138** |

English-only pages break down into legal/utility 4, careers 2, services 12, locations 7, named routes 8, EV pages 4, guides 6, and blog articles 18.

Blog `lastmod` values come from article `dateISO`. Other pages use the Git last commit for the backing source file; the committed manifest is the fallback when Git history is unavailable, and build date is the final fallback. The audited build recalculated 87 manifest dates and rewrote both `public/sitemap.xml` and `scripts/sitemap-lastmod.json`; those build-generated tracked changes were restored after verification.

No sitemap URL is absent from the prerender list.

## 12. Hreflang completeness

Seventeen route groups exist in four locales: 11 shared core groups and six port groups. Their 68 built pages each contain eight `<link rel=alternate>` entries: `en`, `en-US`, `uk`, `uk-UA`, `pl`, `pl-PL`, `ru`, and `x-default`. Every declared alternate maps to an existing prerender route. No `/en` prefix is emitted; English remains the unprefixed default.

The sitemap uses five alternates per multilingual URL (`en`, `uk`, `pl`, `ru`, `x-default`), totaling 340 entries. No missing alternate destination was found.

### Concrete multilingual groups

| Group | English | Ukrainian | Polish | Russian |
|---|---|---|---|---|
| Home | `/` | `/ua` | `/pl` | `/ru` |
| Services | `/services` | `/ua/services` | `/pl/services` | `/ru/services` |
| Dealers | `/dealers` | `/ua/dealers` | `/pl/dealers` | `/ru/dealers` |
| Exporters | `/exporters` | `/ua/exporters` | `/pl/exporters` | `/ru/exporters` |
| Ship my car | `/ship-my-car` | `/ua/ship-my-car` | `/pl/ship-my-car` | `/ru/ship-my-car` |
| Track | `/track` | `/ua/track` | `/pl/track` | `/ru/track` |
| Contact | `/contact` | `/ua/contact` | `/pl/contact` | `/ru/contact` |
| FAQ | `/faq` | `/ua/faq` | `/pl/faq` | `/ru/faq` |
| About | `/about` | `/ua/about` | `/pl/about` | `/ru/about` |
| Quote | `/quote` | `/ua/quote` | `/pl/quote` | `/ru/quote` |
| Certificate of origin | `/certificate-of-origin` | `/ua/certificate-of-origin` | `/pl/certificate-of-origin` | `/ru/certificate-of-origin` |
| Port Newark | `/ports/newark` | `/ua/ports/newark` | `/pl/ports/newark` | `/ru/ports/newark` |
| Port Houston | `/ports/houston` | `/ua/ports/houston` | `/pl/ports/houston` | `/ru/ports/houston` |
| Port Savannah | `/ports/savannah` | `/ua/ports/savannah` | `/pl/ports/savannah` | `/ru/ports/savannah` |
| Port Los Angeles | `/ports/los-angeles` | `/ua/ports/los-angeles` | `/pl/ports/los-angeles` | `/ru/ports/los-angeles` |
| Port Baltimore | `/ports/baltimore` | `/ua/ports/baltimore` | `/pl/ports/baltimore` | `/ru/ports/baltimore` |
| Port Jacksonville | `/ports/jacksonville` | `/ua/ports/jacksonville` | `/pl/ports/jacksonville` | `/ru/ports/jacksonville` |

## 13. Live HTTP and canonical matrix

The matrix was measured against production on 2026-09-02. For each test path, five variants were requested: HTTPS `www`, HTTPS `www` with trailing slash, HTTP `www`, HTTPS apex, and HTTP apex. Redirects were followed and the final status/URL recorded.

**Result:** all known routes resolve to HTTP 200. HTTP and apex variants redirect to HTTPS `www`. Trailing slashes remain in the final URL and are served as 200 rather than redirected. The unknown path returns HTTP 404 in every host/scheme variant; no soft-404 was observed.

| Test path | Variant | Requested URL | Final status | Redirects | Final URL |
|---|---|---|---:|---:|---|
| / | www HTTPS | https://www.y7agency.com/ | 200 | 0 | https://www.y7agency.com/ |
| / | www HTTPS slash | https://www.y7agency.com/ | 200 | 0 | https://www.y7agency.com/ |
| / | www HTTP | http://www.y7agency.com/ | 200 | 1 | https://www.y7agency.com/ |
| / | apex HTTPS | https://y7agency.com/ | 200 | 1 | https://www.y7agency.com/ |
| / | apex HTTP | http://y7agency.com/ | 200 | 1 | https://www.y7agency.com/ |
| /dealers | www HTTPS | https://www.y7agency.com/dealers | 200 | 0 | https://www.y7agency.com/dealers |
| /dealers | www HTTPS slash | https://www.y7agency.com/dealers/ | 200 | 0 | https://www.y7agency.com/dealers/ |
| /dealers | www HTTP | http://www.y7agency.com/dealers | 200 | 1 | https://www.y7agency.com/dealers |
| /dealers | apex HTTPS | https://y7agency.com/dealers | 200 | 1 | https://www.y7agency.com/dealers |
| /dealers | apex HTTP | http://y7agency.com/dealers | 200 | 1 | https://www.y7agency.com/dealers |
| /dealer-auto-transport | www HTTPS | https://www.y7agency.com/dealer-auto-transport | 200 | 0 | https://www.y7agency.com/dealer-auto-transport |
| /dealer-auto-transport | www HTTPS slash | https://www.y7agency.com/dealer-auto-transport/ | 200 | 0 | https://www.y7agency.com/dealer-auto-transport/ |
| /dealer-auto-transport | www HTTP | http://www.y7agency.com/dealer-auto-transport | 200 | 1 | https://www.y7agency.com/dealer-auto-transport |
| /dealer-auto-transport | apex HTTPS | https://y7agency.com/dealer-auto-transport | 200 | 1 | https://www.y7agency.com/dealer-auto-transport |
| /dealer-auto-transport | apex HTTP | http://y7agency.com/dealer-auto-transport | 200 | 1 | https://www.y7agency.com/dealer-auto-transport |
| /auction-car-shipping | www HTTPS | https://www.y7agency.com/auction-car-shipping | 200 | 0 | https://www.y7agency.com/auction-car-shipping |
| /auction-car-shipping | www HTTPS slash | https://www.y7agency.com/auction-car-shipping/ | 200 | 0 | https://www.y7agency.com/auction-car-shipping/ |
| /auction-car-shipping | www HTTP | http://www.y7agency.com/auction-car-shipping | 200 | 1 | https://www.y7agency.com/auction-car-shipping |
| /auction-car-shipping | apex HTTPS | https://y7agency.com/auction-car-shipping | 200 | 1 | https://www.y7agency.com/auction-car-shipping |
| /auction-car-shipping | apex HTTP | http://y7agency.com/auction-car-shipping | 200 | 1 | https://www.y7agency.com/auction-car-shipping |
| /auction-to-port-transport | www HTTPS | https://www.y7agency.com/auction-to-port-transport | 200 | 0 | https://www.y7agency.com/auction-to-port-transport |
| /auction-to-port-transport | www HTTPS slash | https://www.y7agency.com/auction-to-port-transport/ | 200 | 0 | https://www.y7agency.com/auction-to-port-transport/ |
| /auction-to-port-transport | www HTTP | http://www.y7agency.com/auction-to-port-transport | 200 | 1 | https://www.y7agency.com/auction-to-port-transport |
| /auction-to-port-transport | apex HTTPS | https://y7agency.com/auction-to-port-transport | 200 | 1 | https://www.y7agency.com/auction-to-port-transport |
| /auction-to-port-transport | apex HTTP | http://y7agency.com/auction-to-port-transport | 200 | 1 | https://www.y7agency.com/auction-to-port-transport |
| /blog/dealer-auction-pickup-guide | www HTTPS | https://www.y7agency.com/blog/dealer-auction-pickup-guide | 200 | 0 | https://www.y7agency.com/blog/dealer-auction-pickup-guide |
| /blog/dealer-auction-pickup-guide | www HTTPS slash | https://www.y7agency.com/blog/dealer-auction-pickup-guide/ | 200 | 0 | https://www.y7agency.com/blog/dealer-auction-pickup-guide/ |
| /blog/dealer-auction-pickup-guide | www HTTP | http://www.y7agency.com/blog/dealer-auction-pickup-guide | 200 | 1 | https://www.y7agency.com/blog/dealer-auction-pickup-guide |
| /blog/dealer-auction-pickup-guide | apex HTTPS | https://y7agency.com/blog/dealer-auction-pickup-guide | 200 | 1 | https://www.y7agency.com/blog/dealer-auction-pickup-guide |
| /blog/dealer-auction-pickup-guide | apex HTTP | http://y7agency.com/blog/dealer-auction-pickup-guide | 200 | 1 | https://www.y7agency.com/blog/dealer-auction-pickup-guide |
| /ports/newark | www HTTPS | https://www.y7agency.com/ports/newark | 200 | 0 | https://www.y7agency.com/ports/newark |
| /ports/newark | www HTTPS slash | https://www.y7agency.com/ports/newark/ | 200 | 0 | https://www.y7agency.com/ports/newark/ |
| /ports/newark | www HTTP | http://www.y7agency.com/ports/newark | 200 | 1 | https://www.y7agency.com/ports/newark |
| /ports/newark | apex HTTPS | https://y7agency.com/ports/newark | 200 | 1 | https://www.y7agency.com/ports/newark |
| /ports/newark | apex HTTP | http://y7agency.com/ports/newark | 200 | 1 | https://www.y7agency.com/ports/newark |
| /pl/dealers | www HTTPS | https://www.y7agency.com/pl/dealers | 200 | 0 | https://www.y7agency.com/pl/dealers |
| /pl/dealers | www HTTPS slash | https://www.y7agency.com/pl/dealers/ | 200 | 0 | https://www.y7agency.com/pl/dealers/ |
| /pl/dealers | www HTTP | http://www.y7agency.com/pl/dealers | 200 | 1 | https://www.y7agency.com/pl/dealers |
| /pl/dealers | apex HTTPS | https://y7agency.com/pl/dealers | 200 | 1 | https://www.y7agency.com/pl/dealers |
| /pl/dealers | apex HTTP | http://y7agency.com/pl/dealers | 200 | 1 | https://www.y7agency.com/pl/dealers |
| /portal/login | www HTTPS | https://www.y7agency.com/portal/login | 200 | 0 | https://www.y7agency.com/portal/login |
| /portal/login | www HTTPS slash | https://www.y7agency.com/portal/login/ | 200 | 0 | https://www.y7agency.com/portal/login/ |
| /portal/login | www HTTP | http://www.y7agency.com/portal/login | 200 | 1 | https://www.y7agency.com/portal/login |
| /portal/login | apex HTTPS | https://y7agency.com/portal/login | 200 | 1 | https://www.y7agency.com/portal/login |
| /portal/login | apex HTTP | http://y7agency.com/portal/login | 200 | 1 | https://www.y7agency.com/portal/login |
| /__codex-known-404-2026-09-02__ | www HTTPS | https://www.y7agency.com/__codex-known-404-2026-09-02__ | 404 | 0 | https://www.y7agency.com/__codex-known-404-2026-09-02__ |
| /__codex-known-404-2026-09-02__ | www HTTPS slash | https://www.y7agency.com/__codex-known-404-2026-09-02__/ | 404 | 0 | https://www.y7agency.com/__codex-known-404-2026-09-02__/ |
| /__codex-known-404-2026-09-02__ | www HTTP | http://www.y7agency.com/__codex-known-404-2026-09-02__ | 404 | 1 | https://www.y7agency.com/__codex-known-404-2026-09-02__ |
| /__codex-known-404-2026-09-02__ | apex HTTPS | https://y7agency.com/__codex-known-404-2026-09-02__ | 404 | 1 | https://www.y7agency.com/__codex-known-404-2026-09-02__ |
| /__codex-known-404-2026-09-02__ | apex HTTP | http://y7agency.com/__codex-known-404-2026-09-02__ | 404 | 1 | https://www.y7agency.com/__codex-known-404-2026-09-02__ |

## 14. Private-route indexability

Representative live raw-HTML results:

| Path | HTTP | Title | Canonical | Robots meta | Sitemap |
|---|---:|---|---|---|---|
| `/portal/login` | 200 | Home default | `/` | `index, follow` | No |
| `/portal/dashboard` | 200 | Home default | `/` | `index, follow` | No |
| `/agreement/CODEX-AUDIT-ID` | 200 | Home default | `/` | `index, follow` | No |
| `/review/CODEX-AUDIT-TOKEN` | 200 | Home default | `/` | `index, follow` | No |
| `/pl/quote/confirm/CODEX-AUDIT-ID` | 200 | Home default | `/` | `index, follow` | No |
| `/pl/quote` | 200 | Localized quote page | Self | `index, follow` | Yes |

No tested response supplied `X-Robots-Tag`. `robots.txt` disallows portal, agreement, review, and promo namespaces, but disallowing crawl does not provide a reliable noindex signal. Source search found a noindex `PageMeta` in `portal/CoStart.jsx`, but not across the private namespace as a whole. The public localized quote landing pages are intentionally indexable; token/action quote routes are not equivalent surfaces.

## 15. Internal-link baseline

Only real `<a href>` links extracted from the 143 built HTML files are counted. Counts include repeated global navigation/footer/contextual links.

| Target | Anchor instances | Unique source pages | Direct links from home | Minimum click depth |
|---|---:|---:|---:|---:|
| `/dealers` | 144 | 96 | 3 | 1 |
| `/dealer-auto-transport` | 169 | 142 | 1 | 1 |
| `/auction-car-shipping` | 175 | 142 | 1 | 1 |
| `/auction-to-port-transport` | 226 | 142 | 2 | 1 |
| `/copart-shipping` | 204 | 142 | 1 | 1 |
| `/iaai-transport` | 34 | 23 | 0 | 2 |
| `/manheim-transport` | 35 | 21 | 0 | 2 |
| `/exporters` | 148 | 96 | 3 | 1 |

All priority URLs are anchor-reachable. None depends only on a button handler or another non-anchor navigation mechanism.

## 16. GA4, events, forms, and endpoints

`Analytics.jsx` loads GA4 only when `VITE_GA4_MEASUREMENT_ID` exists and consent permits analytics. It configures `send_page_view: false` and `anonymize_ip: true`, then sends SPA page views after route changes when `gtag` is available.

### Events and parameters

| Event | Parameters found |
|---|---|
| `page_view` | `page_path`, `page_location`, `page_title` |
| `agreement_sign` | none |
| `email_cta_click` | `location` |
| `telegram_cta_click` | `location` |
| `dealer_inquiry_submit` | `monthly_volume` |
| `portal_login` | `method` |
| `review_page_view` | `has_rating_param` |
| `review_submit` | `rating` |
| `language_switch` | `language` |
| `track_shipment_submit` | none |
| `quote_form_start` | none |
| `vin_decoded` | `success` |
| `quote_submit` | `has_vin`, `transport_type` |
| `quickquote_submit` | `pickup_zip`, `delivery_zip`, `contact_type` |
| `portal_recovery_link_sent` | `method` |
| `portal_register` | `method`, `customer_type` |

No `landing_page`, `lead_type`, `page_cluster`, or `source_medium` dimensions were found. No exporter-specific conversion event was found.

### Submission surfaces and endpoints

The API base defaults to `https://dispatch.y7agency.com`.

| Surface | Method and endpoint |
|---|---|
| Chat widget | `POST /api/public/chat` |
| Main quote form | `POST /api/public/quote/start` |
| Quote OTP | `POST /api/public/quote/verify` |
| Compact quote | Client navigation to localized `/quote` with query parameters; no direct POST |
| Contact | `POST /api/public/contact` |
| Daytona quote | `POST /api/public/contact` |
| Dealer quote | `POST /api/public/dealer-inquiry` |
| Exporter contact | `POST /api/public/contact` |
| Shipment track | `GET /api/public/track?code=` |
| Review | `POST /api/public/review` |
| Accept invitation | `POST /api/portal/auth/accept-invitation` |
| Portal login | `POST /api/portal/auth/login` |
| Password reset request | `POST /api/portal/auth/reset-password` |
| Registration verification | `POST /api/portal/auth/register-verify-email` |
| Dealer application | `POST /api/portal/data/dealer-application` |
| Dispatch details | `PATCH /api/portal/data/orders/:id/dispatch-info` |
| Add location | `POST /api/portal/locations` |
| Update location | `PUT /api/portal/locations/:id` |
| Location setup | `POST /api/portal/locations` |
| New order | `POST /api/portal/data/orders` after route check |
| Onboarding profile | `POST /api/portal/onboarding/update-profile` |
| Profile | `PATCH /api/portal/data/profile` |
| Email update request | `POST /api/portal/auth/update-email-request` |
| Email update verification | `POST /api/portal/auth/update-email-verify` |
| Certificate-of-origin contact | `POST /api/public/contact` |

## 17. Tests, lint, build, snapshots, and CI

### Executed validation

| Check | Result |
|---|---|
| `npm run build` | PASS: Vite built 929 modules; prerender `143 OK, 0 failed` |
| Dist route/file reconciliation | PASS: 143/143 files; none below 20 KB |
| `TZ=America/New_York node src/utils/loadDates.test.mjs` | PASS: 6 groups |
| `node src/utils/loadStatus.test.mjs` | PASS: 19 assertions |
| `node src/utils/portalNext.test.mjs` | PASS: 14 assertions |
| `npm run lint` | FAIL: 7 errors, 28 warnings in 25 files |
| `npm run seo:check` | FAIL: 22 differences across all 11 sampled routes (headings and internal links) |

### Lint errors

1. `scripts/derive-rates.mjs:40:43` - irregular whitespace.
2. `scripts/prerender.mjs:405:22` - `getComputedStyle` is undefined to ESLint.
3. `scripts/transform-cd-dispatches.mjs:18:53` - irregular whitespace.
4. `src/components/QuoteForm.jsx:23:17` - React Refresh export rule.
5. `src/components/QuoteStrip.jsx:39:7` - unused `round5`.
6. `src/pages/portal/Locations.jsx:209:9` - unused `effectiveType`.
7. `src/pages/portal/OrderDetail.jsx:852:80` - `orderId` is undefined.

There is no npm `test` script. Tests are on-demand. `prebuild` only runs the sitemap generator. The SEO snapshot script explicitly remains separate from prebuild, and `.github/workflows/safety-check.yml` does not invoke unit tests, lint, or `seo:check`; it does run repository string guards, sitemap-count guards, the full build, and prerender-count checks.

The three runnable assertion files cover:

- `loadDates.test.mjs`: date-only values retain their calendar day west of UTC, the naive Date parse would reproduce the prior defect, month/year boundaries do not slip, timestamps still localize, and absent/invalid input returns null.
- `loadStatus.test.mjs`: exact negotiation and shipping stage counts/indices, phase separation, terminal states, fail-safe handling of unknown/mismatched states, and label preservation.
- `portalNext.test.mjs`: acceptance of internal portal paths/query strings, rejection of protocol-relative/external/javascript/non-portal/empty values, safe encoding into the login URL, and fallback to the bare login path.

The current snapshot baseline is stale: all 11 routes report heading and internal-link differences. The audit did not overwrite the baseline.

## 18. Image baseline

### Source asset formats

| Format | Count | Assets |
|---|---:|---|
| PNG | 2 | `src/assets/hero-car-final-v2.png`, `src/assets/hero.png` |
| SVG | 5 | Vite asset plus favicon/icon/Open Graph vectors |
| AVIF | 3 | hero car, dealers, exporters |
| WebP | 3 | hero car, dealers, exporters |

Across the 143 built pages, 24 `<img>` elements were found. All 24 have an `alt` attribute and explicit width/height. All use `alt=""`, so descriptive-alt coverage is zero and decorative-alt coverage is 100%. This aligns with the current owner-supplied-photo treatment where those images are decorative/`aria-hidden`; it should not be interpreted as proof that every future image is decorative.

The repeated raster dimensions are 1625×704 for the home hero car, 1672×940 for dealers, and 1536×864 for exporters. Both eager/high-priority and lazy variants of the home hero occur across localized output.

## 19. Deliverable summary, specification conflicts, and next task

### Route-registry discrepancies

- All 138 sitemap URLs are in the 143-route prerender registry.
- The five prerender-only routes are /quote-verified, /quote-verification-failed, /daytonacargo, /blog/outbox-pattern-dispatch, and /404.
- The 27 finite App-only routes are exhaustively listed in section 5; they split into private/application routes and legacy redirects.
- Forty-five concrete prerender URLs are registered through App dynamic patterns instead of exact literals.
- The snapshot harness contains only 11 routes and omits 132 prerender routes. Section 5's 170-row matrix is the exhaustive finite reconciliation.

### Entity and business-fact inconsistencies

- src/pages/ports/PortPage.jsx:254 uses “Y7 Logistics LLC”; the approved public/legal pair is “Y7 Logistics” / “Y7 Consulting Inc”.
- Runtime has no 02458 and identifies Natick/01760 as the address. Historical documents still contain Newton, Chestnut, and 02458 references; the exact file/line ledger is in section 9.
- Dealer/exporter pricing is not consistent with the current flat-$50 rule. Structured data and public copy still expose $50-$60, conditional $60, and one retired $40-$60 statement. Individual max($75, 10%) pricing is represented consistently.

### Conflicts between the specification and measured/project state

1. The specification's proposed priority-page titles commonly end in “| Y7”. The repository's authoritative brand rule requires “Y7 Logistics” in titles, so those proposals cannot be implemented verbatim.
2. The specification assumes technical normalization as a target; production currently serves both trailing and non-trailing variants as 200. Any normalization change must preserve existing canonical URLs and be verified against ranking data before release.
3. The specification proposes new titles/H1s without knowledge of current values. Section 7 shows that all priority routes already have unique, crawlable title/description/H1 content. A future change must be evaluated as a page-by-page delta, not applied as a blanket replacement.
4. The specification asks for a consistent fact registry. Measured implementation duplicates facts across template schema, locale JSON, page components, scripts, and historical documents; there is no single runtime registry today.
5. The measured architecture already preserves /dealers and /dealer-auto-transport as separate indexable, self-canonical surfaces. The specification's separation rule fits current routing and does not justify merging or redirecting either page.

### Risks

- Highest: indexable home-shell responses on private and tokenized URL namespaces.
- Highest: financial-copy/schema mismatch for dealer/exporter fees.
- High: entity suffix drift (LLC vs Inc).
- High: stale, non-automatic SEO snapshot harness and red lint baseline.
- Medium: duplicate slash variants and build-generated tracked lastmod churn.
- Medium: environment drift across Node 20/22/24.

### What this audit could not determine

- Google's selected canonical, current indexed URL set, crawl frequency, and query-level cannibalization require live Search Console URL Inspection/performance evidence; raw HTTP and repository state cannot prove them.
- Cloudflare redirect, cache, bot, and WAF configuration is not stored in this repository. Live behavior was measured, but the account-level rule source could not be inspected.
- Whether the conditional $60 dealer/exporter payment-handling fee remains a valid commercial rule cannot be established from code because it directly conflicts with the current project operating fact.
- Schema syntax was parsed from built HTML, but this task did not submit pages to Google's Rich Results Test or Schema.org's hosted validator.
- Real-user Core Web Vitals and GA4 event delivery were not measured; CODEX-01 inventories implementation rather than external analytics accounts.

### Recommended next task

Do not begin the proposed title/H1 rollout yet. The next task should be a scoped P0 technical/fact remediation plan that:

1. defines server-level behavior for private and tokenized namespaces (noindex response strategy, canonical removal, and correct status behavior);
2. establishes the authoritative dealer/exporter fee rule and central entity/pricing registry;
3. corrects the lone runtime “Y7 Logistics LLC” occurrence and stale structured/public pricing only after the financial rule is confirmed;
4. adds regression checks for private-route indexability, route-registry membership, entity facts, and slash normalization.

Only after those safeguards should page-by-page metadata proposals be reviewed against section 7 and GSC landing-page/query evidence.

## Audit boundaries and assumptions

- **FACT:** all repository inspection and validation was performed against the commit identified at the top of this file.
- **FACT:** production HTTP observations are point-in-time measurements from 2026-09-02.
- **FACT:** the Markdown technical specification was used as reference input. The user stated that the DOCX is the same specification, so the duplicate DOCX was not independently parsed.
- **FACT:** instructions inside attached documents were not treated as user authority beyond the user's explicit request to execute CODEX-01.
- **FACT:** CODEX-01 made no application, content, metadata, route, server, schema, analytics, or snapshot changes.
- **ASSUMPTION:** the owner-supplied current pricing and legal/entity rules in repository instructions supersede older project documents and public copy where they conflict.
- **OPEN QUESTION:** whether the conditional `$60` dealer/exporter fee is still a valid payment-processing product rule or stale copy. Current project policy says it is stale; remediation requires owner confirmation because this is a financial rule.
- **OPEN QUESTION:** whether `/daytonacargo` and `/blog/outbox-pattern-dispatch` should remain intentional noindex pages.
- **STOP CONDITION:** none. The requested read-only baseline could be completed without modifying the implementation.
