import { useState, useEffect, useCallback } from 'react';
import { ClipboardIcon, DollarIcon, HandshakeIcon, TruckIcon, CheckIcon } from './icons';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    icon: <ClipboardIcon />,
    title: 'Submit Your Quote',
    desc: 'Enter your VIN and route details. We\'ll decode your vehicle instantly and show estimated pricing.',
    stat: '< 1 hour response',
  },
  {
    icon: <DollarIcon />,
    title: 'Get Your Pricing',
    desc: 'Receive a competitive price range within 1 hour. Confirm when you\'re ready — no pressure.',
    stat: 'Under 1 hour response',
  },
  {
    icon: <HandshakeIcon />,
    title: 'Sign Agreement',
    desc: 'Quick digital signature on our transport agreement. Review terms, check boxes, type your name. Done.',
    stat: '2 min to complete',
  },
  {
    icon: <TruckIcon />,
    title: 'Carrier Assigned',
    desc: 'We match your load with a vetted, insured carrier from our network. You get carrier name and phone.',
    stat: '100+ vetted carriers',
  },
  {
    icon: <CheckIcon />,
    title: 'Vehicle Delivered',
    desc: 'Follow your shipment status via portal. Inspect on arrival, sign BOL, and you\'re done.',
    stat: '3-10 business days',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % STEPS.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, reducedMotion]);

  const step = STEPS[active];

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.dots}>
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); }}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      <div key={active} className={styles.card}>
        <div className={styles.iconWrap}>{step.icon}</div>
        <div className={styles.stepLabel}>Step {active + 1} of {STEPS.length}</div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDesc}>{step.desc}</p>
        <div className={styles.stepStat}>{step.stat}</div>
      </div>

      <div className={styles.nextWrap}>
        <button
          onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 10000); }}
          className={styles.nextBtn}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
