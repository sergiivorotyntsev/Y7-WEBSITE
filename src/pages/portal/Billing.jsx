import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';
import { API_URL } from '../../config';

const isoDate = (d) => d.toISOString().slice(0, 10);

function fmt(cents) {
  if (cents == null) return '$0.00';
  const val = cents / 100;
  return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const STATUS_STYLES = {
  draft: { bg: '#F3F4F6', color: '#374151' },
  sent: { bg: '#DBEAFE', color: '#1E40AF' },
  paid: { bg: '#D1FAE5', color: '#065F46' },
  overdue: { bg: '#FEE2E2', color: '#991B1B' },
  cancelled: { bg: '#F3F4F6', color: '#9CA3AF' },
};

export default function Billing() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const [from, setFrom] = useState(isoDate(new Date(now.getFullYear(), now.getMonth(), 1)));
  const [to, setTo] = useState(isoDate(now));

  useEffect(() => {
    // EXP-F6: revised money model — show only Y7 service-fee invoices + the
    // outstanding-fee total. The off-app funding account (transport/storage/
    // dry-run) is NOT tracked, so no balance card and no ledger transactions.
    Promise.all([
      portalFetch('/api/portal/billing/summary').then(r => r.json()),
      portalFetch('/api/portal/billing/invoices').then(r => r.json()),
    ]).then(([summary, invs]) => {
      setData(summary);
      setInvoices(invs.invoices || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }

  if (!data?.is_dealer) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
        <PageMeta title="Billing" />
        <p style={{ fontFamily: fonts.sans, color: colors.textMuted }}>Billing is available for dealer accounts only.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="Billing & Invoices" />

      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
        display: 'inline-block', marginBottom: '20px',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '24px' }}>
        Billing & Invoices
      </h1>

      {/* AR-5: balance owed (from the dealer ledger). balance_cents is signed —
          negative = the dealer owes Y7; positive = credit on account. */}
      {(() => {
        const bal = data.balance_cents || 0;
        const owed = bal < 0 ? -bal : 0;
        const credit = bal > 0 ? bal : 0;
        return (
          <div style={{
            background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
            padding: '20px 24px', marginBottom: '16px',
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {credit > 0 ? 'Credit on account' : 'Balance owed'}
            </div>
            <div style={{
              fontFamily: fonts.serif, fontSize: '32px', fontWeight: 700,
              color: owed > 0 ? '#993C1D' : '#059669',
            }}>
              {fmt(credit > 0 ? credit : owed)}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginTop: '4px', lineHeight: 1.5 }}>
              {owed > 0
                ? 'Y7 service fees accrued on completed orders, less payments received.'
                : 'You have no outstanding Y7 service-fee balance.'}
            </div>
          </div>
        );
      })()}

      {/* EXP-F6: outstanding Y7 service fees (unpaid invoices). No funding-account
          balance; that account is off-app. */}
      <div style={{
        background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
        padding: '20px 24px', marginBottom: '24px',
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Outstanding Y7 service fees
        </div>
        <div style={{
          fontFamily: fonts.serif, fontSize: '32px', fontWeight: 700,
          color: (data.outstanding_fees_cents || 0) > 0 ? '#993C1D' : '#059669',
        }}>
          {fmt(data.outstanding_fees_cents)}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginTop: '4px', lineHeight: 1.5 }}>
          Y7 invoices bill the Y7 service fee only. Transport, storage, and other
          costs are paid from your funding account.
        </div>
      </div>

      <h2 style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
        Invoices
      </h2>
      <div>
          {invoices.length === 0 ? (
            <p style={{ fontFamily: fonts.sans, color: colors.textMuted, fontSize: '13px', textAlign: 'center', padding: '32px 0' }}>
              No invoices yet.
            </p>
          ) : invoices.map(inv => {
            const st = STATUS_STYLES[inv.status] || STATUS_STYLES.draft;
            return (
              <div key={inv.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px', borderBottom: `1px solid ${colors.border}`,
              }}>
                <div>
                  <div style={{ fontFamily: fonts.mono, fontSize: '13px', fontWeight: 600 }}>{inv.invoice_number}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted }}>
                    {inv.period_start} to {inv.period_end}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 600,
                    background: st.bg, color: st.color, fontFamily: fonts.sans,
                  }}>{inv.status}</span>
                  <span style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 700 }}>
                    {fmt(inv.total_due_cents)}
                  </span>
                  <a
                    href={`${API_URL}/api/portal/billing/invoice/${inv.id}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.accent }}
                  >
                    PDF
                  </a>
                </div>
              </div>
            );
          })}
      </div>

      {/* AR-5: account activity — the dealer ledger (charges + payments). */}
      {data.recent_transactions && data.recent_transactions.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
            Account activity
          </h2>
          {data.recent_transactions.map(tx => {
            const credit = (tx.amount_cents || 0) >= 0;
            const label = {
              service_fee: 'Y7 service fee',
              deposit: 'Payment received',
              carrier_payment: 'Carrier payment',
              adjustment_credit: 'Credit adjustment',
              adjustment_debit: 'Debit adjustment',
              refund: 'Refund',
            }[tx.transaction_type] || tx.transaction_type;
            return (
              <div key={tx.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', borderBottom: `1px solid ${colors.border}`,
              }}>
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text }}>{label}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted }}>
                    {tx.description || ''}{tx.created_at ? ` · ${String(tx.created_at).slice(0, 10)}` : ''}
                  </div>
                </div>
                <span style={{
                  fontFamily: fonts.sans, fontSize: '14px', fontWeight: 700,
                  color: credit ? '#059669' : '#993C1D',
                }}>
                  {credit ? '+' : '−'}{fmt(Math.abs(tx.amount_cents || 0))}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* EXP-G1: cost-breakdown report — self-serve, scoped to this account */}
      <div style={{
        marginTop: '32px', padding: '16px 20px',
        background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
      }}>
        <h2 style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>
          Cost-breakdown report
        </h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginBottom: '12px', lineHeight: 1.5 }}>
          Per-load carrier, storage, dry-run and Y7-fee breakdown for a period —
          funding-account costs and Y7 service fees are shown separately.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <label style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted }}>
            From<br />
            <input type="date" value={from} onChange={e => setFrom(e.target.value)}
              style={{ fontFamily: fonts.sans, fontSize: '16px', padding: '8px 10px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.bgInput, color: colors.text }} />
          </label>
          <label style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted }}>
            To<br />
            <input type="date" value={to} onChange={e => setTo(e.target.value)}
              style={{ fontFamily: fonts.sans, fontSize: '16px', padding: '8px 10px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.bgInput, color: colors.text }} />
          </label>
          <a href={`${API_URL}/api/portal/billing/cost-report?date_from=${from}&date_to=${to}&format=xlsx`}
            target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyles.accent, padding: '9px 16px', fontSize: '13px', textDecoration: 'none', display: 'inline-block' }}>
            Download Excel
          </a>
          <a href={`${API_URL}/api/portal/billing/cost-report?date_from=${from}&date_to=${to}&format=pdf`}
            target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyles.secondary, padding: '9px 16px', fontSize: '13px', textDecoration: 'none', display: 'inline-block', border: `1px solid ${colors.border}` }}>
            Download PDF
          </a>
        </div>
      </div>

      {/* Payment instructions */}
      <div style={{
        marginTop: '32px', padding: '16px 20px',
        background: colors.bgMuted, borderRadius: '12px',
        fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, color: colors.text, marginBottom: '6px' }}>How to Pay</div>
        These invoices cover the Y7 service fee only. Please remit payment by the
        date on each invoice via ACH or wire transfer to the Y7 account on file.
        Transport, storage, and other carrier costs are funded separately from your
        funding account. For questions, contact info@y7agency.com or @y7dispatch_bot on Telegram.
      </div>
    </div>
  );
}
