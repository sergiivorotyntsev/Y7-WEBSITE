// CO-3W T02: My Companies — exporter party directory + Agent Authorization flow.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import Toast from '../../components/Toast';
import { API_URL } from '../../config';
import { authHeader, clearSessionOn401 } from '../../hooks/useAuth';
import { colors, button as btnStyles } from '../../theme';
import {
  AUTH_STATUS_INFO, apiDetail, badgeStyle, cardStyle, coJson, coUpload,
  fieldInput, fieldLabel, sectionTitle,
} from './coShared';

const EMPTY_FORM = {
  legal_name: '', address_line1: '', address_line2: '', city: '', state_region: '',
  zip: '', country: 'US', phone: '', email: '', tax_id: '',
  signers: [{ signer_name: '', signer_title: '' }],
};

const FIELD_LABELS = {
  legal_name: 'Legal company name', address_line1: 'Address line 1', city: 'City',
  state_region: 'State', zip: 'ZIP', country: 'Country', phone: 'Phone',
  email: 'Email', tax_id: 'EIN', signer: 'At least one signer (name + title)',
};

export default function CoCompanies() {
  const [companies, setCompanies] = useState(null);
  const [editing, setEditing] = useState(null); // null | 'new' | company
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    const { ok, body } = await coJson('/api/portal/data/co-parties');
    setCompanies(ok ? body.items : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="My Companies — Certificate of Origin" path="/portal/co/companies" />
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 26, margin: 0, color: colors.text }}>My Companies</h1>
        <button style={btnStyles.accent} onClick={() => setEditing('new')}>Add company</button>
      </div>
      <p style={{ color: '#6b6b68', fontSize: 14, marginTop: 4 }}>
        The exporter companies you buy and export under. Each company signs a one-time
        authorization letter so Y7 can file Certificate of Origin applications on its behalf.
        {' '}<Link to="/portal/co" style={{ color: colors.accent }}>Go to CO requests →</Link>
      </p>

      {companies === null ? (
        <p style={{ color: '#6b6b68' }}>Loading…</p>
      ) : companies.length === 0 && editing === null ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: 40 }}>
          <p style={{ margin: 0, fontSize: 15 }}>No companies yet.</p>
          <p style={{ color: '#6b6b68', fontSize: 14 }}>
            Add the company shown as the buyer on your auction invoices.
          </p>
          <button style={btnStyles.accent} onClick={() => setEditing('new')}>Add your first company</button>
        </div>
      ) : (
        companies.map((c) => (
          <CompanyCard
            key={c.id}
            company={c}
            onEdit={() => setEditing(c)}
            reload={load}
            setToast={setToast}
          />
        ))
      )}

      {editing !== null && (
        <CompanyForm
          company={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
          setToast={setToast}
        />
      )}
    </div>
  );
}

