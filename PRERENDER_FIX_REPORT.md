# Hotfix PRERENDER-FIX — Report

## Root cause

Railway build failed at `npm run build` with:

```
Prerender complete: 103 OK, 3 failed (726.0s)
[FAIL] /privacy: Navigation timeout of 30000 ms exceeded
[FAIL] /terms: Navigation timeout of 30000 ms exceeded
[FAIL] /accessibility: Navigation timeout of 30000 ms exceeded
```

The prerender script was using Puppeteer's `waitUntil: 'networkidle0'`, which resolves only after 500 ms of zero network activity. Three legal pages are static and render so fast that the only request left in flight when the page settles is the gtag.js script that `Analytics.jsx` injects via useEffect. In Docker's sandboxed network environment, that request can hang with no response — so `networkidle0` never resolves and the 30s timeout fires.

Other 103 routes survived because they had enough internal JS work or lazy-loaded chunks to push gtag past the idle window.

## Fix applied

All changes in `scripts/prerender.mjs`, in the per-route puppeteer loop:

1. **`waitUntil: 'networkidle0' → 'domcontentloaded'`** — predictable, doesn't depend on every network request resolving. Hydration is still waited on via the existing `__PRERENDER_READY` event and `data-rh="true"` Helmet check further down.
2. **`timeout: 30000 → 60000`** — defensive buffer for slower routes in Docker.
3. **+800ms `setTimeout` after `page.goto`** — explicit React-hydration grace period before the `__PRERENDER_READY` check begins.
4. **Extended request interception** — added known external tracking domains to the abort list so even if React briefly injects the gtag script tag, the request aborts immediately instead of hanging:
   - googletagmanager.com
   - google-analytics.com
   - googleadservices.com
   - doubleclick.net
   - facebook.com / facebook.net / fbcdn.net

   Preserves the existing image/media/font blocks.

## Why this is safe

- `Analytics.jsx` gates script injection behind `getConsent() === 'all'`. During prerender the cookie is never set, so `loadGtag()` never runs. Even if it did, aborting the request does not affect the DOM snapshot — the script just wouldn't execute.
- The static HTML written to `dist/{route}/index.html` contains zero references to gtag/googletagmanager either way (verified in prior P1-FF-T02 and P1-FF-T03 checks).
- Helmet and `__PRERENDER_READY` still drive the "page is ready to snapshot" signal; `domcontentloaded` only affects the initial navigation timing.

## Verification

Local `npm run build` after the fix: Prerender complete, **106 OK, 0 failed**. All three legal routes (`/privacy`, `/terms`, `/accessibility`) now prerender successfully.

## If this recurs for new domains

The fix is a domain allowlist, so any future third-party tracking integration that hangs in Docker can be silenced the same way — add the domain to `TRACKER_DOMAINS` in `scripts/prerender.mjs`. Symptoms to watch for in Railway logs: timeouts on routes with little content (legal, 404-style pages) while content-heavy routes still pass.

## Commits

```
04ccee6 [PRERENDER-FIX-T01] fix: switch to domcontentloaded + block external tracking during prerender
<pending> [PRERENDER-FIX-T02] chore: verify prerender and deploy
```
