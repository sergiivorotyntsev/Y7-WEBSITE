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
  const [loadError, setLoadError] = useState(null);
  const now = new Date();
  const [from, setFrom] = useState(isoDate(new Date(now.getFullYear(), now.getMonth(), 1)));
  const [to, setTo] = useState(isoDate(now));

  useEffect(() => {
    // EXP-F6: revised money model — show only Y7 service-fee invoices + the
    // outstanding-fee total. The off-app funding account (transport/storage/
    // dry-run) is NOT tracked, so no balance card and no ledger transactions.
    // ACC-3-T03: a non-OK response must never masquerade as "billing is for
    // dealer accounts only" (the AGR-2 Locations lesson — a permission error
    // rendering as empty/absent data). Surface the server's message instead.
    const readJson = async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok) {
        throw new Error(
          body.detail?.message || (typeof body.detail === 'string' ? body.detail : `Could not load billing (HTTP ${r.status})`)
        );
      }
      return body;
    };
    Promise.all([
      portalFetch('/api/portal/billing/summary').then(readJson),
      portalFetch('/api/portal/billing/invoices').then(readJson),
    ]).then(([summary, invs]) => {
      setData(summary);
      setInvoices(invs.invoices || []);
      setLoading(false);
    }).catch((e) => { setLoadError(e?.message || 'Could not load billing.'); setLoading(false); });
  }, []);

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }

  if (loadError) {
    return (
      <div className={`${pp.shell} ${pp.measureNarrow}`}>
        <PageMeta title="Billing" />
        <p style={{ fontFamily: fonts.sans, color: colors.textMuted }}>{loadError}</p>
      </div>
    );
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

      {/* BIL-1-T03: ONE "owed" card, and it reads what EXB actually writes.
          There used to be TWO cards here and neither could ever move:
            - "Balance owed" read customers.deposit_balance_cents — a DEPOSIT
              column, 0 for every customer, which EXB never writes and which had
              no business appearing under that heading at all. Removed, not
              re-pointed: the owner's rule is that the money he receives to pay
              carriers is not modelled in this system, and a deposit figure
              rendered as "balance owed" is precisely that conflation.
            - "Outstanding Y7 service fees" summed dealer_invoices, which
              finalize() never writes either (it posts one dealer_ledger row).
          Both now come from services/exporter_billing_balance.outstanding_summary,
          the same call the admin card makes. */}
      <div className={pp.card} style={{ marginTop: '24px' }}>
        <div className={pp.sectionTitle}>
          {(data.credit_cents || 0) > 0 ? 'Credit on account' : 'Outstanding Y7 service fees'}
        </div>
        <div className={pp.mono} style={{ fontSize: '32px', color: (data.outstanding_fees_cents || 0) > 0 ? 'var(--v2-red-deep, #a90918)' : colors.success }}>
          {fmt((data.credit_cents || 0) > 0 ? data.credit_cents : data.outstanding_fees_cents)}
        </div>
        <div className={pp.hint}>
          {(data.outstanding_fees_cents || 0) > 0
            ? 'Invoiced Y7 service fees, less payments received. Transport, storage and other carrier costs are not billed here.'
            : 'You have no invoiced Y7 service fees outstanding.'}
        </div>
      </div>

      {/* BIL-1-T03: what is EARNED but NOT YET INVOICED. A separate card and a
          separate number — never added to the one above.
          The owner requires the customer see the cost of Y7's services accruing
          from their loads; EXB requires that nothing bills automatically. One
          combined figure would have to break one of those. Two labelled figures
          break neither, and this one says plainly that it is not yet payable. */}
      {data.accruing_unit_count != null && data.accruing_unit_count > 0 && (
        <div className={pp.card}>
          <div className={pp.sectionTitle}>Accruing — not yet invoiced</div>
          <div className={pp.mono} style={{ fontSize: '32px', color: 'var(--v2-ink, #050607)' }}>
            {fmt(data.accruing_fees_cents)}
          </div>
          <div className={pp.hint}>
            {data.accruing_unit_count} {data.accruing_unit_count === 1 ? 'vehicle has' : 'vehicles have'} reached
            the billing point since your last invoice. This is not payable yet — it appears on your next invoice.
          </div>
          {data.accruing_units && data.accruing_units.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {data.accruing_units.map(u => (
                <div key={`${u.unit_type}:${u.unit_ref}`} className={pp.row}>
                  <div>
                    <div className={pp.mono} style={{ fontWeight: 600 }}>{u.unit_ref}</div>
                    <div className={pp.hint} style={{ marginTop: '2px' }}>
                      {[u.vehicle, u.route].filter(Boolean).join(' · ') || '—'}
                    </div>
                  </div>
                  <span className={pp.mono} style={{ fontWeight: 600 }}>{fmt(u.fee_cents)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BIL-1-T03: the periods themselves — which loads, which period, invoiced
          versus paid. The owner's requirement is that the number be reachable
          AND decomposable, not just present. */}
      {data.billing_periods && data.billing_periods.length > 0 && (
        <div className={pp.card}>
          <div className={pp.sectionTitle}>Invoiced periods</div>
          {data.billing_periods.map(p => (
            <div key={p.id} className={pp.row}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>
                  {p.period_start} to {p.period_end}
                </div>
                <div className={pp.hint} style={{ marginTop: '2px' }}>
                  {p.unit_count} {p.unit_count === 1 ? 'vehicle' : 'vehicles'} ·
                  {' '}paid {fmt(p.paid_cents)} of {fmt(p.fees_total_cents)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={statusChip(p.status)}>{p.status}</span>
                <span className={pp.mono} style={{ fontWeight: 600 }}>{fmt(p.remaining_cents)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

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
            // BIL-1-T03: `period_fees` and `payment_received` are the two types
            // EXB posts, and NEITHER was in this map — so the one place a
            // finalized period would have surfaced to the customer rendered the
            // raw internal token `period_fees`. The fallback `|| type` is what
            // made it invisible: it produced a plausible-looking string instead
            // of failing, which is why nobody noticed a missing entry.
            //
            // Adding a transaction type is now the moment this map must be
            // edited, and the test test_every_ledger_type_has_a_customer_label
            // enumerates the dealer_ledger CHECK constraint so a future type
            // cannot slip through the fallback the same way.
            const label = {
              service_fee: 'Y7 service fee',
              period_fees: 'Y7 service fees — invoiced period',
              payment_received: 'Payment received',
              deposit: 'Payment received',
              carrier_payment: 'Carrier payment',
              co_service_fee: 'Y7 service fee',
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
