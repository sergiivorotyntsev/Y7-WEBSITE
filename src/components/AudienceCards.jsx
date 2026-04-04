import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors, fonts, button } from '../theme';
import { PersonalCarIcon, DealerTradeIcon, GlobeRouteIcon } from './icons';

function Card({ title, desc, cta, to, icon }) {
  const navigate = useNavigate();

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
        {cta} &rarr;
      </button>
    </div>
  );
}

export default function AudienceCards() {
  const { t } = useTranslation('home');

  const cards = [
    {
      title: t('audience.shipMyCarTitle'),
      desc: t('audience.shipMyCarDesc'),
      cta: t('audience.shipMyCarCta'),
      to: '/ship-my-car',
      icon: <PersonalCarIcon size={40} />,
    },
    {
      title: t('audience.dealersTitle'),
      desc: t('audience.dealersDesc'),
      cta: t('audience.dealersCta'),
      to: '/dealer-auto-transport',
      icon: <DealerTradeIcon size={40} />,
    },
    {
      title: t('audience.exportersTitle'),
      desc: t('audience.exportersDesc'),
      cta: t('audience.exportersCta'),
      to: '/door-to-port-auto-transport',
      icon: <GlobeRouteIcon size={40} />,
    },
  ];

  return (
    <>
      <style>{`
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .audience-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .audience-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="audience-grid">
        {cards.map(c => <Card key={c.to} {...c} />)}
      </div>
    </>
  );
}
