// CO-3W T04: CO request workspace — verdict, companies/consignee, checklist, submit.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import Toast from '../../components/Toast';
import { colors, button as btnStyles } from '../../theme';
import {
  CO_STATUS_BADGE, TITLE_TYPES, apiDetail, badgeStyle, cardStyle, coJson,
  coUpload, fieldInput, fieldLabel, fmtDate, sectionTitle,
} from './coShared';

const EMPTY_CONSIGNEE = {
  legal_name: '', address_line1: '', city: '', zip: '', country: '',
  tax_id: '', tax_id_type: 'VAT',
};

export default function CoRequestDetail() {
  const { id } = useParams();
  const [co, setCo] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [recent, setRecent] = useState([]);
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [reqRes, compRes, recRes] = await Promise.all([
      coJson(`/api/portal/data/co-requests/${id}`),
      coJson('/api/portal/data/co-parties'),
      coJson('/api/portal/data/co-consignees/recent'),
    ]);
    setCo(reqRes.ok ? reqRes.body : { missing: true });
    setCompanies(compRes.ok ? compRes.body.items : []);
    setRecent(recRes.ok ? recRes.body.items : []);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (!co) {
    return <div style={{ maxWidth: 900, margin: '0 auto', padding: 40, color: '#6b6b68' }}>Loading…</div>;
  }
  if (co.missing) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <p>Request not found. <Link to="/portal/co">Back to CO requests</Link></p>
      </div>
    );
  }

  const badge = CO_STATUS_BADGE[co.status] || CO_STATUS_BADGE.screening;
  const vehicle = [co.vehicle?.year, co.vehicle?.make, co.vehicle?.model].filter(Boolean).join(' ');
  const exporter = companies.find((c) => c.id === co.parties?.exporter?.id);
  const terminal = ['ineligible', 'issued', 'rejected'].includes(co.status);

  const patchParties = async (payload, okMsg) => {
    setBusy(true);
    try {
      const { ok, body } = await coJson(`/api/portal/data/co-requests/${id}/parties`, {
        method: 'PATCH', body: JSON.stringify(payload),
      });
      if (ok) {
        if (okMsg) setToast({ type: 'success', message: okMsg });
        await load();
      } else {
        setToast({ type: 'error', message: apiDetail(body, 'Update failed') });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title={`CO request #${id} — Y7 Portal`} path={`/portal/co/requests/${id}`} />
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <Link to="/portal/co" style={{ fontSize: 13, color: colors.accent }}>← All CO requests</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 4px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: 24, margin: 0, color: colors.text }}>CO request #{co.id}</h1>
        <span style={badgeStyle(badge)}>{badge.label}</span>
      </div>
      <p style={{ color: '#6b6b68', fontSize: 14, marginTop: 0 }}>
        <span style={{ fontFamily: 'monospace' }}>{co.vin}</span>
        {vehicle ? ` · ${vehicle}` : ''}
        {co.plant_country ? ` · manufactured: ${co.plant_country}` : ''}
      </p>

      {co.customer_submitted_at && (
        <div style={{ ...cardStyle, background: '#d1e7dd', border: 'none', color: '#0F6E56' }}>
          Submitted to Y7 for review on {fmtDate(co.customer_submitted_at)}. We will take it
          from here — you can still update documents if something changes.
        </div>
      )}

      {co.status === 'needs_review' && !co.title_type_confirmed && (
        <TitleConfirm co={co} reload={load} setToast={setToast} />
      )}

      {co.status === 'ineligible' && (
        <div style={{ ...cardStyle, background: '#f8d7da', border: 'none', color: '#842029' }}>
          {co.ineligible_reason === 'origin'
            ? `This vehicle was manufactured in ${co.plant_country || 'another country'} and does not qualify for a US Certificate of Origin.`
            : 'The confirmed title type does not allow a Certificate of Origin (a transferable vehicle title is required).'}
        </div>
      )}

      {!terminal && (
        <>
          <div style={cardStyle}>
            <div style={sectionTitle}>Exporter company & signer</div>
            {companies.length === 0 ? (
              <p style={{ fontSize: 14, margin: 0 }}>
                No companies yet — <Link to="/portal/co/companies" style={{ color: colors.accent }}>add your company first</Link>.
              </p>
            ) : (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <label style={{ flex: 2, minWidth: 220 }}>
                  <span style={fieldLabel}>Company (buyer on the auction invoice)</span>
                  <select
                    style={fieldInput}
                    disabled={busy}
                    value={co.parties?.exporter?.id || ''}
                    onChange={(e) => patchParties({ exporter_party_id: Number(e.target.value) }, 'Company set')}
                  >
                    <option value="" disabled>— select —</option>
                    {companies.map((c) => <option key={c.id} value={c.id}>{c.legal_name}</option>)}
                  </select>
                </label>
                <label style={{ flex: 2, minWidth: 220 }}>
                  <span style={fieldLabel}>Signer</span>
                  <select
                    style={fieldInput}
                    disabled={busy || !exporter}
                    value={co.parties?.signer?.id || ''}
                    onChange={(e) => patchParties({ signer_id: Number(e.target.value) }, 'Signer set')}
                  >
                    <option value="" disabled>— select —</option>
                    {(exporter?.signers || []).map((s) => (
                      <option key={s.id} value={s.id}>{s.signer_name} ({s.signer_title})</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {exporter && exporter.authorization_status !== 'approved' && (
              <p style={{ fontSize: 13, background: '#fff3cd', color: '#664d03', borderRadius: 8, padding: '8px 12px', marginTop: 10, marginBottom: 0 }}>
                {exporter.legal_name}'s authorization letter is not approved yet
                ({(exporter.authorization_status || 'draft').replace(/_/g, ' ')}). You can submit once
                the signed letter is uploaded — filing waits for Y7's approval.{' '}
                <Link to="/portal/co/companies" style={{ color: colors.accent }}>Finish it here →</Link>
              </p>
            )}
          </div>

          <ConsigneeCard co={co} recent={recent} busy={busy} patchParties={patchParties} />
          <ChecklistCard co={co} reload={load} setToast={setToast} />
          <SubmitCard co={co} exporter={exporter} reload={load} setToast={setToast} />
        </>
      )}

      {(co.history || []).length > 0 && (
        <div style={cardStyle}>
          <div style={sectionTitle}>History</div>
          {co.history.map((h, i) => (
            <div key={i} style={{ fontSize: 13, padding: '4px 0', color: '#6b6b68' }}>
              {fmtDate(h.created_at)} — {h.from_status ? `${h.from_status} → ` : ''}{h.to_status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TitleConfirm({ co, reload, setToast }) {
  const [pick, setPick] = useState('');
  const [busy, setBusy] = useState(false);
  const confirm = async () => {
    setBusy(true);
    try {
      const { ok, body } = await coJson(`/api/portal/data/co-requests/${co.id}/title-type`, {
        method: 'POST', body: JSON.stringify({ title_type: pick }),
      });
      if (ok) {
        setToast({ type: 'success', message: 'Thanks — eligibility updated' });
        await reload();
      } else {
        setToast({ type: 'error', message: apiDetail(body, 'Could not update the title type') });
      }
    } finally {
      setBusy(false);
    }
  };
  return (
    <div style={{ ...cardStyle, background: '#fff3cd', border: 'none' }}>
      <strong style={{ color: '#664d03' }}>What title does this vehicle have?</strong>
      <p style={{ fontSize: 13, margin: '6px 0 10px' }}>
        Telling us the title type lets the eligibility check finish right away.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <select style={{ ...fieldInput, maxWidth: 320 }} value={pick} onChange={(e) => setPick(e.target.value)}>
          <option value="" disabled>— select the title type —</option>
          {TITLE_TYPES.filter((t) => t.value !== 'unknown').map((t) => (
            <option key={t.value} value={t.value}>{t.value.replace(/_/g, ' ')} — {t.hint}</option>
          ))}
        </select>
        <button style={{ ...btnStyles.accent, opacity: !pick || busy ? 0.5 : 1 }} disabled={!pick || busy} onClick={confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

function ConsigneeCard({ co, recent, busy, patchParties }) {
  const [form, setForm] = useState(EMPTY_CONSIGNEE);
  const [open, setOpen] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const current = co.parties?.consignee;

  return (
    <div style={cardStyle}>
      <div style={sectionTitle}>Consignee (EU buyer / importer)</div>
      {current ? (
        <p style={{ fontSize: 14, margin: 0 }}>
          <strong>{current.legal_name}</strong>{' '}
          <button
            style={{ border: 'none', background: 'none', color: colors.accent, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
            onClick={() => setOpen(!open)}
          >
            change
          </button>
        </p>
      ) : (
        <p style={{ fontSize: 14, margin: 0, color: '#6b6b68' }}>
          Who receives the vehicle in the EU (appears on the invoice and B/L).
        </p>
      )}

      {(!current || open) && (
        <div style={{ marginTop: 12 }}>
          {recent.length > 0 && (
            <div style={{ marginBottom: 10, fontSize: 13 }}>
              Recent:{' '}
              {recent.map((p) => (
                <button
                  key={p.id}
                  disabled={busy}
                  style={{ margin: '0 6px 6px 0', padding: '4px 10px', borderRadius: 12, border: `1px solid ${colors.border}`, background: '#fff', cursor: 'pointer', fontSize: 13 }}
                  onClick={() => { patchParties({ consignee_party_id: p.id }, 'Consignee set'); setOpen(false); }}
                >
                  {p.legal_name}
                </button>
              ))}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            <label style={{ gridColumn: '1 / -1' }}>
              <span style={fieldLabel}>Legal name *</span>
              <input style={fieldInput} value={form.legal_name} onChange={set('legal_name')} />
            </label>
            <label><span style={fieldLabel}>Address</span><input style={fieldInput} value={form.address_line1} onChange={set('address_line1')} /></label>
            <label><span style={fieldLabel}>City</span><input style={fieldInput} value={form.city} onChange={set('city')} /></label>
            <label><span style={fieldLabel}>Postal code</span><input style={fieldInput} value={form.zip} onChange={set('zip')} /></label>
            <label><span style={fieldLabel}>Country (2 letters) *</span><input style={fieldInput} value={form.country} onChange={set('country')} maxLength={2} placeholder="PL" /></label>
            <label>
              <span style={fieldLabel}>Tax ID type</span>
              <select style={fieldInput} value={form.tax_id_type} onChange={set('tax_id_type')}>
                <option value="VAT">VAT</option>
                <option value="EORI">EORI</option>
              </select>
            </label>
            <label><span style={fieldLabel}>VAT / EORI number</span><input style={fieldInput} value={form.tax_id} onChange={set('tax_id')} /></label>
          </div>
          <button
            style={{ ...btnStyles.secondary, marginTop: 10, opacity: busy ? 0.5 : 1 }}
            disabled={busy || !form.legal_name.trim() || form.country.trim().length !== 2}
            onClick={() => {
              patchParties({ consignee: { ...form, tax_id: form.tax_id || undefined } }, 'Consignee saved');
              setForm(EMPTY_CONSIGNEE);
              setOpen(false);
            }}
          >
            Save consignee
          </button>
        </div>
      )}
    </div>
  );
}

function SlotRow({ co, slot, reload, setToast }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const label = slot.slot.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const yours = slot.owner === 'you';

  const upload = async (file) => {
    setBusy(true);
    try {
      const { ok, body } = await coUpload(
        `/api/portal/data/co-requests/${co.id}/documents`, file, { doc_role: slot.slot },
      );
      if (ok) {
        setToast({ type: 'success', message: `${label} uploaded` });
        await reload();
      } else {
        setToast({ type: 'error', message: apiDetail(body, 'Upload failed') });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${colors.border}`, fontSize: 14 }}>
      <span style={{ width: 14, textAlign: 'center' }}>
        {slot.filled ? '✓' : slot.required ? '•' : '○'}
      </span>
      <span style={{ flex: 1 }}>
        {label}
        {!slot.required && <span style={{ color: '#adb5bd' }}> (optional)</span>}
      </span>
      {slot.filled ? (
        <span style={{ fontSize: 12, color: '#0F6E56' }}>
          uploaded {slot.filled_at ? fmtDate(slot.filled_at) : ''}
        </span>
      ) : yours ? (
        <>
          <button
            style={{ ...btnStyles.secondary, padding: '4px 12px', fontSize: 13, opacity: busy ? 0.5 : 1 }}
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            {busy ? 'Uploading…' : 'Upload'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
          />
        </>
      ) : (
        <span style={{ fontSize: 12, color: '#6b6b68' }}>prepared by Y7</span>
      )}
    </div>
  );
}

function ChecklistCard({ co, reload, setToast }) {
  const slots = (co.checklist || []).filter((s) => s.required || s.owner === 'you' || s.filled);
  return (
    <div style={cardStyle}>
      <div style={sectionTitle}>Documents</div>
      {slots.map((s) => <SlotRow key={s.slot} co={co} slot={s} reload={reload} setToast={setToast} />)}
      <p style={{ fontSize: 12, color: '#6b6b68', margin: '10px 0 0' }}>
        You upload the documents marked "Upload"; Y7 prepares the rest (NHTSA record,
        commercial invoice, declaration of origin) from your data.
      </p>
    </div>
  );
}

function SubmitCard({ co, exporter, reload, setToast }) {
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [problems, setProblems] = useState(null);

  const yourMissing = (co.checklist || []).filter((s) => s.owner === 'you' && s.required && !s.filled);
  const authOk = exporter && ['signed_uploaded', 'approved'].includes(exporter.authorization_status);
  const ready = co.parties?.exporter && co.parties?.signer && co.parties?.consignee &&
    authOk && yourMissing.length === 0;

  const submit = async () => {
    setBusy(true);
    setProblems(null);
    try {
      const { ok, body } = await coJson(`/api/portal/data/co-requests/${co.id}/submit`, {
        method: 'POST', body: JSON.stringify(note.trim() ? { note: note.trim() } : {}),
      });
      if (ok) {
        setToast({ type: 'success', message: 'Submitted — Y7 will review your request' });
        await reload();
      } else {
        setProblems(apiDetail(body, 'Cannot submit yet'));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={sectionTitle}>
        {co.customer_submitted_at ? 'Submitted — update if needed' : 'Submit for review'}
      </div>
      {!ready && !co.customer_submitted_at && (
        <p style={{ fontSize: 13, color: '#6b6b68', marginTop: 0 }}>
          Before submitting: select your company, signer and consignee, make sure the signed
          authorization letter is uploaded, and upload
          {yourMissing.length ? ` ${yourMissing.map((s) => s.slot.replace(/_/g, ' ')).join(', ')}` : ' your documents'}.
        </p>
      )}
      {problems && (
        <div style={{ fontSize: 13, background: '#f8d7da', color: '#842029', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
          {problems}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input
          style={{ ...fieldInput, flex: 1, minWidth: 220 }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note for Y7 (optional)"
        />
        <button style={{ ...btnStyles.accent, opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={submit}>
          {busy ? 'Submitting…' : co.customer_submitted_at ? 'Re-submit' : 'Submit for review'}
        </button>
      </div>
    </div>
  );
}
