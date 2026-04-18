import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';
import ProcessTimeline from '../components/ProcessTimeline';
import { colors, fonts } from '../theme';

export default function Quote() {
  const { t } = useTranslation('common');
  return (
    <div style={{ padding: '60px 24px 80px' }}>
      <PageMeta title={t('meta.quoteTitle')} description={t('meta.quoteDescription')} path="/quote" />
      <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
          {t('quote.h1')}
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
          {t('quote.subtitle')}
        </p>
      </div>
      <QuoteForm />
      <ProcessTimeline />
    </div>
  );
}
