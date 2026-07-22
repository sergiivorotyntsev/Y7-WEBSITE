import { Link } from 'react-router-dom';
import GlowDot from './GlowDot';
import styles from './AnimatedLogo.module.css';

export default function AnimatedLogo({ size = 28, to = '/' }) {
  return (
    <Link to={to} className={styles.logo} aria-label="Y7 Logistics — Home">
      <span className={styles.text} style={{ fontSize: size }}>Y7</span>
      {/* POLISH-T03: the dot is now the shared GlowDot primitive; the header's
          --color-accent (= --v2-red) keeps the rendered colour identical. */}
      <GlowDot size={size * 0.14} color="var(--color-accent)" className={styles.logoDot} />
    </Link>
  );
}
