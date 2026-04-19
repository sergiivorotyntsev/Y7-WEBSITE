/* eslint-disable react-refresh/only-export-components */
// Module co-exports helpers alongside the LegalSection component; dev-only
// HMR warning — safe to suppress for this utility module.
export const MAX_SECTIONS = 24;

export function renderLines(text, styles) {
  if (!text) return null;
  const paras = String(text).split(/\n\n+/);
  return paras.map((para, i) => (
    <p key={i} className={styles.p} style={{ whiteSpace: 'pre-line' }}>{para}</p>
  ));
}

export function LegalSection({ section, styles }) {
  if (!section || typeof section !== 'object') return null;

  const { title, body, bullets, tiers, featuresList, subsections, rights, footer, breach, dnt, feeIncludes } = section;

  return (
    <>
      {title && <h2 className={styles.h2}>{title}</h2>}
      {body && renderLines(body, styles)}

      {Array.isArray(tiers) && tiers.length > 0 && (
        <ul className={styles.ul}>
          {tiers.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      )}

      {feeIncludes && <p className={styles.p}>{feeIncludes}</p>}

      {Array.isArray(bullets) && bullets.length > 0 && (
        <ul className={styles.ul}>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}

      {Array.isArray(featuresList) && featuresList.length > 0 && (
        <ul className={styles.ul}>
          {featuresList.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}

      {subsections && typeof subsections === 'object' && (
        <ul className={styles.ul}>
          {Object.entries(subsections).map(([k, v]) => (
            <li key={k}><span className={styles.strong}>({k})</span> {v}</li>
          ))}
        </ul>
      )}

      {rights && <p className={styles.p}>{rights}</p>}
      {breach && renderLines(breach, styles)}
      {dnt && <p className={styles.p}>{dnt}</p>}
      {footer && <p className={styles.p}>{footer}</p>}
    </>
  );
}
