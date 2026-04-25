# HOTFIX-ONBOARDING-REDIRECT Live Log

**Started:** 2026-04-25
**HEAD baseline:** 6ea2664 (Y7-WEBSITE), db83efc (TRANSPORT)

## Problem
- Race condition in Dashboard.jsx useEffect fires redirect to /portal/onboarding
  before /auth/me hydrates user object fully
- Causes "Complete your account setup" flash for fully-classified users
- Console logs GET /portal/onboarding 404 (cosmetic — SPA handles client-side)

## Diagnostic findings (T00)

### useAuth hook structure (src/hooks/useAuth.jsx)
- user initialized as null (line 100)
- loading initialized as true (line 101), set false after /auth/me completes
- AuthContext value: { user, loading, login, logout, checkAuth }
- loading flag ALREADY EXISTS and is ALREADY EXPORTED
- /auth/me called once on mount, extracts customer_type, agreement_signed, etc.

### Dashboard.jsx (src/pages/portal/Dashboard.jsx:132-165)
- useEffect depends on [user, navigate]
- Does NOT destructure or check `loading` from useAuth
- Onboarding.jsx DOES check loading correctly (line 125: `if (loading) return`)
- Dashboard is the only consumer that skips the loading guard

### Telegram Mini App (web/miniapp/index.html)
- NOT AFFECTED. Uses apiFetch('/auth/me').then(function(me) { ... })
- Awaits response before evaluating redirect conditions
- No race condition possible in this pattern

## Fix strategy: Strategy A (loading flag)
- Dashboard already gets loading from useAuth, just doesn't use it
- Add `if (loading) return` to the redirect useEffect
- Matches Onboarding.jsx pattern exactly

## Tasks

### T00 — Diagnostic
- Status: DONE

### T01 — Dashboard.jsx guard
- Status: PENDING

### T03 — Telegram Mini App verification
- Status: DONE (not affected, no changes needed)

### T05 — Report
- Status: PENDING
