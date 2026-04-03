import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import Dealers from './pages/Dealers';
import Exporters from './pages/Exporters';
import ShipMyCar from './pages/ShipMyCar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import Agreement from './pages/Agreement';
import Track from './pages/Track';
import Contact from './pages/Contact';
import QuoteAction from './pages/QuoteAction';
import DealerQuote from './pages/DealerQuote';
import Login from './pages/portal/Login';
import Register from './pages/portal/Register';
import Dashboard from './pages/portal/Dashboard';
import OrderDetail from './pages/portal/OrderDetail';
import DispatchDetails from './pages/portal/DispatchDetails';
import Profile from './pages/portal/Profile';
import { colors } from './theme';

export default function App() {
  return (
    <AuthProvider>
      <div style={{ background: colors.bg, minHeight: '100vh' }}>
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
            <Route path="/agreement/:orderId" element={<Agreement />} />
            <Route path="/dealer-quote" element={<DealerQuote />} />
            <Route path="/:lang/dealer-quote" element={<DealerQuote />} />
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
            <Route path="/:lang" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
