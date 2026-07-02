// Q2-T10: Premium 6-digit OTP entry. Replaces the T09 stub.
//
// Contract (unchanged from T09):
//   Props: pendingId, email, expiresAt, attemptsRemaining, onSuccess, onCancel
//   onSuccess({order_id, load_id, reference, customer_status, dashboard_url})
//     fires after POST /api/public/quote/verify returns ok.
//   onCancel() fires for "Edit email" and "Resend code" (T10 limitation —
//     full resend API is Q3 backlog; today resend = back to form, customer
//     re-submits and gets a fresh quote_pending row).
//
// Backend response shapes this component handles:
//   200 ok                → onSuccess
//   400 status=wrong_code → shake + "{n} attempts remaining"
//                           when attempts_remaining drops to 0, lock UI
//                           and auto-return to form after 3s
//   410 status=expired    → lock UI, auto-return to form after 3s
//   410 status=exhausted  → same as expired (defensive — wrong_code path
//                           usually catches this first)
//   404 status=not_found  → generic error (pending row gone — rare)
//   429 rate_limited      → generic error
//   500+ promote_failed   → generic error
//
// apiPost (src/hooks/useApi.js) throws on every non-2xx response with
// err.status + err.body populated, so all failure handling lives in the
// catch block. The endpoint returns JSON for every status (200..500), so
// err.body is reliable.

