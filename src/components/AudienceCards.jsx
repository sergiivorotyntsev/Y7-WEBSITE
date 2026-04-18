import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PersonalCarIcon, DealerTradeIcon, GlobeRouteIcon } from './icons';
import styles from './AudienceCards.module.css';

function Card({ tag, title, desc, cta, to, icon, index, tone }) {
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[`tone_${tone}`]}`}
      style={{ '--i': index }}
      onClick={() => navigate(to)}
      onKeyDown={handleKey}
      role="link"
      tabIndex={0}
      aria-label={`${title} — ${cta}`}
    >
      <div className={styles.iconWrap}>
        <div className={styles.iconInner}>{icon}</div>
      </div>
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <button
        onClick={e => { e.stopPropagation(); navigate(to); }}
        className={styles.cta}
      >
        {cta} <span className={styles.ctaArrow}>&rarr;</span>
      </button>
    </div>
  );
}

export default function AudienceCards() {
  const { t } = useTranslation('home');

  const cards = [
    {
      tag: t('audience.shipMyCarTag'),
      title: t('audience.shipMyCarTitle'),
      desc: t('audience.shipMyCarDesc'),
      cta: t('audience.shipMyCarCta'),
      to: '/ship-my-car',
      icon: <PersonalCarIcon size={40} color="#ffffff" />,
      tone: 'coral',
    },
    {
      tag: t('audience.dealersTag'),
      title: t('audience.dealersTitle'),
      desc: t('audience.dealersDesc'),
      cta: t('audience.dealersCta'),
      to: '/dealers',
      icon: <DealerTradeIcon size={40} color="#ffffff" />,
      tone: 'teal',
    },
    {
      tag: t('audience.exportersTag'),
      title: t('audience.exportersTitle'),
      desc: t('audience.exportersDesc'),
      cta: t('audience.exportersCta'),
      to: '/exporters',
      icon: <GlobeRouteIcon size={40} color="#ffffff" />,
      tone: 'amber',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => <Card key={c.to} index={i} {...c} />)}
    </div>
  );
}
