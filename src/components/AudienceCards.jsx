import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PersonalCarIcon, DealerTradeIcon, GlobeRouteIcon } from './icons';
import styles from './AudienceCards.module.css';
import btn from '../styles/buttons.module.css';

function Card({ title, desc, cta, to, icon, index }) {
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <div
      className={styles.card}
      style={{ '--i': index }}
      onClick={() => navigate(to)}
      onKeyDown={handleKey}
      role="link"
      tabIndex={0}
      aria-label={`${title} — ${cta}`}
    >
      <div className={styles.iconWrap}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <button
        onClick={e => { e.stopPropagation(); navigate(to); }}
        className={`${btn.btnSecondary} ${styles.cta}`}
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
    <div className={styles.grid}>
      {cards.map((c, i) => <Card key={c.to} index={i} {...c} />)}
    </div>
  );
}
