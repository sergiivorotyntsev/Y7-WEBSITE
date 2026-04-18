# Sprint UX-CORE — Execution Report

**Sprint:** Audience Cards + WhatHappensNext + Core Audience Pages
**Date:** 2026-04-18
**Branch:** main

## Overall

Seven task commits, all green. Vite build 585 ms, prerender 97 OK / 0 failed.
AudienceCards now link to the primary B2C/B2B pages, the cramped
"What Happens After You Submit" block is retired, and the three core
audience pages (`/ship-my-car`, `/dealers`, `/exporters`) each gained a
hero trust-chip row and a cross-link footer pointing into the SEO and
utility ecosystem.

## T01 — AudienceCards links (commit `acab078`)

Before → After:

| Card | Before | After |
|------|--------|-------|
| Ship My Car | `/ship-my-car` | `/ship-my-car` (unchanged, was already correct) |
| Dealer Transport | `/dealer-auto-transport` *(SEO page)* | `/dealers` |
| Export & Port Delivery | `/door-to-port-auto-transport` *(SEO page)* | `/exporters` |

CTA labels refined and added tag text for badges. New translation keys
across all four locales:

- `audience.shipMyCarTag` / `dealersTag` / `exportersTag`
- `audience.dealersCta` → "View Pricing"
- `audience.exportersCta` → "Exporter Services"

## T02 — AudienceCards premium redesign (commit `c386f95`)

Each card now carries its own audience tone that drives the icon
gradient, hover tint, border color, and CTA ink:

- **Coral** — individuals (`#B14825 → #7A3017`)
- **Teal** — dealers (`#1B7AAB → #0D4A6B`)
- **Amber** — exporters (`#AF6B33 → #6B3D18`)

Visual changes:

- 64 px gradient icon circle with soft shadow, inner highlight ring, hover
  scale to 1.05
- Uppercase tag badge under each icon (`INDIVIDUALS` / `DEALERS` /
  `EXPORTERS`) in tone color over a soft tint
- Title bumped to 1.45 rem Georgia serif
- Card hover now lifts 4 px, adds a radial tone halo in the corner, and
  tints the background with the audience color
- Animated bottom underline on CTA, arrow translates on hover
- `prefers-reduced-motion` honored for the staggered entrance

## T03 — WhatHappensNext locations

Found in:

- `src/pages/Quote.jsx`
- `src/pages/ShipMyCar.jsx`

(Intl Home pages don't render this component.)

## T04 — ProcessTimeline (commits in T04)

New `ProcessTimeline.jsx` + `ProcessTimeline.module.css` replace the old
5-column crammed layout everywhere.

Design:

- **Desktop:** horizontal 5-column stepper with a dashed line running
  through the center of the numbered circles
- **Mobile:** vertical timeline with a dashed line down the left gutter
- Numbered coral circles (40 px) with a 4 px ring in the section background
  color to cleanly punch through the dashed line
- Step title in Georgia serif (17 px)
- Timing label in italic coral 12.5 px
- Description in muted 14 px, 22 ch max width desktop / 48 ch mobile
- Hover on a step pops the number chip to 1.08× and adds a soft shadow
- Staggered fade-in per step (100 ms) with `prefers-reduced-motion` fallback

5 steps (all localized across en/ua/pl/ru):

1. **Submit Your Request** — Instant
2. **Receive a Quote** — Under 1 hour
3. **Confirm Your Price** — When ready
4. **Carrier Assigned** — 24–72 hours
5. **Pickup & Delivery** — Varies by route

Integration: a new `processTimeline` i18n namespace was registered in
`src/i18n.js` for all four locales, `WhatHappensNext.jsx` was deleted,
and both `/quote` and `/ship-my-car` now render `<ProcessTimeline />`
in its place.

## T05 — ShipMyCar polish (commit `93ce395`)

- **Hero:** pill-shaped coral CTA button anchoring to `#quote-section`,
  hover lift + shadow; compact trust chip row (FMCSA licensed broker,
  1-hour response, no deposit)
- **Final CTA strip:** full-bleed coral gradient band below the FAQ
  with white pill CTA; subtle radial highlights in the background
- **Cross-links row:** small uppercase "More resources" label over
  animated-underline links to `/quote`, `/track`, `/faq`

All copy localized. Existing process steps, insurance/BOL callouts,
open-vs-enclosed comparison, quote form, and FAQ accordion untouched.

## T06 — Dealers polish (commit `a8d1e7c`)

- **Hero:** kicker is now localized (was hard-coded "For Dealers") and
  a trust chip row (Net-15 billing, dedicated dispatcher, volume rates
  from 6+ loads/mo)
- **Cross-links row** below the existing CTA strip pointing to
  `/dealer-auto-transport` (SEO deep-dive), `/dealer-quote`,
  `/exporters`

Existing benefits list, two pricing models, volume tier table, and
primary "Get Dealer Quote" CTA preserved.

## T07 — Exporters polish (commit `ef285c7`)

- **Hero:** localized kicker + trust chip row (gate pass coordination,
  all major US ports, transparent cost-plus pricing)
- **Cross-links row** at the bottom of the page pointing to
  `/door-to-port-auto-transport` (SEO deep-dive),
  `/auction-to-port-transport`, `/dealers`

Existing fee table, port cards, value proposition, process steps, and
inquiry form preserved.

## T08 — Build + Prerender

- `npx vite build` → **OK in 585 ms**
- Bundle: `index-r3SlrYJH.js` 708 kB (gzip 200 kB)
- Prerender → **97 OK, 0 failed**
- Zero duplicate title/meta tags, 100% pages carry the AnimatedLogo +
  Footer logo from the prior hotfix.

## Manual QA checklist

- [ ] `/` — scroll to WHO WE SERVE cards; each card should land on its
      main page (not the SEO page) and each CTA should read "Get Quote",
      "View Pricing", "Exporter Services".
- [ ] `/ship-my-car` — hero CTA scrolls to the form, final CTA strip
      appears below the FAQ, three cross-links at the bottom resolve.
- [ ] `/dealers` — hero shows trust chips; bottom cross-links resolve
      including the deep-dive `/dealer-auto-transport`.
- [ ] `/exporters` — hero trust chips render; bottom cross-links
      resolve including `/door-to-port-auto-transport` and
      `/auction-to-port-transport`.
- [ ] `/quote` — ProcessTimeline renders below the form; timeline is
      horizontal on ≥880 px, vertical below.
- [ ] Switch language to `/ua`, `/pl`, `/ru` — confirm audience tags,
      CTA labels, trust chips, ProcessTimeline steps, and cross-link
      titles are all localized.
