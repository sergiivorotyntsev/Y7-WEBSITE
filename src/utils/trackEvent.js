import { getConsent } from '../components/CookieConsent';

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  if (getConsent() !== 'all') return;
  window.gtag('event', eventName, params);
}
