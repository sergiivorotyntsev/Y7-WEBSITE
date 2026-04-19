import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getConsent } from './CookieConsent';

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

function loadGtag() {
  if (!GA_ID) return;
  if (window.__y7_ga_loaded) return;
  window.__y7_ga_loaded = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === 'undefined') return;

    if (getConsent() === 'all') {
      loadGtag();
    }

    function onConsent() {
      if (getConsent() === 'all') loadGtag();
    }
    window.addEventListener('y7-consent-accepted', onConsent);
    return () => window.removeEventListener('y7-consent-accepted', onConsent);
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === 'undefined') return;
    if (!window.gtag) return;
    if (getConsent() !== 'all') return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
