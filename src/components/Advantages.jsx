import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import {
  QuoteIcon, TelegramIcon, ScalesIcon, DollarIcon, ShieldCheckIcon, DocumentIcon,
  VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, ClockIcon,
  InsuranceIcon, BellIcon, HeadphonesIcon, EscalationIcon, ShieldIcon,
} from './icons';
import styles from './Advantages.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2c from '../styles/v2/cards.module.css';
import v2a from '../styles/v2/accents.module.css';

// DESIGN-V2-W2-T04: merges Benefits (6) + WhyY7 (6) into one board section.
// Approved heading decision: H2 = whyY7.title ("Why Shippers Choose Y7"),
// benefits.title ("Your Complete Transport Solution") survives as the H3
// subhead. All 12 card copies preserved verbatim (SEO contract), including
// Multilingual Support. TrustSection's 6 protection items fold in below as a
// collapsible block, copy intact. Opener varies from the eyebrow pair
// (Kicker-Headline density cap): plain H2 + JP margin accent (選択と集中,
// board-only inventory mark, aria-hidden).
export default function Advantages() {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);

  const ICON = '#fff7ed';
  const cards = [
    { icon: <ShieldCheckIcon size={20} color={ICON} />, title: t('whyY7.licensedTitle'), desc: t('whyY7.licensedDesc') },
    { icon: <VerifiedIcon size={20} color={ICON} />, title: t('whyY7.verifiedTitle'), desc: t('whyY7.verifiedDesc') },
    { icon: <EyeIcon size={20} color={ICON} />, title: t('whyY7.transparentTitle'), desc: t('whyY7.transparentDesc') },
    { icon: <MapPinIcon size={20} color={ICON} />, title: t('whyY7.statusTitle'), desc: t('whyY7.statusDesc') },
    { icon: <GlobeIcon size={20} color={ICON} />, title: t('whyY7.multilingualTitle'), desc: t('whyY7.multilingualDesc') },
    { icon: <ClockIcon size={20} color={ICON} />, title: t('whyY7.fastTitle'), desc: t('whyY7.fastDesc') },
    { icon: <QuoteIcon size={20} color={ICON} />, title: t('benefits.quoteAnywhereTitle'), desc: t('benefits.quoteAnywhereDesc') },
    { icon: <TelegramIcon size={20} color={ICON} />, title: t('benefits.realTimeTitle'), desc: t('benefits.realTimeDesc') },
    { icon: <ScalesIcon size={20} color={ICON} />, title: t('benefits.transparentTitle'), desc: t('benefits.transparentDesc') },
    { icon: <DollarIcon size={20} color={ICON} />, title: t('benefits.flexibleTitle'), desc: t('benefits.flexibleDesc') },
    { icon: <ShieldCheckIcon size={20} color={ICON} />, title: t('benefits.verifiedTitle'), desc: t('benefits.verifiedDesc') },
    { icon: <DocumentIcon size={20} color={ICON} />, title: t('benefits.documentationTitle'), desc: t('benefits.documentationDesc') },
  ];

  const protection = [
    { icon: <VerifiedIcon size={18} color={ICON} />, title: t('trustSection.carrierVettingTitle'), desc: t('trustSection.carrierVettingDesc') },
    { icon: <InsuranceIcon size={18} color={ICON} />, title: t('trustSection.insuranceTitle'), desc: t('trustSection.insuranceDesc') },
    { icon: <DocumentIcon size={18} color={ICON} />, title: t('trustSection.documentationTitle'), desc: t('trustSection.documentationDesc') },
    { icon: <BellIcon size={18} color={ICON} />, title: t('trustSection.notificationsTitle'), desc: t('trustSection.notificationsDesc') },
    { icon: <HeadphonesIcon size={18} color={ICON} />, title: t('trustSection.claimsTitle'), desc: t('trustSection.claimsDesc') },
    { icon: <EscalationIcon size={18} color={ICON} />, title: t('trustSection.escalationTitle'), desc: t('trustSection.escalationDesc') },
  ];

  return (
    <section className={v2s.board}>
      <div className={v2s.inner}>
        <ScrollReveal>
          <div className={styles.head}>
            <div>
              <h2 className={v2t.sectionDisplay}>{t('whyY7.title')}</h2>
              <h3 className={`${v2t.monoLabel} ${styles.subhead}`}>{t('benefits.title')}</h3>
            </div>
            <div className={`${v2a.jpVertical} ${styles.jp}`} aria-hidden="true">選択と集中</div>
          </div>
          <div className={styles.grid}>
            {cards.map(({ icon, title, desc }) => (
              <div key={title} className={`${v2c.board} ${styles.card}`}>
                <span className={styles.iconWrap} aria-hidden="true">{icon}</span>
                <div className={`${v2t.cardTitle} ${styles.cardTitle}`}>{title}</div>
                <p className={styles.cardDesc}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Protection block (ex-TrustSection): copy preserved verbatim. */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className={styles.protToggle}
          >
            <ShieldIcon size={20} color={ICON} />
            <span className={styles.protTitle}>{t('trustSection.title')}</span>
            <span className={`${v2t.monoLabel} ${styles.protHint}`}>
              {open ? `${t('trustSection.hide')} ▴` : `${t('trustSection.learnMore')} ▾`}
            </span>
          </button>
          <div className={styles.protPanel} data-open={open ? 'true' : 'false'}>
            <div className={styles.protGrid}>
              {protection.map(({ icon, title, desc }) => (
                <div key={title} className={styles.protItem}>
                  <span aria-hidden="true">{icon}</span>
                  <div>
                    <div className={styles.protItemTitle}>{title}</div>
                    <div className={styles.protItemDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
