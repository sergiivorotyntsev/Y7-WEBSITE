# PHASE5E — CTA hover: replace 5D green underline (D) with brightness+lift (C) — Report

**Date:** 2026-06-22
**Repo:** Y7-WEBSITE. **Status:** Built + verified on the live local stack. **Committed local, HELD — not pushed.**
**Commit:** `d81ba84` T01 (variant C swap) · T01 docs (this).

## Goal
The 5D variant-D hover (a `--success` underline sweeping in under the rust CTA) read as a clumsy
green bar on prod, not a refined accent. 5E replaces it with variant C: the rust CTA simply
brightens slightly and lifts on hover — no underline, no hue change. CSS-only; four scoped classes.

## What shipped (CSS-only, 3 files / 4 classes)
Removed the variant-D `::after` green-underline rule (+ its `scaleX` sweep + `prefers-reduced-motion`
branch) and added variant C hover to each of:
- `.heroCtaPrimary` (`Home.module.css`)
- `.submit` (`QuoteFormCompact.module.css`)
- `.headerCta`, `.mobileCta` (`Header.module.css`)

Variant C on those classes: at rest solid rust (`--accent` / the rust gradient); on hover
`filter: brightness(1.1) saturate(1.05)` + `transform: translateY(-2px)` (+ the existing
`--accent-glow` shadow on hero/submit). No color/hue change, no extra elements, no `::after`.
`filter` added to each `transition` list so the brightness eases in. `prefers-reduced-motion`: the
lift/brightness stay (not motion-sensitive sweeps); the animated underline is simply gone.

**Untouched:** rust resting color, dark header, three-tier widget, rust chat, the 5C slogan
rust→green shimmer, the card-title black→rust gradient, and the shared `btnAccent` base.

## T01 verification (live local stack)
- **Hover (live, computed):** hero GET A QUOTE and header GET A QUOTE on hover →
  `filter: brightness(1.1) saturate(1.05)` + `transform: translateY(-2px)`, **`::after` content = none**
  (no underline). `.submit:hover` rule verified from the stylesheet (same filter+lift, no `::after`).
- **Rust resting color unchanged:** header CTA `rgb(122,48,23)` (hover) / `rgb(153,60,29)` (rest);
  submit `rgb(153,60,29)`; hero uses the rust gradient — all rust, no hue shift.
- **5C preserved:** slogan "You move forward." still text-clipped + `heroSloganSweep` animation;
  card title "Ship My Car" still rust gradient.
- **Mobile ~380px:** dark header + full-width rust CTA, no green underline; chat rust.
- **Integrity:** **prerender 116/0**; built CSS has **no `:after` underline on any of the four CTA
  classes** and **no `btnAccent:after` leak**; all four `:hover` rules carry
  `filter:brightness(1.1)saturate(1.05);transform:translateY(-2px)`; **no console errors**.
Screenshots: `phase5e_hero_hover.png`, `phase5e_mobile_380.png`.

## Deploy (on approval — Y7-WEBSITE only)
Push → Railway prerender (~10–12 min). **"push success" ≠ live** — after it completes, confirm on
www.y7agency.com: the green underline is gone and the rust CTAs (hero, header GET A QUOTE, quote-form
submit) simply brighten + lift on hover.
