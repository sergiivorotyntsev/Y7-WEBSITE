// Q2-T09: minimal stub. T10 replaces this file with the premium 6-digit
// verification UI (auto-focus, paste handling, shake-on-wrong, expiry
// countdown, resend, edit-email) + 4-locale i18n.
//
// The contract:
//   - Props: pendingId, email, expiresAt, attemptsRemaining, onSuccess, onCancel
//   - onSuccess({order_id, load_id, reference, customer_status, dashboard_url})
//     fires after /api/public/quote/verify succeeds.
//   - onCancel() fires when the user clicks "Edit email" → back to form.

export default function QuoteOtpStep({ pendingId, email, onCancel }) {
  return (
    <div style={{
      maxWidth: 480,
      margin: '40px auto',
      padding: 32,
      background: '#FFFFFF',
      border: '1px solid #e5e0d8',
      borderRadius: 12,
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 24,
        color: '#2C2C2A',
        marginBottom: 8,
      }}>
        Verification step
      </h2>
      <p style={{ fontSize: 14, color: '#706E68', marginBottom: 8 }}>
        T10 will replace this stub with the premium 6-digit UI.
      </p>
      <p style={{ fontSize: 13, color: '#706E68', marginBottom: 4 }}>
        Pending ID: <strong>{pendingId}</strong>
      </p>
      <p style={{ fontSize: 13, color: '#706E68', marginBottom: 24 }}>
        Code sent to: <strong>{email}</strong>
      </p>
      <button
        onClick={onCancel}
        style={{
          background: 'transparent',
          border: '1px solid #ccc',
          color: '#2C2C2A',
          padding: '10px 20px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Back to form
      </button>
    </div>
  );
}