import { useState, useEffect, useRef } from 'react';
import { motion as Motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';
import { apiPost } from '../hooks/useApi';

const DIGIT_COUNT = 6;
const RESEND_COOLDOWN_SECONDS = 60;
const AUTO_RETURN_DELAY_MS = 3000;
const ERROR_RED = '#DC2626';
const ERROR_BG = '#FFF0EC';

export default function QuoteOtpStep({
  pendingId,
  email,
  expiresAt,
  attemptsRemaining: initialAttempts = 5,
  onSuccess,
  onCancel,
}) {
  const { t } = useTranslation('quote');
  const [digits, setDigits] = useState(Array(DIGIT_COUNT).fill(''));
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(initialAttempts);
  const [resendCountdown, setResendCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [expiryDisplay, setExpiryDisplay] = useState('');
  const [locked, setLocked] = useState(false);
  const inputRefs = useRef([]);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    if (resendCountdown <= 0) return undefined;
    const timer = setInterval(() => {
      setResendCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  useEffect(() => {
    if (!expiresAt) return undefined;
    const update = () => {
      const ms = new Date(expiresAt).getTime() - Date.now();
      if (Number.isNaN(ms) || ms <= 0) {
        setExpiryDisplay('expired');
        return;
      }
      const mins = Math.floor(ms / 60000);
      const secs = Math.floor((ms % 60000) / 1000);
      setExpiryDisplay(`${mins}:${secs.toString().padStart(2, '0')}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusInput = (idx) => {
    const clamped = Math.max(0, Math.min(idx, DIGIT_COUNT - 1));
    inputRefs.current[clamped]?.focus();
  };

  const triggerShake = () => {
    shakeControls.start({
      x: [0, -10, 10, -10, 10, -6, 6, 0],
      transition: { duration: 0.45 },
    });
  };

  const submitOtp = async (otpCode) => {
    if (verifying || locked) return;
    setVerifying(true);
    setError(null);

    try {
      const response = await apiPost('/api/public/quote/verify', {
        pending_id: pendingId,
        otp: otpCode,
      });
      if (response?.ok) {
        onSuccess?.({
          order_id: response.order_id,
          load_id: response.load_id,
          reference: response.reference,
          customer_status: response.customer_status,
          dashboard_url: response.dashboard_url,
        });
      } else {
        // Defensive — apiPost would normally have thrown on non-2xx, but
        // a 200 with ok:false is theoretically possible from middleware.
        setError(t('otp.error'));
        triggerShake();
      }
    } catch (err) {
      const body = err?.body || {};
      const status = body.status;
      if (status === 'wrong_code') {
        const remaining = typeof body.attempts_remaining === 'number'
          ? body.attempts_remaining
          : Math.max(0, attemptsRemaining - 1);
        setAttemptsRemaining(remaining);
        if (remaining <= 0) {
          setLocked(true);
          setError(t('otp.exhausted'));
          setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
        } else {
          setError(t('otp.wrongCode', { count: remaining }));
          triggerShake();
          setDigits(Array(DIGIT_COUNT).fill(''));
          setTimeout(() => focusInput(0), 80);
        }
      } else if (status === 'expired') {
        setLocked(true);
        setError(t('otp.expired'));
        setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
      } else if (status === 'exhausted') {
        setLocked(true);
        setError(t('otp.exhausted'));
        setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
      } else if (status === 'not_found') {
        setLocked(true);
        setError(t('otp.notFound'));
        setTimeout(() => onCancel?.(), AUTO_RETURN_DELAY_MS);
      } else if (status === 'rate_limited' || err?.status === 429) {
        setError(t('otp.rateLimited'));
      } else if (err?.status >= 500 || !err?.status) {
        setError(t('otp.networkError'));
      } else {
        setError(t('otp.error'));
      }
    } finally {
      setVerifying(false);
    }
  };

  const handleDigitChange = (index, value) => {
    if (locked) return;
    const cleaned = (value || '').replace(/\D/g, '');

    if (cleaned.length === 0) {
      // User cleared the cell (e.g. selected + delete). Don't shift focus.
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    if (cleaned.length >= DIGIT_COUNT) {
      // Autofill / paste landed in a single input. Distribute and submit.
      const filled = cleaned.slice(0, DIGIT_COUNT).split('');
      setDigits(filled);
      focusInput(DIGIT_COUNT - 1);
      submitOtp(filled.join(''));
      return;
    }

    if (cleaned.length > 1) {
      // 2..5 digits arrived in one event — distribute starting at `index`.
      const next = [...digits];
      let write = index;
      for (const ch of cleaned.split('')) {
        if (write >= DIGIT_COUNT) break;
        next[write] = ch;
        write += 1;
      }
      setDigits(next);
      focusInput(Math.min(write, DIGIT_COUNT - 1));
      if (next.every((d) => d !== '')) {
        submitOtp(next.join(''));
      }
      return;
    }

    // Single digit happy path.
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);
    if (index < DIGIT_COUNT - 1) {
      focusInput(index + 1);
    } else if (next.every((d) => d !== '')) {
      submitOtp(next.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (locked) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[index] !== '') {
        next[index] = '';
        setDigits(next);
      } else if (index > 0) {
        next[index - 1] = '';
        setDigits(next);
        focusInput(index - 1);
      }
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < DIGIT_COUNT - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    if (locked) return;
    const pasted = (e.clipboardData?.getData('text') || '')
      .replace(/\D/g, '')
      .slice(0, DIGIT_COUNT);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(DIGIT_COUNT).fill('');
    pasted.split('').forEach((ch, i) => {
      next[i] = ch;
    });
    setDigits(next);
    if (pasted.length === DIGIT_COUNT) {
      focusInput(DIGIT_COUNT - 1);
      submitOtp(pasted);
    } else {
      focusInput(pasted.length);
    }
  };

  const handleResend = () => {
    // T10 limitation: server-side resend would require a new endpoint that
    // re-issues an OTP for the existing pending_id without re-creating the
    // row. Until that lands (Q3-OTP-RESEND-API), the user returns to the
    // form and re-submits — which creates a new quote_pending row + new OTP.
    onCancel?.();
  };

  const inputBorder = (digit) => {
    if (error) return ERROR_RED;
    if (digit) return colors.accent;
    return colors.borderInput;
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        maxWidth: 480,
        margin: '40px auto',
        padding: '36px 28px',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        fontFamily: fonts.sans,
        textAlign: 'center',
        boxShadow: '0 4px 24px rgba(26, 22, 18, 0.06)',
      }}
    >
      <h2
        style={{
          fontFamily: fonts.serif,
          fontSize: 24,
          fontWeight: 700,
          color: colors.text,
          marginTop: 0,
          marginBottom: 8,
          letterSpacing: '-0.01em',
        }}
      >
        {t('otp.title')}
      </h2>

      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.textMuted,
          marginBottom: 28,
          lineHeight: 1.5,
        }}
      >
        {t('otp.subtitle')}{' '}
        <strong style={{ color: colors.text, fontWeight: 600 }}>{email}</strong>
      </p>

      <Motion.div
        animate={shakeControls}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
        }}
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
            aria-label={t('otp.digitLabel', { n: idx + 1 })}
            style={{
              width: 48,
              height: 56,
              textAlign: 'center',
              fontFamily: fonts.mono,
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 10,
              border: `2px solid ${inputBorder(digit)}`,
              background: (verifying || locked) ? colors.bgMuted : colors.bgCard,
              color: colors.text,
              outline: 'none',
              caretColor: colors.accent,
              transition: 'border-color 0.15s, background-color 0.15s',
              boxSizing: 'border-box',
            }}
          />
        ))}
      </Motion.div>

      {/* Status row: error takes precedence over expiry countdown. Reserve
          space so layout doesn't shift between states. */}
      <div style={{ minHeight: 22, marginBottom: 18 }}>
        {error ? (
          <div
            role="alert"
            style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 13,
              color: colors.accent,
              padding: '6px 14px',
              background: ERROR_BG,
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        ) : verifying ? (
          <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
            {t('otp.verifying')}
          </p>
        ) : expiryDisplay && expiryDisplay !== 'expired' ? (
          <p style={{ fontSize: 12, color: colors.textHint, margin: 0 }}>
            {t('otp.expiresIn', { time: expiryDisplay })}
          </p>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'center',
        }}
      >
        {resendCountdown > 0 ? (
          <p style={{ fontSize: 12, color: colors.textHint, margin: 0 }}>
            {t('otp.resendCountdown', { n: resendCountdown })}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={locked}
            style={{
              background: 'none',
              border: 'none',
              color: colors.accent,
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 600,
              cursor: locked ? 'not-allowed' : 'pointer',
              textDecoration: 'underline',
              padding: 4,
            }}
          >
            {t('otp.resend')}
          </button>
        )}

        <button
          type="button"
          onClick={onCancel}
          disabled={locked}
          style={{
            background: 'none',
            border: 'none',
            color: colors.textMuted,
            fontFamily: fonts.sans,
            fontSize: 12,
            cursor: locked ? 'not-allowed' : 'pointer',
            textDecoration: 'underline',
            padding: 4,
          }}
        >
          {t('otp.editEmail')}
        </button>
      </div>
    </Motion.div>
  );
}
