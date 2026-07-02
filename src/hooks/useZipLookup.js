import { useEffect, useRef, useState } from 'react';
import { apiGet } from './useApi';

/**
 * Debounced ZIP→city/state lookup for live form UX.
 *
 * @param {string} zip  Raw user input
 * @returns {{
 *   status: 'idle' | 'pending' | 'valid' | 'invalid' | 'error',
 *   city: string | null,
 *   stateAbbr: string | null,
 * }}
 */
export function useZipLookup(zip) {
  const [state, setState] = useState({ status: 'idle', city: null, stateAbbr: null });
  const timerRef = useRef(null);
  const lastQueryRef = useRef(null);

  useEffect(() => {
    const trimmed = (zip || '').trim();
    if (trimmed.length < 5) {
      setState({ status: 'idle', city: null, stateAbbr: null });
      return;
    }

    const zip5 = trimmed.slice(0, 5);
    if (!/^\d{5}$/.test(zip5)) {
      setState({ status: 'idle', city: null, stateAbbr: null });
      return;
    }

    if (lastQueryRef.current === zip5) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setState((s) => ({ ...s, status: 'pending' }));
    timerRef.current = setTimeout(async () => {
      lastQueryRef.current = zip5;
      try {
        const res = await apiGet(`/api/public/zip-lookup?zip=${zip5}`);
        if (res?.valid) {
          setState({ status: 'valid', city: res.city, stateAbbr: res.state_abbr });
        } else {
          setState({ status: 'invalid', city: null, stateAbbr: null });
        }
      } catch {
        setState({ status: 'error', city: null, stateAbbr: null });
      }
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [zip]);

  return state;
}
