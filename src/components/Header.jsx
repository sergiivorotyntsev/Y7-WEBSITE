import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import { colors, fonts, button } from '../theme';
import { CloseIcon, MenuIcon } from './icons';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const navLinks = [
    { key: 'services', to: '/services' },
    { key: 'dealers', to: '/dealers' },
    { key: 'exporters', to: '/exporters' },
    { key: 'shipMyCar', to: '/ship-my-car' },
    { key: 'track', to: '/track' },
    { key: 'faq', to: '/faq' },
    { key: 'contact', to: '/contact' },
  ];

  return (
    <header role="banner" style={{
      background: colors.bgCard,
      borderBottom: `1px solid ${colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          letterSpacing: '-0.5px',
        }}>
          Y7<span style={{ color: colors.accent }}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}
            className="desktop-nav"
          >
            {navLinks.map(({ key, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={key}
                  to={to}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '13px',
                    color: isActive ? colors.accent : colors.text,
                    fontWeight: isActive ? 700 : 500,
                    transition: 'color 0.2s',
                    borderBottom: isActive ? `2px solid ${colors.accent}` : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={e => { if (!isActive) e.target.style.color = colors.accent; }}
                  onMouseLeave={e => { if (!isActive) e.target.style.color = colors.text; }}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </div>

          <LanguageSwitcher />

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/portal/dashboard" style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                fontWeight: 600,
                color: colors.accent,
              }}>
                My Account
              </Link>
              <button
                onClick={async () => { await logout(); navigate('/'); }}
                style={{ ...button.secondary, padding: '6px 14px', fontSize: '10px' }}
              >
                Log out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => navigate('/portal/login')}
                style={{ ...button.secondary, padding: '6px 14px', fontSize: '10px' }}
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/quote')}
                style={{ ...button.primary, padding: '8px 20px', fontSize: '11px' }}
              >
                {t('cta.getQuote')}
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              fontSize: '20px',
              color: colors.text,
            }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.bgCard,
          zIndex: 99,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {navLinks.map(({ key, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={key}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '18px',
                  color: isActive ? colors.accent : colors.text,
                  fontWeight: isActive ? 700 : 500,
                  padding: '8px 0',
                  borderBottom: `1px solid ${colors.border}`,
                  borderLeft: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
                  paddingLeft: '8px',
                }}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}
          <button
            onClick={() => { navigate('/quote'); setMenuOpen(false); }}
            style={{ ...button.accent, marginTop: '12px', fontSize: '14px' }}
          >
            {t('cta.getQuote')}
          </button>
        </div>
      )}

      {/* Responsive styles via inline <style> tag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
