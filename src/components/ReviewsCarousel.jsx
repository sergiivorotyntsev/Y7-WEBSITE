import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StarFilledIcon, StarEmptyIcon } from './icons';
import { API_URL } from '../config';
import styles from './ReviewsCarousel.module.css';

const STATIC_TESTIMONIALS = [
  { id: 's1', rating: 5, customer_name: 'Mike R.', review_text: 'Y7 moved 12 vehicles for us last month — all on time, no damage. Their dispatch team is always reachable and they know the auction pickup process inside out.', route: null, vehicle: null },
  { id: 's2', rating: 5, customer_name: 'Sarah L.', review_text: 'I was nervous shipping my BMW cross-country, but Y7 made it easy. Got updates via text the whole way and the car arrived in perfect condition.', route: null, vehicle: null },
  { id: 's3', rating: 5, customer_name: 'Andrzej K.', review_text: 'We export 20+ cars a month through Newark. Y7 handles all our domestic transport — reliable, fair pricing, and they understand the port delivery process.', route: null, vehicle: null },
  { id: 's4', rating: 5, customer_name: 'David T.', review_text: 'Best transport broker we\'ve worked with. Fast quotes, honest pricing, and they actually follow up. Switched from our old broker 6 months ago — no regrets.', route: null, vehicle: null },
  { id: 's5', rating: 4, customer_name: 'Jennifer M.', review_text: 'The online quote form with VIN decode is really convenient. Got a quote in 30 minutes and the car was picked up 2 days later. Will use again.', route: null, vehicle: null },
];

function Stars({ count, size = 14 }) {
  return (
    <span className={styles.starsRow}>
      {/* T11: currentColor -> .starsRow's v2 on-dark tier (the icons' default
          prop is V1 sienna, banned on V2 surfaces; viewport stays red-free). */}
      {Array.from({ length: count }, (_, i) => <StarFilledIcon key={`f${i}`} size={size} color="currentColor" />)}
      {Array.from({ length: 5 - count }, (_, i) => <StarEmptyIcon key={`e${i}`} size={size} color="currentColor" />)}
    </span>
  );
}

export default function ReviewsCarousel() {
  const { t } = useTranslation('home');
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
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h3 className={styles.heading}>{t('reviews.title')}</h3>

      {aggregate && aggregate.total_count > 0 && (
        <p className={styles.aggregate}>
          <span className={styles.aggregateStar}>{aggregate.average_rating}&#9733;</span>
          {' '}average based on {aggregate.total_count} review{aggregate.total_count !== 1 ? 's' : ''}
        </p>
      )}

      <div key={r.id || active} className={styles.card}>
        <Stars count={r.rating} />
        <p className={styles.quoteText}>&ldquo;{r.review_text}&rdquo;</p>
        <div className={styles.author}>{r.customer_name}</div>
        {(r.route || r.vehicle) && (
          <div className={styles.badgeRow}>
            {r.route && <span className={styles.badge}>{r.route}</span>}
            {r.vehicle && <span className={styles.badge}>{r.vehicle}</span>}
          </div>
        )}
        <div className={styles.verified}>{t('reviews.verified')}</div>
      </div>

      <div className={styles.dots}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
