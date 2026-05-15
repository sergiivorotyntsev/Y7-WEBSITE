import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';
import ProcessTimeline from '../components/ProcessTimeline';
import { colors, fonts } from '../theme';

export default function Quote() {
  const { t } = useTranslation('common');
  // Q2-T11: hide the page chrome (h1 + subtitle + marketing timeline) once
  // QuoteForm transitions past the form step. After T11, PostQuoteFlow is
  // the visual centerpiece of the success state and the marketing
  // ProcessTimeline would clash with the post-submit timeline card. The OTP
  // step is also hidden behind QuoteForm's own card, so the page chrome
  // muddles it too.
  const [step, setStep] = useState('form');
  const showChrome = step === 'form';

  return (
    <div style={{ padding: '60px 24px 80px' }}>
      <PageMeta title={t('meta.quoteTitle')} description={t('meta.quoteDescription')} path="/quote" />
      {showChrome && (
        <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
            {t('quote.h1')}
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
            {t('quote.subtitle')}
          </p>
        </div>
      )}
      <QuoteForm hideHeader onStepChange={setStep} />
      {showChrome && <ProcessTimeline />}
    </div>
  );
}
