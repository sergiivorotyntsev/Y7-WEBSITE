import { useState, useEffect, useCallback } from 'react';
import { StarFilledIcon, StarEmptyIcon } from './icons';
import styles from './ReviewsCarousel.module.css';

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
    <span className={styles.starsRow}>
      {Array.from({ length: count }, (_, i) => <StarFilledIcon key={`f${i}`} size={14} />)}
      {Array.from({ length: 5 - count }, (_, i) => <StarEmptyIcon key={`e${i}`} size={14} />)}
    </span>
  );
}

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, reducedMotion]);

  const t = TESTIMONIALS[active];

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h3 className={styles.heading}>What Our Customers Say</h3>

      <div key={active} className={styles.card}>
        <Stars count={t.stars} />
        <p className={styles.quoteText}>&ldquo;{t.text}&rdquo;</p>
        <div className={styles.author}>{t.name}</div>
        <div className={styles.verified}>{t.company}</div>
      </div>

      <div className={styles.dots}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
