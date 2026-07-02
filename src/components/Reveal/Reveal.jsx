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
  // CWV2-T03: already-in-viewport at client mount → the static prerendered page
  // has ALREADY played this element's entrance by the time createRoot rebuilds
  // #root. Snap to the final state instead of replaying (the visible hero
  // "flicker" from the Phase-0 census). Kept out of the prerender path
  // (navigator.webdriver) so the snapshot keeps the animated .in for the real
  // first paint. Below-fold elements still scroll-reveal normally.
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (REDUCE) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // window.__Y7_STATIC_SHOWN (set in main.jsx before render) — true only
    // when this render is a client rebuild OVER a prerendered page, i.e. the
    // entrance has already been shown statically. False during the prerender
    // pass itself (empty SPA template), so snapshots keep the animated .in.
    if (window.__Y7_STATIC_SHOWN) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setInstant(true);
        setInView(true);
        return;
      }
    }
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
      className={`${s.reveal} ${inView ? s.in : ''} ${instant ? s.noAnim : ''} ${className}`}
      style={delay && inView && !instant ? { ...style, animationDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
