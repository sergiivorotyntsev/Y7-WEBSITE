import { colors, fonts } from '../theme';
import ScrollReveal from './ScrollReveal';
import { ShieldCheckIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, ClockIcon } from './icons';

const ITEMS = [
  { icon: <ShieldCheckIcon />, title: 'Licensed & Insured', desc: 'USDOT #4427359, MC #1741537. Fully licensed property broker.' },
  { icon: <VerifiedIcon />, title: 'Central Dispatch Verified', desc: '90% of our orders go through CD. Verified broker with top ratings.' },
  { icon: <EyeIcon />, title: 'Transparent Pricing', desc: 'No hidden fees. Carrier rate + service fee. What you see is what you pay.' },
  { icon: <MapPinIcon />, title: 'Shipment Status Updates', desc: 'Monitor your shipment via portal, email, SMS, or Telegram. Carrier phone number provided after dispatch.' },
  { icon: <GlobeIcon />, title: 'Multilingual Support', desc: 'EN, RU, PL, UK — we speak your language. Global exporter network.' },
  { icon: <ClockIcon />, title: 'Fast Dispatch Response', desc: 'Quotes typically within 1 hour during business hours. Dedicated dispatch coordinator.' },
];

export default function WhyY7() {
  return (
    <div>
      <h2 style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        Why Shippers Choose Y7
      </h2>
      <div className="why-y7-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <style>{`
          @media (max-width: 860px) { .why-y7-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .why-y7-grid { grid-template-columns: 1fr !important; } }
        `}</style>
        {ITEMS.map(({ icon, title, desc }, i) => (
          <ScrollReveal key={title} delay={i * 80} style={{ display: 'flex' }}>
            <div style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '24px 20px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              flex: 1,
              transition: 'transform 200ms ease, box-shadow 200ms ease',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</span>
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: '4px',
                }}>
                  {title}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '13px',
                  color: colors.textMuted,
                  lineHeight: 1.5,
                }}>
                  {desc}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
