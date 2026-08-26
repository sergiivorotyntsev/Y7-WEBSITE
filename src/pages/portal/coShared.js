// CO-3W shared bits: statuses, badges, API helpers for the Certificate of
// Origin portal pages. JSON via portalFetch; uploads via raw fetch+authHeader
// (portalFetch forces JSON content-type and would kill the FormData boundary).
import { API_URL } from '../../config';
import { authHeader, clearSessionOn401, portalFetch } from '../../hooks/useAuth';
import pp from '../../styles/v2/portal.module.css';

// Status -> C0 chip-variant key (owner ruling; the five bootstrap badge
// palettes collapse into the four chip variants by color family):
//   pine = green (success/verified/issued), red = danger/rejected,
//   soft = amber (pending/attention), ink = gray/blue/purple (neutral).
export const CO_STATUS_BADGE = {
  screening: { label: 'Screening', variant: 'ink' },
  eligible: { label: 'Eligible', variant: 'pine' },
  ineligible: { label: 'Not eligible', variant: 'red' },
  needs_review: { label: 'Needs review', variant: 'soft' },
  docs_pending: { label: 'Documents pending', variant: 'ink' },
  docs_complete: { label: 'Documents complete', variant: 'pine' },
  filed: { label: 'Filed', variant: 'ink' },
  issued: { label: 'Issued', variant: 'pine' },
  rejected: { label: 'Rejected', variant: 'red' },
};

export const AUTH_STATUS_INFO = {
  draft: { label: 'Company details incomplete', variant: 'ink' },
  info_complete: { label: 'Ready — download the letter', variant: 'ink' },
  letter_downloaded: { label: 'Letter downloaded — sign & upload', variant: 'soft' },
  signed_uploaded: { label: 'Pending Y7 review', variant: 'ink' },
  approved: { label: 'Approved', variant: 'pine' },
  rejected: { label: 'Rejected — see note', variant: 'red' },
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

// Maps a status-badge variant key to the C0 chip className (the ONE badge
// system, src/styles/v2/portal.module.css). Consumers: chipClass(badge.variant).
const CHIP_CLASS = {
  ink: pp.chipInk,
  pine: pp.chipPine,
  red: pp.chipRed,
  soft: pp.chipSoft,
};

export function chipClass(variant) {
  return CHIP_CLASS[variant] || pp.chipInk;
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return isNaN(d) ? '—' : d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

// CO5W-T01: filled slots show WHICH file is in them. Long scan names
// ("2019_FORD_F150_1FTEW1E5XKF...auction_invoice_final.pdf") are truncated in
// the MIDDLE so the extension survives — that tail is what tells the customer
// what they uploaded. Callers pass the full name in `title` for the tooltip.
export function truncateFilename(name, max = 30) {
  const s = String(name || '');
  if (s.length <= max) return s;
  const head = Math.ceil((max - 1) / 2);
  const tail = max - 1 - head;
  return `${s.slice(0, head)}…${s.slice(s.length - tail)}`;
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

// Shared field styles — C0 v2 tokens (mirror src/styles/v2/portal.module.css
// so pages spreading these stay on-system without re-declaring the primitives).
export const fieldLabel = {
  display: 'block', marginBottom: 4,
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--v2-ink-muted, #5c5851)',
};
export const fieldInput = {
  width: '100%', boxSizing: 'border-box', padding: '10px 14px', fontSize: 16,
  color: 'var(--v2-ink, #050607)',
  background: 'var(--v2-card-cream, #fffaf1)',
  border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
  borderRadius: 12,
};
export const cardStyle = {
  background: 'var(--v2-card-cream, #fffaf1)',
  border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
  borderRadius: 12, padding: 20, marginBottom: 16,
};
export const sectionTitle = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--v2-ink-muted, #5c5851)',
  margin: '0 0 12px',
};
