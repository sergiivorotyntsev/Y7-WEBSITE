// CO-3W T04: CO request workspace — verdict, companies/consignee, checklist, submit.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import Toast from '../../components/Toast';
import { colors } from '../../theme';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';
import {
  CO_STATUS_BADGE, TITLE_TYPES, apiDetail, chipClass, coJson,
  coUpload, fieldInput, fieldLabel, fmtDate, sectionTitle, truncateFilename,
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
    return <div className={`${pp.shell} ${pp.measureMid}`} style={{ color: 'var(--v2-ink-muted, #5c5851)' }}>Loading…</div>;
  }
  if (co.missing) {
    return (
      <div className={`${pp.shell} ${pp.measureMid}`}>
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
    <div className={`${pp.shell} ${pp.measureMid}`}>
      <PageMeta title={`CO request #${id} — Y7 Portal`} path={`/portal/co/requests/${id}`} />
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <Link to="/portal/co" className={pp.backLink}>← All CO requests</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 4px', flexWrap: 'wrap' }}>
        <h1 className={pp.pageTitle}>CO request #{co.id}</h1>
        <span className={chipClass(badge.variant)}>{badge.label}</span>
      </div>
      <p className={pp.pageSub} style={{ marginTop: 0 }}>
        <span className={pp.mono}>{co.vin}</span>
        {vehicle ? ` · ${vehicle}` : ''}
        {co.plant_country ? ` · manufactured: ${co.plant_country}` : ''}
      </p>

      {co.customer_submitted_at && (
        <div className={pp.successBlock} style={{ marginBottom: 16 }}>
          Submitted to Y7 for review on {fmtDate(co.customer_submitted_at)}. We will take it
          from here — you can still update documents if something changes.
        </div>
      )}

      {co.status === 'needs_review' && !co.title_type_confirmed && (
        <TitleConfirm co={co} reload={load} setToast={setToast} />
      )}

      {co.status === 'ineligible' && (
        <div className={pp.errorBlock} style={{ marginBottom: 16 }}>
          {co.ineligible_reason === 'origin'
            ? `This vehicle was manufactured in ${co.plant_country || 'another country'} and does not qualify for a US Certificate of Origin.`
            : 'The confirmed title type does not allow a Certificate of Origin (a transferable vehicle title is required).'}
        </div>
      )}

      {!terminal && (
        <>
          <div className={pp.card}>
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
              <p className={pp.notice} style={{ marginTop: 10, marginBottom: 0 }}>
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
        <div className={pp.card}>
          <div style={sectionTitle}>History</div>
          {co.history.map((h, i) => (
            <div key={i} className={pp.row} style={{ fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)' }}>
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
    <div className={pp.card}>
      <strong>What title does this vehicle have?</strong>
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
        <button className={v2b.ghostOnPaper} style={{ opacity: !pick || busy ? 0.5 : 1 }} disabled={!pick || busy} onClick={confirm}>
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
    <div className={pp.card}>
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
        <p style={{ fontSize: 14, margin: 0, color: 'var(--v2-ink-muted, #5c5851)' }}>
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
                  style={{ margin: '0 6px 6px 0', padding: '4px 10px', borderRadius: 12, border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', background: 'var(--v2-card-cream, #fffaf1)', cursor: 'pointer', fontSize: 13 }}
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
            className={v2b.ghostOnPaper}
            style={{ marginTop: 10, opacity: busy ? 0.5 : 1 }}
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
  // CO5W-T02: `owner` IS the standalone discriminator — the API computes it
  // from the same helper that whitelists the upload route
  // (portal_data._portal_upload_roles: auction_invoice joins the customer's
  // slots iff order_id and extraction_run_id are both NULL). So we mirror the
  // whitelist and special-case nothing: a y7-owned auction_invoice can only be
  // an order/run-linked request, where the run's source document is already
  // attached — hence the different read-only wording below.
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', fontSize: 14 }}>
      <span style={{ width: 14, textAlign: 'center', color: slot.filled ? 'var(--success, #0f6e56)' : 'var(--v2-ink-muted, #5c5851)' }}>
        {slot.filled ? '✓' : slot.required ? '•' : '○'}
      </span>
      <span style={{ flex: 1 }}>
        {label}
        {!slot.required && <span style={{ color: 'var(--v2-ink-muted, #5c5851)' }}> (optional)</span>}
      </span>
      {slot.filled ? (
        <span style={{ fontSize: 12, textAlign: 'right', lineHeight: 1.4, maxWidth: 240 }}>
          {slot.filename && (
            <span
              className={pp.mono}
              title={slot.filename}
              style={{ display: 'block', color: 'var(--v2-ink, #050607)' }}
            >
              {truncateFilename(slot.filename)}
            </span>
          )}
          <span style={{ color: 'var(--success, #0f6e56)' }}>
            uploaded {slot.filled_at ? fmtDate(slot.filled_at) : ''}
          </span>
        </span>
      ) : yours ? (
        <>
          <button
            className={v2b.ghostOnPaper}
            style={{ padding: '4px 12px', fontSize: 13, opacity: busy ? 0.5 : 1 }}
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
        <span style={{ fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)' }}>
          {slot.slot === 'auction_invoice' ? 'attached automatically' : 'prepared by Y7'}
        </span>
      )}
    </div>
  );
}

function ChecklistCard({ co, reload, setToast }) {
  const slots = (co.checklist || []).filter((s) => s.required || s.owner === 'you' || s.filled);
  return (
    <div className={pp.card}>
      <div style={sectionTitle}>Documents</div>
      {slots.map((s) => <SlotRow key={s.slot} co={co} slot={s} reload={reload} setToast={setToast} />)}
      <p style={{ fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)', margin: '10px 0 0' }}>
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
    <div className={pp.card}>
      <div style={sectionTitle}>
        {co.customer_submitted_at ? 'Submitted — update if needed' : 'Submit for review'}
      </div>
      {!ready && !co.customer_submitted_at && (
        <p style={{ fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)', marginTop: 0 }}>
          Before submitting: select your company, signer and consignee, make sure the signed
          authorization letter is uploaded, and upload
          {yourMissing.length ? ` ${yourMissing.map((s) => s.slot.replace(/_/g, ' ')).join(', ')}` : ' your documents'}.
        </p>
      )}
      {problems && (
        <div className={pp.errorBlock} style={{ marginBottom: 10 }}>
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
        <button className={v2b.cta} style={{ opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={submit}>
          {busy ? 'Submitting…' : co.customer_submitted_at ? 'Re-submit' : 'Submit for review'}
        </button>
      </div>
    </div>
  );
}
