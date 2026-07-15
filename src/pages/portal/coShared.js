// CO-3W shared bits: statuses, badges, API helpers for the Certificate of
// Origin portal pages. JSON via portalFetch; uploads via raw fetch+authHeader
// (portalFetch forces JSON content-type and would kill the FormData boundary).
import { API_URL } from '../../config';
import { authHeader, clearSessionOn401, portalFetch } from '../../hooks/useAuth';
import { colors } from '../../theme';

export const CO_STATUS_BADGE = {
  screening: { label: 'Screening', color: '#495057', backgroundColor: '#e9ecef' },
  eligible: { label: 'Eligible', color: '#0F6E56', backgroundColor: '#d1e7dd' },
  ineligible: { label: 'Not eligible', color: '#842029', backgroundColor: '#f8d7da' },
  needs_review: { label: 'Needs review', color: '#664d03', backgroundColor: '#fff3cd' },
  docs_pending: { label: 'Documents pending', color: '#084298', backgroundColor: '#cfe2ff' },
  docs_complete: { label: 'Documents complete', color: '#0F6E56', backgroundColor: '#d2f4ea' },
  filed: { label: 'Filed', color: '#3d2c8d', backgroundColor: '#e2d9f3' },
  issued: { label: 'Issued', color: '#fff', backgroundColor: '#0F6E56' },
  rejected: { label: 'Rejected', color: '#fff', backgroundColor: '#842029' },
};

export const AUTH_STATUS_INFO = {
  draft: { label: 'Company details incomplete', color: '#495057', backgroundColor: '#e9ecef' },
  info_complete: { label: 'Ready — download the letter', color: '#084298', backgroundColor: '#cfe2ff' },
  letter_downloaded: { label: 'Letter downloaded — sign & upload', color: '#664d03', backgroundColor: '#fff3cd' },
  signed_uploaded: { label: 'Pending Y7 review', color: '#3d2c8d', backgroundColor: '#e2d9f3' },
  approved: { label: 'Approved', color: '#0F6E56', backgroundColor: '#d1e7dd' },
  rejected: { label: 'Rejected — see note', color: '#842029', backgroundColor: '#f8d7da' },
};

export const TITLE_TYPES = [
  { value: 'clean', hint: 'Regular transferable title' },
  { value: 'salvage', hint: 'Salvage title — still eligible' },
  { value: 'rebuilt', hint: 'Rebuilt/restored title — still eligible' },
  { value: 'bill_of_sale_only', hint: 'No title, bill of sale only — NOT eligible' },
  { value: 'cert_of_destruction', hint: 'Certificate of destruction — NOT eligible' },
  { value: 'non_repairable', hint: 'Non-repairable certificate — NOT eligible' },
  { value: 'parts_only', hint: 'Parts-only — NOT eligible' },
  { value: 'unknown', hint: "Not sure yet — we'll verify" },
];

export function badgeStyle(b) {
  return {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    color: b.color,
    backgroundColor: b.backgroundColor,
    whiteSpace: 'nowrap',
  };
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return isNaN(d) ? '—' : d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export async function coJson(path, options) {
  const r = await portalFetch(path, options);
  let body = null;
  try { body = await r.json(); } catch { /* empty body */ }
  return { ok: r.ok, status: r.status, body };
}

export function apiDetail(body, fallback) {
  if (!body) return fallback;
  if (typeof body.detail === 'string') return body.detail;
  return fallback;
}

export async function coUpload(path, file, extraFields = {}) {
  const fd = new FormData();
  Object.entries(extraFields).forEach(([k, v]) => fd.append(k, v));
  fd.append('file', file);
  const r = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: authHeader(),
    body: fd,
  });
  clearSessionOn401(r.status);
  let body = null;
  try { body = await r.json(); } catch { /* no body */ }
  return { ok: r.ok, status: r.status, body };
}

// Shared field styles (theme-token based, matches portal form conventions)
export const fieldLabel = {
  display: 'block', fontSize: 13, fontWeight: 600, color: colors.text,
  marginBottom: 4,
};
export const fieldInput = {
  width: '100%', boxSizing: 'border-box', padding: '9px 12px', fontSize: 14,
  border: `1px solid ${colors.border}`, borderRadius: 8, background: '#fff',
};
export const cardStyle = {
  background: '#fff', border: `1px solid ${colors.border}`, borderRadius: 12,
  padding: 20, marginBottom: 16,
};
export const sectionTitle = {
  fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
  color: '#6b6b68', margin: '0 0 12px',
};
