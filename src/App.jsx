import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Dealers from './pages/Dealers';
import Exporters from './pages/Exporters';
import ShipMyCar from './pages/ShipMyCar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import Agreement from './pages/Agreement';
import { colors } from './theme';

export default function App() {
  return (
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
          <Route path="/agreement/:orderId" element={<Agreement />} />
          <Route path="/:lang/agreement/:orderId" element={<Agreement />} />
          <Route path="/:lang" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