function CompanyCard({ company, onEdit, reload, setToast }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const info = AUTH_STATUS_INFO[company.authorization_status] || AUTH_STATUS_INFO.draft;
  const approved = company.authorization_status === 'approved';
  const missing = company.missing_requisites || [];
  const address = [company.address_line1,
    [company.city, company.state_region, company.zip].filter(Boolean).join(', '),
    company.country].filter(Boolean).join(' · ');

  const downloadLetter = async () => {
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/api/portal/data/co-parties/${company.id}/authorization-letter`, {
        method: 'POST', credentials: 'include', headers: authHeader(),
      });
      clearSessionOn401(r.status);
      if (!r.ok) {
        let body = null;
        try { body = await r.json(); } catch { /* not json */ }
        setToast({ type: 'error', message: apiDetail(body, 'Could not generate the letter') });
        return;
      }
      const blob = await r.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `authorization_${company.legal_name.replace(/\W+/g, '_')}.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
      setToast({ type: 'success', message: 'Letter downloaded — print, sign, then upload the scan' });
      await reload();
    } finally {
      setBusy(false);
    }
  };

  const uploadSigned = async (file) => {
    setBusy(true);
    try {
      const { ok, body } = await coUpload(
        `/api/portal/data/co-parties/${company.id}/authorization-upload`, file,
      );
      if (ok) {
        setToast({ type: 'success', message: 'Signed letter uploaded — Y7 will review it shortly' });
        await reload();
      } else {
        setToast({ type: 'error', message: apiDetail(body, 'Upload failed') });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <strong style={{ fontSize: 16 }}>{company.legal_name}</strong>
        <span style={badgeStyle(info)}>{info.label}</span>
        <span style={{ flex: 1 }} />
        {approved ? (
          <span style={{ fontSize: 12, color: '#6b6b68' }}>
            Details locked — contact Y7 to change them
          </span>
        ) : (
          <button style={{ ...btnStyles.secondary, padding: '6px 14px', fontSize: 13 }} onClick={onEdit}>
            Edit
          </button>
        )}
      </div>
      <div style={{ fontSize: 13, color: '#6b6b68', marginTop: 4 }}>
        {address || 'No address yet'}
        {company.tax_id_masked ? ` · EIN ${company.tax_id_masked}` : ''}
        {(company.signers || []).length > 0 &&
          ` · Signer: ${company.signers[0].signer_name} (${company.signers[0].signer_title})`}
      </div>

      {company.authorization_reject_note && (
        <div style={{ marginTop: 10, padding: '8px 12px', background: '#f8d7da', color: '#842029', borderRadius: 8, fontSize: 13 }}>
          Y7 note: {company.authorization_reject_note} — fix and upload a new scan.
        </div>
      )}

      {!approved && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
          <div style={sectionTitle}>Authorization letter</div>
          {missing.length > 0 && (
            <div style={{ fontSize: 13, color: '#664d03', background: '#fff3cd', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
              Complete these before the letter can be generated:{' '}
              {missing.map((m) => FIELD_LABELS[m] || m).join(', ')}.
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              style={{ ...btnStyles.secondary, opacity: missing.length || busy ? 0.5 : 1 }}
              disabled={missing.length > 0 || busy}
              onClick={downloadLetter}
            >
              1. Download authorization letter
            </button>
            <button
              style={{ ...btnStyles.secondary, opacity: busy ? 0.5 : 1 }}
              disabled={busy}
              onClick={() => fileRef.current?.click()}
            >
              2. Upload the signed scan
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadSigned(f);
                e.target.value = '';
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 8, marginBottom: 0 }}>
            Print the letter, have the signer sign it, then upload a scan or photo.
            This is done once per company — after Y7 approves it, you never repeat this step.
          </p>
        </div>
      )}
    </div>
  );
}

function CompanyForm({ company, onClose, onSaved, setToast }) {
  const [form, setForm] = useState(() => {
    if (!company) return EMPTY_FORM;
    return {
      ...EMPTY_FORM,
      ...Object.fromEntries(
        Object.keys(EMPTY_FORM)
          .filter((k) => k !== 'signers' && k !== 'tax_id')
          .map((k) => [k, company[k] ?? '']),
      ),
      tax_id: '',
      signers: (company.signers || []).length
        ? company.signers.map((s) => ({ signer_name: s.signer_name, signer_title: s.signer_title }))
        : EMPTY_FORM.signers,
    };
  });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setSigner = (i, k) => (e) => {
    const signers = form.signers.map((s, j) => (j === i ? { ...s, [k]: e.target.value } : s));
    setForm({ ...form, signers });
  };

  const submit = async () => {
    if (!form.legal_name.trim() || form.country.trim().length !== 2) {
      setToast({ type: 'error', message: 'Legal name and 2-letter country are required' });
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...form,
        country: form.country.toUpperCase(),
        tax_id: form.tax_id.trim() || undefined,
        signers: form.signers.filter((s) => s.signer_name.trim() && s.signer_title.trim()),
      };
      const { ok, status, body } = await coJson(
        company ? `/api/portal/data/co-parties/${company.id}` : '/api/portal/data/co-parties',
        { method: company ? 'PATCH' : 'POST', body: JSON.stringify(payload) },
      );
      if (ok) {
        setToast({ type: 'success', message: company ? 'Company updated' : 'Company added' });
        onSaved();
      } else {
        setToast({
          type: 'error',
          message: apiDetail(body, status === 409 ? 'This company is locked — contact Y7' : 'Save failed'),
        });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ ...cardStyle, border: `2px solid ${colors.accent}` }}>
      <div style={sectionTitle}>{company ? `Edit ${company.legal_name}` : 'New company'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        <label style={{ gridColumn: '1 / -1' }}>
          <span style={fieldLabel}>Legal company name *</span>
          <input style={fieldInput} value={form.legal_name} onChange={set('legal_name')} placeholder="Exactly as on the auction invoice" />
        </label>
        <label><span style={fieldLabel}>Address line 1</span><input style={fieldInput} value={form.address_line1} onChange={set('address_line1')} /></label>
        <label><span style={fieldLabel}>Address line 2</span><input style={fieldInput} value={form.address_line2} onChange={set('address_line2')} /></label>
        <label><span style={fieldLabel}>City</span><input style={fieldInput} value={form.city} onChange={set('city')} /></label>
        <label><span style={fieldLabel}>State</span><input style={fieldInput} value={form.state_region} onChange={set('state_region')} /></label>
        <label><span style={fieldLabel}>ZIP</span><input style={fieldInput} value={form.zip} onChange={set('zip')} /></label>
        <label><span style={fieldLabel}>Country (2 letters) *</span><input style={fieldInput} value={form.country} onChange={set('country')} maxLength={2} /></label>
        <label><span style={fieldLabel}>Phone</span><input style={fieldInput} value={form.phone} onChange={set('phone')} /></label>
        <label><span style={fieldLabel}>Email</span><input style={fieldInput} value={form.email} onChange={set('email')} /></label>
        <label>
          <span style={fieldLabel}>EIN {company?.tax_id_masked ? `(current ${company.tax_id_masked})` : '*'}</span>
          <input style={fieldInput} value={form.tax_id} onChange={set('tax_id')} placeholder={company ? 'Leave empty to keep current' : 'XX-XXXXXXX'} />
        </label>
      </div>

      <div style={{ ...sectionTitle, marginTop: 16 }}>Authorized signer(s)</div>
      {form.signers.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <input style={{ ...fieldInput, flex: 2, minWidth: 160 }} value={s.signer_name} onChange={setSigner(i, 'signer_name')} placeholder="Full name" />
          <input style={{ ...fieldInput, flex: 2, minWidth: 140 }} value={s.signer_title} onChange={setSigner(i, 'signer_title')} placeholder="Title (President, Director…)" />
          {form.signers.length > 1 && (
            <button
              style={{ ...btnStyles.secondary, padding: '6px 12px' }}
              onClick={() => setForm({ ...form, signers: form.signers.filter((_, j) => j !== i) })}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        style={{ ...btnStyles.secondary, padding: '6px 12px', fontSize: 13 }}
        onClick={() => setForm({ ...form, signers: [...form.signers, { signer_name: '', signer_title: '' }] })}
      >
        + another signer
      </button>

      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        <button style={{ ...btnStyles.accent, opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={submit}>
          {busy ? 'Saving…' : 'Save company'}
        </button>
        <button style={btnStyles.secondary} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
