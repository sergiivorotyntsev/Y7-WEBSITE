/* eslint-disable react-refresh/only-export-components */
// useAuth intentionally co-exports: AuthProvider component, useAuth hook,
// and portalFetch helper. Splitting would require cascading changes across
// 10+ importers; dev-only HMR warning safe to suppress here.
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext(null);

// Session token storage strategy (SPRINT-E-T1):
//
// The cookie set by services.portal_session.set_portal_session_cookie is
// the AUTHORITATIVE session — it's HttpOnly and survives page refresh.
// _sessionToken below is a Bearer-header FALLBACK used only when the
// cookie cannot be delivered (e.g. cross-origin browsers blocking 3rd
// party cookies, dev mode without COOKIE_DOMAIN, Safari ITP).
//
// Pre-Sprint-E _sessionToken was the ONLY auth path because both
// /api/public/telegram-login and /api/public/magic/consume returned
// JSON tokens without setting any cookie. That meant page-refresh
// wiped the session — the "Session Expired" symptom seen in D-bis
// end-to-end testing. T1 fixed both endpoints to set the cookie AND
// added this localStorage backup so even the fallback survives
// refresh in browsers where the cookie is blocked.
//
// localStorage IS a higher XSS exposure than memory-only, but the
// trade-off is acceptable here: any attacker with XSS already controls
// the same-origin fetch context and can steal tokens regardless. The
// cookie remains HttpOnly so it's not directly readable.

const STORAGE_KEY = 'y7_portal_session_backup';

let _sessionToken = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
})();

function setSessionToken(token) {
  _sessionToken = token;
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Quota / private mode — degrade silently, in-memory still works
  }
}

function authHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (_sessionToken) {
    headers['Authorization'] = `Bearer ${_sessionToken}`;
  }
  return headers;
}

// WA-T01: Bearer header for RAW multipart uploads. portalFetch can't be used
// for FormData (it forces Content-Type: application/json, which strips the
// multipart boundary), so those fetches were going out cookie-only — and on
// phones where the cross-site cookie is blocked (iOS Safari ITP, 3rd-party
// cookie blocking) that means no credential at all → silent 401, the bug the
// customer hit. This returns the SAME Bearer the JSON requests use (same
// _sessionToken source) WITHOUT a Content-Type, so the boundary is preserved.
export function authHeader() {
  return _sessionToken ? { Authorization: `Bearer ${_sessionToken}` } : {};
}

// WA-T01: mirror portalFetch's 401 token-clear for the raw upload paths so a
// stale token doesn't persist after the server rejects it.
export function clearSessionOn401(status) {
  if (status === 401) setSessionToken(null);
}

export async function portalFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: { ...authHeaders(), ...options.headers },
  });
  // On 401, clear token but DON'T throw — let callers handle the response
  if (res.status === 401) {
    setSessionToken(null);
  }
  // SPRINT-E-T2: centralised handler for the structured 403 responses
  // emitted by api.dependencies.portal.require_active_customer.
  // Pages used to surface generic "request failed" toasts on these
  // errors; now we peek the body and hard-redirect into the right
  // recovery flow.
  if (res.status === 403) {
    try {
      const cloned = res.clone();
      const body = await cloned.json();
      const detail = body?.detail || body;
      const errorCode = detail?.error;
      if (errorCode === 'classification_required' && detail?.classification_url) {
        window.location.href = detail.classification_url;
        return res;
      }
      if (errorCode === 'agreement_required' && detail?.agreement_url) {
        window.location.href = detail.agreement_url;
        return res;
      }
      // DEALER-LIFECYCLE-G1: dealer verification / trial-quote states have no
      // recovery URL to hard-redirect into — they are rendered in-page (the
      // VerificationBanner sourced from /me, plus the structured-detail message
      // in NewOrder). Recognise them here so they are handled deliberately
      // rather than swallowed as a generic 403; surface to the caller untouched.
      if (errorCode === 'company_verification_required' || errorCode === 'trial_quotes_exhausted') {
        return res;
      }
      // account_inactive and unrecognised 403s fall through unchanged.
    } catch {
      // body wasn't JSON or clone failed — let the caller handle it
    }
  }
  return res;
}

function _normalizeUser(data) {
  if (!data) return null;
  return {
    id: data.customer_id || data.id,
    name: data.customer_name || data.name || data.contact_name,
    customer_type: data.customer_type || 'unknown',
    billing_mode: data.billing_mode || 'per_delivery',
    agreement_signed: !!data.agreement_signed,
    agreement_signed_at: data.agreement_signed_at || null,
    deposit_balance_cents: data.deposit_balance_cents || 0,
    bank_auth_signed: !!data.bank_auth_signed,
    billing_blocked: !!data.billing_blocked,
    has_locations: !!data.has_locations,
    email: data.email || null,
    email_bouncing: !!data.email_bouncing,
    email_bouncing_since: data.email_bouncing_since || null,
    last_email_bounce_reason: data.last_email_bounce_reason || null,
    contact_name: data.contact_name || null,
    phone: data.phone || null,
    company_name: data.company_name || null,
    delivery_address: data.delivery_address || null,
    delivery_city: data.delivery_city || null,
    delivery_state: data.delivery_state || null,
    delivery_zip: data.delivery_zip || null,
    sms_consent: !!data.sms_consent,
    email_verified: !!data.email_verified,
    // DEALER-LIFECYCLE-G1: company-verification lifecycle + trial-quote budget.
    // Null for non-dealers (no verification UI / no cap). trial_quotes_remaining
    // is null when the cap is lifted (verified) — see VerificationBanner.
    company_verification_status: data.company_verification_status || null,
    company_verification_note: data.company_verification_note || null,
    trial_quotes_remaining:
      typeof data.trial_quotes_remaining === 'number' ? data.trial_quotes_remaining : null,
    trial_quote_limit:
      typeof data.trial_quote_limit === 'number' ? data.trial_quote_limit : 3,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await portalFetch('/api/portal/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          // REGC-S13-W07a: return the fresh normalized user so post-action
          // routing (e.g. Onboarding step decisions) uses resolved data rather
          // than a stale closure. Void-ignoring callers are unaffected.
          const u = _normalizeUser(data);
          setUser(u);
          return u;
        }
      }
    } catch {
      // Network error — not authenticated
    }
    setUser(null);
    return null;
  }, []);

  useEffect(() => {
    // Skip cross-origin /auth/me check when there's no stored session token.
    // Unauthenticated visitors on public pages would get a CORS-blocked fetch
    // that logs a red console error (browser-level, uncatchable by JS).
    // With no token the response is always "not authenticated" anyway.
    if (!_sessionToken) {
      setLoading(false);
      return;
    }
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  const login = useCallback((sessionToken, userData) => {
    setSessionToken(sessionToken);
    setUser(_normalizeUser(userData));
  }, []);

  const logout = useCallback(async () => {
    try {
      await portalFetch('/api/portal/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setSessionToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
