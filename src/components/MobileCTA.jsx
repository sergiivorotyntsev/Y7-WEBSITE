import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fonts } from '../theme';
import { TelegramIcon, EmailIcon, ClipboardIcon } from './icons';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPortal = location.pathname.startsWith('/portal');

  useEffect(() => {
    if (isPortal) return;
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPortal]);

  if (isPortal) return null;

  const handleQuote = () => {
    if (location.pathname === '/' || location.pathname.match(/^\/[a-z]{2}$/)) {
      const el = document.getElementById('quote-section');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/quote');
  };

  const btnStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontFamily: fonts.sans,
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '0',
  };

  return (
    <>
      <style>{`
        @media (min-width: 769px) { .mobile-cta-bar { display: none !important; } }
      `}</style>
      <div
        className="mobile-cta-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '52px',
          background: '#2C2C2A',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1000,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms ease',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={btnStyle}>
          <TelegramIcon size={16} color="#fff" /> Telegram
        </a>
        <a href="mailto:info@y7agency.com" style={btnStyle}>
          <EmailIcon size={16} color="#fff" /> Email
        </a>
        <button onClick={handleQuote} style={btnStyle}>
          <ClipboardIcon size={16} color="#fff" /> Quote
        </button>
      </div>
    </>
  );
}
