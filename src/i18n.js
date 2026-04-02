import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import quoteEn from './locales/en/quote.json';
import servicesEn from './locales/en/services.json';
import dealersEn from './locales/en/dealers.json';
import exportersEn from './locales/en/exporters.json';
import shipMycarEn from './locales/en/shipMycar.json';
import agreementEn from './locales/en/agreement.json';

const ns = {
  common: commonEn,
  home: homeEn,
  quote: quoteEn,
  services: servicesEn,
  dealers: dealersEn,
  exporters: exportersEn,
  shipMycar: shipMycarEn,
  agreement: agreementEn,
};

const resources = {
  en: ns,
  ru: ns,
  pl: ns,
  uk: ns,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
