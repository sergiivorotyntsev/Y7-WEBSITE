// CO-3W T03: Certificate of Origin — requests list + new-request screening flow.
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import Toast from '../../components/Toast';
import { colors, button as btnStyles } from '../../theme';
import {
  CO_STATUS_BADGE, TITLE_TYPES, apiDetail, badgeStyle, cardStyle, coJson,
  fieldInput, fieldLabel, fmtDate, sectionTitle,
} from './coShared';

export default function CoRequests() {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [blocked, setBlocked] = useState(null); // 403 explainer
  const [showNew, setShowNew] = useState(false);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    const { ok, status, body } = await coJson('/api/portal/data/co-requests');
    if (ok) {
      setItems(body.items);
    } else if (status === 403) {
      setBlocked(apiDetail(body, 'Available to verified exporter accounts.'));
      setItems([]);
    } else {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="Certificate of Origin — Y7 Portal" path="/portal/co" />
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 26, margin: 0, color: colors.text }}>Certificate of Origin</h1>
        {!blocked && (
          <button style={btnStyles.accent} onClick={() => setShowNew(true)}>New request</button>
        )}
      </div>
      <p style={{ color: '#6b6b68', fontSize: 14, marginTop: 4 }}>
        US origin evidence packages for vehicles you export to the EU — 0% duty instead of 10%
        for US-manufactured vehicles.{' '}
        <Link to="/portal/co/companies" style={{ color: colors.accent }}>My Companies →</Link>
      </p>

      {blocked ? (
        <div style={{ ...cardStyle, background: '#fff3cd', border: 'none' }}>
          <strong>Verification required.</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14 }}>
            {blocked} Complete your exporter verification (company details + agreement) and
            this service unlocks automatically. Questions — info@y7agency.com.
          </p>
        </div>
      ) : items === null ? (
        <p style={{ color: '#6b6b68' }}>Loading…</p>
      ) : (
        <>
          {showNew && (
            <NewRequestFlow
              onClose={() => setShowNew(false)}
              onOpen={(id) => navigate(`/portal/co/requests/${id}`)}
              setToast={setToast}
            />
          )}
          {items.length === 0 && !showNew ? (
            <div style={{ ...cardStyle, textAlign: 'center', padding: 40 }}>
              <p style={{ margin: 0, fontSize: 15 }}>No CO requests yet.</p>
              <p style={{ color: '#6b6b68', fontSize: 14 }}>
                Start with a free VIN check — takes a few seconds.
              </p>
              <button style={btnStyles.accent} onClick={() => setShowNew(true)}>Check a VIN</button>
            </div>
          ) : (
            items.map((r) => <RequestRow key={r.id} r={r} />)
          )}
        </>
      )}
    </div>
  );
}

function actionHint(r) {
  if (r.status === 'needs_review' && !r.title_type) {
    return 'Action: confirm the title type';
  }
  if (r.status === 'docs_pending' && !r.customer_submitted_at) {
    const missing = (r.checklist || []).filter((s) => s.owner === 'you' && s.required && !s.filled);
    if (missing.length) return `Action: upload ${missing.map((s) => s.slot.replace(/_/g, ' ')).join(', ')}`;
    return 'Action: review and submit';
  }
  return null;
}

