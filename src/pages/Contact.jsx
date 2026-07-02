import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { EmailIcon, TelegramIcon, PortalIcon, CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import PhoneInput, { getCleanPhone, isValidPhone } from '../components/PhoneInput';
import VerificationStrip from '../components/VerificationStrip';
import styles from './Contact.module.css';
import btn from '../styles/buttons.module.css';
import forms from '../styles/forms.module.css';

export default function Contact() {
  const { t } = useTranslation('common');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  // B: field-level errors, populated only after an invalid submit (never at rest).
  const [fieldErrors, setFieldErrors] = useState({});

  function set(f, v) {
    setForm(prev => ({ ...prev, [f]: v }));
    setFieldErrors(prev => (prev[f] ? { ...prev, [f]: undefined } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const fe = {};
    if (!form.name.trim()) fe.name = 'Name is required';
    if (!form.email.trim() && !form.phone.trim()) fe.email = 'Email or phone required';
    if (!form.message.trim()) fe.message = 'Message is required';
    if (form.phone && !isValidPhone(form.phone)) fe.phone = 'Please enter a valid 10-digit phone number, or leave it blank.';
    setFieldErrors(fe);
    if (Object.keys(fe).length > 0) {
      setError(fe.name || fe.email || fe.message || fe.phone);
      return;
    }
    setSubmitting(true);
    try {
      await apiPost('/api/public/contact', {
        ...form,
        phone: form.phone ? getCleanPhone(form.phone) : '',
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  const contactChannels = [
    { icon: <EmailIcon size={20} />, method: t('contact.channelEmail'), detail: 'info@y7agency.com', href: 'mailto:info@y7agency.com' },
    { icon: <TelegramIcon size={20} />, method: t('contact.channelTelegram'), detail: '@y7dispatch_bot', href: 'https://t.me/y7dispatch_bot' },
    { icon: <PortalIcon size={20} />, method: t('contact.channelPortal'), detail: t('contact.portalDetail'), href: '/portal/login' },
  ];

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Contact',url:'/contact'}]} />
      {/* SEOAI-T02: contactPoint already lives on the canonical #organization
          node in the index.html template — a second bare Organization here
          forked the entity graph. */}
      <PageMeta title={t('meta.contactTitle')} description={t('meta.contactDescription')} path="/contact" />

      <div className={styles.header}>
        <span className={styles.headerMicro}>&#9670; {t('contact.kicker')}</span>
        <h1 className={styles.title}>{t('contact.h1')}</h1>
        <p className={styles.subtitle}>{t('contact.subtitle')}</p>
      </div>

      <div className={styles.policyBlock}>
        <h3 className={styles.policyTitle}>{t('contact.policy.title')}</h3>
        <p className={styles.policyBody}>{t('contact.policy.body')}</p>
      </div>

      <div className={styles.layout}>
        {/* Left column — contact info */}
        <div className={styles.infoColumn}>
          <h2 className={styles.infoColumnHeading}>{t('contact.infoHeading')}</h2>
          {contactChannels.map(c => (
            <a
              key={c.method}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.infoCard}
            >
              <span className={styles.infoIcon}>{c.icon}</span>
              <div>
                <div className={styles.infoMethod}>{c.method}</div>
                <div className={styles.infoDetail}>{c.detail}</div>
              </div>
            </a>
          ))}
          <div className={styles.trustBlock}>
            <h3 className={styles.trustHeading}>{t('contact.hours.title')}</h3>
            <p className={styles.trustLine}>{t('contact.hours.monFri')}: 8:00 AM – 8:00 PM ET</p>
            <p className={styles.trustLine}>{t('contact.hours.sat')}: 9:00 AM – 5:00 PM ET</p>
            <p className={styles.trustLine}>{t('contact.hours.sun')}: {t('contact.hours.closed')}</p>
            <p className={styles.trustNote}>{t('contact.hours.emergencyNote')}</p>
          </div>

          <div className={styles.trustBlock}>
            <h3 className={styles.trustHeading}>{t('contact.address.title')}</h3>
            <address className={styles.addressLines}>
              {t('contact.address.companyLine')}<br />
              {t('contact.address.dbaLine')}<br />
              {t('contact.address.streetLine')}<br />
              {t('contact.address.cityLine')}<br />
              {t('contact.address.countryLine')}
            </address>
          </div>

          <div className={styles.legal}>
            USDOT #4427359 &middot; MC #1741537
          </div>
        </div>

        {/* Right column — form */}
        <div>
          {success ? (
            <div className={styles.successBlock}>
              <div className={styles.successIconWrap}><CheckIcon size={28} /></div>
              <h3 className={styles.successTitle}>{t('contact.successTitle')}</h3>
              <p className={styles.successMsg}>{t('contact.successMsg')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <h2 className={styles.formHeading}>{t('contact.formHeading')}</h2>
                <p className={styles.formSubtitle}>{t('contact.formSubtitle')}</p>
              </div>
              <div className={forms.inputGroup}>
                <label htmlFor="contact-name" className={forms.label}>{t('contact.labelName')}</label>
                <input
                  id="contact-name"
                  className={`${forms.input} ${fieldErrors.name ? styles.fieldError : ''}`}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  aria-invalid={fieldErrors.name ? 'true' : undefined}
                />
                {fieldErrors.name && <span className={styles.fieldErrorMsg}>{fieldErrors.name}</span>}
              </div>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label htmlFor="contact-email" className={forms.label}>
                    {t('contact.labelEmail')}
                    <span className={styles.fieldHelp}>{t('contact.emailHelp')}</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`${forms.input} ${fieldErrors.email ? styles.fieldError : ''}`}
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    aria-invalid={fieldErrors.email ? 'true' : undefined}
                  />
                  {fieldErrors.email && <span className={styles.fieldErrorMsg}>{fieldErrors.email}</span>}
                </div>
                <div className={forms.inputGroup}>
                  <label htmlFor="contact-phone" className={forms.label}>
                    {t('contact.labelPhone')}
                    <span className={styles.fieldHelp}>{t('contact.phoneHelp')}</span>
                  </label>
                  <PhoneInput
                    id="contact-phone"
                    className={`${forms.input} ${fieldErrors.phone ? styles.fieldError : ''}`}
                    value={form.phone}
                    onChange={v => set('phone', v)}
                  />
                  {fieldErrors.phone && <span className={styles.fieldErrorMsg}>{fieldErrors.phone}</span>}
                </div>
              </div>
              <div className={forms.inputGroup}>
                <label htmlFor="contact-message" className={forms.label}>{t('contact.labelMessage')}</label>
                <textarea
                  id="contact-message"
                  className={`${forms.textarea} ${fieldErrors.message ? styles.fieldError : ''}`}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={5}
                  aria-invalid={fieldErrors.message ? 'true' : undefined}
                />
                {fieldErrors.message && <span className={styles.fieldErrorMsg}>{fieldErrors.message}</span>}
              </div>
              {error && <div className={styles.errorAlert} role="alert">{error}</div>}
              <button
                type="submit"
                disabled={submitting}
                className={`${btn.btnAccent} ${styles.submitBtn}`}
              >
                {submitting ? t('contact.sending') : t('contact.submit')}
              </button>
            </form>
          )}
        </div>
      </div>

      <VerificationStrip />
    </div>
  );
}
