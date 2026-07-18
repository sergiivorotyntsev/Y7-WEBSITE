/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountryCallingCode,
} from 'libphonenumber-js';

const COUNTRIES = [
  { code: 'US', flag: '\u{1F1FA}\u{1F1F8}', label: 'US' },
  { code: 'CA', flag: '\u{1F1E8}\u{1F1E6}', label: 'CA' },
  { code: 'PL', flag: '\u{1F1F5}\u{1F1F1}', label: 'PL' },
  { code: 'UA', flag: '\u{1F1FA}\u{1F1E6}', label: 'UA' },
  { code: 'RU', flag: '\u{1F1F7}\u{1F1FA}', label: 'RU' },
  { code: 'GB', flag: '\u{1F1EC}\u{1F1E7}', label: 'UK' },
  { code: 'DE', flag: '\u{1F1E9}\u{1F1EA}', label: 'DE' },
];

function stripNonDigits(v) {
  return String(v || '').replace(/\D/g, '');
}

export function getCleanPhone(value) {
  if (!value) return '';
  const s = String(value).trim();
  if (!s) return '';
  if (s.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(s);
    if (parsed && parsed.isValid()) return parsed.format('E.164');
    return s;
  }
  const digits = stripNonDigits(s);
  if (!digits) return '';
  const parsed = parsePhoneNumberFromString(digits, 'US');
  if (parsed && parsed.isValid()) return parsed.format('E.164');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export function isValidPhone(value) {
  if (!value) return true;
  const s = String(value).trim();
  if (!s) return true;
  if (s.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(s);
    return parsed ? parsed.isValid() : false;
  }
  const digits = stripNonDigits(s);
  if (!digits) return true;
  const parsed = parsePhoneNumberFromString(digits, 'US');
  return parsed ? parsed.isValid() : false;
}

export default function PhoneInput({
  value,
  onChange,
  required = false,
  error,
  className,
  style,
  placeholder,
  defaultCountry = 'US',
  onValidChange,
  ...props
}) {
  const [country, setCountry] = useState(defaultCountry);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const callingCode = `+${getCountryCallingCode(country)}`;

  const rawDigits = stripNonDigits(value);

  const formatter = new AsYouType(country);
  const formatted = rawDigits ? formatter.input(rawDigits) : '';

  const parsed = rawDigits
    ? parsePhoneNumberFromString(rawDigits, country)
    : null;
  const isValid = parsed ? parsed.isValid() : false;

  const showError = Boolean(error) || (touched && !focused && rawDigits.length > 0 && !isValid);
  const errorMsg = error || 'Enter a valid phone number';

  function handleChange(e) {
    const input = e.target.value;
    const digits = stripNonDigits(input);
    const capped = digits.slice(0, 15);

    const p = capped ? parsePhoneNumberFromString(capped, country) : null;
    const valid = p ? p.isValid() : false;

    if (valid) {
      onChange?.(p.format('E.164'));
    } else {
      onChange?.(capped);
    }
    onValidChange?.(valid);
  }

  function handleKeyDown(e) {
    if (e.key !== 'Backspace') return;
    if (!rawDigits) return;

    const target = e.target;
    if (target.selectionStart !== target.selectionEnd) return;

    const trimmed = rawDigits.slice(0, -1);
    e.preventDefault();

    if (!trimmed) {
      onChange?.('');
      onValidChange?.(false);
      return;
    }

    const p = parsePhoneNumberFromString(trimmed, country);
    const valid = p ? p.isValid() : false;
    if (valid) {
      onChange?.(p.format('E.164'));
    } else {
      onChange?.(trimmed);
    }
    onValidChange?.(valid);
  }

  function handleCountryChange(e) {
    const newCountry = e.target.value;
    setCountry(newCountry);

    if (rawDigits) {
      const p = parsePhoneNumberFromString(rawDigits, newCountry);
      const valid = p ? p.isValid() : false;
      if (valid) {
        onChange?.(p.format('E.164'));
      } else {
        onChange?.(rawDigits);
      }
      onValidChange?.(valid);
    }
  }

  const displayValue = (() => {
    if (!rawDigits) return '';
    if (isValid && parsed) {
      return parsed.formatNational();
    }
    return formatted || rawDigits;
  })();

  // SPRINT-W7 B1: V2 states — red-deep error, Bonded-Pine valid (success law).
  const mergedStyle = showError
    ? { ...style, borderColor: 'var(--v2-red-deep, #a90918)' }
    : isValid && rawDigits
      ? { ...style, borderColor: '#0F6E56' }
      : style;

  // REGC-S13-W07d: country-select border color (computed once; used as per-side
  // longhands below to avoid a border/borderRight shorthand-conflict warning).
  const selBorderColor = showError ? 'var(--v2-red-deep, #a90918)' : isValid && rawDigits ? '#0F6E56' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))';

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: 0,
        alignItems: 'stretch',
      }}>
        <select
          value={country}
          onChange={handleCountryChange}
          aria-label="Country code"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '16px',
            padding: '8px 4px 8px 8px',
            // REGC-S13-W07d: per-side longhands (no `border` shorthand) so React
            // doesn't warn about a border/borderRight shorthand-vs-longhand conflict.
            borderTop: `1px solid ${selBorderColor}`,
            borderBottom: `1px solid ${selBorderColor}`,
            borderLeft: `1px solid ${selBorderColor}`,
            borderRight: 'none',
            borderRadius: '8px 0 0 8px',
            background: 'var(--v2-card-cream, #fffaf1)',
            color: 'var(--v2-ink, #050607)',
            cursor: 'pointer',
            minWidth: 0,
            width: 'auto',
            appearance: 'none',
            WebkitAppearance: 'none',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} +{getCountryCallingCode(c.code)}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true); }}
          placeholder={placeholder || (country === 'US' ? '(555) 234-5678' : `${callingCode} ...`)}
          required={required}
          className={className}
          style={{
            ...mergedStyle,
            borderRadius: '0 8px 8px 0',
            flex: 1,
            minWidth: 0,
          }}
          {...props}
        />
      </div>
      {showError && (
        <div
          role="alert"
          style={{
            color: '#C0392B',
            fontSize: '16px',
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
