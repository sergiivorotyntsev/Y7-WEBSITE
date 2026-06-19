# PHASE5A-MAGNET — Bait-Quote Magnet on Home (below hero) — Sprint Report

**Date:** 2026-06-19
**Repo:** Y7-WEBSITE (React 19 + Vite, Puppeteer prerender). **Status:** Built + verified on the
live local stack. **Committed local, HELD — not pushed.**
**Commits:** `7d84f73` T02 (component) · `610bffb` T03 (wire) · T04 (mobile fix + docs, this).

---

## What shipped
A premium **dark "spotlight" bait-quote band** directly below the Home hero: the dealer picks a
route (12 metros) + vehicle + open/enclosed and instantly sees Y7's transparent
carrier+flat-fee estimate vs a typical broker, the savings, and a CTA into the quote form. Pure
client-side marketing estimate — no backend.

- **Component:** `src/components/BaitQuote/{BaitQuote.jsx, BaitQuote.module.css}`.
- **Model (verbatim from the approved mockup):** `carrierMid = max(150, 115 + 10·miles^0.55)·vMult·tMult`;
  vehicle Sedan 1.0 / SUV 1.13 / Pickup 1.25; Open 1.0 / Enclosed 1.4; range ×0.95–×1.12 (→ $25);
  flat fee $50; broker `max($100, round(mid·0.2/10)·10)`; haversine ×1.18; 12 metros.
- **Tokenized:** every brand color via CSS var — `#0F6E56` → `var(--success)` (exact); 3 new
  `--success`-derived tokens (`--success-mid`, `--success-bright`, `--spotlight-bg`) in
  `variables.css` + the `theme.js` mirror; figures `var(--font-mono)`; **headline `var(--font-serif)`**;
  the Google Fonts `@import` removed. On-dark text tints are component-scoped local vars.
- **No new dependency:** 7 icons inlined as SVG (lucide-react not added; `package-lock.json` untouched).
- **Prerender-safe / visible-by-default:** no `window`/`document` at module load; entrance motion is
  CSS-only (runs without JS, ends visible; `prefers-reduced-motion` → static); `useCountUp` inits to
  the real target (no "0" flash).
- **Placement:** `Home.jsx`, directly below the hero `</section>` (before `ExternalReviewsStrip`), in
  the page rhythm (`padding: clamp(60px,8vh,100px) 24px`) with a `◆ Instant dealer estimate` kicker;
  both CTAs → `scrollToQuote` (#quote-section). English-only for 5A (i18n deferred).

## T04 verification (Playwright, live local stack :5173)

| Check | Result |
|---|---|
| Band renders directly below the hero | ✅ (kicker + serif headline + controls + comparison) |
| Live price update on route change | ✅ Dallas→Newark **$700–$825** (1,608 mi) → Newark→Boston **$350–$400** (232 mi) |
| Boston calibration matches target (~$350–400) | ✅ exactly $350–$400 (concave curve correct in the live component) |
| Savings badge | ✅ "You save $140+" (Dallas→Newark), "$100+" (Newark→Boston) |
| Both CTAs scroll to #quote-section | ✅ "Lock this rate" → quote-section at viewport top (`scrollY=4439, top=0, inView`) |
| Desktop screenshots | `phase5a_magnet_desktop_dallas_newark.png`, `…_newark_boston.png` |
| Mobile ~380px | initially cramped (segmented controls); **fixed** → control rows stack full-width (`phase5a_magnet_mobile_380_fixed.png`) |
| Premium look with real tokens | ✅ `--success` spotlight reads as a Y7 brand moment, not pasted-in |
| Console errors on Home | ✅ none (only React DevTools info) |
| Full prerender | 116 OK / 0 failed (T03; re-run after the mobile CSS fix — see below) |

### T04 mobile fix (found during verification)
At 380px the Vehicle/Transport segmented controls sat side-by-side and cramped ("Pickup truck"
wrapped to "Pic truck"; city selects truncated to "Newa"). Guardrail #4 requires the section to
"look right at ~380px." Fix: under 520px the control rows (`.controls`, `.controls2`) stack
`flex-direction: column` (each control full-width) and the horizontal `→` arrow is hidden (reads
wrong between vertically stacked selects). Re-verified at 380px: every control full-width,
"Pickup truck" fits, full city names show.

## Prerender
- T03 build: **116 OK / 0 failed**; the prerendered `dist/index.html` contains the band's
  server-rendered markup ("honest", "Instant dealer estimate", "Y7 dealer fee", "Dallas, TX",
  "You save", "Lock this rate" — each 1×) → real SSR, not JS-only.
- Final build (with the mobile CSS fix) re-run to reconfirm 116/0 before push.

## Deploy (on approval — Y7-WEBSITE only)
Push Y7-WEBSITE → Railway prerender (~10–12 min). **"push success" ≠ live** — confirm the band
renders on `www.y7agency.com` Home **after** the prerender completes.

## Deferred (not this sprint, per spec)
ZIP input; live `/api/public/distance` + pricing-engine integration (formula is a stand-in
marketing estimate); `/dealers` teaser; quote-form redesign; i18n of the band.
