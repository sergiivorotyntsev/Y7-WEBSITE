// REGC-S13-W02: 6-digit OTP entry for portal REGISTRATION.
//
// Visual is modeled on QuoteOtpStep (same 6-cell layout / rhythm / framer-motion
// shake), but this component is registration-specific and does NOT modify
// QuoteOtpStep (which serves live quote verification — isolating risk is the point).
//
// Contract:
//   Props: pendingId, email, onSuccess, onCancel
//   submit → POST /api/portal/auth/register-verify-code {pending_id, otp_code}
//   onSuccess(data) fires on 200 — data carries the RegistrationResult fields +
//     session_token (the backend also sets the portal session cookie). The parent
//     (Login.jsx) calls login(data.session_token, data) and navigates.
//   onCancel() fires for "Edit details"/"Resend" (resend = back to the profile
//     form, which re-submits register-verify-email for a fresh code — matching
//     QuoteOtpStep's resend stub; the backend has no in-place resend endpoint).
//
// Backend response shapes handled (FastAPI wraps dict detail as {detail:{...}}):
//   200 ok                              → onSuccess
//   400 detail.error=invalid_code       → shake + "{n} attempts remaining"
//   400 detail.error=expired            → lock + auto-return after 3s
//   404 detail.error=pending_not_found  → lock + auto-return
//   400 detail.error=already_verified   → lock + auto-return
//   409 detail.error=email_taken_during_verification / phone_taken_… → message + return
//   429 → "Too many attempts" (string detail)

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { colors, fonts } from '../theme';
import { portalFetch } from '../hooks/useAuth';

const DIGIT_COUNT = 6;
const AUTO_RETURN_DELAY_MS = 3000;
const ERROR_BG = '#FFF0EC';

export default function RegisterOtpStep({ pendingId, email, onSuccess, onCancel }) {
  const [digits, setDigits] = useState(Array(DIGIT_COUNT).fill(''));
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [locked, setLocked] = useState(false);
  const inputRefs = useRef([]);
  const shakeControls = useAnimationControls();

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const focusInput = (idx) => {
    const clamped = Math.max(0, Math.min(idx, DIGIT_COUNT - 1));
    inputRefs.current[clamped]?.focus();
  };

  const triggerShake = () => {
    shakeControls.start({ x: [0, -10, 10, -10, 10, -6, 6, 0], transition: { duration: 0.45 } });
  };

  const submitOtp = async (otpCode) => {
    if (verifying || locked) return;
    setVerifying(true);
    setError(null);
    try {
      const res = await portalFetch('/api/portal/auth/register-verify-code', {
        method: 'POST',
        body: JSON.stringify({ pending_id: pendingId, otp_code: otpCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        onSuccess?.(data);
        return;
      }
      const detail = data?.detail;
      const code = detail && typeof detail === 'object' ? detail.error : null;
      if (code === 'invalid_code') {
        const remaining = typeof detail.attempts_remaining === 'number'
          ? detail.attempts_remaining
          : Math.max(0, attemptsRemaining - 1);
        setAttemptsRemaining(remaining);
        if (remaining <= 0) {
          setLocked(true);
          setError('Too many incorrect codes. Returning to the form…');
          setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
        } else {
          setError(`Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`);
          triggerShake();
          setDigits(Array(DIGIT_COUNT).fill(''));
          setTimeout(() => focusInput(0), 80);
        }
      } else if (code === 'expired' || code === 'pending_not_found' || code === 'already_verified') {
        setLocked(true);
        setError('This code expired or the session restarted. Returning to the form…');
        setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
      } else if (code === 'email_taken_during_verification' || code === 'phone_taken_during_verification') {
        setLocked(true);
        setError(detail.message || 'That email or phone was just claimed by another account. Please start over.');
        setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
      } else if (res.status === 429) {
        setError('Too many attempts. Please try again in a few minutes.');
      } else {
        setError('Could not verify the code. Please try again.');
        triggerShake();
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleDigitChange = (index, value) => {
    if (locked) return;
    const cleaned = (value || '').replace(/\D/g, '');
    if (cleaned.length === 0) {
      const next = [...digits]; next[index] = ''; setDigits(next); return;
    }
    if (cleaned.length >= DIGIT_COUNT) {
      const filled = cleaned.slice(0, DIGIT_COUNT).split('');
      setDigits(filled); focusInput(DIGIT_COUNT - 1); submitOtp(filled.join('')); return;
    }
    if (cleaned.length > 1) {
      const next = [...digits]; let write = index;
      for (const ch of cleaned.split('')) { if (write >= DIGIT_COUNT) break; next[write] = ch; write += 1; }
      setDigits(next); focusInput(Math.min(write, DIGIT_COUNT - 1));
      if (next.every((d) => d !== '')) submitOtp(next.join(''));
      return;
    }
    const next = [...digits]; next[index] = cleaned; setDigits(next);
    if (index < DIGIT_COUNT - 1) focusInput(index + 1);
    else if (next.every((d) => d !== '')) submitOtp(next.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (locked) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[index] !== '') { next[index] = ''; setDigits(next); }
      else if (index > 0) { next[index - 1] = ''; setDigits(next); focusInput(index - 1); }
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); focusInput(index - 1); }
    else if (e.key === 'ArrowRight' && index < DIGIT_COUNT - 1) { e.preventDefault(); focusInput(index + 1); }
  };

  const handlePaste = (e) => {
    if (locked) return;
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, DIGIT_COUNT);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(DIGIT_COUNT).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    if (pasted.length === DIGIT_COUNT) { focusInput(DIGIT_COUNT - 1); submitOtp(pasted); }
    else focusInput(pasted.length);
  };

  const inputBorder = (digit) => {
    if (error) return '#DC2626';
    if (digit) return colors.accent;
    return colors.borderInput;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ fontFamily: fonts.sans, textAlign: 'center' }}
    >
      <p style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, marginTop: 0, marginBottom: 24, lineHeight: 1.5 }}>
        Enter the 6-digit code we sent to{' '}
        <strong style={{ color: colors.text, fontWeight: 600 }}>{email}</strong>
      </p>

      <motion.div
        animate={shakeControls}
        style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}
        onPaste={handlePaste}
      >
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            maxLength={DIGIT_COUNT}
            value={digit}
            onChange={(e) => handleDigitChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onFocus={(e) => e.target.select?.()}
            disabled={verifying || locked}
            aria-label={`Code digit ${idx + 1}`}
            style={{
              width: 44, height: 56, textAlign: 'center', fontFamily: fonts.mono,
              fontSize: 24, fontWeight: 700, borderRadius: 10,
              border: `2px solid ${inputBorder(digit)}`,
              background: (verifying || locked) ? colors.bgMuted : colors.bgCard,
              color: colors.text, outline: 'none', caretColor: colors.accent,
              boxSizing: 'border-box',
            }}
          />
        ))}
      </motion.div>

      <div style={{ minHeight: 22, marginBottom: 14 }}>
        {error ? (
          <div role="alert" style={{ display: 'inline-block', fontFamily: fonts.sans, fontSize: 13, color: colors.accent, padding: '6px 14px', background: ERROR_BG, borderRadius: 8 }}>
            {error}
          </div>
        ) : verifying ? (
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>Verifying…</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onCancel}
        disabled={locked}
        style={{ background: 'none', border: 'none', color: colors.textMuted, fontFamily: fonts.sans, fontSize: 12, cursor: locked ? 'not-allowed' : 'pointer', textDecoration: 'underline', padding: 4 }}
      >
        Edit details or resend code
      </button>
    </motion.div>
  );
}
