import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileCTA from './MobileCTA';
import ErrorBoundary from './ErrorBoundary';
import ChatWidget from './ChatWidget';
import { keyframes } from '../theme';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <style>{keyframes}</style>
      <Header />
      <main id="main" key={location.pathname} style={{ animation: 'fadeUp 300ms ease' }}>
        <ErrorBoundary location={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ChatWidget />
      <MobileCTA />
    </>
  );
}
