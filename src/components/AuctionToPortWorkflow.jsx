import { colors, fonts, v2 } from '../theme';

const steps = [
  { title: 'Win Auction', timing: 'Day 0', desc: 'You purchase at Copart, IAAI, or Manheim' },
  { title: 'Share Details', timing: 'Day 0-1', desc: 'Send us lot number, VIN, purchase confirmation' },
  { title: 'Release Coordination', timing: 'Day 1-2', desc: 'We handle auction release documents' },
  { title: 'Carrier Pickup', timing: 'Day 3-5', desc: 'Verified carrier picks up within 3-5 days of release' },
  { title: 'Transit to Port', timing: 'Varies', desc: 'Status updates at each stage, photo documentation' },
  { title: 'Port Handoff', timing: 'Arrival', desc: 'Delivery to port warehouse with gate pass' },
];

export default function AuctionToPortWorkflow() {
  return (
    <div style={{ marginBottom: '48px' }}>
      <style>{`
        .atp-pipeline {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
          position: relative;
        }
        .atp-pipeline::before {
          content: '';
          position: absolute;
          top: 19px;
          left: 24px;
          right: 24px;
          height: 2px;
          background: ${colors.border};
        }
        @media (max-width: 768px) {
          .atp-pipeline {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .atp-pipeline::before {
            top: 0;
            bottom: 0;
            left: 19px;
            right: auto;
            width: 2px;
            height: auto;
          }
          .atp-step {
            padding-left: 48px !important;
            padding-bottom: 20px !important;
            text-align: left !important;
          }
          .atp-num {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <h2 style={{
        fontFamily: v2.fonts.display,
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: v2.colors.ink,
        lineHeight: 1.05,
        marginBottom: '28px',
      }}>
        Auction-to-Port Pipeline
      </h2>

      <div className="atp-pipeline">
        {steps.map((step, i) => (
          <div key={i} className="atp-step" style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <div className="atp-num" style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: v2.colors.cardCream,
              border: `1px solid ${v2.colors.lineOnPaper}`,
              color: v2.colors.ink,
              fontFamily: fonts.mono,
              fontSize: '16px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
            }}>
              {i + 1}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: '13px',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '2px',
            }}>
              {step.title}
            </div>
            <div style={{
              fontFamily: fonts.mono,
              fontSize: '10px',
              color: v2.colors.inkMuted,
              marginBottom: '4px',
            }}>
              {step.timing}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              color: colors.textMuted,
              lineHeight: 1.4,
              padding: '0 4px',
            }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
