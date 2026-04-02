import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

function Pill({ label }) {
  return (
    <span
      style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        fontWeight: 500,
        color: colors.text,
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '8px 18px',
        transition: 'background 200ms ease, border-color 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = colors.bgMuted;
        e.currentTarget.style.borderColor = colors.textMuted;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = colors.bgCard;
        e.currentTarget.style.borderColor = colors.border;
      }}
    >
      {label}
    </span>
  );
}

export default function PortPills() {
  const { t } = useTranslation('home');
  const ports = t('ports.list', { returnObjects: true });

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: '20px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '20px',
      }}>
        {t('ports.title')}
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
      }}>
        {Array.isArray(ports) && ports.map(port => (
          <Pill key={port} label={port} />
        ))}
      </div>
    </div>
  );
}