function RequestRow({ r }) {
  const badge = CO_STATUS_BADGE[r.status] || CO_STATUS_BADGE.screening;
  const vehicle = [r.vehicle?.year, r.vehicle?.make, r.vehicle?.model].filter(Boolean).join(' ');
  const hint = actionHint(r);
  return (
    <Link to={`/portal/co/requests/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ ...cardStyle, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', cursor: 'pointer' }}>
        <span style={badgeStyle(badge)}>{badge.label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{r.vin}</span>
        <span style={{ fontSize: 14 }}>{vehicle || '—'}</span>
        <span style={{ flex: 1 }} />
        {hint && <span style={{ fontSize: 12, color: colors.accent, fontWeight: 600 }}>{hint}</span>}
        <span style={{ fontSize: 12, color: '#6b6b68' }}>{fmtDate(r.created_at)}</span>
      </div>
    </Link>
  );
}

function NewRequestFlow({ onClose, onOpen, setToast }) {
  const [vin, setVin] = useState('');
  const [titleType, setTitleType] = useState('unknown');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const screen = async () => {
    if (vin.trim().length !== 17) {
      setToast({ type: 'error', message: 'VIN must be exactly 17 characters' });
      return;
    }
    setBusy(true);
    try {
      const { ok, status, body } = await coJson('/api/portal/data/co-requests', {
        method: 'POST',
        body: JSON.stringify({ vin: vin.trim().toUpperCase(), title_type: titleType }),
      });
      if (ok) {
        setResult(body);
      } else if (status === 429) {
        setToast({ type: 'error', message: 'Daily check limit reached — please try again tomorrow.' });
      } else if (status === 403) {
        setToast({ type: 'error', message: apiDetail(body, 'Verified exporter account required.') });
      } else {
        setToast({ type: 'error', message: apiDetail(body, 'Screening failed — check the VIN.') });
      }
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return <VerdictCard result={result} onOpen={onOpen} onClose={onClose} />;
  }

  const hint = TITLE_TYPES.find((t) => t.value === titleType)?.hint;

  return (
    <div style={{ ...cardStyle, border: `2px solid ${colors.accent}` }}>
      <div style={sectionTitle}>New CO request — free VIN check</div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={{ flex: 2, minWidth: 220 }}>
          <span style={fieldLabel}>VIN</span>
          <input
            style={{ ...fieldInput, fontFamily: 'monospace', textTransform: 'uppercase' }}
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            maxLength={17}
            placeholder="17 characters"
          />
        </label>
        <label style={{ flex: 2, minWidth: 200 }}>
          <span style={fieldLabel}>Title type</span>
          <select style={fieldInput} value={titleType} onChange={(e) => setTitleType(e.target.value)}>
            {TITLE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.value.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </label>
        <button style={{ ...btnStyles.accent, opacity: busy ? 0.6 : 1 }} disabled={busy} onClick={screen}>
          {busy ? 'Checking…' : 'Check eligibility'}
        </button>
        <button style={btnStyles.secondary} onClick={onClose}>Cancel</button>
      </div>
      {hint && <p style={{ fontSize: 12, color: '#6b6b68', margin: '8px 0 0' }}>{hint}</p>}
    </div>
  );
}

function VerdictCard({ result, onOpen, onClose }) {
  const vehicle = [result.vehicle?.year, result.vehicle?.make, result.vehicle?.model]
    .filter(Boolean).join(' ');

  let tone; let headline; let text;
  if (result.status === 'eligible') {
    tone = { background: '#d1e7dd', color: '#0F6E56' };
    headline = '✓ Eligible for a US Certificate of Origin';
    text = `${vehicle || 'This vehicle'} was manufactured in the United States` +
      (result.plant_country ? ` (${result.plant_country})` : '') +
      '. Continue to collect the documents.';
  } else if (result.status === 'ineligible') {
    tone = { background: '#f8d7da', color: '#842029' };
    headline = 'Not eligible';
    text = result.ineligible_reason === 'origin'
      ? `This vehicle was manufactured in ${result.plant_country || 'another country'} — only US-manufactured vehicles qualify for a US Certificate of Origin.`
      : 'The title type you selected does not allow a Certificate of Origin — a transferable vehicle title is required (bill-of-sale-only, destruction, non-repairable and parts-only vehicles do not qualify).';
  } else {
    tone = { background: '#fff3cd', color: '#664d03' };
    headline = 'Needs a quick review';
    text = 'We could not automatically confirm the manufacturing data for this VIN. ' +
      'Our team will verify it — meanwhile you can open the request and add details.';
  }

  return (
    <div style={{ ...cardStyle, background: tone.background, border: 'none' }}>
      <strong style={{ color: tone.color, fontSize: 16 }}>{headline}</strong>
      <p style={{ fontSize: 14, margin: '8px 0 14px', color: colors.text }}>{text}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {result.status !== 'ineligible' && (
          <button style={btnStyles.accent} onClick={() => onOpen(result.id)}>
            Open the request →
          </button>
        )}
        <button style={btnStyles.secondary} onClick={onClose}>
          {result.status === 'ineligible' ? 'Close' : 'Later'}
        </button>
      </div>
    </div>
  );
}
