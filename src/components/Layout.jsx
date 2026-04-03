import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import { keyframes } from '../theme';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <style>{keyframes}</style>
      <Header />
      <main key={location.pathname} style={{ animation: 'fadeUp 300ms ease' }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
