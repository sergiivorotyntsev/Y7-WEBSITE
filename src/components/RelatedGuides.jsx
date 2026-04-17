import { Link } from 'react-router-dom';
import styles from './RelatedGuides.module.css';

export default function RelatedGuides({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Related Guides</h2>
        <div className={styles.grid}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={styles.link}>
              <div className={styles.linkTitle}>{link.title} →</div>
              {link.description && (
                <div className={styles.linkDesc}>{link.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
