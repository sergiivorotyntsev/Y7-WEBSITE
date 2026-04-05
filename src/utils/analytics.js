function getConsent() {
  const match = document.cookie.match(/(^| )y7_consent=([^;]+)/);
  return match ? match[2] : null;
}

export function initGA() {
  const consent = getConsent();
  if (consent !== 'all') return;
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;

  // Initialize dataLayer and gtag if not already present
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
  }
  window.gtag('config', gaId, {
    send_page_view: true,
    anonymize_ip: true,
  });
}

export function trackEvent(name, params = {}) {
  if (getConsent() !== 'all') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackPageView(path) {
  if (getConsent() !== 'all') return;
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId || typeof window.gtag !== 'function') return;
  window.gtag('config', gaId, { page_path: path });
}
