import { fonts } from '../theme';

// [SPRINT-P2b] The Y7 service fee for THIS order under ONE account type, straight from the
// backend fee engine (useFeePreview -> /api/portal/orders/{id}/fee-preview). One component
// so every door renders the same figure from the same source.
//
// DESIGN-V2 "The Dispatch Board": money is a numeric, so the figure is JetBrains Mono; the
// label is a mono eyebrow; the explanation is quiet system-ui. No red fill (Signal Budget) —
// the number earns attention by being the real dollar amount for the customer's own vehicle,
// not by decoration. It NEVER renders a fallback number: on failure it says so plainly and
// lets the customer continue, because a wrong fee is worse than no fee.

const V2_INK = 'var(--v2-ink, #050607)';
const V2_INK_MUTED = 'var(--v2-ink-muted, #5c5851)';
const V2_LINE = 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))';

const dollars = (cents) => `$${Math.round(cents / 100)}`;

// The figure the endpoint resolved: a single fee, or a range (ind_2026 before the carrier
// is assigned). Returns null when the engine gave us neither (never shown as a number).
function figure(preview) {
  if (!preview) return null;
  const { fee_cents, fee_range_min_cents, fee_range_max_cents } = preview;
  if (fee_cents != null) return dollars(fee_cents);
  if (fee_range_min_cents != null) {
    if (fee_range_min_cents === fee_range_max_cents) return dollars(fee_range_min_cents);
    return `${dollars(fee_range_min_cents)}–${dollars(fee_range_max_cents)}`;
  }
  return null;
}

const wrapStyle = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: `1px solid ${V2_LINE}`,
};

const eyebrowStyle = {
  fontFamily: fonts.mono,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: V2_INK_MUTED,
  marginBottom: 4,
};

const noteStyle = {
  fontFamily: fonts.sans,
  fontSize: 12,
  color: V2_INK_MUTED,
  lineHeight: 1.5,
  marginTop: 4,
};

export default function FeePreviewLine({ state, preview }) {
  // idle: no order in context — the caller shows the generic engine-synced terms instead.
  if (state === 'idle') return null;

  if (state === 'loading') {
    return (
      <div style={wrapStyle}>
        <div style={eyebrowStyle}>Y7 service fee, this shipment</div>
        <div style={{ ...noteStyle, marginTop: 0, fontStyle: 'italic' }}>
          Calculating your fee&hellip;
        </div>
      </div>
    );
  }

  const value = state === 'ok' ? figure(preview) : null;

  // error, or an unexpectedly number-less preview: say so, no number invented.
  if (value == null) {
    return (
      <div style={wrapStyle}>
        <div style={eyebrowStyle}>Y7 service fee, this shipment</div>
        <div style={noteStyle}>
          We couldn&rsquo;t price this shipment right now. You can continue &mdash; we&rsquo;ll
          confirm your fee before anything is due.
        </div>
      </div>
    );
  }

  const isRange = preview.fee_cents == null;
  const carrierCod = preview.carrier_paid_by === 'customer';

  return (
    <div style={wrapStyle}>
      <div style={eyebrowStyle}>Y7 service fee, this shipment</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 700,
            color: V2_INK,
            lineHeight: 1.1,
          }}
        >
          {value}
        </span>
        {isRange && (
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              color: V2_INK_MUTED,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            range &middot; firms up at carrier assignment
          </span>
        )}
      </div>
      {preview.explanation && <div style={noteStyle}>{preview.explanation}</div>}
      {carrierCod && (
        <div style={noteStyle}>
          The carrier is paid separately &mdash; COD at pickup or delivery.
        </div>
      )}
    </div>
  );
}
