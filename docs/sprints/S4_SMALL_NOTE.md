# S4-SMALL — register ↔ onboarding coherence (implementation note)

**Scope (locked):** SMALL only. §3 = **Option 2** (relax the onboarding gate; collect the
delivery address at order time). MEDIUM single-wizard refactor is OUT (deferred).
**Source of truth:** `docs/sprints/S4_MERGE_DESIGN.md`.
**Mode:** local commits only — NOT pushed. Awaiting Playwright pass + Sergii review.

Baselines at sprint start: **Y7-WEBSITE** `76db403`; **TRANSPORT** local `main` tip `2c5b433`
(origin/main is `409755c`; see "TRANSPORT ahead-of-origin" note at the bottom).

---

## Commits

### TRANSPORT
- **`[S4-SMALL-T01]` `5f43b5d`** — `api/routes/portal_onboarding.py`
  `UpdateProfileRequest`: `delivery_city` / `delivery_state` / `delivery_zip` changed from
  `Field(...)` (required) → `Optional[str] = None`; the three corresponding `.strip()` reads
  made None-safe (`(body.x or "").strip() or None`) so a profile submit without an address
  stores NULL and returns **200** instead of 422. `contact_name` + `phone` stay required.
  **No change to `classify-and-sign` / agreement / e-consent logic** (verified: diff touches
  none of `classify`, `agreement`, `e_consent`, `compute_text_hash`).

### Y7-WEBSITE
- **`[S4-SMALL-W01]` `4682f93`** — `src/pages/portal/Onboarding.jsx`
  - `profileLooksComplete` → `contact_name && phone` (dropped city/state/zip).
  - `ProfileStep.canSubmit` → require `contact_name` + `phone` only; address optional.
  - Profile step UI: delivery-address block relabelled "(optional)", required markers removed.
- **`[S4-SMALL-W02]` `c2b3196`** — `src/pages/portal/Login.jsx`
  `handleRegisterOtpSuccess` navigates directly to `/portal/onboarding` (was `/portal/dashboard`),
  removing the visible dashboard bounce. Session ordering is safe — see "W02 safety" below.
- **`[S4-SMALL-W03]` `13d022a`** — `src/App.jsx` + `src/pages/portal/Login.jsx`
  - `App.jsx`: new `RegisterRedirect` wrapper preserves `location.search` into the
    `/portal/register` → `/portal/login` redirect (was a bare `<Navigate>` that dropped params).
  - `Login.jsx`: seed `email` state from `?email` via a lazy `useState` initializer
    (`useSearchParams`). Deliberately does NOT auto-advance into the register form — see
    "W03 / the 409 trap" below.
- **`[S4-SMALL-W04]` — DEFERRED (not done).** See "W04 deferral" below.

---

## §3 three-place alignment (must move together — they do)

The gate is consistent across all three layers, so no unsatisfiable / contradictory state exists:

| Layer | File | Required now |
|---|---|---|
| Backend profile endpoint | `portal_onboarding.py` `UpdateProfileRequest` (T01) | contact_name + phone |
| Onboarding routing gate | `Onboarding.jsx` `profileLooksComplete` (W01) | contact_name + phone |
| Profile step submit + UI | `Onboarding.jsx` `ProfileStep.canSubmit` (W01) | contact_name + phone |

Effect: a registrant who skipped the optional address now lands on **Agreement**
(`firstIncompleteStep → 3`) instead of being dropped onto the Profile step; and a user who
*does* reach the Profile step (e.g. missing phone) can complete it with contact_name + phone
and NO address — no 422.

## W02 safety (no new bounce / no render loop)

- `login()` (useAuth) applies the session **synchronously** — sets the in-memory token and
  `setUser(_normalizeUser(data))` — before `navigate()` runs. The `register-verify-code`
  response is `RegistrationResult.model_dump()` + `session_token`, so the normalized `user`
  carries `customer_type`, `contact_name`, `phone`, `agreement_signed=false`.
- `ProtectedRoute` is a pure `loading`/`user` guard with **no `/me` re-fetch** — so it renders
  Onboarding immediately; no bounce back to login.
- The W06 **run-once derivation guard** (`derivedStartRef`) is untouched — no re-introduction of
  the update-profile / agreement-template render loop.
- The **Dashboard guard** (`Dashboard.jsx:152-167`) is kept as the re-entry safety net for
  half-finished / quote-confirm users; W02 only stops the *registrant* bouncing **through** it.

