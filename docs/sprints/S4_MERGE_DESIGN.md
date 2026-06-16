# S4 — register ↔ onboarding merge: DESIGN (read-only audit, paper only)

**Y7-WEBSITE HEAD:** `76db403` [REGC-S13-W07] docs: W07 hotfix note + login CTA render-pass screenshot
**TRANSPORT HEAD:** `409755c` [HEALTHCHECK-FIX-T01] pin fastapi/starlette/instrumentator

Status: design only. No code was edited; this file is the sole write.

---

## Summary (6 lines)

1. **SIZE: SMALL–MEDIUM.** SMALL removes the felt pain in ~3 edits; MEDIUM is the "one real wizard" refactor. It is **not** LARGE — W07 already did the hard part.
2. **What actually remains after W07:** not data double-entry. It's (a) **UX-incoherence** — register lives on `/portal/login`, onboarding on `/portal/onboarding`, with a `/portal/dashboard` *bounce* in between, and (b) the **§3 address edge** that needlessly drops some registrants onto the Profile step.
3. The skip-completed-steps routing (`firstIncompleteStep`, Onboarding.jsx:125-130) genuinely works: a fully-filled classified registrant lands straight on **Agreement**, skipping Profile + Account-Type.
4. **Seam A (quote-confirm exists)** is already safe: that customer enters via a `portal_signin` magic token → session → wizard, and **never touches account-creation** (no 409 path). Evidence below.
5. **Seam B (agreement / UETA e-consent)** operates purely on an authenticated `customer_id` + a server-rendered hash; it is independent of how the session was minted and survives any merge unchanged.
6. **Recommendation:** ship the SMALL fix now (kill the dashboard bounce + relax/repair §3 + route alias), treat the MEDIUM single-wizard as an optional follow-up. Decide §3 (Section B) before implementation.

---

## A — What duplication actually remains after W07

### A.1 The current registrant path, end to end

