import { useState } from 'react';
import { apiPost } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: colors.text,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, color: colors.text, textAlign: 'center', marginBottom: '8px' }}>
        Contact Us
      </h1>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, textAlign: 'center', marginBottom: '32px' }}>
        Questions about transport? Need a custom quote? We're here to help.
      </p>

      {/* Contact info */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '32px',
      }}>
        {[
          { icon: '\uD83D\uDCDE', label: '(857) 895-8555', href: 'tel:+18578958555' },
          { icon: '\u2709\uFE0F', label: 'info@y7agency.com', href: 'mailto:info@y7agency.com' },
          { icon: '\uD83D\uDCAC', label: 'Telegram Bot', href: 'https://t.me/y7dispatch_bot' },
        ].map(c => (
          <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px',
              background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '10px',
              fontFamily: fonts.sans, fontSize: '13px', color: colors.text, textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '18px' }}>{c.icon}</span>{c.label}
          </a>
        ))}
      </div>

      {success ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: colors.successBg, borderRadius: '16px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>&#10003;</div>
          <h3 style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.success, marginBottom: '8px' }}>Message Sent!</h3>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '16px',
          padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div><label style={labelStyle}>Name *</label><input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div><label style={labelStyle}>Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone</label><input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Message *</label><textarea value={form.message} onChange={e => set('message', e.target.value)} rows={5} style={{ ...inputStyle, resize: 'vertical' }} /></div>
          {error && <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px' }}>{error}</div>}
          <button type="submit" disabled={submitting} style={{ ...btnStyles.accent, width: '100%', padding: '14px', fontSize: '14px', opacity: submitting ? 0.6 : 1 }}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      <div style={{ marginTop: '32px', fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, textAlign: 'center', lineHeight: 1.6 }}>
        Y7 Consulting Inc (DBA Y7 Logistics)<br />
        1007 Chestnut St, Suite A, Newton, MA 02464<br />
        USDOT #4427359 | MC #1741537
      </div>
    </div>
  );
}
