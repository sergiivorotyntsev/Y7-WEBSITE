# REGC-S13-W06 — Hotfix: converge the Onboarding skip-type effect (no infinite loop)

**Repo:** `C:\dev\Y7-WEBSITE` · **Date:** 2026-06-15 · **One file** (`src/pages/portal/Onboarding.jsx`) · local commit only.

## Diagnosis (exact)
The starting-step derivation `useEffect` (`Onboarding.jsx:125`, deps `[user, loading, navigate]`) is documented as "one-time" but had **no run-once guard**. Two facts make `user` change reference repeatedly:
- `useAuth._normalizeUser` (`useAuth.jsx:107-143`) returns a **brand-new object on every `checkAuth()`** call.
- That normalized object **never includes `profile_complete`**, so `profileComplete = !!user.profile_complete` (`:142`) is **always `false`**.

After Profile→Continue, `onCompleted` (`:187`) runs `await checkAuth()` (→ new `user` ref) then `setStep(3)` for a classified user. The new `user` ref re-fires the entry effect, which — with `profileComplete` always false — hits the final `else { setStep(1) }`, **fighting `onCompleted`'s `setStep(3)`**. Step thrashes 3↔1, remounting `AgreementStep` (fetches `agreement-template`, `:619`) and `ProfileStep` (fetches `sms-consent-text`, `:318`) each cycle → the observed infinite `update-profile → me → agreement-template → sms-consent-text` request loop.

**W04 attribution:** the re-fire mechanism (no run-once guard + new `user` ref + missing `profile_complete`) is latent/pre-existing, but **W04's change of `onCompleted` to `setStep(3)`** (AgreementStep + its `agreement-template` fetch) is what turned the latent re-fire into the tight, resource-heavy loop on the classified-individual path. Fixing it here (not reverting W04) is correct.

## The fix (minimal, converging)
Added a `useRef` run-once guard so the starting-step derivation runs **exactly once**; thereafter the wizard advances only via user interaction (`onCompleted`/`onSelected`/`onSigned`), and the entry effect no longer re-fires `setStep(1)` on later `user` ref changes.

```js
const derivedStartRef = useRef(false);
useEffect(() => {
  if (loading) return;
  if (!user) { navigate('/portal/login', { replace: true }); return; }
  if (derivedStartRef.current) return;   // ← derive ONCE
  derivedStartRef.current = true;
  ...derivation (unchanged: classified→selectedType+step3 / unknown→step2 / else step1)...
}, [user, loading, navigate]);
```
`useRef` added to the React import. No other change; W04's skip logic is untouched (still sets `selectedType` + the correct starting step once). The `!user`→login guard remains before the run-once check, so a mid-session logout still redirects.

## Why it converges + W04 skip preserved
- **No loop:** the entry effect can no longer override interaction-driven `setStep`. `checkAuth()`'s new `user` ref re-runs the effect, which now early-returns at the guard → no `setStep(1)` fight → ProfileStep/AgreementStep stop remounting → fetches fire once, not in a loop.
- **Classified individual:** entry (once) → `selectedType='individual'`, profile incomplete → step 1. Continue → `onCompleted` → `setStep(3)`; entry effect early-returns → stays on step 3 (AgreementStep, `selectedType` set) → **type step (2) skipped**. ✓
- **Unknown entrant (magic-link / quote-confirm):** entry (once) → step 1. Continue → `setStep(2)` → AccountTypeStep shown → pick type → step 3. ✓ Both W04 branches intact.

## Verification
1. **Network convergence** — code-level proof (no local backend running to watch the live Network panel): the entry effect is now run-once, so it cannot re-issue `setStep(1)` on `checkAuth`-induced `user` ref changes; interaction-driven transitions are not overridden; the remount-refetch cycle cannot form. **Live Network confirmation DEFERRED (eyes-on after restart).**
2. **Skip-branch logic** — verified by code trace above: classified skips step 2; unknown still sees step 2.
3. **Render pass** — the classified-user Onboarding render needs an authenticated session (backend) to reproduce; **DEFERRED (eyes-on)**. The fast `vite build` and full `npm run build` confirm the module compiles/loads with no error.
4. **Build** — `npm run build` → exit 0, prerender 115 OK / 0 failed. `package-lock.json` unchanged. ESLint on `Onboarding.jsx` clean (no new findings).

## Scope
Only `Onboarding.jsx` touched (+ this note). No backend, no `QuoteOtpStep`, no new deps, no `React.lazy`, styling/iOS untouched. W04 not reverted; the skip still works.
