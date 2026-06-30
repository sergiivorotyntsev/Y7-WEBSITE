# LIFECYCLE AUDIT — Phase 0 (Y7-WEBSITE companion)

**Repo:** `C:\dev\Y7-WEBSITE`
**Date:** 2026-06-12
**Mode:** STRICTLY READ-ONLY. This file is the only artifact produced.
**Pairs with:** `docs/audits/LIFECYCLE_BACKEND_AUDIT.md` (in the TRANSPORT repo). Endpoints are named here, not explained — the backend audit owns their behavior.
**Method:** Three parallel read-only discovery agents over `src/`; every claim rooted in `file:line`.

---

## Step 0 — Reconcile with existing docs

- `WEBSITE_INTEGRATION_AUDIT.md` — ❌ **NOT FOUND** in this repo (searched root + tree). It is referenced by the TRANSPORT prompt but does not exist in Y7-WEBSITE either; flagged, not invented. No prior portal UI audit exists; `docs/audits/` was created for this deliverable.
- `src/lib/localePaths.js` — ✅ read; locale model verified. Canonical UA key is **`'ua'`** (not `'uk'`): `SUPPORTED_LOCALES = ['en','pl','ua','ru']`, `LOCALIZED_PREFIXES = ['pl','ua','ru']`. **No ⚠ DRIFT** — `App.jsx` locale-prefixed routes match.
- Environmental constraints (no Tailwind, no `React.lazy`) treated as facts, not findings.

---

# PART A — Route & shell inventory

## A1. Portal route table

| Route | Component | Protected? | Locale |
|---|---|---|---|
| `/portal/login` | `pages/portal/Login.jsx` | public | not prefixed |
| `/portal/register` | → redirect to Login | public | — |
| `/portal/magic/:token` | `pages/MagicLogin.jsx` | token-gated | not prefixed |
| `/portal/dashboard` | `pages/portal/Dashboard.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/new-order` | `pages/portal/NewOrder.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/order/:id` | `pages/portal/OrderDetail.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/order/:id/dispatch-details` | `pages/portal/DispatchDetails.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/onboarding` | `pages/portal/Onboarding.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/profile` | `pages/portal/Profile.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/billing` | `pages/portal/Billing.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/locations` | `pages/portal/Locations.jsx` | **ProtectedRoute** | not prefixed |
| `/portal/locations/setup` | `pages/portal/LocationSetup.jsx` | **ProtectedRoute** | not prefixed |
| `/agreement` | `pages/Agreement.jsx` | ProtectedRoute | not prefixed |
| `/agreement/:orderId` | `pages/Agreement.jsx` | public, token-gated | not prefixed |

Portal-adjacent public flows (not cabinet): `/quote`, `/track`, `/contact`, `QuoteAction.jsx`, `QuoteVerified.jsx` — all locale-aware.

## A2. ProtectedRoute (`components/ProtectedRoute.jsx`)

Gates on `useAuth()`: `if (loading) → spinner; if (!user) → <ActionRequired type="session_expired"/>` (CTA "Log In" → `/portal/login`); else render. Session = HttpOnly cookie (authoritative) + `localStorage` Bearer backup (`y7_portal_session_backup`, SPRINT-E-T1, for Safari ITP / cross-origin). On 401 the stored token is cleared. `<ActionRequired>` is also used inline for `agreement_required`, `profile_incomplete`, `company_verification_required`, `trial_quotes_exhausted`.

## A3. Locale handling

Public routes localized (`/`, `/pl/`, `/ua/`, `/ru/`); **portal routes are language-agnostic post-login** (UI language from i18n state, not URL). Confirmed against `localePaths.js`. No drift.

## A4. Shell & nav

Single shared `components/Layout.jsx` (`Header` + `Outlet` + `Footer`); **no dedicated PortalLayout / sidebar.** Logged-in `Header` shows first name → `/portal/dashboard` + Log Out + persistent "Get a Quote". Post-login landing = `/portal/dashboard` (Login.jsx:111; routes to `/portal/profile` first if delivery address incomplete). Dashboard auto-redirects to `/portal/onboarding` if `customer_type ∈ {unknown, shipper}` or (type set but `!agreement_signed`) (Dashboard.jsx:152-167). Cabinet navigation is via Header + Dashboard quick-action cards (New Order, Locations, Track, Profile, Telegram, Contact).

---

# PART B — Screen-by-screen capability

