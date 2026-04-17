import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { EmailIcon, TelegramIcon, PortalIcon, CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import styles from './Contact.module.css';
import btn from '../styles/buttons.module.css';
import forms from '../styles/forms.module.css';

export default function Contact() {
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
    setSubmitting(true);
    try {
      await apiPost('/api/public/contact', form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  const contactChannels = [
    { icon: <EmailIcon size={18} />, label: 'info@y7agency.com', href: 'mailto:info@y7agency.com' },
    { icon: <TelegramIcon size={18} />, label: 'Telegram Bot', href: 'https://t.me/y7dispatch_bot' },
    { icon: <PortalIcon size={18} />, label: 'Customer Portal', href: '/portal/login' },
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
      <PageMeta title="Contact Us" description="Get in touch with Y7 Logistics. Email, Telegram, customer portal. Newton, MA." path="/contact" />

      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>
        Questions about transport? Need a custom quote? We're here to help.
      </p>

      {/* Contact info */}
      <div className={styles.contactGrid}>
        {contactChannels.map(c => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={styles.contactTile}
          >
            {c.icon}{c.label}
          </a>
        ))}
      </div>

      {success ? (
        <div className={styles.successBlock}>
          <div className={styles.successIcon}><CheckIcon size={40} /></div>
          <h3 className={styles.successTitle}>Message Sent!</h3>
          <p className={styles.successMsg}>We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
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
              <input
                type="tel"
                className={forms.input}
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
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

      <div className={styles.legal}>
        Y7 Consulting Inc (DBA Y7 Logistics)<br />
        Newton, MA, USA<br />
        USDOT #4427359 | MC #1741537
      </div>
    </div>
  );
}
