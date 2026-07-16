import styles from './EntityTldr.module.css';

/**
 * EntityTldr — front-loaded, machine-extractable answer block (SEOAI-T04).
 *
 * Mirrors the /faq TL;DR pattern: a flat token-styled card holding 2-3
 * self-contained sentences with at least one concrete stat and one authority
 * signal (MC/USDOT/bond), placed above the fold so AI answer engines can lift
 * it verbatim. Renders nothing when `text` is empty — callers on localized
 * routes gate the string via i18n.getResource() so ru/pl/ua stay untouched.
 */
export default function EntityTldr({ kicker, text, ariaLabel }) {
  if (!text) return null;
  return (
    <aside className={styles.tldr} aria-label={ariaLabel || 'Summary'}>
      <span className={styles.kicker}>{kicker || 'The short answer'}</span>
      <p className={styles.text}>{text}</p>
    </aside>
  );
}
