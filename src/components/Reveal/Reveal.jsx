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
    // entrance has already been shown statically.
    // window.__Y7_PRERENDER (injected by scripts/prerender.mjs) — true only
    // during the prerender pass. PSIFIX-T05: snapshots now ALSO take the
    // instant path, so above-fold content is baked at rest (in + noAnim).
    // The old animated .in in the snapshot meant the hero's static paint
    // never registered as LCP (text painting mid-animation), pushing LCP to
    // the post-hydration repaint (~JS download + hydrate). At-rest snapshots
    // register LCP at the true first paint, and the hydration repaint is
    // pixel-identical so no larger LCP entry can re-fire.
    if (window.__Y7_STATIC_SHOWN || window.__Y7_PRERENDER) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setInstant(true);
        setInView(true);
        return;
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // PSIFIX-T05: during the prerender pass anything that scrolls/resizes
          // into view (e.g. the desktop-viewport flip) also bakes at rest, so
          // no snapshot ever carries a mid-flight entrance animation.
          if (window.__Y7_PRERENDER) setInstant(true);
          setInView(true);
          io.disconnect();
        }
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
