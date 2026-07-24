# [SPRINT-P2b] Show the fee where the customer chooses their account type — report

**Repo** Y7-WEBSITE, worktree `C:\dev\Y7-WEBSITE-p2b`, branch `wip/p2b-fee-display`,
base `7c5a0f4` (origin/main). **HELD, not pushed.** No prod writes. **No TRANSPORT change
was needed** (see §2.4) — the deliverable is one branch, not two.

The backend was already in prod: `GET /api/portal/orders/{order_id}/fee-preview` (P2a-1),
pure read, legacy-aware, soft-auth. It had never been called by any UI. This sprint wires it
into the account-type step and takes the fee number off the accept screen.

---

## 1. What changed, in one line

The customer choosing their account type now sees the **real Y7 fee for their own shipment**,
per type, computed by the engine — instead of a generic hardcoded formula that could disagree
with what the order actually charges. The accept screen shows no fee number at all.

## 2. Phase 0 — the surface map

### 2.1 Three surfaces render the account-type cards, one shared data source
All three read `src/data/accountTypes.js` (`accountTypeCards(pricingModel)` — the WAC-T01
single source of truth, already resolved per `pricing_model` so legacy customers get legacy
terms, and anti-drift tested on the TRANSPORT side against the fee engine).

| Door | file:line | Auth | Order context |
|---|---|---|---|
| **A** wizard `AccountTypeStep` | `src/pages/portal/Onboarding.jsx:649-733` | yes (magic-link session) | **YES** via `?next` |
| **B** dashboard modal `AccountTypeModal` | `src/components/AccountTypeModal.jsx` | yes | none inherent |
| **C** pre-account signup `LoginCard` | `src/pages/portal/components/LoginCard.jsx:126` | **no** | none |

### 2.2 What each card claimed about price today (verbatim)
`src/data/accountTypes.js`: `:32` `'Broker fee: $75 minimum or 10% of carrier price'`;
`:37-40` `'$50 COD or $65 Full Service fee'`; `:65` `'Y7 fee: $50 per load — $60 when Y7
processes the carrier payment (after prepay)'`; `:66` `'Y7 fee: $50 per load'`; `:121`
`'Y7 fee: $50 COD or $65 Full Service — the schedule your account signed up under'`.
These are engine-synced and test-guarded — the correct GENERIC default. The drift the sprint
targets is order-specific: the card keys on `customer.pricing_model`, but the fee charged keys
on the ORDER's resolved model (order 285: customer `ind_2026`, order `legacy`, ledger $65). The
endpoint keys on the order, so it is the only honest per-order source.

### 2.3 The accept screen — `src/pages/QuoteAction.jsx`
Rendered the Y7 service-fee number in two places, each with a hardcoded `'$75 minimum or 10%
of carrier price'` fallback: the first-time confirm recap (`:118-134`, fallback `:130`) and the
revised-quote re-accept screen (`:253-272`, fallback `:267`).

### 2.4 Auth + order context are BOTH reachable from the wizard → no TRANSPORT change
- **Auth (item 4):** the preview uses the SOFT gate `require_authenticated_customer`
  (`fee_preview.py:73-81`) — it does not require an active/classified customer, because the
  caller is mid-onboarding. The wizard is already authenticated (it calls
  `portalFetch('/api/portal/data/customer-type')`). Reachable as-is.