| Step | Where | Evidence |
|---|---|---|
| Email screen → "Sign up" | `Login.jsx` `handleClickSignUp` → `setStep('reg_type')` | Login.jsx:137-141 |
| Account-type cards | `LoginCard` `reg_type` step | LoginCard.jsx:476-521 |
| Profile form (name/company/phone/**address**) | `LoginCard` `register` step | LoginCard.jsx:527-606 |
| Submit → `register-verify-email` | `handleRegisterSubmit` | Login.jsx:264-304 |
| OTP entry → `register-verify-code` | `RegisterOtpStep` | RegisterOtpStep.jsx:55-66 |
| Customer row created (type + address persisted) | `create_customer_from_pending` | registration_commit.py:97-136 |
| Session established, **navigate `/portal/dashboard`** | `handleRegisterOtpSuccess` | Login.jsx:309-313 |
| Dashboard effect redirects → **`/portal/onboarding`** | needs-classification / needs-agreement | Dashboard.jsx:152-167 |
| Onboarding derives starting step **once** | `firstIncompleteStep(user)` | Onboarding.jsx:155-177 |

**Where does a fresh classified registrant with a complete profile LAND?**
`firstIncompleteStep` (Onboarding.jsx:125-130) returns 1=Profile, 2=Type, 3=Agreement, 4=done:

```
profileLooksComplete = contact_name && phone && delivery_city && delivery_state && delivery_zip   (Onboarding.jsx:121-122)
firstIncompleteStep:  !profileComplete → 1 ; !classifiedType → 2 ; !agreement_signed → 3 ; else 4   (Onboarding.jsx:125-130)
```

- `customer_type` is **set at registration** (`normalize_customer_type(form.customer_type)`, registration_commit.py:97,129) → `isClassifiedType` true → **Account-Type step is skipped.**
- If the registrant **filled phone + city/state/zip**, `profileLooksComplete` is true → **Profile step is skipped too** → they land on **Step 3, Agreement.** No data re-entry. ✅
- The entry effect also pre-selects `selectedType` from `user.customer_type` (Onboarding.jsx:170), so Agreement renders immediately with the right bundle.

### A.2 So what is the residual problem — (a), (b), or (c)? — classified precisely

- **(a) genuine DATA double-entry — NO.** For a fully-filled registrant there is none; W07 skips both pre-filled steps. Even on the Profile step, fields are **pre-filled** from the user object (`contact_name`, `phone`, `company_name`, address — Onboarding.jsx:332-341), so nothing already captured is re-typed blind.
- **(b) UX-incoherence — YES, this is the real one.** Two separate routes/components (`/portal/login` = creation, `/portal/onboarding` = agreement) with a **`/portal/dashboard` bounce** between them (Login.jsx:312 → Dashboard.jsx:165). The user is "logged in before finishing onboarding" because the **session is minted at `register-verify-code`** (required — the agreement endpoints are authenticated), then they flash through the dashboard into a differently-styled wizard. That flash + the route change is exactly Sergii's "two disjoint pieces" feeling.
- **(c) the §3 address edge — YES, secondary.** A registrant who leaves the *optional* address blank fails `profileLooksComplete` and is dropped onto the Profile step (where address is suddenly *required*). See Section B.

> Honest answer: **the merge is now mostly a routing/coherence problem plus one validation-contract mismatch — not a data-deduplication problem.** W07 already solved the dedup.

---

## B — §3 the address edge

**Is city/state/zip required in the registration form?** **No — optional.**

- The block is literally labelled *"Delivery Address (your lot — optional)"* (LoginCard.jsx:566); the inputs have no `required` and no validation.
- `handleRegisterSubmit` validates only: `contact_name` (required), `company_name` (required for dealer/exporter), and `phone` *only if present* (Login.jsx:267-275). **Phone is also optional.**
- The backend stores whatever was given, `None` if blank (registration_commit.py:121-128).

**But `profileLooksComplete` requires phone + city + state + zip** (Onboarding.jsx:121-122), and the Profile step's `update-profile` makes all four **required** (canSubmit Onboarding.jsx:359-364; backend Pydantic `Field(...)` portal_onboarding.py:50-58).

**Consequence:** a registrant who skips the optional address (or phone) is routed by W07a to **Step 1 Profile** and asked to complete it. Intended? Partly — they *do* eventually need a delivery address to ship — but **surprising at this moment**, because the agreement does not need an address, and the form just told them it was optional.

### Options

| Option | Change | Trade-off |
|---|---|---|
| **1. Make address required at registration** | Add `required` + validation to LoginCard address + `handleRegisterSubmit`; tighten the pending payload | Cleanest skip behaviour (everyone lands on Agreement). **But** adds signup friction and contradicts the legitimate "lot — optional" framing; a dealer/exporter creating an account may not have a single delivery address. |
| **2. Relax `profileLooksComplete` to `contact_name && phone`** (drop city/state/zip from the onboarding gate) | One-line change Onboarding.jsx:121-122; collect the delivery address at **first order** (NewOrder already collects per-order addresses) | Lowest friction; matches "the agreement doesn't need an address." Pairs best if the Profile step's own address requirement is also relaxed, else a user with no phone still hits a required-address Profile step. Address simply isn't captured until order time. |
| **3. Keep as-is** | Nothing | Honest but produces the surprising "complete your profile" detour for anyone who skipped the optional fields. |

### Recommendation (decision left to Sergii)

**Option 2** — relax the onboarding gate to `contact_name && phone`. The agreement signing has no operational need for a delivery address, and `NewOrder` already captures addresses per shipment, so gating onboarding on a "primary delivery address" is the thing that manufactures the detour. If Sergii prefers addresses captured up front for dealers' saved-location UX, **Option 1** is the coherent alternative — but then make it required *visibly* (drop the "optional" label) so the contract matches. Avoid Option 3.

> Note for whoever implements: if Option 2 is chosen, also relax `ProfileStep.canSubmit` (Onboarding.jsx:359-364) and `UpdateProfileRequest` (portal_onboarding.py:55-57) so a user who *does* reach the Profile step isn't still force-required to enter the address the gate no longer demands.

---

## C — The merge design (paper only)

### C.1 The unified shape, and which approach

**The clean shape the brief describes already half-exists.** Onboarding.jsx *is* the shared post-session wizard with conditional steps (`firstIncompleteStep`). The account-creation steps (type → profile → OTP) live separately in Login.jsx because they must run **before a session exists** — the wizard route is behind `ProtectedRoute` (App.jsx:252) and `classify-and-sign` / `update-profile` need `require_authenticated_customer`. The session is only minted at `register-verify-code`. **This auth boundary is the real reason the flow is two pieces, and it is load-bearing.**

So there are two honest targets:

- **SMALL (recommended first): make it FEEL like one flow without moving the auth boundary.**
  - Registrant: after OTP success, navigate **directly to `/portal/onboarding`** instead of `/portal/dashboard` (Login.jsx:312). Removes the dashboard flash; the wizard opens on Agreement.
  - Style the `/portal/login` register steps and the `/portal/onboarding` wizard as **one visual progression** (shared header/step-rail) so crossing the route reads as "next step," not "new place." (Both already use the same token system; the step indicators differ — LoginCard has none, Onboarding has a 4-dot rail Onboarding.jsx:273-325.)
  - Fix §3 (Section B).
  - **No backend change. No auth-boundary change. Both seams untouched.**

- **MEDIUM (optional follow-up): one component spanning the boundary.**
  - A single `/portal/register` wizard component (NOT behind `ProtectedRoute`) that manages its own auth state: runs `type → profile → OTP` unauthenticated, calls `login()` mid-flow on OTP success, then renders `agreement → done` against the now-authenticated session.
  - The account-creation steps become **conditional**: a portal registrant runs them; an already-authenticated arrival (quote-confirm via magic link) enters at `profile`/`agreement`. This is feasible because both entry points converge on the same `firstIncompleteStep` logic — quote-confirm just arrives with a session already set.
  - Login.jsx shrinks to email/password/OTP-login + a "Sign up" link into the wizard; the duplicated Account-Type cards (currently in **both** LoginCard.jsx:82-127 and Onboarding.jsx:43-88) and the duplicated profile fields collapse to one definition.

> Confirm from code that both entry points converge: portal registrant → session at `register-verify-code` → `firstIncompleteStep` (Onboarding.jsx:125). Quote-confirm → session at `magic/consume` (public.py:354-393) → same `firstIncompleteStep`. Same machine, different entry index. ✅

### C.2 Seam A — quote-confirm customer already exists; how creation is skipped without a 409

The customer who came from a quote **already has a `customers` row** (it's `customer_orders.customer_id`). The path that continues them:

1. Email confirm link → `GET /api/public/quote/confirm/{order_id}` flips the order to `confirmed` and **mints a 1h single-use `portal_signin` magic token for `row["customer_id"]`**, returning `signin_token` (public.py:2470-2504).
2. `QuoteAction.jsx` renders **"Continue to onboarding" → `/portal/magic/{signin_token}`** (QuoteAction.jsx:60-65).
3. `MagicLogin.jsx` POSTs the token to `/api/public/magic/consume`, which `verify_magic_link_token(..., purpose="portal_signin")` → returns the existing `customer_id`, records the session, and returns `session_token` (public.py:385-393). Frontend calls `login()` → `/portal/dashboard` (MagicLogin.jsx:62-68) → Dashboard redirect → wizard.

**Why no 409:** account creation is *only* reachable through `register-verify-email` (Login.jsx:278), which a quote-confirm customer **never calls** — they arrive already-authenticated via the magic token. The `firstIncompleteStep` machine then runs Profile/Type/Agreement as needed against the existing row. The "already exists → 409" risk lives exclusively on the `register-verify-email` path and is structurally unreachable from the confirm flow. Any MEDIUM wizard must preserve this: **gate the type/profile/OTP steps on `!session`**, never run them for an arrival that already has a session.

> Caveat (pre-existing, flag for the team): the *other* post-quote screen — `PostQuoteFlow.jsx` NewCustomerCard — links a "new" customer to **`/portal/register?email=…&ref=…`** (PostQuoteFlow.jsx:220-243), and `/portal/register` currently **`<Navigate to="/portal/login" replace />`** (App.jsx:237), which **drops the email/ref params** (Login.jsx never reads them). This isn't part of the agreement seam, but the merge's "route fate" decision should fix it rather than inherit it.

### C.3 Seam B — agreement / UETA e-consent survives unchanged

`classify-and-sign` (portal_onboarding.py:286-568) depends only on:
- `require_authenticated_customer` → `customer["id"]` (portal_onboarding.py:290,405) — origin-agnostic; works for a registration session, a magic-link session, or a quote-confirm session.
- A **server-rendered** hash: `compute_text_hash(render_agreement(...)["full_html"])`, never the client HTML (portal_onboarding.py:379-388). The client snapshot is a cross-check only (`snapshot_mismatch`, never a reject).
- Mandatory `e_consent` (portal_onboarding.py:340-347), stamped with `e_consent_version` + `e_consent_text_hash` into `customer_agreements` (portal_onboarding.py:453-457).
- A profile gate (`contact_name` must be set, portal_onboarding.py:308-317) and signer-name sourced from `contact_name` (portal_onboarding.py:365).

None of this references the entry point or the session-minting mechanism. **As long as the merged flow reaches `classify-and-sign` with an authenticated `customer_id` and a set `contact_name`, e-consent + hash are byte-identical.** No change required.

### C.4 Route fate

| Route | Today | Proposed (SMALL) | Proposed (MEDIUM) |
|---|---|---|---|
| `/portal/login` | Login (email/pw/OTP + signup steps) | unchanged; OTP success → `/portal/onboarding` directly | thin login; "Sign up" → `/portal/register` |
| `/portal/register` | `Navigate → /portal/login` (App.jsx:237), **drops params** | redirect but **preserve `?email&ref`**, or point at the wizard | the unified wizard component |
| `/portal/onboarding` | ProtectedRoute → Onboarding (App.jsx:252) | **kept** as the wizard home | kept as alias, or folded into `/portal/register` |
| `/portal/dashboard` | redirects unfinished users to onboarding (Dashboard.jsx:152-167) | **keep this guard** — it's the safety net | keep |

**Returning, half-finished user (session but no signed agreement):** they hit `/portal/dashboard`, the guard (Dashboard.jsx:160-165) fires `needsAgreement` → `/portal/onboarding` → `firstIncompleteStep` lands them on Agreement. **This already works and must be preserved** — it is the re-entry path for anyone who bailed mid-flow, including the quote-confirm 48h window.

### C.5 File-level change list

**SMALL (recommended):**
- `src/pages/portal/Login.jsx:312` — `handleRegisterOtpSuccess` navigate `/portal/onboarding` (not `/portal/dashboard`). Kills the bounce.
- `src/pages/portal/Onboarding.jsx:121-122` — apply the §3 decision (Option 2: drop city/state/zip from `profileLooksComplete`; or Option 1: leave gate, make registration address required).
- `src/pages/portal/Onboarding.jsx:359-364` + `api/routes/portal_onboarding.py:55-57` — if Option 2, relax the Profile step's own address requirement to match.
- `src/pages/portal/components/LoginCard.jsx` + `src/pages/portal/Onboarding.jsx` (header/step-rail) — present register + onboarding as one visual progression (shared step indicator).
- `src/App.jsx:237` / `src/components/PostQuoteFlow.jsx:225` — make `/portal/register` preserve `?email&ref` (or repoint PostQuoteFlow), closing the dropped-params wrinkle.

**MEDIUM (optional, additive on top):**
- New `src/pages/portal/RegisterWizard.jsx` — single component spanning the auth boundary; conditional `type/profile/OTP` (gated on `!session`) then `agreement/done`.
- `src/App.jsx` — point `/portal/register` at it; `/portal/onboarding` becomes an alias.
- `src/pages/portal/Login.jsx` — shrink to login-only + "Sign up" link.
- De-dup the Account-Type card definitions (LoginCard.jsx:82-127 ↔ Onboarding.jsx:43-88) into one shared module.
- **Backend: none required.** Both seams already work session-first.

---

## D — Risk + sequencing

**Highest-stakes surface: the quote-confirm lead funnel.** A customer who accepted a price must reach the agreement without friction or a 409. De-risk by treating the magic-link → session → wizard path (public.py:2470 → QuoteAction.jsx:60 → public.py:385 → Onboarding `firstIncompleteStep`) as **frozen contract** — the SMALL plan touches none of it; the MEDIUM plan must keep account-creation steps gated on `!session`.

**What could break:**
- *Redirect-loop regression* — the W06 one-time-derivation guard (`derivedStartRef`, Onboarding.jsx:149,165) exists because an earlier version thrashed `setStep`. Any wizard refactor must preserve the run-once derivation, or the update-profile/agreement-template request loop returns.
- *Auth-boundary mistakes (MEDIUM only)* — rendering the agreement step before `login()` has set the session, or running account-creation for an already-authed magic arrival. Mitigate with the `!session` gate above.
- *§3 contract drift* — change `profileLooksComplete` without also relaxing `ProfileStep`/`update-profile` and you create a user who can never satisfy the gate. Change all three together.
- *Dropped-params* (existing) — don't inherit the `/portal/register` param loss into the merged route.

**Sequencing:**
1. Decide **§3 (Section B)** — blocks the routing change.
2. Ship **SMALL** (bounce + §3 + param fix + visual unification). This alone resolves the reported pain.
3. Run the **Playwright pass** over the three entry points: portal registrant (full + address-skipped), quote-confirm magic-link, returning half-finished user.
4. Evaluate whether MEDIUM is still worth it after SMALL lands — likely a polish item, not a necessity.
5. Keep clear of **CAP-S1** (parked, already on prod — the dealer order-submit "under review" screen referenced at Onboarding.jsx:195-208); the merge must not disturb the dealer pending-verification note or the direct-submit gate.

---

## STOP — for Sergii's review

Read-only audit complete. No code edited; `docs/sprints/S4_MERGE_DESIGN.md` is the only write. Decide §3 (Section B) and whether to scope SMALL-only or SMALL→MEDIUM; an implementation prompt follows separately.
