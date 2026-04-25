# HOTFIX-ONBOARDING-REDIRECT Report

**Date:** 2026-04-25
**Commit:** 1c14e51

## Problem

After login, fully-classified users (dealer + agreement_signed=true) saw a brief flash of the "Complete your account setup" wizard before being redirected back to dashboard. Console logged `GET /portal/onboarding 404`.

## Root cause

`Dashboard.jsx:151` had a `useEffect` that checked `user.customer_type` and `user.agreement_signed` to decide whether to redirect to `/portal/onboarding`. The effect did NOT check the `loading` flag from `useAuth()`, so it fired before `/auth/me` completed hydrating the user object. During the loading window, `user` could be partially hydrated or stale, triggering a false redirect.

`Onboarding.jsx` already had the correct guard (`if (loading) return` at line 125) and would recognize the fully-classified user and redirect back to dashboard -- hence the "flash" behavior (redirect to onboarding, then immediately back).

## Fix applied (T01)

```diff
- const { user } = useAuth();
+ const { user, loading: authLoading } = useAuth();

  useEffect(() => {
+   if (authLoading) return;
    if (!user) return;
    // ... classification/agreement checks unchanged ...
- }, [user, navigate]);
+ }, [user, authLoading, navigate]);
```

- `authLoading` renamed from `loading` to avoid collision with local `const [loading, setLoading] = useState(true)` used for orders fetch
- Early return when auth is still loading ensures redirect only fires with complete user data
- Matches pattern already used by Onboarding.jsx

## Telegram Mini App

NOT affected. `web/miniapp/index.html` uses `apiFetch('/auth/me').then(function(me) { ... })` which inherently awaits the API response before evaluating redirect conditions. No changes needed.

## Verification

- Build: `npx vite build` passed (exit 0)
- Manual test: login with test account id=9 (dealer, agreement_signed=true) should navigate directly to dashboard without wizard flash
- Unclassified users: wizard should still fire correctly (loading flag just delays the redirect by the /auth/me response time, typically <200ms)

## Known limitations

- OnboardingBanner.jsx has similar field checks without loading guard, but it's a render-time component (not a navigation trigger), and sits inside ProtectedRoute which shows loading state during auth. Less impactful than the navigation redirect.
- Console 404 for `/portal/onboarding` on direct server access is cosmetic (SPA routes not prerendered by design). Not addressed in this hotfix.
