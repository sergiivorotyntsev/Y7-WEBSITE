import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import EntityTldr from '../components/EntityTldr';
import MoneyPageSchema from '../components/MoneyPageSchema';
import FaqPageSchema from '../components/FaqPageSchema';
import ContextualCTA from '../components/ContextualCTA';
import { CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import PhoneInput, { getCleanPhone, isValidPhone } from '../components/PhoneInput';
import styles from './Exporters.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2c from '../styles/v2/cards.module.css';
import v2a from '../styles/v2/accents.module.css';
import v2f from '../styles/v2/forms.module.css';
import v2h from '../styles/v2/hero.module.css';

// DESIGN-V2-W4-T02: Dispatch Board restyle. SEO contract frozen: every heading
// text/level, i18n keys, schema call sites, EntityTldr position (first element
// after the hero), the 5 crosslinks, the form pipeline, and the ContextualCTA
// target are unchanged. Band map (approved, strict alternation, rebalanced to
// the mandated 40-60% dark share): hero=B · tldr+value=P · fees=B (board proof
// band, translucent-wash cards, white text, no red fills) · how=P ·
// ports+anchors=B (board port link cards + quiet trustRow; the rail's red
// mid-dot is the band's single red accent) · form=P (§7 forms-on-paper; submit
// CTA = the band's single red fill) · docs=B (wash checklist cards) ·
// destinations=P · ContextualCTA=B mini-band · faq=P · midCta=B (close-dark) ·
// crosslinks=P tail. No entrance animations (page had none; Reveal Gate law).
// H2 ladder order (frozen): value · fees · how · ports · form · docs ·
// destinations · faq — formBlock precedes docs/destinations in the DOM.

// C motif helpers. City substring -> /ports/{slug} + mono port code; the exporters
// i18n names ports "Newark, NJ" / "Houston, TX", so match on the city.
const PORTS = [
  ['Newark', 'newark', 'NWK'],
  ['Houston', 'houston', 'HOU'],
  ['Savannah', 'savannah', 'SAV'],
  ['Los Angeles', 'los-angeles', 'LAX'],
  ['Baltimore', 'baltimore', 'BAL'],
  ['Jacksonville', 'jacksonville', 'JAX'],
];
function portMeta(name = '') {
  const hit = PORTS.find(([city]) => name.includes(city));
  return hit ? { slug: hit[1], code: hit[2] } : { slug: null, code: name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'US' };
}

// Country name substring -> ISO-2 mono badge (no SVG flags). Falls back to the
// first two letters. Restyles an existing destination, never invents one.
const COUNTRY_CODES = [
  ['ukrain', 'UA'], ['poland', 'PL'], ['polsk', 'PL'], ['lithuan', 'LT'], ['latvi', 'LV'],
  ['eston', 'EE'], ['georgia', 'GE'], ['armenia', 'AM'], ['kazakh', 'KZ'], ['azerbaij', 'AZ'],
  ['german', 'DE'], ['netherl', 'NL'], ['belgi', 'BE'], ['finland', 'FI'], ['emirat', 'AE'],
  ['uae', 'AE'], ['dubai', 'AE'], ['russia', 'RU'], ['romania', 'RO'], ['bulgar', 'BG'],
  ['czech', 'CZ'], ['slovak', 'SK'], ['turkey', 'TR'], ['nigeria', 'NG'], ['ghana', 'GH'],
  ['kenya', 'KE'], ['saudi', 'SA'], ['cyprus', 'CY'], ['domin', 'DO'], ['moldova', 'MD'],
  ['chile', 'CL'], ['mexico', 'MX'], ['canada', 'CA'], ['egypt', 'EG'], ['jordan', 'JO'],
];
function countryCode(country = '') {
  const c = country.toLowerCase();
  const hit = COUNTRY_CODES.find(([k]) => c.includes(k));
  return hit ? hit[1] : (country.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'XX');
}

export default function Exporters() {
  const { t, i18n } = useTranslation('exporters');
  const { t: tCommon } = useTranslation('common');

  // SEOAI-T04: EN-only extractable answer block, gated like /faq's TL;DR so
  // ru/pl/ua render nothing until parity translations land.
  const tldr = i18n.getResource(i18n.language, 'exporters', 'tldr') || '';
  const steps = t('steps', { returnObjects: true });
  const fees = t('fees.items', { returnObjects: true });
  const valuePoints = t('value.points', { returnObjects: true });
  const portList = t('ports.list', { returnObjects: true });
  const volumes = t('form.volumes', { returnObjects: true });
  const exportDocs = t('exportDocs', { returnObjects: true });
  const destinations = t('destinations', { returnObjects: true });
  const exporterFaq = t('exporterFaq', { returnObjects: true });
  const docItems = exportDocs && exportDocs.items ? exportDocs.items : [];
  const destItems = destinations && destinations.items ? destinations.items : [];
  const faqItems = exporterFaq && exporterFaq.items ? exporterFaq.items : [];

  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    monthly_volume: '', preferred_ports: '', vins: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  // B: field-level errors, populated only after an invalid submit (never at rest).
  const [fieldErrors, setFieldErrors] = useState({});

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    // B: validate all fields, surface per-field errors after submit + a summary alert.
    const fe = {};
    if (!form.contact_name.trim()) fe.contact_name = t('form.errors.contactNameRequired');
    if (!form.email.trim()) fe.email = t('form.errors.emailRequired');
    if (form.phone && !isValidPhone(form.phone)) fe.phone = t('form.errors.invalidPhone');
    setFieldErrors(fe);
    if (Object.keys(fe).length > 0) {
      setError(fe.contact_name || fe.email || fe.phone);
      return;
    }

    setSubmitting(true);
    try {
      await apiPost('/api/public/contact', {
        name: `${form.company_name} — ${form.contact_name}`.trim(),
        email: form.email,
        phone: form.phone ? getCleanPhone(form.phone) : '',
        message: [
          `Exporter Service Rate Request`,
          `Company: ${form.company_name || 'N/A'}`,
          `Monthly volume: ${form.monthly_volume || 'N/A'}`,
          `Preferred ports: ${form.preferred_ports || 'N/A'}`,
          form.vins ? `VINs:\n${form.vins}` : '',
          form.notes ? `Notes: ${form.notes}` : '',
        ].filter(Boolean).join('\n'),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || t('form.errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  const portCount = Array.isArray(portList) ? portList.length : 0;

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Exporters',url:'/exporters'}]} />
      <MoneyPageSchema pageType="exporters" />
      <FaqPageSchema pageUrl="https://www.y7agency.com/exporters" items={faqItems} />
      <PageMeta title={tCommon('meta.exportersTitle')} description={tCommon('meta.exportersDescription')} path="/exporters" />

      {/* Hero — board. Plain mono eyebrow (no rule-line: hero budget; the
          boardHero red radial is low-alpha exempt). JP vertical strip is the
          page's single brand mark, aria-hidden. */}
      <section className={v2s.boardHero}>
        {/* SPRINT-V21 W-CONV: photo emergence (same de-badged asset; higher,
            more cropped placement than home so the program CTA row stays
            clear). Decorative, aria-hidden, CLS 0. */}
        <div className={`${v2h.photoEmergence} ${styles.heroPhoto}`} aria-hidden="true">
          <picture>
            <source srcSet="/images/hero-car.avif" type="image/avif" />
            <source srcSet="/images/hero-car.webp" type="image/webp" />
            <img src="/images/hero-car.webp" alt="" width="1560" height="900" loading="eager" decoding="async" />
          </picture>
        </div>
        <div className={`${v2s.inner} ${styles.heroLayout}`}>
          <div className={`${v2a.jpVertical} ${styles.heroJpStrip}`} aria-hidden="true">
            シンプル・迅速・信頼
          </div>
          <div className={styles.heroText}>
            <p className={`${v2t.eyebrowPlain} ${styles.heroEyebrow}`}>{t('hero.kicker')}</p>
            {/* EXPORTERS-V2 T02: H1 red-accent idiom (site-wide second-part
                accent). titleMain+titleAccent concatenate byte-identically to
                the frozen title; locales without the split keys render the
                plain title until T03 lands. */}
            <h1 className={`${v2t.sectionDisplay} ${styles.heroTitle}`}>
              {i18n.exists('exporters:titleAccent')
                ? (<>{t('titleMain')}<span className={v2t.accent}>{t('titleAccent')}</span></>)
                : t('title')}
            </h1>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.heroSubtitle}`}>{t('subtitle')}</p>
            <div className={styles.heroTrust}>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
            </div>
            {/* EXPORTERS-V2 T01: hero CTA row — the landing for home's
                "Exporter Program" button. Gradient = the hero's single red
                fill; the second action stays ghost. */}
            <div className={styles.heroCtas}>
              {/* SPRINT-V21: plate-as-CTA (Angle Law) — one red fill. */}
              <a href="#exporter-program" className={v2h.angledPlate}>{t('hero.ctaPrimary')}</a>
              <a href="#exporter-form" className={v2b.ghostOnDark}>{t('hero.ctaSecondary')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR + value proposition — manifest band; the extractable answer
          card stays the first element after the hero. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <EntityTldr kicker="Exporters, in brief" ariaLabel="Y7 for exporters, in brief" text={tldr} variant="manifest" />

          {/* Value proposition — plain H2 opener (density cap) */}
          <div className={styles.valueBlock}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('value.title')}</h2>
            <ul className={styles.valueList}>
              {Array.isArray(valuePoints) && valuePoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* THE PROGRAM — EXPORTERS-V2 T01: the 4-layer per-client operating
          model (board band, numbered split rows). Anchor target for the hero
          CTA and home's "Exporter Program" button. Eyebrow pair opener; the
          rule-line is the band's red accent, layer numerals stay mono/ink. */}
      <section id="exporter-program" className={v2s.board}>
        <div className={v2s.inner}>
          <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('program.kicker')}</p>
          <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('program.title')}</h2>
          <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.programLede}`}>{t('program.lede')}</p>
          <div className={styles.programLayers}>
            {Array.isArray(t('program.layers', { returnObjects: true })) &&
              t('program.layers', { returnObjects: true }).map((layer, i) => (
                <div key={i} className={styles.programLayer}>
                  <div className={`${v2t.monoLabel} ${styles.programLayerKicker}`}>{layer.kicker}</div>
                  <div className={styles.programLayerBody}>
                    <h3 className={`${v2t.cardTitle} ${styles.programLayerTitle}`}>{layer.title}</h3>
                    <p className={styles.programLayerText}>{layer.body}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Smart-routing worked example — EXPORTERS-V2 T01/T04: paper band,
          single ledger card with real corridor figures from dispatchRates
          (typical ranges, hedged; fee never derived from the table). */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('routing.title')}</h2>
          <div className={styles.routingBlock}>
            <p className={styles.routingBody}>{t('routing.body')}</p>
            <div className={styles.routingLedger}>
              <div className={`${v2t.monoLabel} ${styles.routingFrom}`}>{t('routing.legFrom')}</div>
              <div className={styles.routingLegs}>
                <div className={styles.routingLeg}>
                  <span className={styles.routingLegName}>{t('routing.legA')}</span>
                  <span className={`${v2t.monoLabel} ${styles.routingLegRate}`}>{t('routing.legARate')}</span>
                </div>
                <div className={styles.routingLeg}>
                  <span className={styles.routingLegName}>{t('routing.legB')}</span>
                  <span className={`${v2t.monoLabel} ${styles.routingLegRate}`}>{t('routing.legBRate')}</span>
                </div>
              </div>
              <p className={`${v2t.monoMicro} ${styles.routingFootnote}`}>{t('routing.footnote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Fee Table — board proof band, eyebrow pair opener. Fee rows
          are translucent-wash board cards with white text + mono chip numerics;
          no red fills (the eyebrow rule-line is the band's single red accent). */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <div className={styles.feeBlock}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('fees.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('fees.title')}</h2>
            <div className={styles.feeTable}>
              {Array.isArray(fees) && fees.map((fee, i) => (
                <div key={i} className={`${v2c.board} ${styles.feeRow}`}>
                  <div className={styles.feeLabel}>
                    <div className={styles.feeTitle}>{fee.service}</div>
                    <div className={styles.feeDesc}>{fee.desc}</div>
                  </div>
                  <div className={`${v2c.chipOnDark} ${styles.feeBadge}`}>{fee.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — paper; numbered steps as cream cards. Plain H2 opener. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('howTitle')}</h2>
          <div className={styles.stepsGrid}>
            {Array.isArray(steps) && steps.map((step, i) => (
              <div key={i} className={`${v2c.paper} ${styles.stepCard}`}>
                <div className={`${v2t.monoLabel} ${styles.stepNum}`}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{step.title}</h3>
                <p className={styles.descOnPaper}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Port Coverage + number anchors — ONE board band: static route rail,
          port link cards in the board-card style (/ports/* links kept), then
          the trustRow stat band. Port codes stay white/ink mono (red codes are
          the /ports tiles' sanctioned treatment) and the stat numerals stay
          quiet white; the rail's red mid-dot is the band's single red accent.
          Plain H2 opener. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          {/* Proof strip — EXPORTERS-V2 T01: notification/portal capabilities
              as a chip row above Port Coverage. Styled label, deliberately NOT
              a heading (an h3 here would precede the ports h2 and disorder the
              frozen ladder). */}
          <div className={styles.proofStrip} role="group" aria-label={t('proof.title')}>
            <span className={`${v2t.monoLabel} ${styles.proofTitle}`}>{t('proof.title')}</span>
            <div className={styles.proofChips}>
              {Array.isArray(t('proof.chips', { returnObjects: true })) &&
                t('proof.chips', { returnObjects: true }).map((chip, i) => (
                  <span key={i} className={`${v2c.chipOnDark} ${styles.proofChip}`}>{chip}</span>
                ))}
            </div>
          </div>

          <h2 className={`${v2t.sectionDisplay} ${styles.h2} ${styles.portsHeadCenter}`}>{t('ports.title')}</h2>

          {/* Route rail: auction/dealer -> US export port -> destination */}
          <div className={styles.routeRail}>
            <svg className={styles.routeSvg} viewBox="0 0 760 60" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.routeTrack} d="M40 15 H720" />
            </svg>
            <div className={styles.routeNode}>
              <div className={styles.routeDot} />
              <div className={`${v2t.monoMicro} ${styles.routeLabel}`}>Auction / Dealer</div>
            </div>
            <div className={styles.routeNode}>
              <div className={`${styles.routeDot} ${styles.routeDotMid}`} />
              <div className={`${v2t.monoMicro} ${styles.routeLabel}`}>US Export Port</div>
              {portCount > 0 && <div className={styles.routeSub}>{portCount} ports</div>}
            </div>
            <div className={styles.routeNode}>
              <div className={styles.routeDot} />
              <div className={`${v2t.monoMicro} ${styles.routeLabel}`}>Destination</div>
            </div>
          </div>

          <div className={styles.portsGrid}>
            {Array.isArray(portList) && portList.map((port, i) => {
              const { slug, code } = portMeta(port.name);
              const card = (
                <div className={`${v2c.board} ${styles.portCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.portCode}`}>{code}</div>
                  <div className={`${v2t.cardTitle} ${styles.portName}`}>{port.name}</div>
                  <div className={styles.portDesc}>{port.desc}</div>
                  {slug && <div className={`${v2t.monoLabel} ${styles.portCta}`}>{t('crosslinks.viewPortDetails')}</div>}
                </div>
              );
              return slug ? (
                <Link key={i} to={`/ports/${slug}`} className={styles.portLink}>
                  {card}
                </Link>
              ) : (
                <div key={i}>{card}</div>
              );
            })}
          </div>

          {/* Number anchors — quiet (white) stat numerals inside the ports band.
              Restyles facts already on the page: port/destination counts +
              USDOT/BMC-84. */}
          <div className={`${v2c.trustRow} ${styles.anchorsRow}`}>
            {portCount > 0 && (
              <div>
                <span className={v2c.trustStatQuiet}>{portCount}</span>
                <span className={v2c.trustLabel}>US export ports</span>
              </div>
            )}
            {destItems.length > 0 && (
              <div>
                <span className={v2c.trustStatQuiet}>{destItems.length}</span>
                <span className={v2c.trustLabel}>destinations</span>
              </div>
            )}
            <div>
              <span className={v2c.trustStatQuiet}>$75K</span>
              <span className={v2c.trustLabel}>BMC-84 bond</span>
            </div>
            <div>
              <span className={v2c.trustStatQuiet}>#4427359</span>
              <span className={v2c.trustLabel}>USDOT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form — paper band, §7 forms-on-paper primitives (cream shell,
          ink labels, cream inputs). Plain H2 opener. Fields, validation, and
          the contact pipeline are frozen. The submit CTA is this band's single
          red fill. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <div id="exporter-form" className={`${v2c.paper} ${styles.formShell}`}>
            {success ? (
              <div className={styles.successBlock}>
                <div className={styles.successIcon}><CheckIcon size={16} /></div>
                <h3 className={`${v2t.cardTitle} ${styles.successTitle}`}>{t('formSuccess.title')}</h3>
                <p className={styles.successMsg}>{t('formSuccess.message')}</p>
              </div>
            ) : (
              <>
                <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('form.title')}</h2>
                <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.formSubtitle}`}>{t('form.subtitle')}</p>

                {/* inputGroupOnBoard is layout-only (column + gap), surface-agnostic. */}
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-company" className={v2f.labelOnPaper}>{t('form.companyName')}</label>
                      <input id="exporter-company" className={v2f.inputOnPaper} value={form.company_name} onChange={e => set('company_name', e.target.value)} />
                    </div>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-name" className={v2f.labelOnPaper}>{t('form.contactName')} *</label>
                      <input id="exporter-name" className={`${v2f.inputOnPaper} ${fieldErrors.contact_name ? styles.fieldError : ''}`} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} aria-invalid={fieldErrors.contact_name ? 'true' : undefined} />
                      {fieldErrors.contact_name && <span className={styles.fieldErrorMsg}>{fieldErrors.contact_name}</span>}
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-email" className={v2f.labelOnPaper}>{t('form.email')} *</label>
                      <input id="exporter-email" type="email" className={`${v2f.inputOnPaper} ${fieldErrors.email ? styles.fieldError : ''}`} value={form.email} onChange={e => set('email', e.target.value)} aria-invalid={fieldErrors.email ? 'true' : undefined} />
                      {fieldErrors.email && <span className={styles.fieldErrorMsg}>{fieldErrors.email}</span>}
                    </div>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-phone" className={v2f.labelOnPaper}>{t('form.phone')}</label>
                      <PhoneInput id="exporter-phone" className={`${v2f.inputOnPaper} ${fieldErrors.phone ? styles.fieldError : ''}`} value={form.phone} onChange={v => set('phone', v)} />
                      {fieldErrors.phone && <span className={styles.fieldErrorMsg}>{fieldErrors.phone}</span>}
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-volume" className={v2f.labelOnPaper}>{t('form.monthlyVolume')}</label>
                      <select id="exporter-volume" className={v2f.inputOnPaper} value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)}>
                        <option value="">{t('form.volumeSelect')}</option>
                        {Array.isArray(volumes) && volumes.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <div className={v2f.inputGroupOnBoard}>
                      <label htmlFor="exporter-port" className={v2f.labelOnPaper}>{t('form.preferredPorts')}</label>
                      <input
                        id="exporter-port"
                        className={v2f.inputOnPaper}
                        value={form.preferred_ports}
                        onChange={e => set('preferred_ports', e.target.value)}
                        placeholder={t('form.portsPlaceholder')}
                      />
                    </div>
                  </div>
                  <div className={v2f.inputGroupOnBoard}>
                    <label htmlFor="exporter-vins" className={v2f.labelOnPaper}>{t('form.vins')}</label>
                    <textarea
                      id="exporter-vins"
                      className={`${v2f.inputOnPaper} ${styles.textarea} ${styles.vinTextarea}`}
                      value={form.vins}
                      onChange={e => set('vins', e.target.value)}
                      placeholder={t('form.vinsPlaceholder')}
                      rows={4}
                    />
                  </div>
                  <div className={v2f.inputGroupOnBoard}>
                    <label htmlFor="exporter-notes" className={v2f.labelOnPaper}>{t('form.notes')}</label>
                    <textarea
                      id="exporter-notes"
                      className={`${v2f.inputOnPaper} ${styles.textarea}`}
                      value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                      placeholder={t('form.notesPlaceholder')}
                      rows={3}
                    />
                  </div>

                  {error && <div className={v2f.errorOnPaper} role="alert">{error}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${v2b.cta} ${styles.submitBtn}`}
                  >
                    {submitting ? t('form.submitting') : t('form.submit')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Export documents — board band; the checklist renders as translucent-
          wash board cards with white titles. Eyebrow pair opener (on dark). */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          {exportDocs && docItems.length > 0 && (
            <section className={styles.docsBlock}>
              <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{exportDocs.kicker}</p>
              <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{exportDocs.title}</h2>
              <ul className={styles.docsList}>
                {docItems.map((item, i) => (
                  <li key={i} className={`${v2c.board} ${styles.docsItem}`}>
                    <span className={styles.docsCheck} aria-hidden="true">&#10003;</span>
                    <div>
                      <strong className={styles.docsTitle}>{item.title}</strong>
                      <span className={styles.docsDesc}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>

      {/* Destinations — paper band (cream ISO-badge tiles). Eyebrow pair opener:
          docs + destinations remain the page's consecutive pair (cap: 2). */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          {/* Certificates of Origin — EXPORTERS-V2 T01 (approved live service).
              Paper aside before Destinations; no new schema. */}
          <section className={styles.coBlock}>
            {/* Plain mono kicker, NOT the eyebrow+rule pair: docs + destinations
                already hold the page's consecutive-pair cap (2), and a third
                pair-opener between them would break the density law. */}
            <p className={`${v2t.eyebrowPlain} ${styles.coKicker}`}>{t('co.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('co.title')}</h2>
            <p className={styles.coBody}>{t('co.body')}</p>
          </section>

          {destinations && destItems.length > 0 && (
            <section className={styles.destBlock}>
              <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{destinations.kicker}</p>
              <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{destinations.title}</h2>
              <div className={styles.destGrid}>
                {destItems.map((item, i) => (
                  <div key={i} className={styles.destItem}>
                    <span className={styles.destBadge} aria-hidden="true">{countryCode(item.country)}</span>
                    <div className={styles.destBody}>
                      <span className={styles.destRoute}>
                        <span className={`${v2t.monoMicro} ${styles.destFrom}`}>US Port</span>
                        <span className={styles.destArrow} aria-hidden="true">&rarr;</span>
                        <span className={styles.destCountry}>{item.country}</span>
                      </span>
                      <span className={styles.destNotes}>{item.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Contextual CTA — its own board mini-band; the cream ContextualCTA card
          reads as the contrast island on the dark surface. */}
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.ctaBandInner}`}>
          <ContextualCTA variant="card" to="/dealers" intlKey="dealers" tone="teal" />
        </div>
      </section>

      {/* Exporter FAQ — paper band. Plain H2 opener: docs + destinations already
          hold the consecutive eyebrow-pair cap (2) in the preceding paper band;
          exporterFaq.kicker stays unrendered. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          {exporterFaq && faqItems.length > 0 && (
            <section className={styles.faqBlock}>
              <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{exporterFaq.title}</h2>
              <div className={styles.faqList}>
                {faqItems.map((item, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqSummary}>
                      <span>{item.q}</span>
                      <span className={styles.faqChevron} aria-hidden="true">&#9662;</span>
                    </summary>
                    <p className={styles.faqAnswer}>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Mid-page CTA — board mini-band, the page's close-dark. Anchor scroll
          back to the form; the gradient CTA is this viewport's red fill. */}
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.midCtaInner}`}>
          <a href="#exporter-form" className={v2b.cta}>
            {t('midCta')}
          </a>
        </div>
      </section>

      {/* Cross-links — manifest tail. Body-Link Law styling. */}
      <section className={v2s.manifest}>
        <div className={`${v2s.inner} ${styles.crosslinksInner}`}>
          <span className={`${v2t.monoLabel} ${styles.crosslinksTitle}`}>{t('crosslinks.title')}</span>
          <div className={styles.crosslinksRow}>
            <Link to="/door-to-port-auto-transport" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.deepDive')} &rarr;</Link>
            <Link to="/auction-to-port-transport" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.auction')} &rarr;</Link>
            <Link to="/copart-shipping" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.copartShipping')}</Link>
            <Link to="/copart-international-shipping" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.copartExport')}</Link>
            <Link to="/dealers" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.dealers')} &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
