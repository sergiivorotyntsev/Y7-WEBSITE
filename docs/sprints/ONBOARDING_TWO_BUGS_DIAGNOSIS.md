# Onboarding — two-bug diagnosis (READ-ONLY)

**Date:** 2026-06-15 · **Repos read:** `C:\dev\Y7-WEBSITE` + `C:\dev\TRANSPORT` (agreement-template route). No fix applied.

## 6-line summary
1. **Bug A root:** the W04 type-skip never reacts to the *resolved* `customer_type` — W06's run-once guard froze the entry-effect derivation (and `selectedType`) on first render, and `onCompleted` decides the skip from a **stale closure `user`** after `await checkAuth()` (which returns `void`). When the resolved type isn't reflected at the decision point, `setStep(2)` shows the type step.
2. **Bug A fix side:** frontend-only.
3. **Bug B root:** the agreement-template request is a **raw relative `fetch('/api/public/agreement-template…')` with no `API_URL` base** (`Onboarding.jsx:635`), so where the SPA origin ≠ API origin (default `API_URL=https://dispatch.y7agency.com`) and nothing proxies `/api`, it hits the SPA origin → `index.html` → `JSON.parse('<!doctype …')` throws. The path is correct; the **base is missing**.
4. **Bug B fix side:** frontend-only (backend route exists and is correct).
5. **Bug B age:** **pre-existing** (raw fetch added in `ONBOARD-T08-T11`, commit `0b0637d`; not introduced by REGC-S13) — only now surfaced because W06 made the agreement step reachable and the current serving env doesn't proxy relative `/api`.
6. **Neither bug needs a backend change.**

---

## Bug A — W04 skip does not fire (Account-Type step shown for a classified individual)

### Evidence
- Entry derivation effect, `Onboarding.jsx:125-152` (W06 added the run-once guard):
  ```js
  if (loading) return;
  if (!user) { navigate('/portal/login'); return; }
  if (derivedStartRef.current) return;     // W06 — runs ONCE
  derivedStartRef.current = true;
  const isClassified = user.customer_type && !== 'unknown' && !== 'shipper';
  if (isClassified) setSelectedType(user.customer_type);
  ...
  const profileComplete = !!user.profile_complete;   // ALWAYS false (see below)
  if (isClassified && !signed && profileComplete) { setSelectedType(...); setStep(3); }
  else if (!isClassified && profileComplete) { setStep(2); }
  else { setStep(1); }
  ```
- `onCompleted` (the Profile→Continue handler), `Onboarding.jsx:187-194`:
  ```js
  await checkAuth();
  const classified = user.customer_type && !== 'unknown' && !== 'shipper';  // STALE closure `user`
  setStep(classified ? 3 : 2);
  ```
- `useAuth.checkAuth` **returns `void`** (`useAuth.jsx:149-163`: `setUser(...); return;`) — so `await checkAuth()` updates state but hands `onCompleted` nothing; `onCompleted` then reads the **closure `user`** captured when that ProfileStep instance rendered.
- `useAuth._normalizeUser` (`useAuth.jsx:107-143`) **never sets `profile_complete`** → `profileComplete` is always `false` → the entry effect's classified-skip branch (`isClassified && !signed && profileComplete → setStep(3)`) is **unreachable**; a classified user always lands on `setStep(1)` from the effect. So the *only* skip path is `onCompleted`.
- Step-3 render requires `selectedType`: `Onboarding.jsx:205` `{step === 3 && selectedType && <AgreementStep customerType={selectedType} … />}`. `selectedType` is set only in the (now once-guarded) entry effect or in step 2's `onSelected`.

### Why it fails (W04 × W06 interaction + load timing)
W04's skip had two arms: (a) the entry effect (set `selectedType` + jump to step 3) and (b) `onCompleted`'s `setStep(classified?3:2)`. W06's run-once guard pins arm (a) to the **first** render where `!loading && user` — and because `profile_complete` is never present, arm (a) can never jump to step 3 anyway (always `setStep(1)`), and it only sets `selectedType` if `customer_type` was already classified *at that first frozen run*. Arm (b) then decides the skip from a **stale closure `user.customer_type`** (checkAuth returns nothing). So if the resolved `customer_type='individual'` is not reflected at the frozen first-run / closure-capture moment, `classified` evaluates false → `setStep(2)` → the type step appears, and/or `selectedType` stays `null` so step 3 couldn't render even if reached. The skip is **frozen/stale, not a reaction to the resolved type** — exactly the prime hypothesis, refined: it's not (only) "undefined during load," it's "decided from non-reactive state (guarded effect + stale closure) instead of the live resolved `customer_type`."

