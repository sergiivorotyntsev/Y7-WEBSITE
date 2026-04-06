import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';
import WhatHappensNext from '../components/WhatHappensNext';
import { colors, fonts } from '../theme';

export default function Quote() {
  return (
    <div style={{ padding: '60px 24px 80px' }}>
      <PageMeta title="Get a Free Quote" description="Request a free auto transport quote. We respond within 1 hour. No obligation." path="/quote" i18n />
      <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
          Get a Free Quote
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
          Fill in the details below. We respond within 1 hour with competitive pricing.
        </p>
      </div>
      <QuoteForm />
      <WhatHappensNext />
    </div>
  );
}