## B1. Login (`Login.jsx`)
Sees: email entry → then OTP code OR password, plus forgot-password / sign-up. Actions → endpoints: `POST /api/portal/auth/start` (:57, decides code vs register), `POST /api/portal/auth/login` (:98, password), `POST /api/portal/auth/verify-code` (:304, 6-digit OTP), `POST /api/portal/auth/forgot-password` (:147), `POST /api/portal/auth/reset-password` (:198), `POST /api/portal/auth/web-register` (:250). Session validated by `GET /api/portal/auth/me` (useAuth.jsx). **No magic-link on this screen** (magic-link is the separate `/portal/magic/:token` dealer-welcome route). Expiry → 401 clears token → ProtectedRoute shows session_expired; no refresh endpoint.

## B2. Dashboard (`Dashboard.jsx`)
Sees: account-type badge (+ dealer billing mode / "Orders Paused"), stat cards (Active/In-Transit/Delivered/All-Time), recent-orders list (rows → `/portal/order/:id`), ownership-proof nudge for individual/auction_buyer with a pending order missing proof (:177), quick actions. **"New Order" button top-right → `/portal/new-order`** (:286, all types via `getNewOrderPath()`). Endpoints: `GET /api/portal/data/orders?limit=10` (:134); `GET /api/portal/billing/summary` (:72, dealer + signed only). Onboarding redirect gate at :152-167.

## B3. New Order (`NewOrder.jsx`) — THE key screen
Type conditionals (verbatim, :188-189):
```js
const isDealer = user?.customer_type === 'dealer';
const isWarehouseUser = ['dealer','exporter','auction_buyer'].includes(user?.customer_type);
```
Submission_type (verbatim, :374): `const submissionType = isWarehouseUser ? 'direct_submit' : 'quote_request';`

Fields: dealer-only **direction toggle** inbound/outbound (:479-499); vehicle VIN-or-Y/M/M (:501-528, make required if no VIN); pickup = warehouse dropdown (dealer outbound) else manual `ManualAddressFields` incl. contact name/phone (:531-549); delivery = warehouse (exporter/auction_buyer/dealer-inbound) else manual (:551-570); **auction fields** when `isAuctionBuyer || (isDealer && inbound)` (:224) — auction site (required for auction_buyer) + gate-pass PIN (required COPART/IAA, optional MANHEIM), via `GET /api/portal/data/auction-types` (:231); notes. Non-blocking duplicate advisory `GET /api/portal/data/route-check` (:352, errors ignored). Submit → `POST /api/portal/data/orders` (:414). After submit: success screen "dispatcher will review and send you a quote" + Dashboard / Submit Another.

**`agreement_required` (403) handling:** caught upstream in `useAuth.portalFetch` → redirect to `/portal/onboarding` (in-cabinet, no external hop). **But** the dealer gates `company_verification_required` and `trial_quotes_exhausted` (403) are deliberately NOT redirected (portalFetch passthrough) — rendered as an in-page error on the form (:426-432), with **no self-service fix**.

## B4. Order Detail (`OrderDetail.jsx`)
Sees: status timeline (pending→…→delivered, :452-524), vehicle/route, payment block (transport fee, method broker/COD, **service tier full_service/COD shown read-only**, dispatch fee, carrier transport, promo, total), gate-pass status, **ownership-proof card with 4 states** (pending/uploaded/approved/rejected, :659-670), driver block when dispatched, status history, dispatch-details banner+link. Actions → endpoints: Apply Promo `POST /api/portal/orders/{id}/apply-promo` (:311); **Pay Now** `POST /api/portal/orders/{id}/checkout` → `{checkout_url}` (:334); Cancel `POST /api/portal/data/orders/{id}/cancel` (:352); Download Invoice `GET /api/portal/data/orders/{id}/invoice` (:803); Contact Dispatcher `POST /api/portal/data/orders/{id}/message` (:861); Upload Ownership Proof `POST /api/portal/data/orders/{orderId}/ownership-proof` (:135); reads `GET /api/portal/data/orders/{id}` (:268) + `GET /api/portal/orders/{id}/payment` (:276). **Pay Now is a real checkout call** — note the backend audit flags Stripe in Mock + no exporter path; the *button* exists, money does not flow live. No structured refund/dispute action (only free-text message).

