# REGC-S13-W07 — Onboarding hotfix (skip-completed routing + agreement-template + CTA + CSS)

**Repo:** `C:\dev\Y7-WEBSITE` · **Date:** 2026-06-15 · **Mode:** frontend hotfix, local commits only — nothing pushed.
**Roots:** `docs/sprints/ONBOARDING_TWO_BUGS_DIAGNOSIS.md`. Four changes, one commit each.

## Commits
| Tag | Files | What |
|---|---|---|
| **W07a** | `Onboarding.jsx`, `useAuth.jsx` | Type-agnostic skip-completed-steps routing (Bug A + profile double-entry) |
| **W07b** | `Onboarding.jsx` | agreement-template + sms-consent via `portalFetch` + parse guard (Bug B) |
| **W07c** | `LoginCard.jsx` | Prominent registration CTA |
| **W07d** | `PhoneInput.jsx` | Fix `border`/`borderRight` shorthand-conflict warning |

---

## W07a — skip already-completed onboarding steps (Bug A + duplication) — **all account types**
**Root (from diagnosis):** the entry derivation relied on the never-set `profile_complete` flag (always false) and `onCompleted` decided the skip from a **stale closure `user`** after `await checkAuth()` (which returned `void`). So a classified user wasn't routed past Profile/Type.

**Fix (type-agnostic — covers individual / auction_buyer / dealer / exporter uniformly):**
- `useAuth.checkAuth` now **returns the fresh normalized user** (void-ignoring callers unaffected).
- New pure helpers in `Onboarding.jsx`: `isClassifiedType(t)`, `profileLooksComplete(u)` (derived from REAL fields — `contact_name`, `phone`, `delivery_city/state/zip` — mirroring ProfileStep's required set), and `firstIncompleteStep(u)` → `1 Profile / 2 Type / 3 Agreement / 4 done`.
- Entry effect (run-once guard kept → no loop; `loading` gate ensures `user` is resolved) routes to `firstIncompleteStep(user)`; `target===4` → dashboard.
- `onCompleted` routes from the **fresh** `checkAuth()` return via the same helpers.

**Per-type code-trace** (`firstIncompleteStep` is pure and type-uniform — only `unknown`/`shipper` are treated as unclassified):
| customer_type | profile complete? | agreement_signed? | → step | Profile shown? | Type step shown? |
|---|---|---|---|---|---|
| individual | yes | no | **3 Agreement** | no (skipped) | **no (skipped)** |
| auction_buyer | yes | no | **3 Agreement** | no | **no** |
| dealer | yes | no | **3 Agreement** (+ W05 pending banner) | no | **no** |
| exporter | yes | no | **3 Agreement** | no | **no** |
| any classified | **no** | – | **1 Profile** | yes | no |
| unknown | yes | – | **2 Type** | no | **yes** (seam preserved) |
| unknown | no | – | **1 Profile** | yes | then Type |
| any classified | yes | **yes** | **4 → dashboard** | – | – |

**Seam preserved:** a no-profile (email-only) magic-link/quote-confirm user still sees Profile; a profile-but-`unknown` user still sees the Type step. Only genuinely-complete steps are skipped.

## W07b — agreement-template + sms-consent through `portalFetch` (Bug B) — **all types**
**Root confirmed live:** `GET :5173/api/public/agreement-template` returns `Content-Type: text/html` + `<!doctype html>` — the SPA fallback. The raw relative `fetch('/api/...')` (no `API_URL` base) hit the SPA origin → `JSON.parse('<')` → "Unexpected token '<'". **Fix:** route via `portalFetch` (same base as `update-profile`/`classify-and-sign`) + guard on `content-type: application/json` before parsing (clean error instead of feeding `<!doctype` to `JSON.parse`). Same base applied to the latent `sms-consent-text` raw fetch.
**Live, per type:** backend serves 200 JSON for `type=individual|auction_buyer|dealer|exporter` (confirmed via direct `:8000` GET). So the agreement step now loads for every account type.
**Pre-existing** (raw fetch from `ONBOARD-T08-T11`); surfaces only where SPA origin ≠ API origin (local dev/preview without `/api` proxy). Backend/path/query unchanged.

## W07c — registration CTA visibility
**Element changed:** the `onClickSignUp` "Sign up" affordance in `LoginCard.jsx`'s **email-step footer** (previously a faint borderless inline text link). Now a **bordered accent button** (theme accent token, `1.5px solid` border, `8px` radius, `11px 24px` padding, 14px) on its own line under "New to Y7?", with the Get-a-quote link demoted below. Same handler/behavior. Render-pass screenshot: `docs/sprints/regc_s13_w07_screens/01-login-cta.png` (computed style confirms `border: 1px solid`, fontSize 14px).

## W07d — `border`/`borderRight` shorthand conflict
**Root:** PhoneInput's country `<select>` set both the dynamic `border` shorthand and `borderRight: 'none'` on one element → React "conflicting property (borderRight)" console warning. **Fix:** per-side longhands (`borderTop/Bottom/Left` + `borderRight: 'none'`), color extracted to `selBorderColor`. Cosmetic; visual result unchanged. PhoneInput renders in both the registration form and onboarding ProfileStep, so the warning is gone across the flow.

---

## Verification
- **Build:** `npm run build` → **PASS** (`Prerender complete: 115 OK, 0 failed`, exit 0).
- **ESLint:** each changed file linted; the only errors found (`useAuth.jsx:176` setState-in-mount-effect; `LoginCard` unused `useRef`/`onSubmitEmail`; one in `PhoneInput`) are **pre-existing** — proven identical on the parent revision via per-file base lint. W07a–d add **zero new** eslint findings. Onboarding.jsx is fully clean.
- **W07a all-types:** per-type code-trace above (pure, uniform). **Live click-through per type DEFERRED (eyes-on)** — needs an authenticated session per type; this env's `API_URL` has no `VITE_API_URL` (defaults to prod), so live flows belong on Sergii's local run (`VITE_API_URL=http://localhost:8000`).
- **W07b:** live — `:5173/api/...` returns HTML (the bug); backend `:8000` returns 200 JSON for all 4 types; fix routes via `portalFetch` (consistent with sibling calls).
- **W07c:** render-pass screenshot saved (CTA now bordered button).
- **W07d:** shorthand removed; no element mixes `border` + `borderRight`.
- **`package-lock.json` unchanged**; no new deps; no `React.lazy`; `QuoteOtpStep`/backend untouched.

## STOP
Local commits only; nothing pushed.
