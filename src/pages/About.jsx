import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { ScalesIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, BellIcon, ShieldIcon, PortalIcon, TruckIcon } from '../components/icons';
import styles from './About.module.css';

const ICONS = [ScalesIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, BellIcon];

export default function About() {
  const { t } = useTranslation('about');
  const { t: tCommon } = useTranslation('common');
  const steps = t('steps', { returnObjects: true }) || [];
  const whyPoints = t('whyPoints', { returnObjects: true }) || [];
  const commitments = t('commitments', { returnObjects: true }) || [];
  const commsSupportItems = t('comms.support.items', { returnObjects: true }) || [];
  const commsDeliveryItems = t('comms.delivery.items', { returnObjects: true }) || [];
  const commsBenefits = t('comms.benefits.items', { returnObjects: true }) || [];

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'About',url:'/about'}]} />
      <PageMeta
        title={tCommon('meta.aboutTitle')}
        description={tCommon('meta.aboutDescription')}
        path="/about"
      />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroMicro}>&#9670; {t('heroKicker')}</span>
        <h1 className={styles.h1}>{t('heroH1')}</h1>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>USDOT #4427359</span>
          <span className={styles.badge}>MC #1741537</span>
        </div>
      </section>

      <div className={styles.body}>
        {/* Our Story — narrow editorial column */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('storyKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('storyTitle')}</h2>
          </div>
          <div className={styles.card}>
            <p className={`${styles.bodyText} ${styles.bodyMargin}`}>
              <Trans i18nKey="storyPara1" t={t} components={{ strong: <strong className={styles.bodyStrong} /> }} />
            </p>
            <p className={styles.bodyText}>
              {t('storyPara2')}
            </p>
          </div>
        </div>

        {/* How We Work — numbered steps */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('processKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('processTitle')}</h2>
          </div>
          <div className={`${styles.card} ${styles.stepsCard}`}>
            {Array.isArray(steps) && steps.map((step, i) => (
              <div key={step.num} className={styles.step}>
                {i < steps.length - 1 && <div className={styles.connector} />}
                <div className={styles.stepNum}>{step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Y7 — values grid */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('valuesKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('valuesTitle')}</h2>
          </div>
          <div className={styles.whyGrid}>
            {Array.isArray(whyPoints) && whyPoints.map((point, i) => {
              const Icon = ICONS[i] || ShieldIcon;
              return (
                <div key={point.title} className={styles.whyCard}>
                  <span className={styles.whyIcon}><Icon /></span>
                  <div>
                    <h4 className={styles.whyTitle}>{point.title}</h4>
                    <p className={styles.whyDesc}>{point.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How Y7 Communicates */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('comms.kicker')}</span>
            <h2 className={styles.sectionTitle}>{t('comms.title')}</h2>
          </div>
          <p className={styles.commsLead}>{t('comms.lead')}</p>
          <div className={styles.commsGrid}>
            <div className={styles.commsCard}>
              <div className={styles.commsIcon}><PortalIcon size={24} /></div>
              <h3 className={styles.commsCardTitle}>{t('comms.support.title')}</h3>
              <p className={styles.commsCardDesc}>{t('comms.support.desc')}</p>
              <ul className={styles.commsList}>
                {Array.isArray(commsSupportItems) && commsSupportItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.commsCard}>
              <div className={styles.commsIcon}><TruckIcon size={24} /></div>
              <h3 className={styles.commsCardTitle}>{t('comms.delivery.title')}</h3>
              <p className={styles.commsCardDesc}>{t('comms.delivery.desc')}</p>
              <ul className={styles.commsList}>
                {Array.isArray(commsDeliveryItems) && commsDeliveryItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.commsBenefits}>
            <h3 className={styles.commsBenefitsTitle}>{t('comms.benefits.title')}</h3>
            <div className={styles.commsBenefitsRow}>
              {Array.isArray(commsBenefits) && commsBenefits.map((b, i) => (
                <span key={i} className={styles.commsBenefit}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Our Commitments */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('commitmentsKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('commitmentsTitle')}</h2>
          </div>
          <div className={styles.card}>
            <ul className={styles.commitmentsList}>
              {Array.isArray(commitments) && commitments.map((item, i) => (
                <li key={i} className={styles.commitment}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* FMCSA Badge */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('fmcsaKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('fmcsaTitle')}</h2>
          </div>
          <div className={styles.fmcsaCard}>
            <div className={styles.fmcsaShieldRow}>
              <div className={styles.fmcsaShield}><ShieldIcon size={32} /></div>
              <div>
                <div className={styles.fmcsaHeading}>{t('fmcsaHeading')}</div>
                <div className={styles.fmcsaIds}>
                  <span className={styles.badge}>MC #1741537</span>
                  <span className={styles.badge}>USDOT #4427359</span>
                </div>
              </div>
            </div>
            <p className={styles.bodyText}>
              {t('fmcsaText')}
            </p>
            <a
              href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentLink}
            >
              {t('fmcsaVerify')} &rarr;
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('contactKicker')}</span>
            <h2 className={styles.sectionTitle}>{t('contactTitle')}</h2>
          </div>
          <div className={styles.contactCard}>
            <p className={styles.bodyText}>
              <strong className={styles.bodyStrong}>{t('contactEmailLabel')}</strong>{' '}
              <a href="mailto:info@y7agency.com" className={styles.accentLink}>
                info@y7agency.com
              </a>
            </p>
            <p className={styles.bodyText}>
              <strong className={styles.bodyStrong}>{t('contactTelegramLabel')}</strong>{' '}
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentLink}
              >
                @y7dispatch_bot
              </a>
            </p>
            <p className={styles.bodyText}>
              <strong className={styles.bodyStrong}>{t('contactPortalLabel')}</strong>{' '}
              <Link to="/portal/login" className={styles.accentLink}>
                {t('contactPortalLinkLabel')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
