import styles from '../pages/Home.module.css';

/**
 * HeroRouteVisual — CSS/SVG-only decorative route visualization for the Home hero.
 * No images, no canvas — works on Puppeteer prerender.
 */
export default function HeroRouteVisual() {
  return (
    <svg
      className={styles.routeSvg}
      viewBox="0 0 420 260"
      aria-hidden="true"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dotted route track — curved path between 4 city dots */}
      <path
        className={styles.routeTrack}
        d="M 40 200 Q 100 80 170 140 T 300 80 T 400 60"
      />

      {/* Draw-on accent overlay — animates on mount for the WOW effect */}
      <path
        className={styles.routeTrackGlow}
        d="M 40 200 Q 100 80 170 140 T 300 80 T 400 60"
      />

      {/* Stylized car — small, premium silhouette */}
      <g className={styles.routeCar} transform="translate(60 188)">
        <path d="M -14 0 L -11 -6 L 11 -6 L 14 0 L 14 4 L 11 4 L 11 2 L -11 2 L -11 4 L -14 4 Z" />
        <circle cx="-8" cy="4" r="2" fill="#2C2C2A" />
        <circle cx="8" cy="4" r="2" fill="#2C2C2A" />
      </g>

      {/* 4 city dots */}
      <circle className={styles.routeDot} cx="40" cy="200" r="6" />
      <circle className={styles.routeDot} cx="170" cy="140" r="6" />
      <circle className={styles.routeDot} cx="300" cy="80" r="6" />
      <circle className={styles.routeDot} cx="400" cy="60" r="6" />

      {/* Labels */}
      <text className={styles.routeLabel} x="40" y="226" textAnchor="middle">
        LA
      </text>
      <text className={styles.routeLabel} x="170" y="166" textAnchor="middle">
        DAL
      </text>
      <text className={styles.routeLabel} x="300" y="106" textAnchor="middle">
        CHI
      </text>
      <text className={styles.routeLabel} x="400" y="86" textAnchor="end">
        NWK
      </text>
    </svg>
  );
}