### Minimal correct-fix shape (do NOT apply)
Make the skip a **pure derivation from the resolved `user.customer_type`**, reactive once `/me` resolves, without re-introducing the loop:
- Derive `const classified = isClassifiedType(user?.customer_type)` and use it directly; derive the AgreementStep type as `customerType={classified ? user.customer_type : selectedType}` rather than relying on frozen `selectedType`.
- In `onCompleted`, decide from the **fresh** value: either have `checkAuth()` return the new user (`const fresh = await checkAuth(); classified = isClassifiedType(fresh?.customer_type)`), or read `user` via a ref that always holds the latest. Then `setStep(classified ? 3 : 2)` is correct.
- Keep W06's run-once guard ONLY for the initial step number (1 vs 3 vs login-redirect); do not let it own the type-skip decision. (Setting `selectedType` to the same string is idempotent, so a small reactive sync won't loop.)
- **Frontend-only.**

---

## Bug B — agreement-template returns HTML, not JSON (`Unexpected token '<'`)

### Frontend call vs backend route (side by side)
- **Frontend** (`Onboarding.jsx:635-636`), inside `AgreementStep`:
  ```js
  const r = await fetch(
    `/api/public/agreement-template?type=${customerType}&lang=${effectiveLang}&v3=true`
  );
  ...
  const data = await r.json();   // throws on HTML
  ```
  This is a **raw `fetch` to a relative path** — it does NOT use `portalFetch`, so it does NOT get the `API_URL` base (`config.js`: `API_URL = import.meta.env.VITE_API_URL || 'https://dispatch.y7agency.com'`). By contrast the sibling calls `update-profile` (`:358`) and `classify-and-sign` (`:727`) use `portalFetch` → `${API_URL}${path}` → reach the API. (`sms-consent-text` `:334` is the same raw-relative pattern but tolerates failure via `.catch(()=>{})`, so it degrades silently instead of crashing.)
- **Backend** (`TRANSPORT/api/routes/public.py:1938`): `@router.get("/agreement-template")` on the router `APIRouter(prefix="/api/public")` → real route **`GET /api/public/agreement-template`**. **The path the frontend uses is correct.**

### The mismatch (which of the three causes)
Not a path bug and not a method bug — it's the **missing `API_URL` base**. With a raw relative `/api/public/agreement-template`, the request goes to the **SPA's own origin**. When the SPA is served separately from the API (the default — `API_URL` points at `dispatch.y7agency.com`) and there is **no `/api` proxy** (none in `vite.config.*`; none in `server.js`), the SPA host answers unknown paths with its **`index.html`** (SPA fallback) → `<!doctype html>` → `r.json()` throws `Unexpected token '<'`. The `portalFetch` calls work in the same session precisely because they carry the `API_URL` base; the two raw-relative fetches are the odd ones out. (In the earlier W06 same-origin/proxied dev env those relative calls happened to reach the API and returned 200/304 — hence env-dependent.)

### New or pre-existing
**Pre-existing.** The raw relative agreement-template fetch comes from `ONBOARD-T08-T11` (commit `0b0637d`, "Onboarding wizard page"); REGC-S13 (`621785c`/`160768a`/`d6ce326`) did not add or change line 635. It was simply masked before — the infinite loop (pre-W06) and/or a same-origin dev/proxy setup kept it from surfacing as a hard crash; W06 made the agreement step cleanly reachable, exposing it.

### Minimal correct-fix shape (do NOT apply)
- Route the agreement-template request through `portalFetch('/api/public/agreement-template?…')` (or otherwise prefix `API_URL`), so it hits the API origin; then guard parsing (check `res.ok` / `content-type` before `r.json()`, surface a real error instead of letting `<!doctype` reach `JSON.parse`).
- Apply the same base-prefix to the `sms-consent-text` raw fetch (`:334`) to remove the latent silent failure.
- **Frontend-only** — the backend route already exists and returns JSON.

---

## STOP
Read-only diagnosis complete. No edits, commits, or pushes. A fix prompt should follow.
