import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './AudienceCards.module.css';
import v2t from '../styles/v2/type.module.css';
import v2c from '../styles/v2/cards.module.css';

// SEOAI-T04: cards are real <Link> anchors — Home passes crawlable equity to the
// three audience money pages. The CTA is a styled <span> — nested interactive
// elements are invalid inside <a>.
// DESIGN-V2-W2-T03: restyled on v2 primitives with the B2B-first order (dealers,
// exporters lead on dark cards; private stays fully served on the cream card).
// Copy keys unchanged; chips are new decorative micro. No resting red on the
// cards: the CTA row rests in surface text color and shifts red on hover
// (Body-Link Law logic), keeping the band inside the Signal Budget.
function Card({ tag, title, desc, stat, cta, to, chips, variant }) {
  const dark = variant === 'dark';
  return (
    <Link
      to={to}
      className={`${dark ? v2c.boardSolid : v2c.paper} ${styles.card} ${dark ? styles.cardDark : styles.cardCream}`}
      aria-label={`${title} — ${cta}`}
    >
      <span className={`${v2t.monoMicro} ${styles.tag}`}>{tag}</span>
      <h3 className={`${v2t.cardTitle} ${styles.title}`}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.chips}>
        {chips.map((c) => (
          <span key={c} className={dark ? v2c.chipOnDark : v2c.chipOnPaper}>{c}</span>
        ))}
      </div>
      <span className={`${v2t.monoData} ${styles.stat}`}>{stat}</span>
      <span className={styles.ctaRow}>
        {cta} <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

export default function AudienceCards() {
  const { t } = useTranslation('home');

  const cards = [
    {
      tag: t('audience.dealersTag'),
      title: t('audience.dealersTitle'),
      desc: t('audience.dealersDesc'),
      stat: t('audience.dealersStat'),
      cta: t('audience.dealersCta'),
      chips: [t('audience.dealersChip1'), t('audience.dealersChip2')],
      to: '/dealers',
      variant: 'dark',
    },
    {
      tag: t('audience.exportersTag'),
      title: t('audience.exportersTitle'),
      desc: t('audience.exportersDesc'),
      stat: t('audience.exportersStat'),
      cta: t('audience.exportersCta'),
      chips: [t('audience.exportersChip1'), t('audience.exportersChip2')],
      to: '/exporters',
      variant: 'dark',
    },
    {
      tag: t('audience.shipMyCarTag'),
      title: t('audience.shipMyCarTitle'),
      desc: t('audience.shipMyCarDesc'),
      stat: t('audience.shipMyCarStat'),
      cta: t('audience.shipMyCarCta'),
      chips: [t('audience.shipMyCarChip1'), t('audience.shipMyCarChip2')],
      to: '/ship-my-car',
      variant: 'cream',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c) => <Card key={c.to} {...c} />)}
    </div>
  );
}