## B5. Dispatch Details (`DispatchDetails.jsx`)
Pickup: address, **city*** (:219), state, zip, location type, **contact name*** (:244), **contact phone*** (:248), **business hours*** (:254), gate-pass number, gate-pass file. **Delivery: address, city, state, zip, location type, contact name (optional, :352), contact phone (optional, :356).** Special instructions textarea. Submit `PATCH /api/portal/data/orders/{id}/dispatch-info` (:109); gate-pass upload `POST /api/portal/data/orders/{id}/gate-pass` (:280). **Delivery contact IS captured but optional/unvalidated. No service-tier choice here.**

## B6. Onboarding (`Onboarding.jsx`) — 4-step wizard
1. **Profile** (:279) → `POST /api/portal/onboarding/update-profile` — contact name*, phone*, company, delivery address/city*/state*/zip*, sms_consent.
2. **Account Type** (:504) — individual / auction_buyer / dealer / exporter (client state only).
3. **Agreement** (:575) — `GET /api/public/agreement-template?type=&lang=&v3=true`; progressive-disclosure section checkboxes; **e-consent checkbox** (:814); `POST /api/portal/onboarding/classify-and-sign` (:688) with `section_acknowledgements`, `e_consent`, `signed_channel:'web'`. Locale 409 → "Switch to English" banner (some type×language combos have no template).
4. **Welcome** (:899) → "Submit your first quote" → `/portal/new-order`.

**Three suspected gaps — verdicts:**
- (i) **No ownership-proof prompt for individuals — CONFIRMED.** Upload exists only on OrderDetail post-confirm (:659-670), never in the wizard.
- (ii) **No COD/full-service tier choice — CONFIRMED.** Absent from Onboarding, NewOrder, DispatchDetails; tier is backend-determined and only *displayed* on OrderDetail.
- (iii) **No delivery-contact capture — PARTIALLY DENIED.** Delivery contact name+phone ARE captured — but in **DispatchDetails (post-confirm), optional**, never in onboarding. So: a surface exists, but it's late and unenforced.

## B7. Agreement (`pages/Agreement.jsx`, Path A landing)
Two paths: bank-auth sub-agreement (`POST /api/portal/billing/sign-bank-auth`, no e_consent) and main agreement — template via `GET /api/public/agreement-template`, 4 mandatory checkboxes + **e-consent** (`canSign = allChecked && eConsent && signerName≥2`), sign → `POST /api/public/agreement` (:401) with **`e_consent: true` included** (:383). (Contrast: the TRANSPORT mini-app omits e_consent — web is the compliant surface.)

## B8. Billing (`Billing.jsx`)
**Dealer-only** ("Billing is available for dealer accounts only" for others, :61). Dealer sees balance, billing mode, paused badge, Invoices tab (`GET /api/portal/billing/invoices`, PDF download `/invoice/{id}/download`) and Transactions tab (`GET /api/portal/billing/transactions?limit=30`). All read-only. Summary `GET /api/portal/billing/summary`. **No individual payment-history view** — individuals get nothing here (their payment surface is Pay Now on OrderDetail only).

---

## Screen × capability table

| Screen | Customer can DO | Read-only display | Key endpoint(s) |
|---|---|---|---|
| Login | authenticate (OTP/password), register, reset pw | — | `/auth/start,login,verify-code,web-register` |
| Dashboard | open order, **start New Order**, jump to billing/locations | stats, recent orders, nudges | `/data/orders`, `/billing/summary` |
| New Order | **create order** (quote_request/direct_submit) | duplicate advisory | `POST /data/orders`, `/data/auction-types`, `/data/route-check` |
| Order Detail | apply promo, **Pay Now**, cancel, download invoice, message, upload ownership proof | timeline, route, pricing, tier, driver | `/orders/{id}/checkout,apply-promo,payment`, `/data/orders/{id}/...` |
| Dispatch Details | submit pickup contact/hours/gate-pass; **optional** delivery contact | order summary | `PATCH /data/orders/{id}/dispatch-info`, `/gate-pass` |
| Onboarding | profile, pick type, sign agreement (e-consent) | agreement template | `/onboarding/update-profile,classify-and-sign` |
| Agreement | sign (Path A) with e-consent | template | `POST /api/public/agreement` |
| Billing | view invoices/transactions (dealer only) | everything | `/billing/invoices,transactions,summary` |
| Profile / Locations | edit profile / manage warehouses | — | profile + locations endpoints |

---

# PART C — The "place an order from the cabinet" clickpath

Common spine: Login → Dashboard → (auto-redirect to Onboarding if unclassified/unsigned: Profile → Type → Agreement[e-consent] → Welcome) → **New Order** (Dashboard button or Welcome CTA) → form → `POST /api/portal/data/orders` → success. **The agreement wall is in-cabinet** (Onboarding is a protected route; `agreement_required` 403 redirects there) — never an external hop.

