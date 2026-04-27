import { useState, useCallback, useRef, useEffect } from 'react';
import Mailcheck from 'mailcheck';
import { colors, fonts } from '../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '12px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const inputErrorStyle = {
  ...inputStyle,
  border: `1px solid ${colors.accent}`,
  background: '#FFF0EC',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  fontWeight: 600,
  color: colors.text,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

const errorStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  color: colors.accent,
  marginTop: '6px',
};

const suggestionWrapStyle = {
  marginTop: '8px',
  padding: '10px 12px',
  background: '#FFF8E8',
  border: '1px solid #E8D59A',
  borderRadius: '8px',
  fontFamily: fonts.sans,
};

const suggestionTextStyle = {
  fontSize: '16px',
  color: colors.text,
  lineHeight: 1.5,
};

const suggestionActionsStyle = {
  marginTop: '8px',
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const acceptBtnStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  fontWeight: 600,
  padding: '6px 12px',
  borderRadius: '6px',
  border: 'none',
  background: colors.accent,
  color: '#fff',
  cursor: 'pointer',
};

const dismissBtnStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: '6px',
  border: `1px solid ${colors.borderInput}`,
  background: 'transparent',
  color: colors.textMuted,
  cursor: 'pointer',
};

// Popular domains Mailcheck should prefer when suggesting corrections.
const SUGGESTION_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'live.com', 'aol.com', 'comcast.net', 'verizon.net', 'sbcglobal.net',
  'msn.com', 'me.com', 'mac.com', 'att.net',
];
const SUGGESTION_TLDS = ['com', 'net', 'org', 'edu', 'co', 'io'];

export default function EmailInputWithCheck({
  value,
  onChange,
  label = 'Email',
  placeholder = 'you@company.com',
  required = true,
  autoFocus = false,
  error: externalError = null,
  disabled = false,
  id = 'email',
  name = 'email',
}) {
  const [suggestion, setSuggestion] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const debounceRef = useRef(null);

  const checkTypo = useCallback((email) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSuggestion(null);
      return;
    }
    try {
      Mailcheck.run({
        email,
        domains: SUGGESTION_DOMAINS,
        topLevelDomains: SUGGESTION_TLDS,
        suggested: (result) => {
          // result.full is the corrected address; only surface if it differs
          if (result && result.full && result.full !== email) {
            setSuggestion(result);
          } else {
            setSuggestion(null);
          }
        },
        empty: () => setSuggestion(null),
      });
    } catch {
      // Library quirks shouldn't break the form
      setSuggestion(null);
    }
  }, []);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    onChange(val);
    setDismissed(false);
    setSuggestion(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => checkTypo(val), 400);
  }

  function handleBlur() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    checkTypo(value);
  }

  function handleAccept() {
    if (!suggestion) return;
    onChange(suggestion.full);
    setSuggestion(null);
    setDismissed(false);
  }

  function handleDismiss() {
    setDismissed(true);
  }

  const showSuggestion = suggestion && !dismissed && !externalError;

  return (
    <div>
      {label && <label htmlFor={id} style={labelStyle}>{label}{required ? ' *' : ''}</label>}
      <input
        id={id}
        name={name}
        type="email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        autoComplete="email"
        inputMode="email"
        spellCheck="false"
        style={externalError ? inputErrorStyle : inputStyle}
      />

      {externalError && <div style={errorStyle}>{externalError}</div>}

      {showSuggestion && (
        <div style={suggestionWrapStyle} role="status">
          <div style={suggestionTextStyle}>
            Did you mean <strong>{suggestion.full}</strong>?
          </div>
          <div style={suggestionActionsStyle}>
            <button type="button" onClick={handleAccept} style={acceptBtnStyle}>
              Yes, use this
            </button>
            <button type="button" onClick={handleDismiss} style={dismissBtnStyle}>
              No, keep what I typed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
