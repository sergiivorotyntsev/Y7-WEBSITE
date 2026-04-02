import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiPost } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888780' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: '32px',
  cursor: 'pointer',
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

export default function Exporters() {
  const { t } = useTranslation('exporters');
  const steps = t('steps', { returnObjects: true });
  const fees = t('fees.items', { returnObjects: true });
  const valuePoints = t('value.points', { returnObjects: true });
  const portList = t('ports.list', { returnObjects: true });
  const volumes = t('form.volumes', { returnObjects: true });

  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    monthly_volume: '', preferred_ports: '', vins: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.contact_name.trim()) { setError('Contact name is required'); return; }
    if (!form.email.trim()) { setError('Email is required'); return; }

    setSubmitting(true);
    try {
      await apiPost('/api/public/contact', {
        name: `${form.company_name} — ${form.contact_name}`.trim(),
        email: form.email,
        phone: form.phone,
        message: [
          `Exporter Service Rate Request`,
          `Company: ${form.company_name || 'N/A'}`,
          `Monthly volume: ${form.monthly_volume || 'N/A'}`,
          `Preferred ports: ${form.preferred_ports || 'N/A'}`,
          form.vins ? `VINs:\n${form.vins}` : '',
          form.notes ? `Notes: ${form.notes}` : '',
        ].filter(Boolean).join('\n'),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Hero */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        {t('title')}
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '15px',
        color: colors.textMuted,
        textAlign: 'center',
        maxWidth: '620px',
        margin: '0 auto 48px',
        lineHeight: 1.6,
      }}>
        {t('subtitle')}
      </p>

      {/* Value proposition — transparent model callout */}
      <div style={{
        background: '#FFF8F5',
        borderLeft: `4px solid ${colors.accent}`,
        borderRadius: '0 12px 12px 0',
        padding: '24px 28px',
        marginBottom: '40px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '20px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          {t('value.title')}
        </h2>
        <ul style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.8,
          paddingLeft: '20px',
          margin: 0,
        }}>
          {Array.isArray(valuePoints) && valuePoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Service Fee Table */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          {t('fees.title')}
        </h2>
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {Array.isArray(fees) && fees.map((fee, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderBottom: i < fees.length - 1 ? `1px solid ${colors.border}` : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: '4px',
                }}>
                  {fee.service}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '13px',
                  color: colors.textMuted,
                  lineHeight: 1.5,
                }}>
                  {fee.desc}
                </div>
              </div>
              <div style={{
                fontFamily: fonts.mono,
                fontSize: '12px',
                fontWeight: 600,
                color: colors.accent,
                background: '#FFF8F5',
                padding: '4px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {fee.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works — 4 steps */}
      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '40px 32px',
        marginBottom: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          {t('howTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
        }}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: colors.accent,
                color: '#fff',
                fontFamily: fonts.serif,
                fontSize: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '6px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: 1.5,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Port Coverage */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          {t('ports.title')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {Array.isArray(portList) && portList.map((port, i) => (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              padding: '16px 20px',
            }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '15px',
                fontWeight: 700,
                color: colors.accent,
                marginBottom: '4px',
              }}>
                {port.name}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                color: colors.textMuted,
                lineHeight: 1.5,
              }}>
                {port.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Form */}
      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '40px 32px',
      }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>&#10003;</div>
            <h3 style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.success, marginBottom: '8px' }}>
              {t('formSuccess.title')}
            </h3>
            <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
              {t('formSuccess.message')}
            </p>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: '22px',
              fontWeight: 700,
              color: colors.text,
              textAlign: 'center',
              marginBottom: '8px',
            }}>
              {t('form.title')}
            </h2>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.textMuted,
              textAlign: 'center',
              marginBottom: '28px',
            }}>
              {t('form.subtitle')}
            </p>

            <form onSubmit={handleSubmit} style={{
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>{t('form.companyName')}</label>
                  <input value={form.company_name} onChange={e => set('company_name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t('form.contactName')} *</label>
                  <input value={form.contact_name} onChange={e => set('contact_name', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>{t('form.email')} *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t('form.phone')}</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>{t('form.monthlyVolume')}</label>
                  <select value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)} style={selectStyle}>
                    <option value="">Select...</option>
                    {Array.isArray(volumes) && volumes.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t('form.preferredPorts')}</label>
                  <input value={form.preferred_ports} onChange={e => set('preferred_ports', e.target.value)}
                    placeholder="Newark, Houston..." style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>{t('form.vins')}</label>
                <textarea
                  value={form.vins}
                  onChange={e => set('vins', e.target.value)}
                  placeholder={t('form.vinsPlaceholder')}
                  rows={4}
                  style={{ ...inputStyle, fontFamily: fonts.mono, fontSize: '13px', resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('form.notes')}</label>
                <textarea
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  placeholder={t('form.notesPlaceholder')}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {error && (
                <div style={{
                  fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
                  padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px',
                }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} style={{
                ...btnStyles.accent,
                padding: '14px 32px',
                fontSize: '14px',
                width: '100%',
                opacity: submitting ? 0.6 : 1,
              }}>
                {submitting ? t('form.submitting') : t('form.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
