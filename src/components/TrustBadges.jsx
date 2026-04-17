import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

export default function TrustBadges({ layout = 'horizontal', variant = 'full' }) {
  const { t } = useTranslation();

  const BADGES = [
    {
      key: 'fmcsa',
      label: t('trustBadges.fmcsaLabel'),
      detail: 'MC #1741537',
      always: true,
    },
    {
      key: 'cd',
      label: 'Central Dispatch',
      detail: t('trustBadges.cdDetail'),
      always: true,
    },
    {
      key: 'bbb',
      label: t('trustBadges.bbbLabel'),
      detail: t('trustBadges.bbbDetail'),
      envVar: 'VITE_BBB_URL',
      url: import.meta.env.VITE_BBB_URL,
    },
    {
      key: 'google',
      label: t('trustBadges.googleLabel'),
      detail: t('trustBadges.googleDetail'),
      envVar: 'VITE_GBP_URL',
      url: import.meta.env.VITE_GBP_URL,
    },
    {
      key: 'tr',
      label: 'TransportReviews',
      detail: t('trustBadges.trDetail'),
      envVar: 'VITE_TR_URL',
      url: import.meta.env.VITE_TR_URL,
    },
    {
      key: 'trustpilot',
      label: 'Trustpilot',
      detail: t('trustBadges.trustpilotDetail'),
      envVar: 'VITE_TRUSTPILOT_ID',
      url: import.meta.env.VITE_TRUSTPILOT_ID ? `https://www.trustpilot.com/review/${import.meta.env.VITE_TRUSTPILOT_ID}` : null,
    },
  ];

  const visible = BADGES.filter(b => b.always || b.url);
  if (visible.length === 0) return null;

  const isCompact = variant === 'compact';
  const isVertical = layout === 'vertical';
  const isGrid = layout === 'grid';

  const containerStyle = {
    display: isGrid ? 'grid' : 'flex',
    ...(isGrid ? { gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 } : {}),
    ...(isVertical ? { flexDirection: 'column', gap: 8 } : {}),
    ...(!isGrid && !isVertical ? { flexWrap: 'wrap', gap: isCompact ? 8 : 12, justifyContent: 'center', alignItems: 'center' } : {}),
  };

  const badgeStyle = {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: isCompact ? '4px 10px' : '6px 14px',
    background: colors.bgCard, border: `1px solid ${colors.border}`,
    borderRadius: 8, fontSize: isCompact ? 11 : 12,
    fontFamily: fonts.sans, color: colors.text, whiteSpace: 'nowrap',
    textDecoration: 'none',
  };

  const dotStyle = {
    width: 6, height: 6, borderRadius: '50%', background: colors.success, flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      {visible.map(b => {
        const Tag = b.url ? 'a' : 'span';
        const extraProps = b.url ? { href: b.url, target: '_blank', rel: 'noopener noreferrer' } : {};
        return (
          <Tag key={b.key} style={badgeStyle} {...extraProps}>
            <span style={dotStyle} />
            <span>
              <strong>{b.label}</strong>
              {!isCompact && b.detail && <span style={{ color: colors.textMuted }}> {b.detail}</span>}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}
