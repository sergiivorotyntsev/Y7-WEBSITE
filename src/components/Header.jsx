import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import NavDropdown from './NavDropdown';
import { CloseIcon, MenuIcon, ChevronDownIcon } from './icons';
import styles from './Header.module.css';
import btn from '../styles/buttons.module.css';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Close mobile menu when route changes
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const handleQuoteClick = () => {
    if (location.pathname === '/' || location.pathname.match(/^\/[a-z]{2}$/)) {
      const el = document.getElementById('quote-section');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/quote');
  };

  const servicesItems = [
    { to: '/dealers', label: t('nav.forDealers'), desc: t('nav.forDealersDesc') },
    { to: '/exporters', label: t('nav.forExporters'), desc: t('nav.forExportersDesc') },
    { to: '/ship-my-car', label: t('nav.shipMyCar'), desc: t('nav.shipMyCarDesc') },
    { to: '/services', label: t('nav.allServices'), desc: t('nav.allServicesDesc') },
    { to: '/door-to-port-auto-transport', label: t('nav.portDelivery'), desc: t('nav.portDeliveryDesc') },
  ];

  const resourcesItems = [
    { to: '/blog', label: t('nav.blog'), desc: t('nav.blogDesc') },
    { to: '/faq', label: t('nav.faq'), desc: t('nav.faqDesc') },
    { to: '/about', label: t('nav.about'), desc: t('nav.aboutDesc') },
  ];

  const servicesMatch = /^\/(services|dealers|exporters|ship-my-car|door-to-port)/;
  const resourcesMatch = /^\/(blog|faq|about)/;
  const trackActive = location.pathname === '/track';
  const contactActive = location.pathname === '/contact';

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
            <NavDropdown
              label={t('nav.services')}
              items={servicesItems}
              activeMatch={servicesMatch}
            />
            <NavDropdown
              label={t('nav.resources')}
              items={resourcesItems}
              activeMatch={resourcesMatch}
            />
            <Link
              to="/track"
              className={`${styles.navLink} ${trackActive ? styles.navLinkActive : ''}`}
            >
              {t('nav.track')}
            </Link>
            <Link
              to="/contact"
              className={`${styles.navLink} ${contactActive ? styles.navLinkActive : ''}`}
            >
              {t('nav.contact')}
            </Link>
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
        <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            onClick={() => { handleQuoteClick(); }}
            className={`${btn.btnAccent} ${styles.mobileCta}`}
          >
            {t('cta.getQuote')}
          </button>

          <button
            type="button"
            className={styles.mobileSectionToggle}
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            <span>{t('nav.services')}</span>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                transition: 'transform 200ms ease-out',
                transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              data-chev="services"
            >
              <ChevronDownIcon size={14} color="currentColor" />
            </span>
          </button>
          {mobileServicesOpen && (
            <div className={styles.mobileSubmenu}>
              {servicesItems.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`${styles.mobileSubLink} ${location.pathname === it.to ? styles.mobileNavLinkActive : ''}`}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.mobileSectionToggle}
            aria-expanded={mobileResourcesOpen}
            onClick={() => setMobileResourcesOpen((v) => !v)}
          >
            <span>{t('nav.resources')}</span>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                transition: 'transform 200ms ease-out',
                transform: mobileResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ChevronDownIcon size={14} color="currentColor" />
            </span>
          </button>
          {mobileResourcesOpen && (
            <div className={styles.mobileSubmenu}>
              {resourcesItems.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`${styles.mobileSubLink} ${location.pathname === it.to ? styles.mobileNavLinkActive : ''}`}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/track"
            className={`${styles.mobileNavLink} ${trackActive ? styles.mobileNavLinkActive : ''}`}
          >
            {t('nav.track')}
          </Link>
          <Link
            to="/contact"
            className={`${styles.mobileNavLink} ${contactActive ? styles.mobileNavLinkActive : ''}`}
          >
            {t('nav.contact')}
          </Link>

          <div className={styles.mobileFooter}>
            <LanguageSwitcher />
            {user ? (
              <button
                onClick={async () => { await logout(); navigate('/'); setMenuOpen(false); }}
                className={btn.btnSecondary}
                style={{ marginTop: '12px', padding: '10px 20px' }}
              >
                {t('auth.logOut')}
              </button>
            ) : (
              <button
                onClick={() => { navigate('/portal/login'); setMenuOpen(false); }}
                className={btn.btnSecondary}
                style={{ marginTop: '12px', padding: '10px 20px' }}
              >
                {t('auth.logIn')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
