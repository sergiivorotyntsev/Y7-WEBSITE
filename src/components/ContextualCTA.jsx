import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ContextualCTA.module.css';

/**
 * ContextualCTA — internal-linking primitive for SEO pages.
 *
 * Two variants:
 *   - "inline" → one-sentence paragraph with an embedded Link (used mid-prose
 *                as part of the article flow)
 *   - "card"   → visual card with tone color, title, description, and arrow
 *                (used between content sections, or near the footer)
 *
 * Translations live in locales/<lang>/contextualCTA.json under the `keys` map.
 * `to` is a path without locale prefix; the component prepends the prefix for
 * /ua, /pl, /ru automatically based on the current URL.
 */
export default function ContextualCTA({ variant = 'card', to, intlKey, tone = 'coral' }) {
  const { t } = useTranslation('contextualCTA');
  const location = useLocation();
  const m = location.pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const prefix = m ? `/${m[1]}` : '';
  const target = `${prefix}${to}`;

  const title = t(`keys.${intlKey}.title`);
  const body = t(`keys.${intlKey}.body`);
  const cta = t(`keys.${intlKey}.cta`);
  const linkLabel = t(`keys.${intlKey}.linkLabel`, { defaultValue: cta });

  if (variant === 'inline') {
    return (
      <p className={styles.inline}>
        {body}{' '}
        <Link to={target} className={styles.inlineLink}>
          {linkLabel} <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    );
  }

  return (
    <aside className={`${styles.card} ${styles[`tone_${tone}`]}`}>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardText}>{body}</p>
      </div>
      <Link to={target} className={styles.cardCta}>
        {cta} <span aria-hidden="true">&rarr;</span>
      </Link>
    </aside>
  );
}
