import styles from '../styles/v2/hero.module.css';
import HeroArc from './HeroArc';

/**
 * SPRINT-W7 M0 — a 1x1 transparent GIF used as a media-gated <source> so a
 * <picture> resolves to zero network bytes on the breakpoint side where its
 * hero variant is hidden. The desktop hero <picture> is loading=eager (it is
 * the desktop LCP element): without this gate a phone would still download
 * the full-size AVIF it never shows.
 */
export const HERO_BLANK_PX =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * MobileHeroEmergence — SPRINT-W7 M0 (owner reversal of the W-HOME mobile
 * degradation). Compact in-flow emergence coda at the bottom of a conversion
 * hero band, visible only at <=900px. Decorative and aria-hidden (Photo
 * Treatment Law (d)); stacked after the text content so overlap is zero by
 * construction (law (e)). Loading discipline (measured at 390x844): on home
 * the coda sits below the first-viewport fold -> lazy, no preload; on
 * /dealers and /exporters the shorter hero puts the car inside the first
 * viewport -> eager (a lazy visible image would just paint late). The
 * min-width:901px blank source keeps desktop (where this block is
 * display:none) from fetching the real files either way.
 * Hero Scope Law: the three conversion heroes only.
 */
export default function MobileHeroEmergence({ className, arcClassName, withArc = true, eager = false }) {
  return (
    <div className={`${styles.mobileEmergence} ${className || ''}`} aria-hidden="true">
      {withArc && <HeroArc className={arcClassName} />}
      <picture>
        <source media="(min-width: 901px)" srcSet={HERO_BLANK_PX} />
        <source type="image/avif" srcSet="/images/hero-car.avif" />
        <source type="image/webp" srcSet="/images/hero-car.webp" />
        <img
          src="/images/hero-car.webp"
          alt=""
          width="1625"
          height="704"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </div>
  );
}
