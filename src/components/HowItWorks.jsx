import { useState, useEffect, useCallback } from 'react';
import { colors, fonts } from '../theme';

const STEPS = [
  {
    icon: '\uD83D\uDCDD',
    title: 'Submit Your Quote',
    desc: 'Enter your VIN and route details. We\'ll decode your vehicle instantly and show estimated pricing.',
    stat: '< 1 hour response',
  },
  {
    icon: '\uD83D\uDCB0',
    title: 'Get Your Pricing',
    desc: 'Receive a competitive price range within 1 hour. Confirm when you\'re ready — no pressure.',
    stat: '$0.30-$0.45 per mile',
  },
  {
    icon: '\uD83D\uDCDD',
    title: 'Sign Agreement',
    desc: 'Quick digital signature on our transport agreement. Review terms, check boxes, type your name. Done.',
    stat: '2 min to complete',
  },
  {
    icon: '\uD83D\uDE9A',
    title: 'Carrier Assigned',
    desc: 'We match your load with a vetted, insured carrier from our network. You get carrier name and phone.',
    stat: '100+ vetted carriers',
  },
  {
    icon: '\u2705',
    title: 'Vehicle Delivered',
    desc: 'Track your shipment in real time. Inspect on arrival, sign BOL, and you\'re done.',
    stat: '3-10 business days',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % STEPS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const step = STEPS[active];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '24px',
      }}>
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); }}
            style={{
              width: i === active ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i === active ? colors.accent : colors.border,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease',
              padding: 0,
            }}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      {/* Step content */}
      <div
        key={active}
        style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '36px 32px',
          textAlign: 'center',
          animation: 'slideIn 300ms ease',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        <div style={{ fontSize: '40px', marginBottom: '16px' }}>{step.icon}</div>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '11px',
          fontWeight: 600,
          color: colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '8px',
        }}>
          Step {active + 1} of {STEPS.length}
        </div>
        <h3 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '12px',
        }}>
          {step.title}
        </h3>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.6,
          maxWidth: '440px',
          marginBottom: '16px',
        }}>
          {step.desc}
        </p>
        <div style={{
          fontFamily: fonts.mono,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.accent,
          background: '#FFF8F5',
          padding: '6px 14px',
          borderRadius: '20px',
        }}>
          {step.stat}
        </div>
      </div>

      {/* Next button */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button
          onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 10000); }}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.accent,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
