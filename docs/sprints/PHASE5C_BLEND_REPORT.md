# PHASE5C-BLEND — Home rust↔green connective tissue + one copy fix — Report

**Date:** 2026-06-21
**Repo:** Y7-WEBSITE. **Status:** Built + verified on the live local stack. **Committed local, HELD — not pushed.**
**Commits:** `591ef24` T02 (blends + EN copy) · `f74a242` T02 (pl/ua/ru copy) · `<t03fix>` T03 (rest=rust tweak) · T04 docs (this).

## Goal
After 5B (Home in green, rust hero anchor), rust and green read as two separate colors. 5C adds
three CSS "connective tissue" moments where rust and green blend, plus one honest copy fix.
Augment-only (CSS/presentational) except the single copy string (fixed in 4 languages).

## What shipped (4 items)
1. **Hero slogan "You move forward." → animated rust→green shimmer** (`.heroAccent`): gradient over
   `background-clip:text`, slow continuous sweep (`--blend-sweep 6s`). **Solid rust base** outside
   `@supports` (never invisible); **`prefers-reduced-motion` → static gradient**. Home-scoped.
2. **Primary CTAs rust→green on hover** — a real **fill slide** via `background-position` over a wide
   gradient: **rust at rest, green on hover** + lift. Scoped to Home-only `.heroCtaPrimary` +
   `QuoteFormCompact .submit`; the **shared `btnAccent` is untouched** (no leak). Focus-visible included.
3. **Audience-card titles black→rust gradient** (`.title`, `@supports` + solid `--text` fallback):
   uses `--accent` directly (since `--tone-ink` is green post-5B), deepens toward rust on hover —
   reintroduces rust into the green cards. In `AudienceCards.module.css` → Home **and** UkraineHome (approved).
4. **Copy fix:** `quickQuote.title` "Get a free quote in 30 seconds" → **"Request a quote in 30
   seconds"** — honest (30s = fill time; subtext "respond within 1 hour"). Fixed in **en + pl + ua + ru**.

Tokens: reused `--accent`/`--accent-hover` + `--success` family; only `--blend-sweep` added (non-color).

## T04 verification (live local stack)
- **Slogan:** `background-clip:text` + rust→green gradient + `heroSloganSweep` animation; text "You
  move forward." in the DOM; reduced-motion rule present in the built CSS.
- **CTAs:** rest = **rust**, hover = **green** (real `background-position` slide) — verified on the
  hero CTA and the quote-form submit. (T03 tweak: tightened gradient stops to 45%/55% so the rest
  window is pure rust — it had bled green.)
- **Card titles:** `background-clip:text` black→rust gradient on Home and UkraineHome.
- **Copy:** EN "Request a quote in 30 seconds"; UkraineHome shows "Запросіть оцінку за 30 секунд";
  old wording gone.
- **Integrity:** prerendered `dist/index.html` contains the slogan + card titles + the corrected copy
  ("Request a quote" 1, old 0); **no `btnAccent` leak** (file untouched); **prerender 116/0**; **no
  console errors**.
Screenshots: `phase5c_hero_slogan.png`, `phase5c_cta_hover_green.png`, `phase5c_cta_rest_rust2.png`,
`phase5c_mobile_hero.png` (+ UkraineHome verified via DOM assertions).

## Deploy (on approval — Y7-WEBSITE only)
Push → Railway prerender (~10–12 min). **"push success" ≠ live** — after it completes, confirm on
www.y7agency.com: the slogan shimmers rust→green, the hero/quote CTAs go green on hover, card titles
are rust-tinted, and "Request a quote in 30 seconds" is live (no "Get a free quote in 30 seconds").
