import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { isValidLocale } from './lib/localePaths';
import { AuthProvider } from './hooks/useAuth';
import Analytics from './components/Analytics';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PromoLanding from './pages/PromoLanding';
import Careers from './pages/Careers';
import CareerApplication from './pages/CareerApplication';
import { colors } from './theme';

function lazyWithRetry(importFn) {
  return lazy(() => importFn().catch(() => {
    window.location.reload();
    return importFn();
  }));
}

const Services = lazyWithRetry(() => import('./pages/Services'));
const Dealers = lazyWithRetry(() => import('./pages/Dealers'));
const Exporters = lazyWithRetry(() => import('./pages/Exporters'));
const ShipMyCar = lazyWithRetry(() => import('./pages/ShipMyCar'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'));
const Terms = lazyWithRetry(() => import('./pages/Terms'));
const Accessibility = lazyWithRetry(() => import('./pages/Accessibility'));
const Agreement = lazyWithRetry(() => import('./pages/Agreement'));
const Track = lazyWithRetry(() => import('./pages/Track'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const FAQ = lazyWithRetry(() => import('./pages/FAQ'));
const About = lazyWithRetry(() => import('./pages/About'));
const Quote = lazyWithRetry(() => import('./pages/Quote'));
const QuoteAction = lazyWithRetry(() => import('./pages/QuoteAction'));
const DealerQuote = lazyWithRetry(() => import('./pages/DealerQuote'));
const PortPage = lazyWithRetry(() => import('./pages/ports/PortPage'));
const CarShippingCost = lazyWithRetry(() => import('./pages/seo/CarShippingCost'));
const EnclosedCarShipping = lazyWithRetry(() => import('./pages/seo/EnclosedCarShipping'));
const AuctionCarShipping = lazyWithRetry(() => import('./pages/seo/AuctionCarShipping'));
const AuctionTransportSavings = lazyWithRetry(() => import('./pages/seo/AuctionTransportSavings'));
const CopartShipping = lazyWithRetry(() => import('./pages/seo/CopartShipping'));
const IaaiTransport = lazyWithRetry(() => import('./pages/seo/IaaiTransport'));
const ManheimTransport = lazyWithRetry(() => import('./pages/seo/ManheimTransport'));
const DoorToPort = lazyWithRetry(() => import('./pages/seo/DoorToPort'));
const DealerAutoTransport = lazyWithRetry(() => import('./pages/seo/DealerAutoTransport'));
const SalvageCarShipping = lazyWithRetry(() => import('./pages/seo/SalvageCarShipping'));
const OpenCarShipping = lazyWithRetry(() => import('./pages/seo/OpenCarShipping'));
const StateToState = lazyWithRetry(() => import('./pages/seo/StateToState'));
const MassachusettsCarShipping = lazyWithRetry(() => import('./pages/seo/locations/MassachusettsCarShipping'));
const BostonCarShipping = lazyWithRetry(() => import('./pages/seo/locations/BostonCarShipping'));
const NewtonAutoTransport = lazyWithRetry(() => import('./pages/seo/locations/NewtonAutoTransport'));
const FloridaCarShipping = lazyWithRetry(() => import('./pages/seo/locations/FloridaCarShipping'));
const NewJerseyAutoTransport = lazyWithRetry(() => import('./pages/seo/locations/NewJerseyAutoTransport'));
const TexasAutoTransport = lazyWithRetry(() => import('./pages/seo/locations/TexasAutoTransport'));
const MassachusettsToFlorida = lazyWithRetry(() => import('./pages/seo/routes/MassachusettsToFlorida'));
const NewJerseyToFlorida = lazyWithRetry(() => import('./pages/seo/routes/NewJerseyToFlorida'));
const TexasToNewark = lazyWithRetry(() => import('./pages/seo/routes/TexasToNewark'));
const ChicagoToNewark = lazyWithRetry(() => import('./pages/seo/routes/ChicagoToNewark'));
const AuctionToPort = lazyWithRetry(() => import('./pages/seo/routes/AuctionToPort'));
const TeslaCarShipping = lazyWithRetry(() => import('./pages/seo/TeslaCarShipping'));
const EVAutoTransport = lazyWithRetry(() => import('./pages/seo/EVAutoTransport'));
const CybertruckShipping = lazyWithRetry(() => import('./pages/seo/CybertruckShipping'));
const ElectricVehiclePortDelivery = lazyWithRetry(() => import('./pages/seo/ElectricVehiclePortDelivery'));
const HowToShipAuctionCar = lazyWithRetry(() => import('./pages/seo/guides/HowToShipAuctionCar'));
const OpenVsEnclosed = lazyWithRetry(() => import('./pages/seo/guides/OpenVsEnclosed'));
const BillOfLading = lazyWithRetry(() => import('./pages/seo/guides/BillOfLading'));
const CopartStorageFees = lazyWithRetry(() => import('./pages/seo/guides/CopartStorageFees'));
const CopartGatePassGuide = lazyWithRetry(() => import('./pages/seo/guides/CopartGatePassGuide'));
const CopartInternationalShipping = lazyWithRetry(() => import('./pages/seo/guides/CopartInternationalShipping'));
const QuoteVerified = lazyWithRetry(() => import('./pages/QuoteVerified'));
const QuoteVerificationFailed = lazyWithRetry(() => import('./pages/QuoteVerificationFailed'));
const ReviewSubmit = lazyWithRetry(() => import('./pages/ReviewSubmit'));
const Login = lazyWithRetry(() => import('./pages/portal/Login'));
const MagicLogin = lazyWithRetry(() => import('./pages/MagicLogin'));
const Dashboard = lazyWithRetry(() => import('./pages/portal/Dashboard'));
const OrderDetail = lazyWithRetry(() => import('./pages/portal/OrderDetail'));
const DispatchDetails = lazyWithRetry(() => import('./pages/portal/DispatchDetails'));
const Profile = lazyWithRetry(() => import('./pages/portal/Profile'));
const NewOrder = lazyWithRetry(() => import('./pages/portal/NewOrder'));
const Billing = lazyWithRetry(() => import('./pages/portal/Billing'));
const LocationSetup = lazyWithRetry(() => import('./pages/portal/LocationSetup'));
const Locations = lazyWithRetry(() => import('./pages/portal/Locations'));
const Onboarding = lazyWithRetry(() => import('./pages/portal/Onboarding'));
// Intl placeholder pages
const PolandHome = lazyWithRetry(() => import('./pages/intl/PolandHome'));
const PolandCopart = lazyWithRetry(() => import('./pages/intl/PolandCopart'));
const PolandShipMyCar = lazyWithRetry(() => import('./pages/intl/PolandShipMyCar'));
const UkraineHome = lazyWithRetry(() => import('./pages/intl/UkraineHome'));
const UkraineCopart = lazyWithRetry(() => import('./pages/intl/UkraineCopart'));
const UkraineShipMyCar = lazyWithRetry(() => import('./pages/intl/UkraineShipMyCar'));
const RussiaHome = lazyWithRetry(() => import('./pages/intl/RussiaHome'));
const RussiaCopart = lazyWithRetry(() => import('./pages/intl/RussiaCopart'));
const RussiaShipMyCar = lazyWithRetry(() => import('./pages/intl/RussiaShipMyCar'));
// Blog — static imports for prerender compatibility
const BlogIndex = lazyWithRetry(() => import('./pages/blog/BlogIndex'));
const BlogArticle = lazyWithRetry(() => import('./pages/blog/BlogArticle'));

const skipHidden = {
  position: 'absolute', left: '-9999px', top: 'auto',
  width: '1px', height: '1px', overflow: 'hidden',
};
const skipVisible = {
  position: 'fixed', left: '16px', top: '16px', zIndex: 9999,
  background: colors.bg, padding: '8px 16px',
  border: `1px solid ${colors.accent}`, borderRadius: '4px',
  fontSize: '14px', color: colors.text, textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
};

/**
 * LangGuard — for routes whose :lang segment is a free param
 * (/:lang/ports/:slug, /:lang/dealer-quote, /:lang/quote, ...). React Router
 * matches ANY value for :lang, so without this an invalid locale code like
 * /en/ports/houston or /uk/quote would render a real page in-SPA. Render the
 * 404 view when the segment is not a real localized prefix (pl|ua|ru); the
 * server already returns HTTP 404 for these paths.
 */
function LangGuard({ children }) {
  const { lang } = useParams();
  if (!isValidLocale(lang)) return <NotFound />;
  return children;
}

/**
 * RegisterRedirect — /portal/register is a public, link-shared signup URL
 * (e.g. PostQuoteFlow's post-quote "create account" CTA appends ?email=…&ref=…).
 * The registration UI lives on /portal/login, so we redirect there — but
 * S4-SMALL-W03 PRESERVES the query string so email/ref aren't dropped on the
 * way; Login.jsx reads ?email to prefill the signup email.
 */
function RegisterRedirect() {
  const location = useLocation();
  return <Navigate to={{ pathname: '/portal/login', search: location.search }} replace />;
}

export default function App() {
  useEffect(() => {
    document.__PRERENDER_READY = true;
    document.dispatchEvent(new Event('prerender-ready'));
  }, []);

  return (
    <AuthProvider>
      <Analytics />
      <a
        href="#main"
        style={skipHidden}
        onFocus={e => Object.assign(e.target.style, skipVisible)}
        onBlur={e => Object.assign(e.target.style, skipHidden)}
      >
        Skip to content
      </a>
      <div style={{ background: colors.bg, minHeight: '100vh' }}>
        <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            {/* English (default, no prefix) */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/exporters" element={<Exporters />} />
            <Route path="/ship-my-car" element={<ShipMyCar />} />
            <Route path="/track" element={<Track />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply" element={<CareerApplication />} />
            {/* Locale-prefixed translations (SAME components, LocaleDetector
                flips i18n.language from URL prefix). These are the hreflang
                equivalents of their English counterparts. */}
            {['ua', 'pl', 'ru'].flatMap((lang) => [
              <Route key={`${lang}-home`} path={`/${lang}`} element={<Home />} />,
              <Route key={`${lang}-services`} path={`/${lang}/services`} element={<Services />} />,
              <Route key={`${lang}-dealers`} path={`/${lang}/dealers`} element={<Dealers />} />,
              <Route key={`${lang}-exporters`} path={`/${lang}/exporters`} element={<Exporters />} />,
              <Route key={`${lang}-ship-my-car`} path={`/${lang}/ship-my-car`} element={<ShipMyCar />} />,
              <Route key={`${lang}-track`} path={`/${lang}/track`} element={<Track />} />,
              <Route key={`${lang}-contact`} path={`/${lang}/contact`} element={<Contact />} />,
              <Route key={`${lang}-faq`} path={`/${lang}/faq`} element={<FAQ />} />,
              <Route key={`${lang}-about`} path={`/${lang}/about`} element={<About />} />,
              <Route key={`${lang}-quote`} path={`/${lang}/quote`} element={<Quote />} />,
            ])}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/promo/:code" element={<PromoLanding />} />
            <Route path="/agreement" element={<ProtectedRoute><Agreement /></ProtectedRoute>} />
            <Route path="/agreement/:orderId" element={<Agreement />} />
            <Route path="/ports/:slug" element={<PortPage />} />
            <Route path="/:lang/ports/:slug" element={<LangGuard><PortPage /></LangGuard>} />
            <Route path="/dealer-quote" element={<DealerQuote />} />
            <Route path="/:lang/dealer-quote" element={<LangGuard><DealerQuote /></LangGuard>} />
            {/* SEO landing pages */}
            <Route path="/car-shipping-cost" element={<CarShippingCost />} />
            <Route path="/enclosed-car-shipping" element={<EnclosedCarShipping />} />
            <Route path="/auction-car-shipping" element={<AuctionCarShipping />} />
            <Route path="/auction-transport-savings" element={<AuctionTransportSavings />} />
            <Route path="/copart-shipping" element={<CopartShipping />} />
            <Route path="/iaai-transport" element={<IaaiTransport />} />
            <Route path="/manheim-transport" element={<ManheimTransport />} />
            <Route path="/door-to-port-auto-transport" element={<DoorToPort />} />
            <Route path="/dealer-auto-transport" element={<DealerAutoTransport />} />
            <Route path="/salvage-car-shipping" element={<SalvageCarShipping />} />
            <Route path="/open-car-shipping" element={<OpenCarShipping />} />
            <Route path="/state-to-state-car-shipping" element={<StateToState />} />
            {/* Location pages */}
            <Route path="/massachusetts-car-shipping" element={<MassachusettsCarShipping />} />
            <Route path="/boston-car-shipping" element={<BostonCarShipping />} />
            <Route path="/newton-auto-transport" element={<NewtonAutoTransport />} />
            <Route path="/florida-car-shipping" element={<FloridaCarShipping />} />
            <Route path="/new-jersey-auto-transport" element={<NewJerseyAutoTransport />} />
            <Route path="/texas-auto-transport" element={<TexasAutoTransport />} />
            {/* Route pages */}
            <Route path="/massachusetts-to-florida-car-shipping" element={<MassachusettsToFlorida />} />
            <Route path="/new-jersey-to-florida-car-shipping" element={<NewJerseyToFlorida />} />
            <Route path="/texas-to-newark-port-auto-transport" element={<TexasToNewark />} />
            <Route path="/chicago-to-port-newark-car-shipping" element={<ChicagoToNewark />} />
            <Route path="/auction-to-port-transport" element={<AuctionToPort />} />
            {/* EV/Tesla pages */}
            <Route path="/tesla-car-shipping" element={<TeslaCarShipping />} />
            <Route path="/ev-auto-transport" element={<EVAutoTransport />} />
            <Route path="/cybertruck-shipping" element={<CybertruckShipping />} />
            <Route path="/electric-vehicle-port-delivery" element={<ElectricVehiclePortDelivery />} />
            {/* Review submission */}
            <Route path="/review/:token" element={<ReviewSubmit />} />
            {/* Guide pages */}
            <Route path="/how-to-ship-a-car-bought-at-auction" element={<HowToShipAuctionCar />} />
            <Route path="/open-vs-enclosed-auto-transport" element={<OpenVsEnclosed />} />
            <Route path="/what-is-a-bill-of-lading" element={<BillOfLading />} />
            <Route path="/copart-storage-fees" element={<CopartStorageFees />} />
            <Route path="/copart-gate-pass-guide" element={<CopartGatePassGuide />} />
            <Route path="/copart-international-shipping" element={<CopartInternationalShipping />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/quote-verified" element={<QuoteVerified />} />
            <Route path="/quote-verification-failed" element={<QuoteVerificationFailed />} />
            <Route path="/:lang/quote" element={<LangGuard><Quote /></LangGuard>} />
            {/* HOTFIX-CONFIRM404-T02: canonical English quote-action route lives at
                root (emails link /quote/confirm/{id}?token=...; the server 302s the
                legacy /en/ form here). */}
            <Route path="/quote/:action/:orderId" element={<QuoteAction />} />
            <Route path="/:lang/quote/:action/:orderId" element={<LangGuard><QuoteAction /></LangGuard>} />
            <Route path="/:lang/agreement/:orderId" element={<LangGuard><Agreement /></LangGuard>} />
            {/* Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            {/* Portal auth — unified login/register */}
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<RegisterRedirect />} />
            {/* Magic-link landing — single-use token from dealer welcome email.
                Dynamic route, intentionally not prerendered. */}
            <Route path="/portal/magic/:token" element={<MagicLogin />} />
            {/* Portal protected routes — placeholder for PORTAL-02/03/04 */}
            <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/portal/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/portal/order/:id/dispatch-details" element={<ProtectedRoute><DispatchDetails /></ProtectedRoute>} />
            <Route path="/portal/new-order" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
            <Route path="/portal/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/portal/locations/setup" element={<ProtectedRoute><LocationSetup /></ProtectedRoute>} />
            <Route path="/portal/locations" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
            <Route path="/portal/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* ONBOARD-T08: unified classify-and-sign wizard — replaces
                AccountTypeModal + separate /agreement page flow. */}
            <Route path="/portal/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            {/* UNIQUE international landing pages — descriptive native slugs,
                unique content, NOT hreflang equivalents of English pages */}
            <Route path="/pl/transport-z-usa" element={<PolandHome />} />
            <Route path="/pl/transport-z-aukcji" element={<PolandCopart />} />
            <Route path="/pl/wysylka-auta-z-usa" element={<PolandShipMyCar />} />
            <Route path="/ua/import-z-usa" element={<UkraineHome />} />
            <Route path="/ua/copart-ta-iaai" element={<UkraineCopart />} />
            <Route path="/ua/dostavka-avto-z-usa" element={<UkraineShipMyCar />} />
            <Route path="/ru/dostavka-avto-iz-usa" element={<RussiaHome />} />
            <Route path="/ru/copart-i-iaai" element={<RussiaCopart />} />
            <Route path="/ru/perevozka-avto" element={<RussiaShipMyCar />} />
            {/* Legacy SPA redirects: the old /ua /pl /ru pointed at the
                unique pages above. They now point to the translated Home.
                The old copart-shipping slug redirects to the new unique slug.
                Translated ship-my-car stays on /{lang}/ship-my-car. */}
            <Route path="/pl/copart-shipping" element={<Navigate to="/pl/transport-z-aukcji" replace />} />
            <Route path="/ua/copart-shipping" element={<Navigate to="/ua/copart-ta-iaai" replace />} />
            <Route path="/ru/copart-shipping" element={<Navigate to="/ru/copart-i-iaai" replace />} />
            <Route path="/pl-us" element={<Navigate to="/pl" replace />} />
            <Route path="/pl-us/copart-shipping" element={<Navigate to="/pl/transport-z-aukcji" replace />} />
            <Route path="/pl-us/ship-my-car" element={<Navigate to="/pl/ship-my-car" replace />} />
            <Route path="/ua-us" element={<Navigate to="/ua" replace />} />
            <Route path="/ua-us/copart-shipping" element={<Navigate to="/ua/copart-ta-iaai" replace />} />
            <Route path="/ua-us/ship-my-car" element={<Navigate to="/ua/ship-my-car" replace />} />
            <Route path="/ru-us" element={<Navigate to="/ru" replace />} />
            <Route path="/ru-us/copart-shipping" element={<Navigate to="/ru/copart-i-iaai" replace />} />
            <Route path="/ru-us/ship-my-car" element={<Navigate to="/ru/ship-my-car" replace />} />
            {/* Explicit /404 route for server-side prerender (OVERNIGHT-T01) */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}
