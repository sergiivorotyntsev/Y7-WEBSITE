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

// Russian
import commonRu from './locales/ru/common.json';
import homeRu from './locales/ru/home.json';
import quoteRu from './locales/ru/quote.json';
import servicesRu from './locales/ru/services.json';
import dealersRu from './locales/ru/dealers.json';
import exportersRu from './locales/ru/exporters.json';
import shipMycarRu from './locales/ru/shipMycar.json';
import agreementRu from './locales/ru/agreement.json';
import aboutRu from './locales/ru/about.json';
import faqRu from './locales/ru/faq.json';

// Polish
import commonPl from './locales/pl/common.json';
import homePl from './locales/pl/home.json';
import quotePl from './locales/pl/quote.json';
import servicesPl from './locales/pl/services.json';
import dealersPl from './locales/pl/dealers.json';
import exportersPl from './locales/pl/exporters.json';
import shipMycarPl from './locales/pl/shipMycar.json';
import agreementPl from './locales/pl/agreement.json';
import aboutPl from './locales/pl/about.json';
import faqPl from './locales/pl/faq.json';

// Ukrainian
import commonUa from './locales/ua/common.json';
import homeUa from './locales/ua/home.json';
import quoteUa from './locales/ua/quote.json';
import servicesUa from './locales/ua/services.json';
import dealersUa from './locales/ua/dealers.json';
import exportersUa from './locales/ua/exporters.json';
import shipMycarUa from './locales/ua/shipMycar.json';
import agreementUa from './locales/ua/agreement.json';
import aboutUa from './locales/ua/about.json';
import faqUa from './locales/ua/faq.json';

// Polish US diaspora (shares PL translations, customized in content sprint)
import commonPlUs from './locales/pl-us/common.json';
import homePlUs from './locales/pl-us/home.json';
import quotePlUs from './locales/pl-us/quote.json';
import servicesPlUs from './locales/pl-us/services.json';
import dealersPlUs from './locales/pl-us/dealers.json';
import exportersPlUs from './locales/pl-us/exporters.json';
import shipMycarPlUs from './locales/pl-us/shipMycar.json';
import agreementPlUs from './locales/pl-us/agreement.json';
import aboutPlUs from './locales/pl-us/about.json';
import faqPlUs from './locales/pl-us/faq.json';

// Ukrainian US diaspora (shares UA translations, customized in content sprint)
import commonUaUs from './locales/ua-us/common.json';
import homeUaUs from './locales/ua-us/home.json';
import quoteUaUs from './locales/ua-us/quote.json';
import servicesUaUs from './locales/ua-us/services.json';
import dealersUaUs from './locales/ua-us/dealers.json';
import exportersUaUs from './locales/ua-us/exporters.json';
import shipMycarUaUs from './locales/ua-us/shipMycar.json';
import agreementUaUs from './locales/ua-us/agreement.json';
import aboutUaUs from './locales/ua-us/about.json';
import faqUaUs from './locales/ua-us/faq.json';

// Russian US diaspora (shares RU translations, customized in content sprint)
import commonRuUs from './locales/ru-us/common.json';
import homeRuUs from './locales/ru-us/home.json';
import quoteRuUs from './locales/ru-us/quote.json';
import servicesRuUs from './locales/ru-us/services.json';
import dealersRuUs from './locales/ru-us/dealers.json';
import exportersRuUs from './locales/ru-us/exporters.json';
import shipMycarRuUs from './locales/ru-us/shipMycar.json';
import agreementRuUs from './locales/ru-us/agreement.json';
import aboutRuUs from './locales/ru-us/about.json';
import faqRuUs from './locales/ru-us/faq.json';

const resources = {
  en: {
    common: commonEn, home: homeEn, quote: quoteEn, services: servicesEn,
    dealers: dealersEn, exporters: exportersEn, shipMycar: shipMycarEn, agreement: agreementEn, agreement_dealer: agreementDealerEn, about: aboutEn, faq: faqEn,
  },
  ru: {
    common: commonRu, home: homeRu, quote: quoteRu, services: servicesRu,
    dealers: dealersRu, exporters: exportersRu, shipMycar: shipMycarRu, agreement: agreementRu, about: aboutRu, faq: faqRu,
  },
  pl: {
    common: commonPl, home: homePl, quote: quotePl, services: servicesPl,
    dealers: dealersPl, exporters: exportersPl, shipMycar: shipMycarPl, agreement: agreementPl, about: aboutPl, faq: faqPl,
  },
  ua: {
    common: commonUa, home: homeUa, quote: quoteUa, services: servicesUa,
    dealers: dealersUa, exporters: exportersUa, shipMycar: shipMycarUa, agreement: agreementUa, about: aboutUa, faq: faqUa,
  },
  'pl-us': {
    common: commonPlUs, home: homePlUs, quote: quotePlUs, services: servicesPlUs,
    dealers: dealersPlUs, exporters: exportersPlUs, shipMycar: shipMycarPlUs, agreement: agreementPlUs, about: aboutPlUs, faq: faqPlUs,
  },
  'ua-us': {
    common: commonUaUs, home: homeUaUs, quote: quoteUaUs, services: servicesUaUs,
    dealers: dealersUaUs, exporters: exportersUaUs, shipMycar: shipMycarUaUs, agreement: agreementUaUs, about: aboutUaUs, faq: faqUaUs,
  },
  'ru-us': {
    common: commonRuUs, home: homeRuUs, quote: quoteRuUs, services: servicesRuUs,
    dealers: dealersRuUs, exporters: exportersRuUs, shipMycar: shipMycarRuUs, agreement: agreementRuUs, about: aboutRuUs, faq: faqRuUs,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru', 'pl', 'ua', 'pl-us', 'ua-us', 'ru-us'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
