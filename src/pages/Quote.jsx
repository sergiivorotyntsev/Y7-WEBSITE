import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';
import ProcessTimeline from '../components/ProcessTimeline';
import styles from './Quote.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';

// DESIGN-V2-W5-T02: Dispatch Board restyle of the PAGE SHELL only. QuoteForm
// keeps its own W4 internals (white-card island on the board band, same
// precedent as the /ship-my-car quote band); heading text/level, i18n keys,
// and the Q2-T11 chrome-hiding logic are unchanged. Band map:
// hero+form = board (open dark) · ProcessTimeline = manifest · footer closes
// dark. Signal Budget: QuoteForm's submit is the band's red fill; the mono
// eyebrow is plain (no rule-line) and the boardHero radial is low-alpha
// exempt. No entrance animations (page had none; Reveal Gate law).
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
    <div className={styles.page}>
      <PageMeta title={t('meta.quoteTitle')} description={t('meta.quoteDescription')} path="/quote" />

      {/* Hero + form — one board band. Header is condensed display over a
          locale-neutral mono credentials eyebrow (IDs, not copy: parity-safe). */}
      <section className={v2s.boardHero}>
        <div className={v2s.inner}>
          {showChrome && (
            <div className={styles.heroHead}>
              <p className={`${v2t.eyebrowPlain} ${styles.heroEyebrow}`}>USDOT #4427359 &middot; MC #1741537</p>
              <h1 className={`${v2t.sectionDisplay} ${styles.heroTitle}`}>
                {t('quote.h1')}
              </h1>
              <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.heroSubtitle}`}>
                {t('quote.subtitle')}
              </p>
            </div>
          )}
          <QuoteForm hideHeader onStepChange={setStep} />
        </div>
      </section>

      {/* Process timeline — manifest band (shared component, V2 since T02b). */}
      {showChrome && (
        <section className={v2s.manifest}>
          <ProcessTimeline />
        </section>
      )}
    </div>
  );
}
