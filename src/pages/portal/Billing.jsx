import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';

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

const TX_LABELS = {
  deposit: 'Deposit',
  carrier_payment: 'Carrier Payment',
  service_fee: 'Service Fee',
  adjustment_credit: 'Credit',
  adjustment_debit: 'Debit',
  refund: 'Refund',
};

export default function Billing() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('invoices');

  useEffect(() => {
    Promise.all([
      portalFetch('/api/portal/billing/summary').then(r => r.json()),
      portalFetch('/api/portal/billing/invoices').then(r => r.json()),
      portalFetch('/api/portal/billing/transactions?limit=30').then(r => r.json()),
    ]).then(([summary, invs, txs]) => {
      setData(summary);
      setInvoices(invs.invoices || []);
      setTransactions(txs.transactions || []);
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

  const tabStyle = (active) => ({
    padding: '8px 20px',
    fontSize: '13px',
    fontFamily: fonts.sans,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? `2px solid ${colors.accent}` : '2px solid transparent',
    background: 'none',
    color: active ? colors.text : colors.textMuted,
  });

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

      {/* Balance card */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
        padding: '20px 24px', marginBottom: '24px',
      }}>
        <div>
          <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Balance
          </div>
          <div style={{
            fontFamily: fonts.serif, fontSize: '32px', fontWeight: 700,
            color: (data.balance_cents || 0) < 0 ? '#DC2626' : '#059669',
          }}>
            {fmt(data.balance_cents)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>
            {data.billing_mode === 'prepay_manual_invoice' ? 'Prepay — Invoice' : 'Pay per Delivery'}
          </div>
          {data.is_blocked && (
            <div style={{
              marginTop: '6px', padding: '4px 10px', borderRadius: '12px',
              background: '#FEE2E2', color: '#991B1B',
              fontSize: '11px', fontWeight: 600, fontFamily: fonts.sans,
            }}>
              New orders paused
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${colors.border}`, marginBottom: '20px' }}>
        <button style={tabStyle(tab === 'invoices')} onClick={() => setTab('invoices')}>Invoices</button>
        <button style={tabStyle(tab === 'transactions')} onClick={() => setTab('transactions')}>Transactions</button>
      </div>

      {/* Invoices tab */}
      {tab === 'invoices' && (
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
                    href={`/api/portal/billing/invoice/${inv.id}/download`}
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
      )}

      {/* Transactions tab */}
      {tab === 'transactions' && (
        <div>
          {transactions.length === 0 ? (
            <p style={{ fontFamily: fonts.sans, color: colors.textMuted, fontSize: '13px', textAlign: 'center', padding: '32px 0' }}>
              No transactions yet.
            </p>
          ) : transactions.map(tx => (
            <div key={tx.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', borderBottom: `1px solid ${colors.border}`,
            }}>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600 }}>
                  {TX_LABELS[tx.transaction_type] || tx.transaction_type}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted }}>
                  {tx.description}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: fonts.sans, fontSize: '14px', fontWeight: 700,
                  color: tx.amount_cents >= 0 ? '#059669' : '#DC2626',
                }}>
                  {tx.amount_cents >= 0 ? '+' : ''}{fmt(tx.amount_cents)}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '10px', color: colors.textMuted }}>
                  Bal: {fmt(tx.balance_after_cents)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment instructions */}
      <div style={{
        marginTop: '32px', padding: '16px 20px',
        background: colors.bgMuted, borderRadius: '12px',
        fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, color: colors.text, marginBottom: '6px' }}>How to Pay</div>
        Please remit payment via ACH or wire transfer to the bank account on file.
        Payment is due by the date on each invoice to ensure uninterrupted carrier payments.
        For questions, contact dispatch@y7agency.com or @y7dispatch_bot on Telegram.
      </div>
    </div>
  );
}
