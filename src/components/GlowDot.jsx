import styles from './GlowDot.module.css';

/**
 * GlowDot — POLISH-T03: the logo's pulsing status dot, extracted from
 * AnimatedLogo into a reusable primitive. Four layers (two expanding rings, a
 * soft glow, a pulsing core), colour-tokenised via `--dot-color` (so callers
 * pick red / pine / any token) and size-parameterised. Decorative by default
 * (aria-hidden); pass a `title` only where the pulse conveys real state.
 * Honours prefers-reduced-motion (see the module). Do NOT scatter this
 * site-wide — one signature placement beyond the logo.
 */
export default function GlowDot({ size = 8, color, className, style }) {
  return (
    <span
      className={`${styles.dotWrap} ${className || ''}`}
      style={{ width: size, height: size, ...(color ? { '--dot-color': color } : null), ...style }}
      aria-hidden="true"
    >
      <span className={styles.ring1} />
      <span className={styles.ring2} />
      <span className={styles.glow} />
      <span className={styles.core} />
    </span>
  );
}
