import styles from '../styles/v2/hero.module.css';

/**
 * HeroArc — SPRINT-V21 ASSET2: the brand banner's red arc, recreated in code
 * (the previous asset had it baked in). Inline SVG, exact #d70f24 stroke,
 * geometry approximating the reference banner's sweep. Decorative, aria-hidden,
 * prerender-safe (static markup), zero-CLS (absolute layer inside
 * PhotoEmergence, painted BEHIND the car by DOM order).
 * One component; per-page position/scale via the className prop.
 */
export default function HeroArc({ className }) {
  return (
    <svg
      className={`${styles.heroArc} ${className || ''}`}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Single bold sweep: lower-left, over the crown, down the right —
          the banner's arc segment (~230 degrees of a circle). */}
      <path
        d="M 52 306 A 168 168 0 1 1 362 238"
        stroke="#d70f24"
        strokeWidth="17"
        strokeLinecap="round"
      />
    </svg>
  );
}
