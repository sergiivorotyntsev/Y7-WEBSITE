import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { trackPageView } from './utils/analytics';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import PromoLanding from './pages/PromoLanding';
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
import BlogIndex from './pages/blog/BlogIndex';
import BlogArticle from './pages/blog/BlogArticle';

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

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.__PRERENDER_READY = true;
    document.dispatchEvent(new Event('prerender-ready'));
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <AuthProvider>
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
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/exporters" element={<Exporters />} />
            <Route path="/ship-my-car" element={<ShipMyCar />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/track" element={<Track />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/:lang/faq" element={<FAQ />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/promo/:code" element={<PromoLanding />} />
            <Route path="/agreement" element={<ProtectedRoute><Agreement /></ProtectedRoute>} />
            <Route path="/agreement/:orderId" element={<Agreement />} />
            <Route path="/ports/:slug" element={<PortPage />} />
            <Route path="/:lang/ports/:slug" element={<PortPage />} />
            <Route path="/dealer-quote" element={<DealerQuote />} />
            <Route path="/:lang/dealer-quote" element={<DealerQuote />} />
            {/* SEO landing pages */}
            <Route path="/car-shipping-cost" element={<CarShippingCost />} />
            <Route path="/enclosed-car-shipping" element={<EnclosedCarShipping />} />
            <Route path="/auction-car-shipping" element={<AuctionCarShipping />} />
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
            <Route path="/quote" element={<Quote />} />
            <Route path="/:lang/quote" element={<Quote />} />
            <Route path="/:lang/quote/:action/:orderId" element={<QuoteAction />} />
            <Route path="/:lang/agreement/:orderId" element={<Agreement />} />
            {/* Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            {/* Portal auth — unified login/register */}
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<Navigate to="/portal/login" replace />} />
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
            {/* International pages — Poland */}
            <Route path="/pl" element={<PolandHome />} />
            <Route path="/pl/copart-shipping" element={<PolandCopart />} />
            <Route path="/pl/ship-my-car" element={<PolandShipMyCar />} />
            {/* International pages — Ukraine */}
            <Route path="/ua" element={<UkraineHome />} />
            <Route path="/ua/copart-shipping" element={<UkraineCopart />} />
            <Route path="/ua/ship-my-car" element={<UkraineShipMyCar />} />
            {/* International pages — Russia */}
            <Route path="/ru" element={<RussiaHome />} />
            <Route path="/ru/copart-shipping" element={<RussiaCopart />} />
            <Route path="/ru/ship-my-car" element={<RussiaShipMyCar />} />
            {/* Legacy diaspora redirects */}
            <Route path="/pl-us" element={<Navigate to="/pl" replace />} />
            <Route path="/pl-us/copart-shipping" element={<Navigate to="/pl/copart-shipping" replace />} />
            <Route path="/pl-us/ship-my-car" element={<Navigate to="/pl/ship-my-car" replace />} />
            <Route path="/ua-us" element={<Navigate to="/ua" replace />} />
            <Route path="/ua-us/copart-shipping" element={<Navigate to="/ua/copart-shipping" replace />} />
            <Route path="/ua-us/ship-my-car" element={<Navigate to="/ua/ship-my-car" replace />} />
            <Route path="/ru-us" element={<Navigate to="/ru" replace />} />
            <Route path="/ru-us/copart-shipping" element={<Navigate to="/ru/copart-shipping" replace />} />
            <Route path="/ru-us/ship-my-car" element={<Navigate to="/ru/ship-my-car" replace />} />
            <Route path="/:lang" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}
