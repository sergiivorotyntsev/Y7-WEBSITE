import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import MobileCTA from './MobileCTA';
import ErrorBoundary from './ErrorBoundary';
import { keyframes } from '../theme';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <style>{keyframes}</style>
      <Header />
      <main id="main" key={location.pathname} style={{ animation: 'fadeUp 300ms ease' }}>
        <ErrorBoundary location={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingContact />
      <MobileCTA />
    </>
  );
}
