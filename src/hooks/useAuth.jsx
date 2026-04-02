import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext(null);

// Store session token in memory (not localStorage — security best practice)
let _sessionToken = null;

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
  if (res.status === 401) {
    _sessionToken = null;
    throw new Error('Not authenticated');
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
          setUser({ id: data.customer_id, name: data.customer_name });
          return;
        }
      }
    } catch {
      // Not authenticated
    }
    setUser(null);
    _sessionToken = null;
  }, []);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  const login = useCallback((sessionToken, userData) => {
    _sessionToken = sessionToken;
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await portalFetch('/api/portal/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    _sessionToken = null;
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
