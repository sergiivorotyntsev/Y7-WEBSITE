import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

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
      const eased = 1 - Math.pow(1 - progress, 3); // easeOut
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
    <div style={{
      background: colors.bgMuted,
      borderRadius: '12px',
      padding: '24px 16px',
      textAlign: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
    }}>
      <div style={{
        fontFamily: fonts.serif,
        fontSize: '32px',
        fontWeight: 700,
        color: colors.accent,
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {counted}
      </div>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: 500,
      }}>
        {label}
      </div>
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
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      {stats.map(({ value, label }, i) => (
        <StatCard key={label} value={value} label={label} visible={visible} delay={i * 100} />
      ))}
    </div>
  );
}
