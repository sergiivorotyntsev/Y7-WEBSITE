# REGC-S13-FE — Y7-WEBSITE (frontend) — Closure Report

**Repo:** `C:\dev\Y7-WEBSITE` · **Date:** 2026-06-15 · **Mode:** autonomous overnight, **local commits only — nothing pushed.**
**Commits:** `[REGC-S13-W01..W05]` (5) on top of the parked CAP-S1 commits. 4 files, +438/−18 (1 new component).

## Anchors confirmed (Phase 0) — no contradiction (the gate passed this time)

The prior run halted because the reuse anchor was false. This revision pre-resolved that (Option B: build `RegisterOtpStep`, don't touch `QuoteOtpStep`), and the critical gate — **does `register-verify-code` establish a session without backend work?** — **PASSED**: `portal_auth.py:1369-1374` mints `create_portal_session`, returns `session_token` in the body **and** sets the portal cookie (`set_portal_session_cookie`), body = `RegistrationResult.model_dump()` (id, email, customer_type, delivery_*, …). The existing `login(session_token, data)` pattern consumes it directly. Contracts: `register-verify-email` ← `{email, contact_name, phone, company_name, delivery_*, sms_consent, customer_type}` → `{ok, pending_id}` (`portal_auth.py:1243`); `register-verify-code` ← `{pending_id, otp_code}` (`:1246`). `Login.jsx` step machine (`:17`) drives `LoginCard`; type cards verbatim at `Onboarding.jsx:43-88`; Onboarding entry/step logic at `:124-160`. No material contradiction → proceeded.

## Per-phase

| Phase | Commit | What |
|---|---|---|
| **W01** account-type step | `[REGC-S13-W01]` | Signup starts with the 4 type cards (lifted verbatim from `Onboarding.jsx:43-88`), **dealer now shown** with the pinned pending note on selection. New `reg_type` step + `reg_otp` placeholder in the `LoginCard` step machine; `regType` state; Continue advances to profile. |
| **W02** RegisterOtpStep | `[REGC-S13-W02]` | New `src/components/RegisterOtpStep.jsx` — visual modeled on `QuoteOtpStep` (6-cell, framer-motion shake, verifying/locked) but posts `{pending_id, otp_code}` to `register-verify-code`; on success hands `{session_token, …}` to the parent. Handles invalid_code/expired/pending_not_found/taken/429. **`QuoteOtpStep.jsx` not edited.** |
| **W03** migrate submit | `[REGC-S13-W03]` | Profile submit now POSTs `register-verify-email` with `customer_type` (W01) + `sms_consent` → `reg_otp` step → `RegisterOtpStep` → on success `login(session_token, data)` → Dashboard→Onboarding. `web-register` removed from this path only. `company_name` required for dealer/exporter. |
| **W04** Onboarding skip type | `[REGC-S13-W04]` | When `customer_type` is set (≠ unknown/shipper), remember it and skip the type step → straight to agreement. Unknown entrants (magic-link/quote-confirm) still get the type step. |
| **W05** dealer pending note | `[REGC-S13-W05]` | Light, non-blocking dealer pending-verification banner in Onboarding (pinned copy) until the agreement is signed. Full order-submit "under review" screen stays parked CAP-S1. |

## Verification (triad)

**1. Render pass (Puppeteer, vite preview) — 6/6 PASS.** Screenshots in `docs/sprints/regc_s13_screens/`:
- `01-login-email.png` — login email step.
- `02-type-cards.png` — Sign up → all **4 type cards visible** (dealer present).
- `03-type-dealer-note.png` — dealer selected → **pending note shown** (pinned copy).
- `04-profile-dealer.png` — profile step, **"Company Name *" required for dealer**, Full Name shown.
Mobile viewport (480px); no layout breakage; inputs ≥16px. The `reg_otp` (RegisterOtpStep) live render needs a `pending_id` from a running backend → see DEFERRED.

**2. Logical E2E — DEFERRED (post-push, needs running backend).** No local API server was run, so the live `register-verify-email → OTP → register-verify-code → session` round-trip is deferred to a post-push pass against the deployed backend. Mitigation: the **backend contracts are already proven green (REGC-S13 TRANSPORT, 12/12)**, and the frontend wiring is asserted at code level (below).

**3. Content asserts — PASS.**
- `QuoteOtpStep.jsx` **byte-for-byte unchanged** (`git diff a0d5f84..HEAD` does not list it).
- All 4 card titles present in `LoginCard` matching `Onboarding` verbatim.
- Dealer pending note pinned copy present in both `LoginCard` and `Onboarding`.
- `customer_type` included in the `register-verify-email` request body (`Login.jsx:284`).
- `web-register` no longer called anywhere in `src/` (only a code comment remains).
- **Full `npm run build` PASS** — `Prerender complete: 115 OK, 0 failed`, exit 0 (confirms compile + public routes + quote flow unaffected).

## Untouched / scope
- **Backend not touched.** `QuoteOtpStep.jsx` not touched. `web-register` removed only from the portal signup submit (no other usages existed). Out-of-scope items (rate-limit, full register+onboarding merge, dealer license capture, mini-app) not built.
- **i18n:** new strings (type-step heading, dealer note, RegisterOtpStep copy, company-required label) are **inline English**, matching the existing portal convention (the signup/`LoginCard` flow is English-only; `RegisterOtpStep` uses inline English rather than the `quote` i18n namespace `QuoteOtpStep` borrows). No pl/ua/ru keys added (none exist for this flow).
- **`package-lock.json` unchanged** (framer-motion already a dep; no new deps).

## STOP
REGC-S13-FE complete — local commits only, awaiting review + push (push TRANSPORT first).
