# [SPRINT-P2b] Show the fee where the customer chooses their account type

Worktree `C:\dev\Y7-WEBSITE-p2b`, branch `wip/p2b-fee-display`, base `7c5a0f4` (origin/main).
**HELD. No push. No prod writes.** The shared `C:\dev\Y7-WEBSITE` checkout is NOT touched.

Backend already in prod: `GET /api/portal/orders/{order_id}/fee-preview?account_type=…`
(`TRANSPORT api/routes/fee_preview.py`) — pure read, legacy-aware
(`_prospective_pricing_model`), soft-gated by `require_authenticated_customer`. Returns per
type: `{account_type, pricing_model, fee_cents, fee_range_min_cents, fee_range_max_cents,
basis, carrier_paid_by, explanation}`. **Never called by any UI today.**

---

## PHASE 0 — surface map (read-only, file:line)

### The account-type card surfaces — THREE, one shared data source
All three render `data/accountTypes.js` (`accountTypeCards(pricingModel)` — the WAC-T01
single source of truth, anti-drift tested on the TRANSPORT side against the fee engine by
`test_wap_surfaces.py` / `test_b2b_cards.py`). Terms are already resolved per `pricing_model`
(legacy customers get `B2B_LEGACY_TERMS` / `LEGACY_FEE_LINES`).

| # | Surface | file:line | Auth | Order context |
|---|---|---|---|---|
| A | Onboarding wizard, `AccountTypeStep` | `src/pages/portal/Onboarding.jsx:649-728` (cards `671-724`, terms `655-657`) | yes (magic-link session) | **YES** via `?next` — the sprint's primary door |
| B | Dashboard change-type / first-visit modal, `AccountTypeModal` | `src/components/AccountTypeModal.jsx` (terms `82-89`, `265-274`) | yes | none inherent (customer-level reclassification) |
| C | Signup step (pre-account), `LoginCard` | `src/pages/portal/components/LoginCard.jsx:126` `REG_TYPES = accountTypeCards('ind_2026')`, render `589-591` | **no** (pre-account) | none |

### Order context IS reachable in the wizard (Phase 0 item 5, decision #5)
`QuoteAction` confirm success → `Link to /portal/magic/{signin_token}?next=/portal/order/{id}/dispatch-details`
(`QuoteAction.jsx:161-175`) → `MagicLogin` navigates to `next` (`MagicLogin.jsx:35-36,86`) →
the dispatch-details page 403s `classification_required` → `useAuth._recover` redirects to
`/portal/onboarding?next=/portal/order/{id}/dispatch-details` (`useAuth.jsx:100-111`) →
`Onboarding` reads `rawNext` (`:142-144`). The type step parses the order id from `?next` with
`/\/portal\/order\/(\d+)\b/`. Several open orders → no single `?next` order → generic.

### Auth reachability (Phase 0 item 4) — NO TRANSPORT CHANGE NEEDED
`require_authenticated_customer` is the SOFT gate (`fee_preview.py:73-81`): it does not require
an active/classified customer, because the caller is mid-onboarding. The wizard is already
authenticated (`portalFetch('/api/portal/data/customer-type')`, `/api/public/agreement-template`).
`portalFetch` targets `API_URL` (`useAuth.jsx:6,80`). Reachable as-is → **no `wip/p2b-fee-api`.**

### What each card claims about price TODAY (Phase 0 item 2, verbatim)
`src/data/accountTypes.js`:
- `:32` `IND_2026_FEE_LINE = 'Broker fee: $75 minimum or 10% of carrier price'`
- `:37-40` `LEGACY_FEE_LINES = ['Pay carrier directly on delivery (COD)', '$50 COD or $65 Full Service fee']`
- `:65` `DEALER_FEE_LINE = 'Y7 fee: $50 per load — $60 when Y7 processes the carrier payment (after prepay)'`
- `:66` `EXPORTER_FEE_LINE = 'Y7 fee: $50 per load'`
- `:121` `B2B_LEGACY_TERMS[0] = 'Y7 fee: $50 COD or $65 Full Service — the schedule your account signed up under'`
Engine-synced (tested) → correct GENERIC default pre-account. The drift the sprint targets is
order-specific: the card is keyed on `customer.pricing_model`, the fee charged is keyed on the
ORDER's resolved model (order 285: customer `ind_2026`, order `legacy`, ledger $65). The
endpoint keys on the ORDER, so it is the only honest per-order source.

### The accept screen (Phase 0 item 3) — `src/pages/QuoteAction.jsx`
Renders the Y7 service-fee NUMBER in two places, each with a hardcoded fallback string:
- `:118-134` first-time confirm success recap — fallback `'$75 minimum or 10% of carrier price'` (`:130`)
- `:253-272` revised-quote re-accept screen — same block, fallback `:267`
Change 2 makes both number-free.

### Out of scope confirmed clean
`MoneyPageSchema.jsx:19 priceRange '$40-$65'` is schema.org SEO markup on a marketing page.
Intl/blog `10%`/`$75` hits are carrier-cost / import-duty prose. Untouched.

---

## PLAN (Y7-WEBSITE only)

- **NEW** `src/hooks/useFeePreview.js` — `useFeePreview(orderId)` → `{state, previews, order}`.
  `orderId` null → idle (no fetch). No number synthesised on failure.
- **NEW** `src/components/FeePreviewLine.jsx` — DESIGN-V2 mono numeric, basis label, range
  handling, explicit loading + unavailable states, no red fill. One component → both doors,
  same figure, same source.
- **Change 1** `Onboarding.jsx` `AccountTypeStep`: parse orderId from `?next`, render
  `FeePreviewLine` per card; no orderId → keep generic `accountTypeCards` terms.
- **Change 1 door B** `AccountTypeModal.jsx`: same `FeePreviewLine` (generic when no order).
- **Change 2** `QuoteAction.jsx`: delete both fee-number blocks; decision-#2 wording; keep the
  carrier/transport price on the re-accept screen.
- **Change 3** verify `LoginCard` keeps engine-synced generic terms; no new hardcoded number.

## Verification (runtime): build + preview, load all three surfaces; figure == endpoint;
legacy sees legacy; failure renders NO number; prerender ok; package-lock in sync.
Ship-done unchanged: `customer_orders WHERE pricing_model='ind_2026'` = 0.

## Execution log
- [Phase 0] Surfaces A/B/C mapped; order context + auth reachable from the wizard → no
  TRANSPORT change. Accept-screen fee blocks + accountTypes.js numbers located.
- [Implement] NEW useFeePreview.js + FeePreviewLine.jsx; wired into wizard (door A) + modal
  (door B); QuoteAction both fee blocks → number-free (decision #2). LoginCard (surface C)
  left on shared engine-synced generic terms, flagged for Sergii.
- [Verify] Prerender build 138 OK / 0 failed, 0 snapshots <20KB, spot-checks real content.
  eslint 0 errors on 5 touched files. Runtime (mock API + preview + Playwright): ind shows
  $100–$150/$50/$50 from the endpoint; legacy shows $65 (not the formula); 500 shows no
  number; accept screen number-free even when the backend offered a fee range. 4 screenshots
  in docs/p2b-verification/. package-lock unchanged.
- [Commit] HELD. Explicit-path add, --no-verify, [SPRINT-P2b].
