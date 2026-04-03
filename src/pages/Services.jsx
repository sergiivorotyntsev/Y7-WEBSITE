import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { colors, fonts, button as btnStyles } from '../theme';

export default function Services() {
  const { t } = useTranslation('services');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta title="Auto Transport Services" description="Auction pickup, dealer trades, port delivery, enclosed transport. Licensed broker with 100+ verified carriers." path="/services" />
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
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
        marginBottom: '48px',
      }}>
        {t('subtitle')}
      </p>

      <div className="services-grid" style={{ alignItems: 'stretch' }}>
        {Array.isArray(list) && list.map((item, i) => (
          <div key={i} style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: '18px',
              fontWeight: 700,
              color: colors.text,
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

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button onClick={() => navigate('/quote')} style={btnStyles.accent}>
          Get a Free Quote
        </button>
      </div>
    </div>
  );
}
