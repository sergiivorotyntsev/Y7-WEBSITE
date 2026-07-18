import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts } from '../../theme';
import { API_URL } from '../../config';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

const isoDate = (d) => d.toISOString().slice(0, 10);

function fmt(cents) {
  if (cents == null) return '$0.00';
  const val = cents / 100;
  return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Invoice-status -> C0 chip variant. draft/sent/cancelled read as neutral
// information (chipInk); paid is the Bonded-Pine success state; overdue is the
// only action-required (red) status. (Replaces the old bootstrap status map.)
function statusChip(status) {
  if (status === 'paid') return pp.chipPine;
  if (status === 'overdue') return pp.chipRed;
  return pp.chipInk;
}

// Download affordances inside dense rows: ink underline link, not a button.
const inkLink = {
  fontFamily: 'var(--font-sans, system-ui)',
  fontSize: '12px',
  color: 'var(--v2-ink, #050607)',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
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
      <div className={`${pp.shell} ${pp.measureNarrow}`}>
        <PageMeta title="Billing" />
        <p style={{ fontFamily: fonts.sans, color: colors.textMuted }}>Billing is available for dealer accounts only.</p>
      </div>
    );
  }

  return (
    <div className={`${pp.shell} ${pp.measureMid}`}>
      <PageMeta title="Billing & Invoices" />

      <Link to="/portal/dashboard" className={pp.backLink}>
        &larr; Back to Dashboard
      </Link>

      <h1 className={pp.pageTitle}>Billing & Invoices</h1>

      {/* AR-5: balance owed (from the dealer ledger). balance_cents is signed —
          negative = the dealer owes Y7; positive = credit on account. */}
      {(() => {
        const bal = data.balance_cents || 0;
        const owed = bal < 0 ? -bal : 0;
        const credit = bal > 0 ? bal : 0;
        return (
          <div className={pp.card} style={{ marginTop: '24px' }}>
            <div className={pp.sectionTitle}>
              {credit > 0 ? 'Credit on account' : 'Balance owed'}
            </div>
            <div className={pp.mono} style={{ fontSize: '32px', color: owed > 0 ? 'var(--v2-red-deep, #a90918)' : colors.success }}>
              {fmt(credit > 0 ? credit : owed)}
            </div>
            <div className={pp.hint}>
              {owed > 0
                ? 'Y7 service fees accrued on completed orders, less payments received.'
                : 'You have no outstanding Y7 service-fee balance.'}
            </div>
          </div>
        );
      })()}

      {/* EXP-F6: outstanding Y7 service fees (unpaid invoices). No funding-account
          balance; that account is off-app. */}
      <div className={pp.card}>
        <div className={pp.sectionTitle}>Outstanding Y7 service fees</div>
        <div className={pp.mono} style={{ fontSize: '32px', color: (data.outstanding_fees_cents || 0) > 0 ? 'var(--v2-red-deep, #a90918)' : colors.success }}>
          {fmt(data.outstanding_fees_cents)}
        </div>
        <div className={pp.hint}>
          Y7 invoices bill the Y7 service fee only. Transport, storage, and other
          costs are paid from your funding account.
        </div>
      </div>

      <div className={pp.card}>
        <div className={pp.sectionTitle}>Invoices</div>
        {invoices.length === 0 ? (
          <p className={pp.hint} style={{ textAlign: 'center', padding: '20px 0' }}>
            No invoices yet.
          </p>
        ) : invoices.map(inv => (
          <div key={inv.id} className={pp.row}>
            <div>
              <div className={pp.mono} style={{ fontWeight: 600 }}>{inv.invoice_number}</div>
              <div className={pp.hint} style={{ marginTop: '2px' }}>
                {inv.period_start} to {inv.period_end}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={statusChip(inv.status)}>{inv.status}</span>
              <span className={pp.mono} style={{ fontWeight: 600 }}>
                {fmt(inv.total_due_cents)}
              </span>
              <a
                href={`${API_URL}/api/portal/billing/invoice/${inv.id}/download`}
                target="_blank"
                rel="noopener noreferrer"
                style={inkLink}
              >
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* AR-5: account activity — the dealer ledger (charges + payments). */}
      {data.recent_transactions && data.recent_transactions.length > 0 && (
        <div className={pp.card}>
          <div className={pp.sectionTitle}>Account activity</div>
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
              <div key={tx.id} className={pp.row}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>{label}</div>
                  <div className={pp.hint} style={{ marginTop: '2px' }}>
                    {tx.description || ''}{tx.created_at ? ` · ${String(tx.created_at).slice(0, 10)}` : ''}
                  </div>
                </div>
                <span className={pp.mono} style={{ fontWeight: 600, color: credit ? colors.success : 'var(--v2-red-deep, #a90918)' }}>
                  {credit ? '+' : '−'}{fmt(Math.abs(tx.amount_cents || 0))}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* EXP-G1: cost-breakdown report — self-serve, scoped to this account */}
      <div className={pp.card}>
        <div className={pp.sectionTitle}>Cost-breakdown report</div>
        <p className={pp.hint} style={{ marginBottom: '12px' }}>
          Per-load carrier, storage, dry-run and Y7-fee breakdown for a period —
          funding-account costs and Y7 service fees are shown separately.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <label style={{ display: 'block' }}>
            <span className={pp.label}>From</span>
            <input type="date" className={pp.input} style={{ width: 'auto' }} value={from} onChange={e => setFrom(e.target.value)} />
          </label>
          <label style={{ display: 'block' }}>
            <span className={pp.label}>To</span>
            <input type="date" className={pp.input} style={{ width: 'auto' }} value={to} onChange={e => setTo(e.target.value)} />
          </label>
          <a href={`${API_URL}/api/portal/billing/cost-report?date_from=${from}&date_to=${to}&format=xlsx`}
            target="_blank" rel="noopener noreferrer"
            className={v2b.ghostOnPaper}>
            Download Excel
          </a>
          <a href={`${API_URL}/api/portal/billing/cost-report?date_from=${from}&date_to=${to}&format=pdf`}
            target="_blank" rel="noopener noreferrer"
            className={v2b.ghostOnPaper}>
            Download PDF
          </a>
        </div>
      </div>

      {/* Payment instructions */}
      <div className={pp.notice} style={{ marginTop: '32px' }}>
        <div style={{ fontWeight: 600, marginBottom: '6px' }}>How to Pay</div>
        These invoices cover the Y7 service fee only. Please remit payment by the
        date on each invoice via ACH or wire transfer to the Y7 account on file.
        Transport, storage, and other carrier costs are funded separately from your
        funding account. For questions, contact info@y7agency.com or @y7dispatch_bot on Telegram.
      </div>
    </div>
  );
}
