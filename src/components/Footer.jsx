import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';
import { trackEvent } from '../utils/analytics';
import TrustBadges from './TrustBadges';

export default function Footer() {
  const { t } = useTranslation();

  const linkStyle = {
    fontFamily: fonts.sans,
    fontSize: '13px',
    color: colors.textMuted,
    transition: 'color 0.2s',
  };

  return (
    <footer role="contentinfo" style={{
      background: colors.bgMuted,
      borderTop: `1px solid ${colors.border}`,
      padding: '48px 24px 32px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
      }}>
        {/* Brand column */}
        <div>
          <div style={{
            fontFamily: fonts.serif,
            fontSize: '22px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '12px',
          }}>
            Y7<span style={{ color: colors.accent }}>.</span>
          </div>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: '16px',
          }}>
            {t('footer.tagline')}
          </p>
          <div style={{
            fontFamily: fonts.mono,
            fontSize: '12px',
            color: colors.textMuted,
            lineHeight: 1.8,
          }}>
            <div>{t('footer.usdot')}</div>
            <div>{t('footer.mc')}</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <TrustBadges layout="vertical" variant="compact" />
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.navigation')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/services" style={linkStyle}>{t('nav.services')}</Link>
            <Link to="/dealers" style={linkStyle}>{t('nav.dealers')}</Link>
            <Link to="/exporters" style={linkStyle}>{t('nav.exporters')}</Link>
            <Link to="/ship-my-car" style={linkStyle}>{t('nav.shipMyCar')}</Link>
            <Link to="/track" style={linkStyle}>{t('nav.track')}</Link>
            <Link to="/faq" style={linkStyle}>{t('nav.faq')}</Link>
            <Link to="/about" style={linkStyle}>{t('nav.about')}</Link>
            <Link to="/contact" style={linkStyle}>{t('nav.contact')}</Link>
          </div>
        </div>

        {/* Popular Services */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.popularServices')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/car-shipping-cost" style={linkStyle}>{t('footer.serviceLinks.carShippingCost')}</Link>
            <Link to="/enclosed-car-shipping" style={linkStyle}>{t('footer.serviceLinks.enclosedCarShipping')}</Link>
            <Link to="/auction-car-shipping" style={linkStyle}>{t('footer.serviceLinks.auctionCarShipping')}</Link>
            <Link to="/copart-shipping" style={linkStyle}>{t('footer.serviceLinks.copartShipping')}</Link>
            <Link to="/door-to-port-auto-transport" style={linkStyle}>{t('footer.serviceLinks.doorToPort')}</Link>
            <Link to="/dealer-auto-transport" style={linkStyle}>{t('footer.serviceLinks.dealerAutoTransport')}</Link>
            <Link to="/state-to-state-car-shipping" style={linkStyle}>{t('footer.serviceLinks.stateToState')}</Link>
            <Link to="/tesla-car-shipping" style={linkStyle}>{t('footer.serviceLinks.teslaShipping')}</Link>
            <Link to="/ev-auto-transport" style={linkStyle}>{t('footer.serviceLinks.evTransport')}</Link>
          </div>
        </div>

        {/* Guides column */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.guides')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/how-to-ship-a-car-bought-at-auction" style={linkStyle}>{t('footer.guideLinks.auctionGuide')}</Link>
            <Link to="/open-vs-enclosed-auto-transport" style={linkStyle}>{t('footer.guideLinks.openVsEnclosed')}</Link>
            <Link to="/what-is-a-bill-of-lading" style={linkStyle}>{t('footer.guideLinks.billOfLading')}</Link>
          </div>
        </div>

        {/* Ports column */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.portDelivery')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/ports/newark" style={linkStyle}>{t('footer.portLinks.newark')}</Link>
            <Link to="/ports/houston" style={linkStyle}>{t('footer.portLinks.houston')}</Link>
            <Link to="/ports/savannah" style={linkStyle}>{t('footer.portLinks.savannah')}</Link>
            <Link to="/ports/los-angeles" style={linkStyle}>{t('footer.portLinks.losAngeles')}</Link>
            <Link to="/ports/baltimore" style={linkStyle}>{t('footer.portLinks.baltimore')}</Link>
            <Link to="/ports/jacksonville" style={linkStyle}>{t('footer.portLinks.jacksonville')}</Link>
          </div>
        </div>

        {/* Popular Routes */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.popularRoutes')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/massachusetts-to-florida-car-shipping" style={linkStyle}>{t('footer.routeLinks.maToFl')}</Link>
            <Link to="/new-jersey-to-florida-car-shipping" style={linkStyle}>{t('footer.routeLinks.njToFl')}</Link>
            <Link to="/texas-to-newark-port-auto-transport" style={linkStyle}>{t('footer.routeLinks.txToNewark')}</Link>
            <Link to="/chicago-to-port-newark-car-shipping" style={linkStyle}>{t('footer.routeLinks.chicagoToNewark')}</Link>
            <Link to="/auction-to-port-transport" style={linkStyle}>{t('footer.routeLinks.auctionToPort')}</Link>
          </div>
        </div>

        {/* Legal column */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.legal')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/privacy" style={linkStyle}>{t('footer.privacy')}</Link>
            <Link to="/terms" style={linkStyle}>{t('footer.terms')}</Link>
            <Link to="/accessibility" style={linkStyle}>{t('footer.accessibility')}</Link>
            <Link to="/privacy#sms" style={linkStyle}>{t('footer.smsTerms')}</Link>
          </div>
        </div>

        {/* Contact column */}
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            {t('footer.contact')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="mailto:info@y7agency.com" style={linkStyle} onClick={() => trackEvent('email_cta_click', { location: 'footer' })}>info@y7agency.com</a>
            <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={linkStyle} onClick={() => trackEvent('telegram_cta_click', { location: 'footer' })}>{t('footer.telegramBot')}</a>
            <span style={linkStyle}>{t('footer.location')}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        paddingTop: '20px',
        borderTop: `1px solid ${colors.border}`,
        textAlign: 'center',
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textHint,
      }}>
        &copy; {t('footer.copyright')}
      </div>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 24px',
        textAlign: 'center',
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.textMuted,
      }}>
        <strong>{t('footer.internationalShipping')}</strong>{' '}
        <a
          href="https://daytonacargo.com"
          target="_blank"
          rel="noopener"
          style={{ color: colors.accent }}
        >
          DaytonaCargo
        </a>
        {' '}&mdash; {t('footer.daytonaCargoDesc')}
      </div>
    </footer>
  );
}
