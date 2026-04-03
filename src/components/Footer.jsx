import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

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
            Popular Services
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/car-shipping-cost" style={linkStyle}>Car Shipping Cost</Link>
            <Link to="/enclosed-car-shipping" style={linkStyle}>Enclosed Car Shipping</Link>
            <Link to="/auction-car-shipping" style={linkStyle}>Auction Car Shipping</Link>
            <Link to="/copart-shipping" style={linkStyle}>Copart Shipping</Link>
            <Link to="/door-to-port-auto-transport" style={linkStyle}>Door-to-Port Transport</Link>
            <Link to="/dealer-auto-transport" style={linkStyle}>Dealer Auto Transport</Link>
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
            Port Delivery
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/ports/newark" style={linkStyle}>Port Newark, NJ</Link>
            <Link to="/ports/houston" style={linkStyle}>Port of Houston, TX</Link>
            <Link to="/ports/savannah" style={linkStyle}>Port of Savannah, GA</Link>
            <Link to="/ports/los-angeles" style={linkStyle}>Port of Los Angeles, CA</Link>
            <Link to="/ports/baltimore" style={linkStyle}>Port of Baltimore, MD</Link>
            <Link to="/ports/jacksonville" style={linkStyle}>JAXPORT, FL</Link>
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
            <a href="mailto:info@y7agency.com" style={linkStyle}>info@y7agency.com</a>
            <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={linkStyle}>Telegram Bot</a>
            <span style={linkStyle}>1007 Chestnut St, Newton, MA 02464</span>
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
    </footer>
  );
}
