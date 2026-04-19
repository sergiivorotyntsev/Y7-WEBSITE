import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import quoteEn from './locales/en/quote.json';
import servicesEn from './locales/en/services.json';
import dealersEn from './locales/en/dealers.json';
import exportersEn from './locales/en/exporters.json';
import shipMycarEn from './locales/en/shipMycar.json';
import agreementEn from './locales/en/agreement.json';
import agreementDealerEn from './locales/en/agreement_dealer.json';
import aboutEn from './locales/en/about.json';
import faqEn from './locales/en/faq.json';
import processTimelineEn from './locales/en/processTimeline.json';
import termsEn from './locales/en/terms.json';
import privacyEn from './locales/en/privacy.json';
import notFoundEn from './locales/en/notFound.json';
import contextualCTAEn from './locales/en/contextualCTA.json';

// Russian
import commonRu from './locales/ru/common.json';
import homeRu from './locales/ru/home.json';
import quoteRu from './locales/ru/quote.json';
import servicesRu from './locales/ru/services.json';
import dealersRu from './locales/ru/dealers.json';
import exportersRu from './locales/ru/exporters.json';
import shipMycarRu from './locales/ru/shipMycar.json';
import agreementRu from './locales/ru/agreement.json';
import agreementDealerRu from './locales/ru/agreement_dealer.json';
import aboutRu from './locales/ru/about.json';
import faqRu from './locales/ru/faq.json';
import processTimelineRu from './locales/ru/processTimeline.json';
import notFoundRu from './locales/ru/notFound.json';
import contextualCTARu from './locales/ru/contextualCTA.json';

// Polish
import commonPl from './locales/pl/common.json';
import homePl from './locales/pl/home.json';
import quotePl from './locales/pl/quote.json';
import servicesPl from './locales/pl/services.json';
import dealersPl from './locales/pl/dealers.json';
import exportersPl from './locales/pl/exporters.json';
import shipMycarPl from './locales/pl/shipMycar.json';
import agreementPl from './locales/pl/agreement.json';
import agreementDealerPl from './locales/pl/agreement_dealer.json';
import aboutPl from './locales/pl/about.json';
import faqPl from './locales/pl/faq.json';
import processTimelinePl from './locales/pl/processTimeline.json';
import notFoundPl from './locales/pl/notFound.json';
import contextualCTAPl from './locales/pl/contextualCTA.json';

// Ukrainian
import commonUa from './locales/ua/common.json';
import homeUa from './locales/ua/home.json';
import quoteUa from './locales/ua/quote.json';
import servicesUa from './locales/ua/services.json';
import dealersUa from './locales/ua/dealers.json';
import exportersUa from './locales/ua/exporters.json';
import shipMycarUa from './locales/ua/shipMycar.json';
import agreementUa from './locales/ua/agreement.json';
import agreementDealerUa from './locales/ua/agreement_dealer.json';
import aboutUa from './locales/ua/about.json';
import faqUa from './locales/ua/faq.json';
import processTimelineUa from './locales/ua/processTimeline.json';
import notFoundUa from './locales/ua/notFound.json';
import contextualCTAUa from './locales/ua/contextualCTA.json';

const resources = {
  en: {
    common: commonEn, home: homeEn, quote: quoteEn, services: servicesEn,
    dealers: dealersEn, exporters: exportersEn, shipMycar: shipMycarEn, agreement: agreementEn, agreement_dealer: agreementDealerEn, about: aboutEn, faq: faqEn, processTimeline: processTimelineEn,
    terms: termsEn, privacy: privacyEn, notFound: notFoundEn, contextualCTA: contextualCTAEn,
  },
  ru: {
    common: commonRu, home: homeRu, quote: quoteRu, services: servicesRu,
    dealers: dealersRu, exporters: exportersRu, shipMycar: shipMycarRu, agreement: agreementRu, agreement_dealer: agreementDealerRu, about: aboutRu, faq: faqRu, processTimeline: processTimelineRu,
    terms: termsEn, privacy: privacyEn, notFound: notFoundRu, contextualCTA: contextualCTARu,
  },
  pl: {
    common: commonPl, home: homePl, quote: quotePl, services: servicesPl,
    dealers: dealersPl, exporters: exportersPl, shipMycar: shipMycarPl, agreement: agreementPl, agreement_dealer: agreementDealerPl, about: aboutPl, faq: faqPl, processTimeline: processTimelinePl,
    terms: termsEn, privacy: privacyEn, notFound: notFoundPl, contextualCTA: contextualCTAPl,
  },
  ua: {
    common: commonUa, home: homeUa, quote: quoteUa, services: servicesUa,
    dealers: dealersUa, exporters: exportersUa, shipMycar: shipMycarUa, agreement: agreementUa, agreement_dealer: agreementDealerUa, about: aboutUa, faq: faqUa, processTimeline: processTimelineUa,
    terms: termsEn, privacy: privacyEn, notFound: notFoundUa, contextualCTA: contextualCTAUa,
  },
};

const SUPPORTED = ['en', 'pl', 'ua', 'ru'];

function detectInitialLang() {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage?.getItem('y7_lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}
  const nav = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language.slice(0, 2).toLowerCase() : 'en';
  if (nav === 'uk') return 'ua';
  return SUPPORTED.includes(nav) ? nav : 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectInitialLang(),
  fallbackLng: 'en',
  supportedLngs: SUPPORTED,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