- **Order context (item 5, decision #5):** the magic-link handoff carries the order.
  `QuoteAction` confirm → `/portal/magic/{token}?next=/portal/order/{id}/dispatch-details`
  (`QuoteAction.jsx:161-175`) → `MagicLogin` → the order page 403s `classification_required`
  → `useAuth._recover` redirects to `/portal/onboarding?next=/portal/order/{id}/…`
  (`useAuth.jsx:100-111`) → the wizard reads `rawNext` (`:142-144`). The type step parses the
  order id with `/\/portal\/order\/(\d+)\b/`; no single order → generic.

So `wip/p2b-fee-api` was **not** created.

## 3. The three changes

### Change 1 — the fee appears at the account-type step, from the endpoint only
- **NEW** `src/hooks/useFeePreview.js` — `useFeePreview(orderId)` → `{state, previews, order}`.
  One GET via `portalFetch`; `orderId` null → idle (no fetch). **Never synthesises a number on
  failure.** Also exports `orderIdFromNext(rawNext)`.
- **NEW** `src/components/FeePreviewLine.jsx` — presentational, DESIGN-V2: the figure is
  JetBrains Mono (money = numeric), the label a mono eyebrow, the explanation quiet system-ui,
  **no red fill** (Signal Budget). Handles a single fee, a range ("$100–$150 · firms up at
  carrier assignment"), an explicit loading state ("Calculating your fee…"), and an
  unavailable state ("We couldn't price this shipment right now. You can continue…"). It
  contains **zero fee constants** — every number comes from the `preview` prop.
- **Door A** (`Onboarding.jsx` `AccountTypeStep`): parses `orderId` from `?next`, calls the
  hook, renders `FeePreviewLine` per card. When a live fee is present the generic hardcoded
  terms are suppressed (the number replaces them, so there is never a formula next to its own
  resolved figure); the capability bullets stay. No order → the generic terms, unchanged.
- **Door B** (`AccountTypeModal.jsx`): same hook, same component, via a new optional `orderId`
  prop. The dashboard opens it with no order → generic (unchanged); any order-scoped caller
  gets the identical figure the wizard shows. Same source, one component.

### Change 2 — the accept screen is number-free
Both `QuoteAction.jsx` fee blocks are replaced with the decision-#2 wording (fee determined by
account type at registration; transport paid separately to the carrier). The re-accept screen
KEEPS its two price cards — those are the CARRIER (transport) price the customer is
re-accepting, which is legitimate; only the Y7 SERVICE-fee number is removed. Both hardcoded
`'$75 minimum or 10%'` fallbacks are gone.

### Change 3 — hardcoded card copy
Door A's per-order numbers now come from the endpoint (Change 1). The pre-account signup
(`LoginCard`, surface C) is **left on the shared engine-synced generic terms**, deliberately:
it has no order and no auth to price against, every new signup is genuinely `ind_2026`, and the
copy is a MODEL description (a formula), not a per-shipment promise — which is what "plainly
generic" asks for. It is also anti-drift tested against the engine on the TRANSPORT side, so it
cannot drift from the engine. Flagged here for Sergii rather than silently stripped, since
removing accurate, test-guarded numbers from the pre-account surface is a copy decision, not a
correctness fix. If Sergii wants the signup numbers gone too, it is a one-line change to render
the capability bullets only.

## 4. Design notes (DESIGN-V2 "The Dispatch Board")
The signature is operational honesty made literal: the customer sees the actual dollar figure
for their own vehicle under each type they could pick, from the engine. It earns attention by
being true, not by decoration — so it takes **no red fill** (the Signal Budget stays with the
card's focus outline and the CTA). Money is set in JetBrains Mono per the numeric rule; the
range carries a plain-language "firms up at carrier assignment" so a provisional number is
never mistaken for final. No em dashes in the new copy (DESIGN.md). No new primitives inlined —
`FeePreviewLine` is a shared component, not a per-page re-implementation (Anti-Orphan Rule).

## 5. Verification (runtime, not build-clean)

**Build + prerender.** `npm run build` (vite + Puppeteer prerender) → **138 OK, 0 failed**
(848s). Not trusting that counter (CLAUDE.md): `dist/valid-routes.json` has 138 routes, **0
snapshots < 20 KB**, and three spot-checks (`/`, `/dealers`, `/ship-my-car`) show real titles,
7–14 `<section>` blocks each, 71–82 KB, FMCSA/broker content present. No `React.lazy`, no
top-level `window`/`document` introduced (the two new files and every edit use neither) — the
prerender completing is itself the proof.

**Lint.** `eslint` on all five touched files → **0 errors**. The only warning is the
pre-existing `react-hooks/set-state-in-effect` at `QuoteAction.jsx:82`, in an effect this diff
does not touch.

**Runtime — driven in a real browser** (`npm run build:no-prerender` with `VITE_API_URL`
pointed at a throwaway mock of the two endpoints, `vite preview`, Playwright). Screenshots in
`docs/p2b-verification/`. Every assertion below is a DOM read, not a claim:

| Scenario | What the mock returned | What door A rendered | Verdict |
|---|---|---|---|
| ind_2026 | individual range 10000–15000; dealer/exporter flat 5000 | SHIP MY CAR **$100–$150** "range · firms up at carrier assignment"; AUTO DEALER **$50**; EXPORTER **$50** — plus each endpoint `explanation` verbatim | `p2b_type_step_ind.png` — the figure IS the backend's |
| **legacy** | every type `pricing_model:legacy`, `fee_cents:6500` | SHIP MY CAR **$65**, "Y7's brokerage fee." — **no formula, no range badge** | `p2b_type_step_legacy.png` — a legacy customer is shown LEGACY terms, the exact over-promise this arc ends |
| endpoint 500 | fee-preview → 500 | "We couldn't price this shipment right now. You can continue…" and **zero dollar figures inside any card** | `p2b_type_step_failure.png` — no fallback number, ever |
| accept screen | `/quote/{id}/details` returned `ind_2026` + a fee range (the adversarial case) | "Your Y7 service fee is determined by the account type you choose when you register. The transport price is paid separately to the carrier." — **no `$75`/`10%`**, the only `$` on the page is the footer's `$75,000` bond | `p2b_accept_screen_numberfree.png` — number-free even when the backend offers a number |

**package-lock.json** unchanged by `npm install` (checked before and after; no musl/optional
deps removed).

**Ship-done stays what it has been all arc:** `SELECT COUNT(*) FROM customer_orders WHERE
pricing_model='ind_2026'` = 0. Green preview is not done — one real customer walking the funnel
and that count moving is.

## 6. Files changed
| File | Type |
|---|---|
| `src/hooks/useFeePreview.js` | NEW — the endpoint hook + `orderIdFromNext` |
| `src/components/FeePreviewLine.jsx` | NEW — the DESIGN-V2 fee line, zero fee constants |
| `src/pages/portal/Onboarding.jsx` | door A: parse `?next`, render the live fee |
| `src/components/AccountTypeModal.jsx` | door B: same hook + component, optional `orderId` |
| `src/pages/QuoteAction.jsx` | accept screen number-free (both blocks) |
| `docs/p2b-verification/*.png` | 4 runtime screenshots (ind / legacy / failure / accept) |

## 7. Out of scope (untouched)
`apply_b2b_account_defaults` into `classify_and_sign` + first-classification guard → P2a-4.
Quote-email fee copy → P2c. Email restyle → E2. CD Listing URL → C1. B2B-T06 named-account
migration → business decision. `MoneyPageSchema.jsx` SEO markup and intl/blog carrier-cost prose
are not account-type cards → untouched. No production data change.
