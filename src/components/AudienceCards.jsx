import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors, fonts, button } from '../theme';
import { DealerTradeIcon, GlobeRouteIcon, PersonalCarIcon } from './icons';

function Card({ title, desc, to, icon }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
        e.currentTarget.style.borderColor = colors.accent;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = colors.border;
      }}
      onClick={() => navigate(to)}
    >
      <div>{icon}</div>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: '20px',
        fontWeight: 700,
        color: colors.text,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        lineHeight: 1.6,
        flex: 1,
      }}>
        {desc}
      </p>
      <button
        onClick={e => { e.stopPropagation(); navigate(to); }}
        style={{ ...button.secondary, alignSelf: 'flex-start' }}
      >
        {t('cta.learnMore')}
      </button>
    </div>
  );
}

export default function AudienceCards() {
  const { t } = useTranslation('home');

  const cards = [
    { title: t('audience.dealersTitle'), desc: t('audience.dealersDesc'), to: '/dealers', icon: <DealerTradeIcon size={40} /> },
    { title: t('audience.exportersTitle'), desc: t('audience.exportersDesc'), to: '/exporters', icon: <GlobeRouteIcon size={40} /> },
    { title: t('audience.shipMyCarTitle'), desc: t('audience.shipMyCarDesc'), to: '/ship-my-car', icon: <PersonalCarIcon size={40} /> },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      {cards.map(c => <Card key={c.to} {...c} />)}
    </div>
  );
}
