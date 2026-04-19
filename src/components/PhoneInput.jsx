/* eslint-disable react-refresh/only-export-components */
// PhoneInput exports the component plus getCleanPhone/isValidPhone helpers
// used by QuoteForm and DealerQuote; dev-only HMR warning safe to suppress.
import { useState } from 'react';

// Strip every non-digit char — the input stores raw digits internally
// and renders the masked form on screen.
function stripPhone(value) {
  return String(value || '').replace(/\D/g, '');
}

// Format a US 10-digit number as "(555) 123-4567" progressively.
function formatUSPhone(digits) {
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// Accepts either a raw user string or already-stripped digits and returns
// the E.164 string we send to the backend. "+1" is prepended when the
// number looks US-shaped; everything else passes through as +<digits>.
export function getCleanPhone(value) {
  const d = stripPhone(value);
  if (!d) return '';
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  if (d.startsWith('1') && d.length > 11) return `+${d}`;
  return `+${d}`;
}

// Treat 10-digit or 11-digit-starting-with-1 as valid US; otherwise allow
// anything 8+ digits as a best-effort international entry. Empty is also
// valid so callers can leave the phone optional.
export function isValidPhone(value) {
  const d = stripPhone(value);
  if (d.length === 0) return true;
  if (d.length === 10) return true;
  if (d.length === 11 && d.startsWith('1')) return true;
  return d.length >= 8 && d.length <= 15;
}

/**
 * Masked phone input. Stores raw digits in the parent state, renders
 * the "(555) 123-4567" mask on screen, surfaces a red error message on
 * blur if the value is set but invalid.
 *
 * Props:
 *   value       — raw digit string held by the parent ("" or "5551234567")
 *   onChange    — called with the new raw digit string on every keystroke
 *   required    — marks the <input> required for native validation
 *   error       — optional override message; takes precedence over local state
 *   className   — passed through to <input> (CSS-module-friendly)
 *   style       — passed through to <input> (inline-style-friendly)
 *   ...props    — e.g. id, name, aria-*, disabled, placeholder
 */
export default function PhoneInput({
  value,
  onChange,
  required = false,
  error,
  className,
  style,
  placeholder = '(555) 123-4567',
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const digits = stripPhone(value);
  const valid = isValidPhone(digits);
  const showError = Boolean(error) || (touched && !focused && !valid);
  const errorMsg = error || 'Please enter a valid 10-digit phone number';

  const displayValue = (() => {
    // "+1 (555) 123-4567" for 11-digit US, plain mask otherwise
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 ${formatUSPhone(digits.slice(1))}`;
    }
    // Long international strings render with a single leading +
    if (digits.length > 11) {
      return `+${digits}`;
    }
    return formatUSPhone(digits);
  })();

  const handleChange = (e) => {
    const next = stripPhone(e.target.value);
    // Cap at 15 digits (max E.164) so users cannot paste novels.
    const capped = next.slice(0, 15);
    onChange?.(capped);
  };

  const mergedStyle = showError
    ? { ...style, borderColor: '#d32f2f' }
    : style;

  return (
    <div>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        placeholder={placeholder}
        required={required}
        className={className}
        style={mergedStyle}
        {...props}
      />
      {showError && (
        <div
          role="alert"
          style={{
            color: '#d32f2f',
            fontSize: '12px',
            marginTop: '4px',
            fontFamily: 'inherit',
          }}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}
