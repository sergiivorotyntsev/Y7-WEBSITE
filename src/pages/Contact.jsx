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

  function set(f, v) { setForm(prev => ({ ...prev, [f]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (!form.email.trim() && !form.phone.trim()) { setError('Email or phone required'); return; }
    if (!form.message.trim()) { setError('Message is required'); return; }
    if (form.phone && !isValidPhone(form.phone)) {
      setError('Please enter a valid 10-digit phone number, or leave it blank.');
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Y7 Logistics",
        "url": "https://www.y7agency.com",
        "contactPoint": [{
          "@type": "ContactPoint",
          "email": "info@y7agency.com",
          "contactType": "customer service",
          "availableLanguage": ["English","Russian","Polish","Ukrainian"],
          "areaServed": "US"
        }]
      }) }} />
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
                <label className={forms.label}>{t('contact.labelName')}</label>
                <input
                  className={forms.input}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label className={forms.label}>
                    {t('contact.labelEmail')}
                    <span className={styles.fieldHelp}>{t('contact.emailHelp')}</span>
                  </label>
                  <input
                    type="email"
                    className={forms.input}
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>
                <div className={forms.inputGroup}>
                  <label className={forms.label}>
                    {t('contact.labelPhone')}
                    <span className={styles.fieldHelp}>{t('contact.phoneHelp')}</span>
                  </label>
                  <PhoneInput
                    className={forms.input}
                    value={form.phone}
                    onChange={v => set('phone', v)}
                  />
                </div>
              </div>
              <div className={forms.inputGroup}>
                <label className={forms.label}>{t('contact.labelMessage')}</label>
                <textarea
                  className={forms.textarea}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={5}
                />
              </div>
              {error && <div className={styles.errorAlert}>{error}</div>}
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
