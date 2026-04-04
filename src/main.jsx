import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import CookieConsent from './components/CookieConsent';
import { initGA } from './utils/analytics';
import './i18n';

// Load GA4 script tag (doesn't send data until configured)
const gaId = import.meta.env.VITE_GA_ID;
if (gaId) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
}

// Only configure GA4 if user has consented
initGA();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
