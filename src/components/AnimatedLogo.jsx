import { Link } from 'react-router-dom';
import styles from './AnimatedLogo.module.css';

export default function AnimatedLogo({ size = 28, to = '/' }) {
  return (
    <Link to={to} className={styles.logo} aria-label="Y7 Logistics — Home">
      <span className={styles.text} style={{ fontSize: size }}>Y7</span>
      <span className={styles.dotWrap} style={{ width: size * 0.14, height: size * 0.14 }}>
        <span className={styles.ring1} />
        <span className={styles.ring2} />
        <span className={styles.glow} />
        <span className={styles.core} />
      </span>
    </Link>
  );
}
