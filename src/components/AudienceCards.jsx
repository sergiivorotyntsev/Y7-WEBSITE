import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PersonalCarIcon, DealerTradeIcon, GlobeRouteIcon } from './icons';
import styles from './AudienceCards.module.css';

// SEOAI-T04: cards are real <Link> anchors (was div[role=link] + onClick),
// so Home passes crawlable equity to the three audience money pages. The CTA
// is a styled <span> — nested interactive elements are invalid inside <a>.
function Card({ tag, title, desc, stat, cta, to, icon, index, tone }) {
  return (
    <Link
      to={to}
      className={`${styles.card} ${styles[`tone_${tone}`]}`}
      style={{ '--i': index }}
      aria-label={`${title} — ${cta}`}
    >
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <div className={styles.iconInner}>{icon}</div>
        </div>
        <span className={styles.tag}>{tag}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>

      <div className={styles.statRow}>
        <span className={styles.statDot} aria-hidden="true" />
        <span className={styles.stat}>{stat}</span>
      </div>

      <span className={styles.cta}>
        {cta} <span className={styles.ctaArrow}>&rarr;</span>
      </span>
    </Link>
  );
}

export default function AudienceCards() {
  const { t } = useTranslation('home');

  const cards = [
    {
      tag: t('audience.shipMyCarTag'),
      title: t('audience.shipMyCarTitle'),
      desc: t('audience.shipMyCarDesc'),
      stat: t('audience.shipMyCarStat'),
      cta: t('audience.shipMyCarCta'),
      to: '/ship-my-car',
      icon: <PersonalCarIcon size={36} color="#ffffff" />,
      tone: 'coral',
    },
    {
      tag: t('audience.dealersTag'),
      title: t('audience.dealersTitle'),
      desc: t('audience.dealersDesc'),
      stat: t('audience.dealersStat'),
      cta: t('audience.dealersCta'),
      to: '/dealers',
      icon: <DealerTradeIcon size={36} color="#ffffff" />,
      tone: 'teal',
    },
    {
      tag: t('audience.exportersTag'),
      title: t('audience.exportersTitle'),
      desc: t('audience.exportersDesc'),
      stat: t('audience.exportersStat'),
      cta: t('audience.exportersCta'),
      to: '/exporters',
      icon: <GlobeRouteIcon size={36} color="#ffffff" />,
      tone: 'amber',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => <Card key={c.to} index={i} {...c} />)}
    </div>
  );
}