## W03 / the 409 trap (why we don't force the signup form)

A PostQuoteFlow "new" customer (`customer_status === 'new'`) already has a `customers` row —
the quote intake created it (`quote_intake.py` `is_new_customer`). Pushing them through
`register-verify-email` would 409 (`email_already_registered`). So W03 preserves the params and
prefills the **login** email; the login screen lets them sign in / reset password / sign up
without the 409 trap. The quote-confirm magic-link path (`confirm_quote` / `QuoteAction` /
`MagicLogin`) is **untouched**.

## W04 deferral (visual continuity)

The register flow (`LoginCard.jsx`: `reg_type → register → reg_otp`, 440px card, its own local
`C`/`fonts` palette + radial-gradient bg, no numeric rail) and the onboarding wizard (4-step
numeric rail, 760px card, `theme.js` tokens) differ in width, token source, and step semantics.
A genuine shared step indicator means threading a unified numbering across two routes/components
and reconciling two palettes on a `LoginCard` that **also** serves plain login / forgot / reset —
non-trivial, and risks the login surface. The brief authorizes skipping in exactly this case;
W02 already removed the essential jarring bounce. **Recommended as optional MEDIUM-phase polish.**

---

## Verification

- **Build (Y7):** `npm run build` → exit **0**; **Prerender 115 OK, 0 failed**.
- **Lint (Y7):** the 3 changed files report **3 problems, all pre-existing** — `useCallback`
  unused (1:39) + 2 `react-hooks/refs` (the `loginRef`/`navigateRef` block) in `Login.jsx`,
  confirmed identical on baseline `76db403` via `--stdin-filename`. App.jsx + Onboarding.jsx
  lint clean. **Zero new ESLint errors.** (`useAuth.jsx:176` was already out of scope.)
- **Backend (T01):** isolated Pydantic check on `UpdateProfileRequest` —
  no-address submit (contact_name + phone) **validates** (was required→422 before); with-address
  retains values; missing `contact_name` still rejected; missing `phone` still rejected. ✓
  (Module imports cleanly — no syntax/import regression.)
- **Seam untouched (code-level):** Y7 diff is confined to `App.jsx`, `Login.jsx`,
  `Onboarding.jsx` — `MagicLogin` / `QuoteAction` / `public.py confirm` not in the diff.
  TRANSPORT diff is confined to `portal_onboarding.py` and does not touch classify-and-sign.

### DEFERRED to the Playwright pass + Sergii manual (no live backend session this run)
The live click-throughs were not run (no local uvicorn+DB session wired this run). Unproven and
to be exercised live:
1. **Registrant, full profile (with address):** OTP → lands directly on **Agreement** (no
   dashboard flash, no Type/Profile re-ask), sign works, no render loop.
2. **Registrant, NO address (the §3 case):** OTP → lands directly on **Agreement** (NOT Profile),
   sign works.
3. **Registrant missing phone:** lands on **Profile**, completes with contact_name + phone and
   NO address, proceeds (no 422).
4. **W02 transition specifically:** session-ready ordering before `/portal/onboarding`
   (ProtectedRoute) — confirm no bounce-to-login and no update-profile/me loop.
5. **Seams live:** quote-confirm magic-link funnel + Dashboard guard re-entry still work.

Build artifact note: `public/sitemap.xml` was regenerated by the `prebuild` step; it is left
**unstaged / uncommitted** (not part of S4-SMALL — the next build regenerates it).

---

## TRANSPORT ahead-of-origin (heads-up for the push)

At sprint start, TRANSPORT local `main` was already **3 commits ahead of `origin/main`** with
unrelated, unpushed work that landed after the design audit's read of `409755c`:

- `2c5b433 [DEPPIN-T01]` pin web/ASGI runtime core
- `9836d53 [S2-T01]` humane registration rate-limit
- `c1f1de2 [DLFIX-T01]` check_dead_letters created_at fix

`[S4-SMALL-T01]` (`5f43b5d`) was committed on top of that current tip (correct — not rewound to
`409755c`). **Consequence:** when TRANSPORT is pushed, those 3 unrelated commits push too. Flagged
so it's a deliberate decision, not a surprise. No `git pull` was run (local is ahead of origin;
a pull would be a no-op fast-forward at best or an unwanted merge — and the brief says never push).
