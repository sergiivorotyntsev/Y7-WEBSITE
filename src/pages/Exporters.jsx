import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors, fonts, button as btnStyles } from '../theme';

export default function Exporters() {
  const { t } = useTranslation('exporters');
  const navigate = useNavigate();
  const ports = t('ports', { returnObjects: true });
  const steps = t('steps', { returnObjects: true });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
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
        maxWidth: '620px',
        margin: '0 auto 48px',
        lineHeight: 1.6,
      }}>
        {t('subtitle')}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '48px',
      }}>
        {Array.isArray(ports) && ports.map((port, i) => (
          <div key={i} style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '24px 20px',
          }}>
            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: '17px',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '8px',
            }}>
              {port.name}
            </h3>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.textMuted,
              lineHeight: 1.6,
            }}>
              {port.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '40px 32px',
        marginBottom: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          {t('howTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '28px',
                fontWeight: 700,
                color: colors.accent,
                marginBottom: '8px',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '6px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: 1.5,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('/quote')} style={btnStyles.accent}>
          {t('ctaButton')}
        </button>
      </div>
    </div>
  );
}
