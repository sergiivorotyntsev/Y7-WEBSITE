import { Link } from 'react-router-dom';
import GlowDot from './GlowDot';
import styles from './AnimatedLogo.module.css';

export default function AnimatedLogo({ size = 28, to = '/' }) {
  return (
    <Link to={to} className={styles.logo} aria-label="Y7 Logistics — Home">
      <span className={styles.text} style={{ fontSize: size }}>Y7</span>
      {/* POLISH-T03: the dot is now the shared GlowDot primitive; the header's
          --color-accent (= --v2-red) keeps the rendered colour identical.
          HOTFIX-DOT-T01: fallback to V2 red so the footer/login instances
          (outside header scope, where --color-accent is undefined) render red
          instead of vanishing on a guaranteed-invalid --dot-color. */}
      <GlowDot size={size * 0.14} color="var(--color-accent, var(--v2-red, #d70f24))" className={styles.logoDot} />
    </Link>
  );
}
