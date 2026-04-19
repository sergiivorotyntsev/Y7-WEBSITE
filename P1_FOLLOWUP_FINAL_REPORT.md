# Sprint P1-FOLLOWUP-FINAL — Report

## Summary
- `robots.txt` extended with explicit `Allow: /assets/` for 7 search bots (including AI search bots)
- GA4 infrastructure consolidated into a single consent-aware Analytics component
- Env var migrated from `VITE_GA_ID` to `VITE_GA4_MEASUREMENT_ID` to match Railway config
- Measurement ID `G-NPFLZQT2BL` will be injected at Railway build time
- Prerender 106 OK, 0 failed — no regression
- gtag.js no longer appears in static HTML (consent-gated, loads post-hydration)

## T01 — robots.txt `/assets/` Allow

**Before:** only the global `User-agent: *` block had Disallow rules for `/assets/*.js$`, `/assets/*.css$`, `/assets/*.map$`. Googlebot had its own block without those disallows, so it could fetch hashed bundles. Other crawlers fell back to the global block and were effectively blocked from Vite's bundles, which can impair rendering.

**After:** Bingbot, Slurp, DuckDuckBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, and Applebot each got an explicit `Allow: /assets/` line so their crawlers can render JS-powered pages fully.

AI **training** bots remain fully blocked (GPTBot, anthropic-ai, ClaudeBot, CCBot, Bytespider, FacebookBot, Amazonbot, cohere-ai, Google-Extended) — they don't render, so they don't need bundle access.

File structure preserved: 24 User-agent blocks, same order, only `Allow: /assets/` lines added.

## T02 — GA4 Infrastructure

### What existed before
The project had GA4 code spread across 3 locations:
- `src/main.jsx` unconditionally appended the gtag.js script tag to the document when `VITE_GA_ID` was set.
- `src/utils/analytics.js` held `initGA`, `trackEvent`, and `trackPageView` — all consent-gated.
- `src/App.jsx` called `trackPageView(location.pathname)` on route changes.

The existing `CookieConsent` component gated GA4 via the `y7_consent` cookie (GDPR-friendly for Poland/Ukraine markets).

### What changed
**Consolidated into Analytics.jsx** — everything GA4-related (script loading, dataLayer/gtag bootstrap, route tracking) now lives in one place and is consent-aware:
- Does nothing during prerender (puppeteer has no consent cookie, so gtag never loads)
- Listens for `y7-consent-accepted` event so late consent still enables tracking
- Uses `send_page_view: false` + manual `page_view` events per route change
- Sets `anonymize_ip: true`

**Env var migration:** every `VITE_GA_ID` reference changed to `VITE_GA4_MEASUREMENT_ID` to match the Railway-configured name. Files updated: `Analytics.jsx`, `CookieConsent.jsx`, `.env.example`.

**Dead code removed:**
- `src/utils/analytics.js` deleted (replaced by `Analytics.jsx` + `utils/trackEvent.js`)
- Direct gtag script loading in `main.jsx` removed
- Static gtag stub in `index.html` removed
- `trackPageView` call in `App.jsx` removed (Analytics handles it internally)

**11 consumer files** had their `trackEvent` imports repointed from `../utils/analytics` to `../utils/trackEvent`.

### New files
- `src/components/Analytics.jsx` — single source of truth for GA4
- `src/utils/trackEvent.js` — consent-gated event utility

### CookieConsent event contract
`CookieConsent` now dispatches `window.dispatchEvent(new Event('y7-consent-accepted'))` when the user clicks "Accept All". `Analytics.jsx` listens for this and loads gtag.js if not already loaded. This decouples the consent UI from the analytics implementation.

## T03 — Verification

```
lint:          0 errors, 0 warnings
vite build:    green
prerender:     106 OK, 0 failed (622s)
dist/index.html: 0 gtag references
dist/assets/*.js: 0 G-NPFLZQT2BL references locally (no .env.local set)
```

Railway's Vite build will embed `G-NPFLZQT2BL` into the JS bundle at deploy time — this is expected Vite behavior and the ID is a public-facing identifier (not a secret).

## Deviation from the original plan

The plan assumed a greenfield GA4 setup. The repository already had consent-gated GA4 wiring using a different env var (`VITE_GA_ID`). Adapting preserved GDPR compliance for the Poland/Ukraine markets instead of creating a parallel, consent-bypassing Analytics system alongside the existing one.

## Next steps (user action after deploy)

1. Wait ~3 min for Railway to redeploy with `VITE_GA4_MEASUREMENT_ID=G-NPFLZQT2BL` embedded
2. Visit `https://www.y7agency.com`, accept "All" in the cookie banner
3. Check GA4 Realtime report — should show 1 active user within 30 seconds
4. Link GA4 to Search Console: GA4 Admin → Product Links → Search Console Links
5. Wait 2-4 weeks for data accumulation before next data-driven sprint
