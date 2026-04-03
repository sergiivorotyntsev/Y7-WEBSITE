import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import { colors } from './theme';

const Services = lazy(() => import('./pages/Services'));
const Dealers = lazy(() => import('./pages/Dealers'));
const Exporters = lazy(() => import('./pages/Exporters'));
const ShipMyCar = lazy(() => import('./pages/ShipMyCar'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const Agreement = lazy(() => import('./pages/Agreement'));
const Track = lazy(() => import('./pages/Track'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const Quote = lazy(() => import('./pages/Quote'));
const QuoteAction = lazy(() => import('./pages/QuoteAction'));
const DealerQuote = lazy(() => import('./pages/DealerQuote'));
const PortPage = lazy(() => import('./pages/ports/PortPage'));
const CarShippingCost = lazy(() => import('./pages/seo/CarShippingCost'));
const EnclosedCarShipping = lazy(() => import('./pages/seo/EnclosedCarShipping'));
const AuctionCarShipping = lazy(() => import('./pages/seo/AuctionCarShipping'));
const CopartShipping = lazy(() => import('./pages/seo/CopartShipping'));
const IaaiTransport = lazy(() => import('./pages/seo/IaaiTransport'));
const ManheimTransport = lazy(() => import('./pages/seo/ManheimTransport'));
const DoorToPort = lazy(() => import('./pages/seo/DoorToPort'));
const DealerAutoTransport = lazy(() => import('./pages/seo/DealerAutoTransport'));
const SalvageCarShipping = lazy(() => import('./pages/seo/SalvageCarShipping'));
const OpenCarShipping = lazy(() => import('./pages/seo/OpenCarShipping'));
const StateToState = lazy(() => import('./pages/seo/StateToState'));
const MassachusettsCarShipping = lazy(() => import('./pages/seo/locations/MassachusettsCarShipping'));
const BostonCarShipping = lazy(() => import('./pages/seo/locations/BostonCarShipping'));
const NewtonAutoTransport = lazy(() => import('./pages/seo/locations/NewtonAutoTransport'));
const FloridaCarShipping = lazy(() => import('./pages/seo/locations/FloridaCarShipping'));
const NewJerseyAutoTransport = lazy(() => import('./pages/seo/locations/NewJerseyAutoTransport'));
const TexasAutoTransport = lazy(() => import('./pages/seo/locations/TexasAutoTransport'));
const MassachusettsToFlorida = lazy(() => import('./pages/seo/routes/MassachusettsToFlorida'));
const NewJerseyToFlorida = lazy(() => import('./pages/seo/routes/NewJerseyToFlorida'));
const TexasToNewark = lazy(() => import('./pages/seo/routes/TexasToNewark'));
const ChicagoToNewark = lazy(() => import('./pages/seo/routes/ChicagoToNewark'));
const AuctionToPort = lazy(() => import('./pages/seo/routes/AuctionToPort'));
const Login = lazy(() => import('./pages/portal/Login'));
const Dashboard = lazy(() => import('./pages/portal/Dashboard'));
const OrderDetail = lazy(() => import('./pages/portal/OrderDetail'));
const DispatchDetails = lazy(() => import('./pages/portal/DispatchDetails'));
const Profile = lazy(() => import('./pages/portal/Profile'));

const srOnly = {
  position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
};

export default function App() {
  return (
    <AuthProvider>
      <a href="#main" style={srOnly} onFocus={e => { e.target.style.position = 'static'; e.target.style.width = 'auto'; e.target.style.height = 'auto'; e.target.style.clip = 'auto'; e.target.style.overflow = 'visible'; }} onBlur={e => Object.assign(e.target.style, srOnly)}>Skip to content</a>
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
