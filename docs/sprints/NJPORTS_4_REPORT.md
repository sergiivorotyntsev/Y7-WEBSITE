# NJPORTS-4 — Sprint Report

**Repo:** Y7-WEBSITE · **Branch:** `wip/njports-4` (from `main` @ `6cb147c`) · **Date:** 2026-07-24
**Status:** HELD — nothing pushed

Three narrow corrections plus one diagnostic. `main` was at `6cb147c` (NJPORTS-3 merged in), so
branched from `main` cleanly. Pre-check: not behind, tree clean, baseline current (11 routes).

---

## T1 — `twitter:description` diagnostic → SHARED DEFAULT, code left alone

**Branch taken: the shared-default branch — no code changed.**

Findings (all from commands run this session):

- The generic string is a **site-wide static default**: `index.html:26`
  `<meta name="twitter:description" content="Licensed auto transport broker. Verified carriers, shipment status updates." />`.
- `src/components/PageMeta.jsx` (the shared meta component) emits `twitter:card` (`:62`) and
  `twitter:image` (`:63`) but **no `twitter:description` at all** — there is **no per-page prop that
  these two pages simply fail to pass**; the tag is never emitted per-route, so the static default
  in `index.html` survives on every page that uses `PageMeta`.
- Scope: **135 of 139** prerendered routes carry the generic `twitter:description`. The other 4 are
  intl pages that emit their own via inline Helmet (`PolandShipMyCar.jsx:196`, `UkraineCopart.jsx:270`,
  `UkraineHome.jsx:285`, `UkraineShipMyCar.jsx:212`). `scripts/prerender.mjs:96` already dedups
  `twitter:description` when a page emits one.

**Why left alone:** the fix is *not* contained to the two pages in scope. The only fix is to add
`<meta name="twitter:description" content={description} />` to `PageMeta.jsx`, which would make
`twitter:description` track each page's description on **all ~135 `PageMeta` routes** — a broad meta
rewrite that needs Sergii's sign-off, exactly the case §T1 says not to touch. (Note: the snapshot
harness does **not** capture `twitter:description`, so `seo:check` would *not* flag this change — the
review would have to be manual.)

**Recommendation (one line):** add `<meta name="twitter:description" content={description} />` to
`PageMeta.jsx` right after line 63 — a one-line, site-wide improvement that gives every page a unique
Twitter description, but it rewrites the tag on ~135 routes, so it is a deliberate decision, not a
micro-fix. **File/line: `src/components/PageMeta.jsx:62-63` (the gap) and `index.html:26` (the default).**

## T2 — "$70" qualified as a carrier-rate figure

Both the door-premium section and its matching FAQ, on **both** pages, now state the $70 is added to
the **carrier rate**, not Y7's fee, and that Y7's fee is unchanged by pickup point:

- `DoorToPort.jsx` — door-premium section: *"That $70 is added to the carrier rate — the amount paid
  to the trucker — not to Y7's fee, which stays the same flat figure whichever pickup point you
  choose."* FAQ ("Is it cheaper to ship from an auction…"): *"This $70 is part of the carrier rate,
  not the Y7 fee — Y7's flat fee (dealers and exporters $50, individuals $75) is unchanged by where
  the car is picked up."*
- `NjExportWarehouseShippingCost.jsx` — same gap, same fix in the "Auction Pickup Versus a Dealer or
  Private Address" section and its FAQ.

`FAQPage` schema stays in sync — **8 schema questions = 8 visible `<details>`** on door-to-port
(verified on the prerendered output).

## T3 — evidence levelled across the six ports

- **One qualifier covering the whole port section** (`DoorToPort.jsx`, "Major US Export Ports"
  intro): *"The per-port timing notes below reflect our operating experience rather than a measured
  dispatch sample — only the New Jersey figures elsewhere on this page are drawn from the 156-dispatch
  dataset."* No per-port data invented, no statement deleted.
- **Corridor parity restored:** the Northeast/Mid-Atlantic entry (which lost its transit line in
  NJPORTS-3) now reads *"…its dispatch-to-delivery times are the New Jersey-inbound figures shown in
  the transit section above"* — pointing to §2b rather than inventing a fresh number, consistent with
  the dispatch-scoped framing. The other three corridors keep their existing lines.

## T4 — reciprocal internal link

Added a **"Door-to-Port Transport"** chip to the NJ pricing page's Related block (verified rendering:
6 chips, resolves to `/door-to-port-auto-transport`, 200).

**Chip decision:** the Related block is **not capped at five** — `SeoLandingPage` renders every item
in the `related` array — so nothing was dropped; the chip was **added as a sixth**. (Had it been
capped, the weakest by proximity-to-pricing would have been *Port Newark*, a terminal-logistics page
rather than a pricing one — but no removal was necessary.)

---

## Verification

1. **`npm run build`** — clean. Prerender **139 OK, 0 failed** — route count **unchanged**.
2. **`npm run seo:check`** — **1 change**, on the page I touched:
   ```
   ~ /nj-export-warehouse-shipping-cost :: internalLinks  {total 66→67, unique 46→46}
   ```
   The T4 chip (+1 total). `unique` is unchanged because `/door-to-port-auto-transport` is already
   reachable from every page via the global footer/nav. **No other page changed.** T2/T3 changed only
   body/FAQ-answer text (no heading, title, description, canonical, hreflang, JSON-LD type, or link
   target), so — as expected — they produce no snapshot diff. T1 changed nothing. Baseline refreshed
   afterward in a separate commit.
3. **`npm run preview`** (:4190) — both pages 200; the NJ page shows the new Door-to-Port chip and it
   resolves; the carrier-rate qualifier reads naturally in place.
4. **Door-to-port `FAQPage` JSON-LD** parses and still matches visible copy — 8 = 8.
5. **Figure grep** — every dollar/day figure on the two edited pages traces to §2 / the NJPORTS-2–3
   fact tables: door-to-port `$` values are the §2a band ($170–$665), §2a per-mile ($2.56–$0.52), the
   fee ($50/$60/$75), and the $70 door premium; `156` is the §2b sample size; `$75,000` is the global
   footer bond (site chrome, not page content). No forbidden term (`GPS`, `real-time`, `we transport`)
   on either page; every `insured/insurance` mention carries the carrier qualifier.

**`TODO(sergii)` markers:** none.

---

## Commits (HELD — not pushed)

T2 spans both edited files and T3/T4 are single-file, and the changes interleave within each file
(no interactive hunk staging available), so commits are **per file with combined tags**:

- `[NJPORTS-T2][NJPORTS-T3]` — `DoorToPort.jsx` (carrier-rate qualifiers + per-port evidence label + corridor transit line)
- `[NJPORTS-T2][NJPORTS-T4]` — `NjExportWarehouseShippingCost.jsx` (carrier-rate qualifiers + reciprocal chip)
- `[NJPORTS-T4] chore` — `scripts/seo-baseline.json` (baseline refresh, separate commit after confirming intent)
- `[NJPORTS-4] docs` — this report

T1 produced no code change (diagnostic only — see above).

Build-regenerated `public/sitemap.xml` / `scripts/sitemap-lastmod.json` left uncommitted (lastmod
churn; no route added).

**STOP** — no push.
