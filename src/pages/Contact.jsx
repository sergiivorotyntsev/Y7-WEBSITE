import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { EmailIcon, TelegramIcon, PortalIcon, CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import PhoneInput, { getCleanPhone, isValidPhone } from '../components/PhoneInput';
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
    { icon: <EmailIcon size={20} />, method: 'Email', detail: 'info@y7agency.com', href: 'mailto:info@y7agency.com' },
    { icon: <TelegramIcon size={20} />, method: 'Telegram', detail: '@y7dispatch_bot', href: 'https://t.me/y7dispatch_bot' },
    { icon: <PortalIcon size={20} />, method: 'Customer Portal', detail: 'Sign in for shipment status', href: '/portal/login' },
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
        <span className={styles.headerMicro}>&#9670; Get in Touch</span>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Questions about transport? Need a custom quote? We're here to help.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Left column — contact info */}
        <div className={styles.infoColumn}>
          <h2 className={styles.infoColumnHeading}>How to reach us</h2>
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
          <div className={styles.legal}>
            Y7 Consulting Inc (DBA Y7 Logistics)<br />
            Newton, MA, USA<br />
            USDOT #4427359 &middot; MC #1741537
          </div>
        </div>

        {/* Right column — form */}
        <div>
          {success ? (
            <div className={styles.successBlock}>
              <div className={styles.successIconWrap}><CheckIcon size={28} /></div>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successMsg}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <h2 className={styles.formHeading}>Send us a message</h2>
                <p className={styles.formSubtitle}>Typical response within 1 hour during business hours.</p>
              </div>
              <div className={forms.inputGroup}>
                <label className={forms.label}>Name *</label>
                <input
                  className={forms.input}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label className={forms.label}>Email</label>
                  <input
                    type="email"
                    className={forms.input}
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>
                <div className={forms.inputGroup}>
                  <label className={forms.label}>Phone</label>
                  <PhoneInput
                    className={forms.input}
                    value={form.phone}
                    onChange={v => set('phone', v)}
                  />
                </div>
              </div>
              <div className={forms.inputGroup}>
                <label className={forms.label}>Message *</label>
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
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
