# CAPTURE-S1 — Y7-WEBSITE (frontend half) — Closure Report

**Repo:** `C:\dev\Y7-WEBSITE` · **Date:** 2026-06-13 · **Mode:** autonomous overnight, **local commits only — nothing pushed.**
**Commits:** `8e3ad4e` (W01) → `04cb1e8` (W03), 3 commits ahead of `origin/main` (bbc55db). 3 files, +172/−7.
**Consumes** the TRANSPORT CAPTURE-S1 backend contracts (`GET /api/portal/data/fee-schedule`, `service_tier` on order-create + order GETs, `422 delivery_contact_required`, enriched dealer 403s).

---

## Anchors confirmed (Phase 0) — no contradiction

`NewOrder.jsx` conditionals (`isWarehouseUser`/`isAuctionBuyer`, :188-223), submit → `POST /api/portal/data/orders` (:414), success screen (:442). `DispatchDetails.jsx` fetches `/api/portal/data/orders/{id}` (:59) and now reads `order.service_tier` (exposed by TRANSPORT T07). `Dashboard.jsx` ownership nudge (:177-237); orders list carries `service_tier` + `delivery_contact_phone` (TRANSPORT T07). `useAuth.portalFetch` redirects `agreement_required`/`classification_required` but passes the two dealer 403s through (the seam for W04). All portal calls use `portalFetch` (no separate api.js). `theme.js` tokens used. Contact CTA → `/contact`. **Cross-repo gap found & fixed in TRANSPORT (T07):** the order GETs did not expose `service_tier`/`delivery_contact_*` — added there so this half can drive COD validation + the nudge.

---

## Per-phase

| Phase | Commit | What / why |
|---|---|---|
| **W01** tier selector | `8e3ad4e` | New Order form section "How should the carrier be paid?" for **individual/auction_buyer only**; two radio options, **COD default**; fee amounts from `GET /api/portal/data/fee-schedule` (never hardcoded — `fmtFee` from endpoint); `service_tier` added to the create payload (omitted for other types). Inputs ≥16px, theme tokens, pinned copy + footnote. |
| **W04** under-review screen | `8e3ad4e` | `company_verification_required` / `trial_quotes_exhausted` 403s now set `gateBlock` from the enriched payload and render a full-screen friendly "under review" message (pinned copy, **no SLA**) with a **Contact us** CTA → `/contact`, replacing the bare inline error. Visually consistent with `ActionRequired`. |
| **W03** proof prompt + nudge | `8e3ad4e` (NewOrder) + `04cb1e8` (Dashboard) | New Order success screen shows a soft ownership-proof prompt (individual/auction_buyer) → order detail upload card. Dashboard ownership nudge copy/visibility strengthened (icon, bolder, "speeds up dispatch") — still soft, not a hard gate. |
| **W02** COD delivery-contact | `f44ada1` | DispatchDetails: for COD orders (`order.service_tier==='cod'`), delivery contact name+phone required (client validation + surfaces the backend `422 delivery_contact_required`), with required `*` + "who pays the driver" hint; full_service stays optional. Dashboard: nudge card for a confirmed COD order missing its delivery contact → dispatch-details. |

---

## Verification (triad)

**1. Build (the defined `npm run build`)** — `vite build` clean on every change (≈0.7s; pre-existing >600 kB single-chunk warning only, no `React.lazy` per constraint). Full production build with prerender: **PASS — `Prerender complete: 115 OK, 0 failed (712.2s)`, exit 0.**

**2. Lint** — `eslint` on the three changed files reports the **same 2 pre-existing `set-state-in-effect` errors** present on `origin/main` (the untouched `warehouses` + direction-reset effects). **My changes add zero new lint errors** (the fee-schedule effect calls setState in an async `.then`, which the rule permits). Verified by stash-diff against base.

**3. Content asserts (code-level)** — fee amounts render via `fmtFee(feeSchedule?.…)` from the endpoint, **no literal dollar values** in the component; pinned copy strings present verbatim (tier headings, under-review headings/bodies, footnote, COD hint). `service_tier` sent only for individual/auction_buyer; the two 403 codes drive `gateBlock`.

**Render-pass (Puppeteer) & live E2E — DEFERRED (post-push).** The new surfaces (New Order tier selector, Dispatch Details COD state, success proof prompt, dealer under-review) are **authenticated portal screens** behind `ProtectedRoute`; Puppeteer/prerender cannot reach them without a running backend + portal session (prerender covers public routes only). Per the sprint's "no backend reachable" clause these visual + live checks are **DEFERRED to a post-push pass against the deployed backend**. Mitigation: the **TRANSPORT half's logical E2E already proved the exact backend contracts green** (fee-schedule values, tier persistence per type, COD 422, enriched 403s) — this frontend consumes those same contracts, asserted at code level here.

---

## i18n handling
The portal pages (`NewOrder`, `DispatchDetails`, `Dashboard`) use **hardcoded English** (no `useTranslation`/`t()`) — consistent with the existing portal convention (the order-flow is English-only today; locale key is `'ua'`, not `'uk'`). All new strings were added as **inline English** to match; **no pl/ua/ru keys were added** (none exist for these pages — adding parallel keys would be a separate i18n sprint, out of scope). No other locale content was touched.

## package-lock.json
**Unchanged** — no dependencies added. Dockerfile `npm ci` unaffected.

---

## STOP
CAPTURE-S1 WEBSITE complete — local commits only, awaiting Sergii's `git diff` review + push decision (push TRANSPORT first).
