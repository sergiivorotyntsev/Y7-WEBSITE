import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/trackEvent';
import styles from './QuoteFormCompact.module.css';
import v2b from '../styles/v2/buttons.module.css';

function isFiveDigit(s) {
  return /^\d{5}$/.test(s);
}

function looksLikeEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function looksLikePhone(s) {
  const digits = s.replace(/\D/g, '');
  return digits.length >= 10;
}

export default function QuoteFormCompact() {
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate();
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!isFiveDigit(pickupZip)) {
      setError(t('quickQuote.errZipPickup'));
      return;
    }
    if (!isFiveDigit(deliveryZip)) {
      setError(t('quickQuote.errZipDelivery'));
      return;
    }
    const trimmed = contact.trim();
    if (!trimmed) {
      setError(t('quickQuote.errContact'));
      return;
    }
    const isEmail = looksLikeEmail(trimmed);
    const isPhone = !isEmail && looksLikePhone(trimmed);
    if (!isEmail && !isPhone) {
      setError(t('quickQuote.errContactFormat'));
      return;
    }

    trackEvent('quickquote_submit', {
      pickup_zip: pickupZip,
      delivery_zip: deliveryZip,
      contact_type: isEmail ? 'email' : 'phone',
    });

    const params = new URLSearchParams({
      pickup_zip: pickupZip,
      delivery_zip: deliveryZip,
      [isEmail ? 'email' : 'phone']: trimmed,
    });
    const lang = i18n.language;
    const base = lang && lang !== 'en' ? `/${lang}/quote` : '/quote';
    navigate(`${base}?${params.toString()}#top`);
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{t('quickQuote.title')}</h3>
      <p className={styles.subtitle}>{t('quickQuote.subtitle')}</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="qqc-pickup">{t('quickQuote.pickupZip')}</label>
            <input
              id="qqc-pickup"
              className={styles.input}
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              value={pickupZip}
              onChange={(e) => setPickupZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="12345"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="qqc-delivery">{t('quickQuote.deliveryZip')}</label>
            <input
              id="qqc-delivery"
              className={styles.input}
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              value={deliveryZip}
              onChange={(e) => setDeliveryZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="54321"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="qqc-contact">{t('quickQuote.contactLabel')}</label>
          <input
            id="qqc-contact"
            className={styles.input}
            type="text"
            autoComplete="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t('quickQuote.contactPlaceholder')}
          />
        </div>

        {error && <div className={styles.error} role="alert">{error}</div>}

        <button type="submit" className={`${v2b.cta} ${styles.submit}`}>
          {t('quickQuote.submit')}
        </button>
      </form>

      <p className={styles.fullFormNote}>
        {t('quickQuote.needDetailed')}{' '}
        <a href={i18n.language && i18n.language !== 'en' ? `/${i18n.language}/quote` : '/quote'} className={styles.fullFormLink}>
          {t('quickQuote.useFull')}
        </a>
      </p>
    </div>
  );
}
