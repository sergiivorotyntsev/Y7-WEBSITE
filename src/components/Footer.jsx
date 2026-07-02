import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/trackEvent';
import TrustBadges from './TrustBadges';
import AnimatedLogo from './AnimatedLogo';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer role="contentinfo" className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>
            <AnimatedLogo size={22} to="/" />
          </div>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <div className={styles.addressLine}>{t('footer.address')}</div>
          <div className={styles.legalIds}>
            <div>{t('footer.usdot')}</div>
            <div>{t('footer.mc')}</div>
            <div className={styles.bondLine}>{t('footer.bond')}</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <TrustBadges layout="vertical" variant="compact" />
          </div>
        </div>

        {/* Services + Guides column */}
        <div>
          <div className={styles.colHeading}>{t('footer.popularServices')}</div>
          <div className={styles.colLinks}>
            <Link to="/car-shipping-cost" className={styles.link}>{t('footer.serviceLinks.carShippingCost')}</Link>
            <Link to="/enclosed-car-shipping" className={styles.link}>{t('footer.serviceLinks.enclosedCarShipping')}</Link>
            <Link to="/auction-car-shipping" className={styles.link}>{t('footer.serviceLinks.auctionCarShipping')}</Link>
            <Link to="/auction-transport-savings" className={styles.link}>{t('footer.serviceLinks.auctionTransportSavings')}</Link>
            <Link to="/copart-shipping" className={styles.link}>{t('footer.serviceLinks.copartShipping')}</Link>
            <Link to="/door-to-port-auto-transport" className={styles.link}>{t('footer.serviceLinks.doorToPort')}</Link>
            <Link to="/dealer-auto-transport" className={styles.link}>{t('footer.serviceLinks.dealerAutoTransport')}</Link>
            <Link to="/state-to-state-car-shipping" className={styles.link}>{t('footer.serviceLinks.stateToState')}</Link>
            <Link to="/tesla-car-shipping" className={styles.link}>{t('footer.serviceLinks.teslaShipping')}</Link>
            <Link to="/ev-auto-transport" className={styles.link}>{t('footer.serviceLinks.evTransport')}</Link>
          </div>
          <div className={styles.subHeading}>{t('footer.guides')}</div>
          <div className={styles.colLinks}>
            <Link to="/how-to-ship-a-car-bought-at-auction" className={styles.link}>{t('footer.guideLinks.auctionGuide')}</Link>
            <Link to="/open-vs-enclosed-auto-transport" className={styles.link}>{t('footer.guideLinks.openVsEnclosed')}</Link>
            <Link to="/what-is-a-bill-of-lading" className={styles.link}>{t('footer.guideLinks.billOfLading')}</Link>
          </div>
        </div>

        {/* Routes & Locations column */}
        <div>
          <div className={styles.colHeading}>{t('footer.routesAndLocations')}</div>
          <div className={styles.colLinks}>
            <Link to="/newton-auto-transport" className={styles.link}>{t('footer.locationLinks.newton')}</Link>
            <Link to="/boston-car-shipping" className={styles.link}>{t('footer.locationLinks.boston')}</Link>
            <Link to="/massachusetts-car-shipping" className={styles.link}>{t('footer.locationLinks.massachusetts')}</Link>
            <Link to="/florida-car-shipping" className={styles.link}>{t('footer.locationLinks.florida')}</Link>
            <Link to="/new-jersey-auto-transport" className={styles.link}>{t('footer.locationLinks.newJersey')}</Link>
            <Link to="/texas-auto-transport" className={styles.link}>{t('footer.locationLinks.texas')}</Link>
          </div>
          <div className={styles.subHeading}>{t('footer.popularRoutes')}</div>
          <div className={styles.colLinks}>
            <Link to="/massachusetts-to-florida-car-shipping" className={styles.link}>{t('footer.routeLinks.maToFl')}</Link>
            <Link to="/new-jersey-to-florida-car-shipping" className={styles.link}>{t('footer.routeLinks.njToFl')}</Link>
            <Link to="/texas-to-newark-port-auto-transport" className={styles.link}>{t('footer.routeLinks.txToNewark')}</Link>
            <Link to="/chicago-to-port-newark-car-shipping" className={styles.link}>{t('footer.routeLinks.chicagoToNewark')}</Link>
            <Link to="/auction-to-port-transport" className={styles.link}>{t('footer.routeLinks.auctionToPort')}</Link>
          </div>
        </div>

        {/* Ports column */}
        <div>
          <div className={styles.colHeading}>{t('footer.portDelivery')}</div>
          <div className={styles.colLinks}>
            <Link to="/ports/newark" className={styles.link}>{t('footer.portLinks.newark')}</Link>
            <Link to="/ports/houston" className={styles.link}>{t('footer.portLinks.houston')}</Link>
            <Link to="/ports/savannah" className={styles.link}>{t('footer.portLinks.savannah')}</Link>
            <Link to="/ports/los-angeles" className={styles.link}>{t('footer.portLinks.losAngeles')}</Link>
            <Link to="/ports/baltimore" className={styles.link}>{t('footer.portLinks.baltimore')}</Link>
            <Link to="/ports/jacksonville" className={styles.link}>{t('footer.portLinks.jacksonville')}</Link>
          </div>
        </div>

        {/* Company column */}
        <div>
          <div className={styles.colHeading}>{t('footer.company')}</div>
          <div className={styles.colLinks}>
            <Link to="/services" className={styles.link}>{t('nav.services')}</Link>
            <Link to="/dealers" className={styles.link}>{t('nav.dealers')}</Link>
            <Link to="/exporters" className={styles.link}>{t('nav.exporters')}</Link>
            <Link to="/ship-my-car" className={styles.link}>{t('nav.shipMyCar')}</Link>
            <Link to="/track" className={styles.link}>{t('nav.track')}</Link>
            <Link to="/faq" className={styles.link}>{t('nav.faq')}</Link>
            <Link to="/about" className={styles.link}>{t('nav.about')}</Link>
            <Link to="/blog" className={styles.link}>{t('nav.blog')}</Link>
            <Link to="/contact" className={styles.link}>{t('nav.contact')}</Link>
            <Link to="/careers" className={styles.link}>{t('footer.careers')}</Link>
          </div>

          <div className={styles.familyBlock}>
            <div className={styles.familyHeading}>{t('footer.fullCycleHeading')}</div>
            <div className={styles.familyLink}>
              <span className={styles.familyName}>{t('footer.fullCycleName')}</span>
              <span className={styles.familyDesc}>{t('footer.fullCycleDesc')}</span>
            </div>
          </div>

          <div className={styles.contactBlock}>
            <a
              href="mailto:info@y7agency.com"
              className={styles.link}
              onClick={() => trackEvent('email_cta_click', { location: 'footer' })}
            >
              info@y7agency.com
            </a>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              onClick={() => trackEvent('telegram_cta_click', { location: 'footer' })}
            >
              {t('footer.telegramBot')}
            </a>
          </div>
        </div>
      </div>

      {/* Social + Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomLinks}>
          <Link to="/privacy" className={styles.bottomLink}>{t('footer.privacy')}</Link>
          <Link to="/terms" className={styles.bottomLink}>{t('footer.terms')}</Link>
          <Link to="/accessibility" className={styles.bottomLink}>{t('footer.accessibility')}</Link>
          <Link to="/privacy#sms" className={styles.bottomLink}>{t('footer.smsTerms')}</Link>
        </div>
        <div className={styles.bottomRight}>
          {/* FX-8: dead href="#" social icons removed for a client-ready footer.
              Restore this block with real Facebook / Instagram / Google Business
              Profile URLs once the Y7 social profiles are live. */}
          <div className={styles.langSwitcherWrap}>
            <LanguageSwitcher />
          </div>
          <div className={styles.copyright}>&copy; {t('footer.copyright')}</div>
        </div>
      </div>
    </footer>
  );
}
