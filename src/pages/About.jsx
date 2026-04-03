import PageMeta from '../components/PageMeta';
import { ScalesIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, BellIcon } from '../components/icons';
import { colors, fonts } from '../theme';

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 24px 80px',
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: '24px',
    fontWeight: 700,
    color: colors.text,
    marginBottom: '16px',
  },
  section: {
    marginBottom: '60px',
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: '15px',
    color: colors.textMuted,
    lineHeight: 1.7,
  },
  card: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '28px 24px',
  },
  badge: {
    display: 'inline-block',
    fontFamily: fonts.mono,
    fontSize: '13px',
    fontWeight: 600,
    color: colors.text,
    background: colors.bgMuted,
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '6px 16px',
  },
};

const steps = [
  { num: 1, title: 'Receive Order', desc: 'Customer submits vehicle details, pickup and delivery locations.' },
  { num: 2, title: 'Vet & Assign Carrier', desc: 'We match your load with a verified, insured carrier through Central Dispatch.' },
  { num: 3, title: 'Monitor Transit', desc: 'Real-time tracking and proactive updates from pickup to delivery.' },
  { num: 4, title: 'Deliver & Document', desc: 'Signed BOL, condition reports, and delivery confirmation on file.' },
];

const whyPoints = [
  { icon: <ScalesIcon />, title: 'Licensed Broker', desc: 'FMCSA-registered auto transport broker with active MC and USDOT authority.' },
  { icon: <VerifiedIcon />, title: 'Verified Carriers', desc: 'Every carrier is vetted for insurance, safety record, and operating authority.' },
  { icon: <EyeIcon />, title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. Price locked once you confirm.' },
  { icon: <MapPinIcon />, title: 'Real-Time Tracking', desc: 'Portal and Telegram updates so you always know where your vehicle is.' },
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
    <div style={styles.page}>
      <PageMeta
        title="About Y7 Logistics"
        description="Licensed auto transport broker USDOT #4427359. Verified carriers, 24/7 dispatch, transparent pricing."
        path="/about"
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '20px',
        }}>
          Licensed &amp; Insured Auto Transport Broker
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={styles.badge}>USDOT #4427359</span>
          <span style={styles.badge}>MC #1741537</span>
        </div>
      </div>

      {/* Our Story */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Story</h2>
        <div style={styles.card}>
          <p style={{ ...styles.body, marginBottom: '12px' }}>
            Y7 Consulting Inc, operating as <strong style={{ color: colors.text }}>Y7 Logistics</strong>, is a
            US-based auto transport brokerage. With over 5 years of hands-on operations in the vehicle shipping
            industry, we connect shippers with verified carriers through Central Dispatch &mdash; the industry's
            leading load board.
          </p>
          <p style={styles.body}>
            From auction pickups to cross-country relocations, we handle every detail so our customers
            don't have to. Our dispatch team coordinates carriers, manages documentation, and keeps you
            informed at every step.
          </p>
        </div>
      </div>

      {/* How We Work */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How We Work</h2>
        <div style={{
          ...styles.card,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0',
          padding: '32px 24px',
          position: 'relative',
        }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '12px 16px',
              position: 'relative',
            }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '60%',
                  width: '80%',
                  height: '2px',
                  background: colors.border,
                  zIndex: 0,
                }} />
              )}
              {/* Number circle */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.accent,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.sans,
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '14px',
                position: 'relative',
                zIndex: 1,
                flexShrink: 0,
              }}>
                {step.num}
              </div>
              <h4 style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                fontWeight: 700,
                color: colors.text,
                marginBottom: '6px',
              }}>
                {step.title}
              </h4>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: 1.5,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Y7 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Y7</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {whyPoints.map((point) => (
            <div key={point.title} style={{
              ...styles.card,
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
            }}>
              <span style={{ lineHeight: 1, flexShrink: 0 }}>{point.icon}</span>
              <div>
                <h4 style={{
                  fontFamily: fonts.sans,
                  fontSize: '15px',
                  fontWeight: 700,
                  color: colors.text,
                  marginBottom: '4px',
                }}>
                  {point.title}
                </h4>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: '13px',
                  color: colors.textMuted,
                  lineHeight: 1.5,
                }}>
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Commitments */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Commitments</h2>
        <div style={styles.card}>
          <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
            {commitments.map((item, i) => (
              <li key={i} style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                color: colors.textMuted,
                lineHeight: 1.7,
                marginBottom: i < commitments.length - 1 ? '8px' : 0,
              }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FMCSA */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>FMCSA Registration</h2>
        <div style={{
          ...styles.card,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={styles.badge}>MC #1741537</span>
            <span style={styles.badge}>USDOT #4427359</span>
          </div>
          <p style={styles.body}>
            Y7 Consulting Inc is registered with the Federal Motor Carrier Safety Administration (FMCSA)
            as an auto transport broker.
          </p>
          <a
            href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.accent,
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Verify on FMCSA SAFER System &rarr;
          </a>
        </div>
      </div>

      {/* Contact */}
      <div style={{ marginBottom: 0 }}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <div style={{
          ...styles.card,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <p style={styles.body}>
            <strong style={{ color: colors.text }}>Email:</strong>{' '}
            <a href="mailto:info@y7agency.com" style={{ color: colors.accent, textDecoration: 'none' }}>
              info@y7agency.com
            </a>
          </p>
          <p style={styles.body}>
            <strong style={{ color: colors.text }}>Telegram:</strong>{' '}
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.accent, textDecoration: 'none' }}
            >
              @y7dispatch_bot
            </a>
          </p>
          <p style={styles.body}>
            <strong style={{ color: colors.text }}>Customer Portal:</strong>{' '}
            <a
              href="https://dispatch.y7agency.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.accent, textDecoration: 'none' }}
            >
              dispatch.y7agency.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
