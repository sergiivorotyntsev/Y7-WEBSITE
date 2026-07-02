import './styles/variables.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import CookieConsent from './components/CookieConsent';
import './i18n';

// CWV2-T03: by the time this script runs, the static prerendered page has
// already painted and played its pure-CSS entrance animations (audienceIn,
// y7rise, ...). createRoot() below REBUILDS #root, which would replay them —
// the visible homepage flicker from the Phase-0 census. This class lets those
// keyframes be suppressed for the client rebuild only.
// Gate = "did #root already hold prerendered content?": during the prerender
// pass the server serves the empty SPA template (root has no children), so
// the snapshot keeps its entrance classes; a real visit to any of the 135
// prerendered pages has a populated root. NOT gated on navigator.webdriver —
// Lighthouse/PSI run with webdriver=true and must see the fixed behavior.
const rootEl = document.getElementById('root');
const staticShown = rootEl.childElementCount > 0;
// Reveal.jsx reads this to snap already-visible elements to their final
// state instead of replaying the entrance on the client rebuild.
window.__Y7_STATIC_SHOWN = staticShown;
if (staticShown) {
  document.documentElement.classList.add('app-remounted');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
