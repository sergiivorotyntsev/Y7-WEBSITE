import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
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
const Login = lazyWithRetry(() => import('./pages/portal/Login'));
const Dashboard = lazyWithRetry(() => import('./pages/portal/Dashboard'));
const OrderDetail = lazyWithRetry(() => import('./pages/portal/OrderDetail'));
const DispatchDetails = lazyWithRetry(() => import('./pages/portal/DispatchDetails'));
const Profile = lazyWithRetry(() => import('./pages/portal/Profile'));

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
            <Route path="/quote" element={<Quote />} />
            <Route path="/:lang/quote" element={<Quote />} />
            <Route path="/:lang/quote/:action/:orderId" element={<QuoteAction />} />
            <Route path="/:lang/agreement/:orderId" element={<Agreement />} />
            {/* Portal auth — unified login/register */}
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<Navigate to="/portal/login" replace />} />
            {/* Portal protected routes — placeholder for PORTAL-02/03/04 */}
            <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/portal/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/portal/order/:id/dispatch-details" element={<ProtectedRoute><DispatchDetails /></ProtectedRoute>} />
            <Route path="/portal/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Legacy Wix URL redirects */}
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/global-sourcing" element={<Navigate to="/services" replace />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
            <Route path="/accessibility-statement" element={<Navigate to="/accessibility" replace />} />
            <Route path="/:lang" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}
