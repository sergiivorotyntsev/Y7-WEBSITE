import './styles/variables.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import CookieConsent from './components/CookieConsent';
import './i18n';

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
