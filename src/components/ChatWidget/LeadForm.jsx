import { useState } from 'react'
import { API_URL } from '../../config'
import { colors, fonts } from '../../theme'
import PhoneInput, { getCleanPhone, isValidPhone } from '../PhoneInput'

// Inline lead-capture form. Rendered inside the chat widget (not a modal)
// so the conversation context stays visible while the user fills in a name
// + email + phone. At least one field is required. POSTs to the Y7Dispatch
// backend endpoint wired up in the CHAT-LEAD-CAPTURE sprint on that side.
export default function LeadForm({ sessionUuid, onSubmitted, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!name.trim() && !email.trim() && !phone.trim()) {
      setError('Please fill in at least one field')
      return
    }
    if (phone && !isValidPhone(phone)) {
      setError('Please enter a valid 10-digit phone number, or leave it blank.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/public/chat/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_uuid: sessionUuid,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          phone: phone ? getCleanPhone(phone) : undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Failed to submit')
      }

      const data = await res.json().catch(() => ({}))
      onSubmitted?.(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    border: `1px solid ${colors.borderInput}`,
    borderRadius: 8,
    fontSize: 16, // 16px prevents iOS zoom on focus
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: fonts.sans,
    background: '#fff',
    color: colors.text,
  }

  const labelStyle = {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 3,
    display: 'block',
    fontFamily: fonts.sans,
  }

  return (
    <div style={{
      padding: '12px 14px',
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      margin: '6px 4px 2px',
      fontFamily: fonts.sans,
    }}>
      <div style={{
        fontWeight: 600, fontSize: 14, marginBottom: 10, color: colors.text,
      }}>
        Get a personalized quote
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
            autoComplete="name"
          />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            style={inputStyle}
            autoComplete="email"
            inputMode="email"
          />
        </div>
        <div>
          <label style={labelStyle}>Phone (optional)</label>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            style={inputStyle}
          />
        </div>
      </div>

      {error && (
        <div style={{
          color: '#b13a2b', fontSize: 12, marginTop: 8, fontFamily: fonts.sans,
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            flex: 1,
            padding: '9px 14px',
            background: submitting ? colors.bgMuted : colors.accent,
            color: submitting ? colors.textMuted : '#fff',
            border: 'none',
            borderRadius: 18,
            cursor: submitting ? 'default' : 'pointer',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: fonts.sans,
            letterSpacing: '0.3px',
          }}
        >
          {submitting ? 'Sending...' : 'Send'}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          style={{
            padding: '9px 14px',
            background: 'transparent',
            color: colors.textMuted,
            border: `1px solid ${colors.border}`,
            borderRadius: 18,
            cursor: submitting ? 'default' : 'pointer',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: fonts.sans,
            letterSpacing: '0.3px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