| Type | submission_type | End-to-end from cabinet? | Break point |
|---|---|---|---|
| **Individual** | `quote_request` | ✅ **YES** | none — manual pickup+delivery, no extra gate |
| **Auction buyer** | `direct_submit` | ✅ **YES** | none hard; needs auction site + gate-pass PIN (COPART/IAA); warehouse delivery falls back to manual if no saved location |
| **Exporter** | `direct_submit` | ✅ **YES** | none documented; warehouse delivery falls back to manual |
| **Dealer** | `direct_submit` | ⚠️ **PARTIAL** | **`company_verification_required` / `trial_quotes_exhausted` (403)** rendered in-page after submit with **no self-service unblock** — requires admin. Also `billing.is_blocked` → "Orders Paused". |

Secondary friction (non-fatal): locale 409 on Onboarding for some type×language combos (must switch to English); missing saved locations fall back to manual entry.

---

# PART D — Data shown vs captured (UI half of capturability)

**Displayed (from backend):** order status/timeline, vehicle, route, pricing incl. **service tier (read-only)**, gate-pass status, ownership-proof state, driver/carrier, invoices/transactions (dealer), balance.

**Captured (forms → backend):** auth credentials; profile (contact/phone/company/delivery address); account type; agreement acknowledgements + **e_consent**; order create fields (vehicle, pickup/delivery zip or warehouse, auction site, gate-pass PIN, notes); dispatch-info (pickup contact name/phone/hours, gate-pass file, **optional delivery contact**, special instructions); ownership-proof file; promo code.

### UI capturability flags (load-critical carrier-world fields)

| Field | Captured in UI? | Where | Flag |
|---|---|---|---|
| Pickup contact name/phone/hours | ✅ required | DispatchDetails (:244-254) | post-confirm only; not at order create |
| **Delivery contact name** | ⚠️ **optional** | DispatchDetails:352 | reconciles TRANSPORT E3: surface EXISTS but optional/unvalidated |
| **Delivery contact phone** | ⚠️ **optional** | DispatchDetails:356 | same — payer-at-delivery not enforced |
| **Service tier (COD vs full-service)** | ❌ **NO — nowhere** | — | customer never chooses; backend-set, only displayed (OrderDetail:542) |
| Ownership proof (individual) | ✅ but late | OrderDetail card only | never prompted in onboarding |

**Reconciliation with TRANSPORT `LIFECYCLE_BACKEND_AUDIT.md` E3:** the backend marked delivery-contact effectively NO-CAPTURE because export never validates it. The UI confirms a capture surface *does* exist (DispatchDetails) but it is **optional and post-confirm**, so the practical outcome matches — loads can cross with delivery contact blank. **Service tier is a true NO-CAPTURE on the customer side in both repos.**

---

# PART E — Parity & gaps

**Web cabinet vs Telegram mini-app (mini-app lives in TRANSPORT; customer-side view):**
- Web-only (no mini-app equivalent): **Billing** (invoices/transactions), **Locations** management, **Pay Now / promo / checkout**, password login, structured 4-state ownership-proof card.
- Mini-app parity issues noted in TRANSPORT audit: in-app signing omits `e_consent` (web sends it — web is compliant); mini-app billing is a stub redirecting to the web portal.
- Both surfaces: create order, fill dispatch info, view orders, sign agreement.

**Missing customer-facing connective tissue:**
- **Service-tier selection** — no screen lets the customer choose COD vs full-service (biggest data gap shared with backend).
- **Nudges are partial** — Dashboard nudges ownership proof (:177) and onboarding, but there is **no nudge for missing pickup/delivery contact, unpaid balance, or stale dispatch details**.
- **No per-order message thread** — only a one-shot "Contact Dispatcher" `message` POST; no inbound replies shown in the cabinet.
- **No self-service path** for dealer `company_verification_required` / `trial_quotes_exhausted` — dead-ends requiring admin.
- **Individuals have no Billing screen** — payment is Pay Now on OrderDetail only; no history.

**Known cosmetic break:** 404 flash on SPA dynamic routes (`/portal/order/:id`, `/agreement/:orderId`) before React mounts — environmental SPA-on-static-host behavior, noted not diagnosed.

---

## STOP
Report complete. No redesign, no implementation. Synthesis happens in chat alongside the TRANSPORT audit. Sergii reviews.
