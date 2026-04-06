import { colors, fonts } from '../theme';

const steps = [
  {
    title: 'You submit your quote',
    timing: 'Immediate',
    desc: 'We receive your details instantly. No phone tag, no forms in triplicate.',
  },
  {
    title: 'Quote within 1 hour',
    timing: 'Under 1 hour',
    desc: 'A real dispatcher reviews your route and sends a firm quote via email and Telegram — not a generic range.',
  },
  {
    title: 'You confirm the price',
    timing: 'When ready',
    desc: 'One click to lock in your price. No deposit required until we assign a verified carrier.',
  },
  {
    title: 'Carrier assigned & vetted',
    timing: '24-72 hours typically',
    desc: 'We find a carrier through Central Dispatch, verify their FMCSA authority and active insurance, then send you the driver\u2019s name and truck details.',
  },
  {
    title: 'Pickup & delivery with tracking',
    timing: 'Varies by route',
    desc: 'Real-time updates at every stage. BOL at pickup and delivery. Photo documentation. Portal tracking 24/7.',
  },
];

export default function WhatHappensNext() {
  return (
    <section style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>
      <style>{`
        .whn-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .whn-steps::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: ${colors.border};
        }
        @media (min-width: 700px) {
          .whn-steps {
            flex-direction: row;
            gap: 0;
          }
          .whn-steps::before {
            left: 0;
            top: 19px;
            bottom: auto;
            width: 100%;
            height: 2px;
          }
          .whn-step {
            flex: 1;
            text-align: center;
          }
          .whn-step-num {
            margin: 0 auto 12px;
          }
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '32px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          What Happens After You Submit
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
        }}>
          No surprises. No hidden steps. Here's exactly what to expect.
        </p>
      </div>

      <div className="whn-steps">
        {steps.map((step, i) => (
          <div key={i} className="whn-step" style={{
            position: 'relative',
            padding: '0 0 28px 52px',
            zIndex: 1,
          }}>
            <div className="whn-step-num" style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: colors.accent,
              color: '#fff',
              fontFamily: fonts.serif,
              fontSize: '18px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 0,
              top: 0,
            }}>
              {i + 1}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: '15px',
              fontWeight: 600,
              color: colors.text,
              marginBottom: '2px',
            }}>
              {step.title}
            </div>
            <div style={{
              fontFamily: fonts.mono,
              fontSize: '11px',
              color: colors.accent,
              marginBottom: '6px',
            }}>
              {step.timing}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: '13px',
              color: colors.textMuted,
              lineHeight: 1.6,
            }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.textMuted,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '8px',
      }}>
        Need it faster? Tell us in the notes field — we prioritize urgent shipments.
      </p>
    </section>
  );
}
