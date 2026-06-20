import { useEffect, useRef, useState } from 'react';
import s from './Reveal.module.css';

/* PHASE5B-HOME — SSR-safe entrance reveal.
 * Visible-by-default: the base style is opacity 1, so the prerendered/no-JS HTML
 * always shows the content (greppable, SEO-safe). The entrance animation is added
 * ONLY when JS marks the element in-view (IntersectionObserver) — a progressive
 * enhancement, same philosophy as the 5A magnet. prefers-reduced-motion → no
 * animation (stays visible). Never moves content behind JS.
 */
const REDUCE =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (REDUCE) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect(); }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${s.reveal} ${inView ? s.in : ''} ${className}`}
      style={delay && inView ? { ...style, animationDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
