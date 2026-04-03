import { useState, useEffect, useCallback } from 'react';
import { colors, fonts } from '../theme';

const TESTIMONIALS = [
  {
    text: 'Y7 moved 12 vehicles for us last month — all on time, no damage. Their dispatch team is always reachable and they know the auction pickup process inside out.',
    name: 'Mike R.',
    company: 'East Coast Auto Group',
    stars: 5,
  },
  {
    text: 'I was nervous shipping my BMW cross-country, but Y7 made it easy. Got updates via text the whole way and the car arrived in perfect condition.',
    name: 'Sarah L.',
    company: 'Private customer',
    stars: 5,
  },
  {
    text: 'We export 20+ cars a month through Newark. Y7 handles all our domestic transport — reliable, fair pricing, and they understand the port delivery process.',
    name: 'Andrzej K.',
    company: 'Euro Motors Export',
    stars: 5,
  },
  {
    text: 'Best transport broker we\'ve worked with. Fast quotes, honest pricing, and they actually follow up. Switched from our old broker 6 months ago — no regrets.',
    name: 'David T.',
    company: 'Premier Auto Sales',
    stars: 5,
  },
  {
    text: 'The online quote form with VIN decode is really convenient. Got a quote in 30 minutes and the car was picked up 2 days later. Will use again.',
    name: 'Jennifer M.',
    company: 'Private customer',
    stars: 4,
  },
];

function Stars({ count }) {
  return (
    <span style={{ color: '#F59E0B', fontSize: '14px', letterSpacing: '2px' }}>
      {'\u2605'.repeat(count)}{'\u2606'.repeat(5 - count)}
    </span>
  );
}

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = TESTIMONIALS[active];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: '20px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '24px',
      }}>
        What Our Customers Say
      </h3>

      <div
        key={active}
        style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '32px 28px',
          animation: 'fadeIn 400ms ease',
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        <Stars count={t.stars} />
        <p style={{
          fontFamily: fonts.serif,
          fontSize: '16px',
          fontStyle: 'italic',
          color: colors.text,
          lineHeight: 1.6,
          margin: '16px 0',
        }}>
          &ldquo;{t.text}&rdquo;
        </p>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.text,
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '12px',
          color: colors.textMuted,
        }}>
          {t.company}
        </div>
      </div>

      {/* Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '16px',
      }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i === active ? colors.accent : colors.border,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 200ms ease',
            }}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
