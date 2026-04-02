import { colors, fonts } from '../theme';
import ScrollReveal from './ScrollReveal';

const ITEMS = [
  { icon: '\uD83D\uDEE1\uFE0F', title: 'Licensed & Insured', desc: 'USDOT #4427359, MC #1741537. Fully licensed property broker.' },
  { icon: '\u2705', title: 'Central Dispatch Verified', desc: '90% of our orders go through CD. Verified broker with top ratings.' },
  { icon: '\uD83D\uDCB0', title: 'Transparent Pricing', desc: 'No hidden fees. Carrier rate + service fee. What you see is what you pay.' },
  { icon: '\uD83D\uDCCD', title: 'Real-Time Tracking', desc: 'Track your shipment anytime via portal, email, SMS, or Telegram.' },
  { icon: '\uD83C\uDF10', title: 'Multilingual Support', desc: 'EN, RU, PL, UK — we speak your language. Global exporter network.' },
  { icon: '\u23F0', title: '24/7 Dispatch', desc: 'Round-the-clock dispatch support. Quotes within 1 hour, any time.' },
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {ITEMS.map(({ icon, title, desc }, i) => (
          <ScrollReveal key={title} delay={i * 80}>
            <div style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '24px 20px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
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
              <span style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
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
