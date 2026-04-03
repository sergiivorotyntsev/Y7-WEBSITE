import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { colors, fonts, button as btnStyles } from '../theme';

export default function Dealers() {
  const { t } = useTranslation('dealers');
  const navigate = useNavigate();
  const benefits = t('benefits', { returnObjects: true });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta title="For Auto Dealers" description="Volume auto transport for dealerships. Fixed pricing, dedicated dispatcher, auction pickups." path="/dealers" />
      <style>{`
        .dealers-benefits-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .dealers-pricing-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .dealers-tiers-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 768px) {
          .dealers-benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .dealers-tiers-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .dealers-benefits-grid { grid-template-columns: 1fr; }
          .dealers-pricing-grid { grid-template-columns: 1fr; }
          .dealers-tiers-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        {t('title')}
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '15px',
        color: colors.textMuted,
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 48px',
        lineHeight: 1.6,
      }}>
        {t('subtitle')}
      </p>

      <div className="dealers-benefits-grid" style={{
        display: 'grid',
        gap: '20px',
        marginBottom: '48px',
        alignItems: 'stretch',
      }}>
        {Array.isArray(benefits) && benefits.map((item, i) => (
          <div key={i} style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: '17px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '8px',
            }}>
              {item.title}
            </h3>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.textMuted,
              lineHeight: 1.6,
              flex: 1,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing Models */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          {t('pricing.title')}
        </h2>
        <div className="dealers-pricing-grid" style={{
          display: 'grid',
          gap: '20px',
          marginBottom: '40px',
          alignItems: 'stretch',
        }}>
          {Array.isArray(t('pricing.models', { returnObjects: true })) &&
            t('pricing.models', { returnObjects: true }).map((model, i) => (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${i === 0 ? colors.accent : colors.border}`,
              borderRadius: '16px',
              padding: '28px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {i === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '20px',
                  background: colors.accent,
                  color: '#fff',
                  fontFamily: fonts.sans,
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Most Popular
                </div>
              )}
              <h3 style={{
                fontFamily: fonts.serif,
                fontSize: '18px',
                fontWeight: 700,
                color: colors.text,
                marginBottom: '8px',
              }}>
                {model.title}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                color: colors.textMuted,
                lineHeight: 1.6,
                flex: 1,
              }}>
                {model.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Volume Discount Tiers */}
        <h3 style={{
          fontFamily: fonts.serif,
          fontSize: '20px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          {t('pricing.volumeTitle')}
        </h3>
        <div className="dealers-tiers-grid" style={{
          display: 'grid',
          gap: '16px',
          alignItems: 'stretch',
        }}>
          {Array.isArray(t('pricing.tiers', { returnObjects: true })) &&
            t('pricing.tiers', { returnObjects: true }).map((tier, i) => (
            <div key={i} style={{
              background: i === 3 ? colors.accent : colors.bgCard,
              border: `1px solid ${i === 3 ? colors.accent : colors.border}`,
              borderRadius: '12px',
              padding: '20px 16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '22px',
                fontWeight: 700,
                color: i === 3 ? '#fff' : colors.accent,
                marginBottom: '4px',
              }}>
                {tier.volume}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '11px',
                fontWeight: 600,
                color: i === 3 ? 'rgba(255,255,255,0.7)' : colors.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '10px',
              }}>
                {tier.label}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: i === 3 ? '#fff' : colors.text,
                fontWeight: 600,
                marginBottom: '4px',
              }}>
                {tier.discount}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                color: i === 3 ? 'rgba(255,255,255,0.8)' : colors.textMuted,
                lineHeight: 1.4,
              }}>
                {tier.perk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '40px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '12px',
        }}>
          {t('ctaTitle')}
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          marginBottom: '24px',
        }}>
          {t('ctaSubtitle')}
        </p>
        <button onClick={() => navigate('/dealer-quote')} style={btnStyles.accent}>
          {t('ctaButton')}
        </button>
      </div>
    </div>
  );
}
