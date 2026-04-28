/**
 * useEmailCheck — real-time email validation hook for forms.
 *
 * Returns { status, message, suggestion, isChecking, onBlur }.
 *
 * Status states:
 *   'idle'             — no input yet
 *   'checking'         — API call in flight
 *   'valid'            — format OK, available, no typo suggestion
 *   'invalid_format'   — basic format validation failed
 *   'duplicate'        — email already registered
 *   'typo_suggestion'  — mailcheck flagged probable typo
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import Mailcheck from 'mailcheck';
import { API_URL } from '../config';

const CHECK_URL = `${API_URL}/api/portal/auth/check-email-availability`;
const DEBOUNCE_MS = 500;

const BASIC_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
  'icloud.com', 'aol.com', 'live.com', 'me.com', 'mac.com',
  'protonmail.com', 'comcast.net', 'verizon.net', 'sbcglobal.net',
];

const DEFAULT_TOPLEVEL_DOMAINS = [
  'com', 'net', 'org', 'edu', 'gov', 'co', 'io', 'us', 'biz',
];

export function useEmailCheck(email) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const runCheck = useCallback(async (value) => {
    if (!value || value.trim().length < 5) {
      setStatus('idle');
      setMessage('');
      setSuggestion(null);
      return;
    }

    const normalized = value.trim().toLowerCase();

    if (!BASIC_EMAIL_RE.test(normalized)) {
      setStatus('invalid_format');
      setMessage('Please enter a valid email address.');
      setSuggestion(null);
      return;
    }

    let typoFound = null;
    Mailcheck.run({
      email: normalized,
      domains: DEFAULT_DOMAINS,
      topLevelDomains: DEFAULT_TOPLEVEL_DOMAINS,
      suggested: (s) => { typoFound = s; },
      empty: () => {},
    });

    if (typoFound && typoFound.full && typoFound.full !== normalized) {
      setStatus('typo_suggestion');
      setMessage(`Did you mean ${typoFound.full}?`);
      setSuggestion(typoFound.full);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsChecking(true);
    try {
      const response = await fetch(
        `${CHECK_URL}?email=${encodeURIComponent(normalized)}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        setStatus('valid');
        setMessage('');
        setSuggestion(null);
        return;
      }

      const data = await response.json();

      if (data.available) {
        setStatus('valid');
        setMessage('');
        setSuggestion(null);
      } else if (data.reason === 'already_registered') {
        setStatus('duplicate');
        setMessage('This email is already registered. You can log in instead.');
        setSuggestion(null);
      } else if (data.reason === 'invalid_format' || data.reason === 'invalid_domain') {
        setStatus('invalid_format');
        setMessage('That email address looks unusual. Please double-check.');
        setSuggestion(null);
      } else {
        setStatus('valid');
        setMessage('');
        setSuggestion(null);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      setStatus('valid');
      setMessage('');
      setSuggestion(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runCheck(email), DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [email, runCheck]);

  useEffect(() => {
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  const onBlur = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    runCheck(email);
  }, [email, runCheck]);

  return { status, message, suggestion, isChecking, onBlur };
}
