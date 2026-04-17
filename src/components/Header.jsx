import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import { CloseIcon, MenuIcon } from './icons';
import styles from './Header.module.css';
import btn from '../styles/buttons.module.css';

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

  const handleQuoteClick = () => {
    if (location.pathname === '/' || location.pathname.match(/^\/[a-z]{2}$/)) {
      const el = document.getElementById('quote-section');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/quote');
  };

  const navLinks = [
    { key: 'home', to: '/' },
    { key: 'services', to: '/services' },
    { key: 'dealers', to: '/dealers' },
    { key: 'exporters', to: '/exporters' },
    { key: 'shipMyCar', to: '/ship-my-car' },
    { key: 'track', to: '/track' },
    { key: 'blog', to: '/blog' },
    { key: 'faq', to: '/faq' },
    { key: 'contact', to: '/contact' },
  ];

  return (
    <header role="banner" className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Y7<span className={styles.logoDot}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className={styles.nav}>
          <div className={styles.desktopNav}>
            {navLinks.map(({ key, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={key}
                  to={to}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </div>

          <LanguageSwitcher />

          {user ? (
            <div className={styles.accountArea}>
              <Link to="/portal/dashboard" className={styles.accountLink}>
                {user.name?.split(' ')[0] || t('auth.myAccount')}
              </Link>
              <button
                onClick={async () => { await logout(); navigate('/'); }}
                className={btn.btnSecondary}
                style={{ padding: '6px 14px', fontSize: '10px' }}
              >
                {t('auth.logOut')}
              </button>
            </div>
          ) : (
            <div className={styles.ctaGroup}>
              <button
                onClick={() => navigate('/portal/login')}
                className={`${btn.btnSecondary} ${styles.loginBtn}`}
              >
                {t('auth.logIn')}
              </button>
            </div>
          )}

          {/* Persistent Get a Quote CTA — visible on desktop and tablet */}
          <button
            onClick={handleQuoteClick}
            className={`${btn.btnAccent} ${styles.headerCta}`}
          >
            {t('cta.getQuote')}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.mobileMenuBtn}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(({ key, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={key}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}
          <button
            onClick={() => { handleQuoteClick(); setMenuOpen(false); }}
            className={`${btn.btnAccent} ${styles.mobileCta}`}
          >
            {t('cta.getQuote')}
          </button>
        </div>
      )}
    </header>
  );
}
