import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
      <span className={styles.label}>Loading...</span>
    </div>
  );
}
