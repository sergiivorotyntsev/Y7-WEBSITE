import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { ScalesIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, BellIcon, ShieldIcon } from '../components/icons';
import styles from './About.module.css';

const steps = [
  { num: 1, title: 'Receive Order', desc: 'Customer submits vehicle details, pickup and delivery locations.' },
  { num: 2, title: 'Vet & Assign Carrier', desc: 'We match your load with a verified, insured carrier through Central Dispatch.' },
  { num: 3, title: 'Monitor Transit', desc: 'Status updates and notifications from pickup to delivery.' },
  { num: 4, title: 'Deliver & Document', desc: 'Signed BOL, condition reports, and delivery confirmation on file.' },
];

const whyPoints = [
  { icon: <ScalesIcon />, title: 'Licensed Broker', desc: 'FMCSA-registered auto transport broker with active MC and USDOT authority.' },
  { icon: <VerifiedIcon />, title: 'Verified Carriers', desc: 'Every carrier is vetted for insurance, safety record, and operating authority.' },
  { icon: <EyeIcon />, title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. Price locked once you confirm.' },
  { icon: <MapPinIcon />, title: 'Shipment Status Updates', desc: 'Portal and Telegram notifications so you know your shipment status at every stage.' },
  { icon: <GlobeIcon />, title: 'Multilingual Support', desc: 'We communicate in English, Russian, Polish, and Ukrainian.' },
  { icon: <BellIcon />, title: 'Automated Updates', desc: 'Email and Telegram notifications at every stage of transport.' },
];

const commitments = [
  'Response to new inquiries under 1 hour during business hours',
  'Only verified, insured carriers assigned to your load',
  'Documentation at every step \u2014 BOL, gate passes, condition reports',
  'Track your shipment via our customer portal or Telegram bot',
];

export default function About() {
  const { t } = useTranslation('common');
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'About',url:'/about'}]} />
      <PageMeta
        title={t('meta.aboutTitle')}
        description={t('meta.aboutDescription')}
        path="/about"
      />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroMicro}>&#9670; About Y7 Logistics</span>
        <h1 className={styles.h1}>Licensed &amp; Insured Auto Transport Broker</h1>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>USDOT #4427359</span>
          <span className={styles.badge}>MC #1741537</span>
        </div>
      </section>

      <div className={styles.body}>
        {/* Our Story — narrow editorial column */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Our Story</span>
            <h2 className={styles.sectionTitle}>Why we built Y7</h2>
          </div>
          <div className={styles.card}>
            <p className={`${styles.bodyText} ${styles.bodyMargin}`}>
              Y7 Consulting Inc, operating as <strong className={styles.bodyStrong}>Y7 Logistics</strong>, is a
              US-based auto transport brokerage. Our team brings 10+ years of combined auto transport experience,
              with Y7 operating as an FMCSA-licensed broker since 2025. We connect shippers with verified carriers
              through Central Dispatch &mdash; the industry's leading load board.
            </p>
            <p className={styles.bodyText}>
              From auction pickups to cross-country relocations, we handle every detail so our customers
              don't have to. Our dispatch team coordinates carriers, manages documentation, and keeps you
              informed at every step.
            </p>
          </div>
        </div>

        {/* How We Work — numbered steps */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Process</span>
            <h2 className={styles.sectionTitle}>How We Work</h2>
          </div>
          <div className={`${styles.card} ${styles.stepsCard}`}>
            {steps.map((step, i) => (
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
            <span className={styles.sectionMicro}>Our Values</span>
            <h2 className={styles.sectionTitle}>What sets Y7 apart</h2>
          </div>
          <div className={styles.whyGrid}>
            {whyPoints.map((point) => (
              <div key={point.title} className={styles.whyCard}>
                <span className={styles.whyIcon}>{point.icon}</span>
                <div>
                  <h4 className={styles.whyTitle}>{point.title}</h4>
                  <p className={styles.whyDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Commitments */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Promises</span>
            <h2 className={styles.sectionTitle}>Our Commitments</h2>
          </div>
          <div className={styles.card}>
            <ul className={styles.commitmentsList}>
              {commitments.map((item, i) => (
                <li key={i} className={styles.commitment}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* FMCSA Badge */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Verification</span>
            <h2 className={styles.sectionTitle}>FMCSA Registration</h2>
          </div>
          <div className={styles.fmcsaCard}>
            <div className={styles.fmcsaShieldRow}>
              <div className={styles.fmcsaShield}><ShieldIcon size={32} /></div>
              <div>
                <div className={styles.fmcsaHeading}>Federal Motor Carrier Safety Administration</div>
                <div className={styles.fmcsaIds}>
                  <span className={styles.badge}>MC #1741537</span>
                  <span className={styles.badge}>USDOT #4427359</span>
                </div>
              </div>
            </div>
            <p className={styles.bodyText}>
              Y7 Consulting Inc is registered with the Federal Motor Carrier Safety Administration (FMCSA)
              as an auto transport broker.
            </p>
            <a
              href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accentLink}
            >
              Verify on FMCSA SAFER System &rarr;
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className={`${styles.section} ${styles.narrowColumn}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Talk to us</span>
            <h2 className={styles.sectionTitle}>Contact</h2>
          </div>
          <div className={styles.contactCard}>
            <p className={styles.bodyText}>
              <strong className={styles.bodyStrong}>Email:</strong>{' '}
              <a href="mailto:info@y7agency.com" className={styles.accentLink}>
                info@y7agency.com
              </a>
            </p>
            <p className={styles.bodyText}>
              <strong className={styles.bodyStrong}>Telegram:</strong>{' '}
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
              <strong className={styles.bodyStrong}>Customer Portal:</strong>{' '}
              <a
                href="https://dispatch.y7agency.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.accentLink}
              >
                dispatch.y7agency.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
