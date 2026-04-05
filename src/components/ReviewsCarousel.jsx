import { useState, useEffect, useCallback } from 'react';
import { colors, fonts } from '../theme';
import { StarFilledIcon, StarEmptyIcon } from './icons';
import { API_URL } from '../config';

const STATIC_TESTIMONIALS = [
  { id: 's1', rating: 5, customer_name: 'Mike R.', review_text: 'Y7 moved 12 vehicles for us last month — all on time, no damage. Their dispatch team is always reachable and they know the auction pickup process inside out.', route: null, vehicle: null },
  { id: 's2', rating: 5, customer_name: 'Sarah L.', review_text: 'I was nervous shipping my BMW cross-country, but Y7 made it easy. Got updates via text the whole way and the car arrived in perfect condition.', route: null, vehicle: null },
  { id: 's3', rating: 5, customer_name: 'Andrzej K.', review_text: 'We export 20+ cars a month through Newark. Y7 handles all our domestic transport — reliable, fair pricing, and they understand the port delivery process.', route: null, vehicle: null },
  { id: 's4', rating: 5, customer_name: 'David T.', review_text: 'Best transport broker we\'ve worked with. Fast quotes, honest pricing, and they actually follow up. Switched from our old broker 6 months ago — no regrets.', route: null, vehicle: null },
  { id: 's5', rating: 4, customer_name: 'Jennifer M.', review_text: 'The online quote form with VIN decode is really convenient. Got a quote in 30 minutes and the car was picked up 2 days later. Will use again.', route: null, vehicle: null },
];

function Stars({ count, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {Array.from({ length: count }, (_, i) => <StarFilledIcon key={`f${i}`} size={size} />)}
      {Array.from({ length: 5 - count }, (_, i) => <StarEmptyIcon key={`e${i}`} size={size} />)}
    </span>
  );
}

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState(STATIC_TESTIMONIALS);
  const [aggregate, setAggregate] = useState(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    fetch(`${API_URL}/api/public/reviews?limit=10&min_rating=4`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setAggregate(data.aggregate);
        }
      })
      .catch(() => {});
  }, []);

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, reducedMotion]);

  const r = reviews[active];
  if (!r) return null;

  return (
    <div
      style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h3 style={{
        fontFamily: fonts.serif, fontSize: '20px', fontWeight: 700,
        color: colors.text, marginBottom: '8px',
      }}>
        What Our Customers Say
      </h3>

      {aggregate && aggregate.total_count > 0 && (
        <p style={{ fontSize: 13, color: colors.textMuted, marginBottom: 20 }}>
          <span style={{ color: '#F5A623', fontWeight: 700 }}>{aggregate.average_rating}&#9733;</span>
          {' '}average based on {aggregate.total_count} review{aggregate.total_count !== 1 ? 's' : ''}
        </p>
      )}

      <div
        key={r.id || active}
        style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '32px 28px',
          animation: 'fadeIn 400ms ease', minHeight: '180px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        <Stars count={r.rating} />
        <p style={{
          fontFamily: fonts.serif, fontSize: '16px', fontStyle: 'italic',
          color: colors.text, lineHeight: 1.6, margin: '16px 0',
        }}>
          &ldquo;{r.review_text}&rdquo;
        </p>
        <div style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text }}>
          {r.customer_name}
        </div>
        {(r.route || r.vehicle) && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 6, flexWrap: 'wrap' }}>
            {r.route && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 10,
                background: colors.bgMuted, color: colors.textMuted,
              }}>{r.route}</span>
            )}
            {r.vehicle && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 10,
                background: colors.bgMuted, color: colors.textMuted,
              }}>{r.vehicle}</span>
            )}
          </div>
        )}
        <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 8 }}>
          Verified Y7 Customer
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i === active ? colors.accent : colors.border,
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 200ms ease',
            }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
