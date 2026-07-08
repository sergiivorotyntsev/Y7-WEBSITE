import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import NavDropdown from './NavDropdown';
import AnimatedLogo from './AnimatedLogo';
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
  const [mobileIntlOpen, setMobileIntlOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  // Locale-aware link helper: prepends /{locale} to paths for translated
  // pages when the visitor is already inside a locale prefix.
  const localeMatch = location.pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : 'en';
  const prefix = currentLocale === 'en' ? '' : `/${currentLocale}`;
  const L = (path) => `${prefix}${path}`;

  const handleQuoteClick = () => {
    const base = location.pathname.replace(/^\/(ua|pl|ru)(\/|$)/, '/').replace(/\/+$/, '') || '/';
    if (base === '/') {
      const el = document.getElementById('quote-section');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate(L('/quote'));
  };

  const servicesItems = [
    { to: L('/dealers'),     label: t('nav.forDealers'),    desc: t('nav.forDealersDesc') },
    { to: L('/exporters'),   label: t('nav.forExporters'),  desc: t('nav.forExportersDesc') },
    { to: L('/ship-my-car'), label: t('nav.shipMyCar'),     desc: t('nav.shipMyCarDesc') },
    { to: L('/services'),    label: t('nav.allServices'),   desc: t('nav.allServicesDesc') },
    { to: '/door-to-port-auto-transport', label: t('nav.portDelivery'), desc: t('nav.portDeliveryDesc') },
    { divider: true },
    { to: '/car-shipping-cost',    label: t('nav.carShippingCost'),   desc: t('nav.carShippingCostDesc') },
    { to: '/open-car-shipping',    label: t('nav.openVsEnclosed'),    desc: t('nav.openVsEnclosedDesc') },
    { to: '/auction-car-shipping', label: t('nav.auctionCarShipping'), desc: t('nav.auctionCarShippingDesc') },
  ];

  const resourcesItems = [
    { to: '/blog',       label: t('nav.blog'), desc: t('nav.blogDesc') },
    { to: L('/faq'),     label: t('nav.faq'),  desc: t('nav.faqDesc') },
    { to: L('/about'),   label: t('nav.about'), desc: t('nav.aboutDesc') },
  ];

  // Intl landing pages — labels stay in native language (they identify
  // the target page, not translate the UI chrome). Slugs match the new
  // unique native slugs introduced in SEO-ARCH sprint.
  const internationalItems = [
    { to: '/ua/import-z-usa',        label: 'Пригін авто (UA)',  desc: 'Пригін авто зі США в Україну' },
    { to: '/pl/transport-z-usa',     label: 'Transport aut (PL)', desc: 'Sprowadzanie aut z USA' },
    { to: '/ru/dostavka-avto-iz-usa',label: 'Доставка авто (RU)', desc: 'Перевозка авто для диаспоры' },
  ];

  const servicesMatch = /^\/(ua|pl|ru)?\/?(services|dealers|exporters|ship-my-car|door-to-port)/;
  const resourcesMatch = /^\/(ua|pl|ru)?\/?(blog|faq|about)/;
  const intlMatch = /^\/(ua|pl|ru)\/(import-z-usa|transport-z-usa|dostavka-avto-iz-usa|copart-ta-iaai|transport-z-aukcji|copart-i-iaai|dostavka-avto-z-usa|wysylka-auta-z-usa|perevozka-avto)/;
  const trackActive = location.pathname === L('/track');
  const contactActive = location.pathname === L('/contact');

  // Home always points to the current-locale Home (e.g. /ua when in UA).
  const homeHref = prefix || '/';
  const homeActive = location.pathname === homeHref;

  return (
    <header role="banner" className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <AnimatedLogo size={28} to={L('/')} />

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className={styles.nav}>
          <div className={styles.desktopNav}>
            <Link
              to={homeHref}
              className={`${styles.navLink} ${homeActive ? styles.navLinkActive : ''}`}
            >
              {t('nav.home')}
            </Link>
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
            <NavDropdown
              label={t('nav.international')}
              items={internationalItems}
              activeMatch={intlMatch}
            />
            <Link
              to={L('/track')}
              className={`${styles.navLink} ${trackActive ? styles.navLinkActive : ''}`}
            >
              {t('nav.track')}
            </Link>
            <Link
              to={L('/contact')}
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

          {/* W7U-T01 (0707 finding 1): LOG IN was the LAST menu item — below the
              language switcher, dark-on-dark (missing the .loginBtn contrast
              class), below the fold. The two primary actions now sit together
              at the top; .mobileLoginBtn scales the desktop .loginBtn styling
              to a tappable full-width pill. */}
          {user ? (
            <button
              onClick={async () => { await logout(); navigate('/'); setMenuOpen(false); }}
              className={`${btn.btnSecondary} ${styles.loginBtn} ${styles.mobileLoginBtn}`}
            >
              {t('auth.logOut')}
            </button>
          ) : (
            <button
              onClick={() => { navigate('/portal/login'); setMenuOpen(false); }}
              className={`${btn.btnSecondary} ${styles.loginBtn} ${styles.mobileLoginBtn}`}
            >
              {t('auth.logIn')}
            </button>
          )}

          <Link
            to={homeHref}
            className={`${styles.mobileNavLink} ${homeActive ? styles.mobileNavLinkActive : ''}`}
          >
            {t('nav.home')}
          </Link>

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
              {servicesItems.filter((it) => !it.divider).map((it) => (
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

          <button
            type="button"
            className={styles.mobileSectionToggle}
            aria-expanded={mobileIntlOpen}
            onClick={() => setMobileIntlOpen((v) => !v)}
          >
            <span>{t('nav.international')}</span>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                transition: 'transform 200ms ease-out',
                transform: mobileIntlOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ChevronDownIcon size={14} color="currentColor" />
            </span>
          </button>
          {mobileIntlOpen && (
            <div className={styles.mobileSubmenu}>
              {internationalItems.map((it) => (
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
            to={L('/track')}
            className={`${styles.mobileNavLink} ${trackActive ? styles.mobileNavLinkActive : ''}`}
          >
            {t('nav.track')}
          </Link>
          <Link
            to={L('/contact')}
            className={`${styles.mobileNavLink} ${contactActive ? styles.mobileNavLinkActive : ''}`}
          >
            {t('nav.contact')}
          </Link>

          {/* W7U-T01: the auth button moved to the top of the menu. */}
          <div className={styles.mobileFooter}>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
