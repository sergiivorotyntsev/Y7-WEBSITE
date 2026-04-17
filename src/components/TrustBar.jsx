import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TrustBar.module.css';

function useCountUp(target, visible, duration = 1500) {
  const [display, setDisplay] = useState(target);
  const numMatch = target.match(/^(\d+)/);
  const numVal = numMatch ? parseInt(numMatch[1], 10) : 0;
  const suffix = numMatch ? target.slice(numMatch[0].length) : target;

  useEffect(() => {
    if (!visible || !numVal) { setDisplay(target); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(numVal * eased)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, numVal, suffix, target, duration]);

  return display;
}

function StatCard({ value, label, visible, delay }) {
  const counted = useCountUp(value, visible);

  return (
    <div
      className={styles.stat}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
      }}
    >
      <div className={styles.value}>{counted}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function TrustBar() {
  const { t } = useTranslation('home');
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: t('trust.experience'), label: t('trust.experienceLabel') },
    { value: t('trust.carriers'), label: t('trust.carriersLabel') },
    { value: t('trust.support'), label: t('trust.supportLabel') },
    { value: t('trust.cd'), label: t('trust.cdLabel') },
  ];

  return (
    <div ref={ref} className={styles.grid}>
      {stats.map(({ value, label }, i) => (
        <StatCard key={label} value={value} label={label} visible={visible} delay={i * 100} />
      ))}
    </div>
  );
}
