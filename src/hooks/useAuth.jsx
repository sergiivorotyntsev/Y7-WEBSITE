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
      // account_inactive and unrecognised 403s fall through unchanged.
    } catch {
      // body wasn't JSON or clone failed — let the caller handle it
    }
  }
  return res;
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
          setUser({
            id: data.customer_id,
            name: data.customer_name,
            customer_type: data.customer_type || 'shipper',
            billing_mode: data.billing_mode || 'per_delivery',
          });
          return;
        }
      }
    } catch {
      // Network error — not authenticated
    }
    // 401 or other non-ok: silently set user to null
    setUser(null);
  }, []);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  const login = useCallback((sessionToken, userData) => {
    setSessionToken(sessionToken);
    setUser(userData);
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
