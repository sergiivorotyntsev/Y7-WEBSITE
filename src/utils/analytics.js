function getConsent() {
  const match = document.cookie.match(/(^| )y7_consent=([^;]+)/);
  return match ? match[2] : null;
}

export function initGA() {
  const consent = getConsent();
  if (consent !== 'all') return;
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;
  if (typeof window.gtag === 'function') {
    window.gtag('config', gaId);
  }
}

export function trackEvent(name, params = {}) {
  if (getConsent() !== 'all') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
