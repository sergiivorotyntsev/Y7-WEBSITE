import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { ScalesIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, BellIcon } from '../components/icons';
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
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'About',url:'/about'}]} />
      <PageMeta
        title="About"
        description="Licensed auto transport broker USDOT #4427359. Verified carriers, fast dispatch response, transparent pricing."
        path="/about"
      />

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.h1}>Licensed &amp; Insured Auto Transport Broker</h1>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>USDOT #4427359</span>
          <span className={styles.badge}>MC #1741537</span>
        </div>
      </div>

      {/* Our Story */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Story</h2>
        <div className={styles.card}>
          <p className={`${styles.body} ${styles.bodyMargin}`}>
            Y7 Consulting Inc, operating as <strong className={styles.bodyStrong}>Y7 Logistics</strong>, is a
            US-based auto transport brokerage. Our team brings 10+ years of combined auto transport experience,
            with Y7 operating as an FMCSA-licensed broker since 2025. We connect shippers with verified carriers
            through Central Dispatch &mdash; the industry's leading load board.
          </p>
          <p className={styles.body}>
            From auction pickups to cross-country relocations, we handle every detail so our customers
            don't have to. Our dispatch team coordinates carriers, manages documentation, and keeps you
            informed at every step.
          </p>
        </div>
      </div>

      {/* How We Work */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How We Work</h2>
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

      {/* Why Y7 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Y7</h2>
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
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Commitments</h2>
        <div className={styles.card}>
          <ul className={styles.commitmentsList}>
            {commitments.map((item, i) => (
              <li key={i} className={styles.commitment}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FMCSA */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FMCSA Registration</h2>
        <div className={styles.fmcsaCard}>
          <div className={styles.badgeRow} style={{ justifyContent: 'flex-start' }}>
            <span className={styles.badge}>MC #1741537</span>
            <span className={styles.badge}>USDOT #4427359</span>
          </div>
          <p className={styles.body}>
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
      <div>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.contactCard}>
          <p className={styles.body}>
            <strong className={styles.bodyStrong}>Email:</strong>{' '}
            <a href="mailto:info@y7agency.com" className={styles.accentLink}>
              info@y7agency.com
            </a>
          </p>
          <p className={styles.body}>
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
          <p className={styles.body}>
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
  );
}
