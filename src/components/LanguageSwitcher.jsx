import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { colors, fonts } from '../theme';

const langs = ['en', 'ru', 'pl', 'uk'];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const current = lang || i18n.language || 'en';

  function switchLang(code) {
    i18n.changeLanguage(code);
    navigate(code === 'en' ? '/' : `/${code}`);
  }

  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {langs.map((code, i) => (
        <span key={code} style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => switchLang(code)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 6px',
              fontSize: '13px',
              fontFamily: fonts.sans,
              fontWeight: current === code ? 700 : 400,
              color: current === code ? colors.accent : colors.textMuted,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {code}
          </button>
          {i < langs.length - 1 && (
            <span style={{ color: colors.border, fontSize: '13px' }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
