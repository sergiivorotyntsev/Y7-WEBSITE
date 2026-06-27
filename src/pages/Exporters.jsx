import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import MoneyPageSchema from '../components/MoneyPageSchema';
import FaqPageSchema from '../components/FaqPageSchema';
import ContextualCTA from '../components/ContextualCTA';
import { CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import PhoneInput, { getCleanPhone, isValidPhone } from '../components/PhoneInput';
import styles from './Exporters.module.css';
import btn from '../styles/buttons.module.css';
import forms from '../styles/forms.module.css';

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
  const { t } = useTranslation('exporters');
  const { t: tCommon } = useTranslation('common');
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
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Exporters',url:'/exporters'}]} />
      <MoneyPageSchema pageType="exporters" />
      <FaqPageSchema pageUrl="https://www.y7agency.com/exporters" items={faqItems} />
      <PageMeta title={tCommon('meta.exportersTitle')} description={tCommon('meta.exportersDescription')} path="/exporters" />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroMicro}>&#9670; {t('hero.kicker')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <div className={styles.heroTrust}>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
        </div>
      </section>

      <div className={styles.body}>
      {/* Value proposition */}
      <div className={styles.valueCallout}>
        <h2 className={styles.valueTitle}>{t('value.title')}</h2>
        <ul className={styles.valueList}>
          {Array.isArray(valuePoints) && valuePoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Service Fee Table */}
      <div className={styles.feeBlock}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMicro}>{t('fees.kicker')}</span>
          <h2 className={styles.sectionHeading}>{t('fees.title')}</h2>
        </div>
        <div className={styles.feeTable}>
          {Array.isArray(fees) && fees.map((fee, i) => (
            <div key={i} className={styles.feeRow}>
              <div className={styles.feeLabel}>
                <div className={styles.feeTitle}>{fee.service}</div>
                <div className={styles.feeDesc}>{fee.desc}</div>
              </div>
              <div className={styles.feeBadge}>{fee.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works — 4 steps */}
      <div className={styles.howBlock}>
        <h2 className={styles.howTitle}>{t('howTitle')}</h2>
        <div className={styles.stepsGrid}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Port Coverage — C motif: route rail + number anchors + port-pills */}
      <div className={styles.portsBlock}>
        <h2 className={styles.portsTitle}>{t('ports.title')}</h2>

        {/* Route rail: auction/dealer -> US export port -> destination */}
        <div className={styles.routeRail}>
          <svg className={styles.routeSvg} viewBox="0 0 760 60" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.routeTrack} d="M40 15 H720" />
            <path className={styles.routeGlow} d="M40 15 H720" />
          </svg>
          <div className={styles.routeNode}>
            <div className={styles.routeDot} />
            <div className={styles.routeLabel}>Auction / Dealer</div>
          </div>
          <div className={styles.routeNode}>
            <div className={`${styles.routeDot} ${styles.routeDotMid}`} />
            <div className={styles.routeLabel}>US Export Port</div>
            {portCount > 0 && <div className={styles.routeSub}>{portCount} ports</div>}
          </div>
          <div className={styles.routeNode}>
            <div className={styles.routeDot} />
            <div className={styles.routeLabel}>Destination</div>
          </div>
        </div>

        {/* Number anchors = the page's mid-page dark spotlight band. Restyles facts
            already on the page: port/destination counts + footer USDOT/BMC-84. */}
        <div className={styles.anchorsBand}>
          <div className={styles.anchorsRow}>
            {portCount > 0 && (
              <div className={styles.anchor}>
                <p className={styles.anchorNum}>{portCount}</p>
                <p className={styles.anchorLabel}>US export ports</p>
              </div>
            )}
            {destItems.length > 0 && (
              <div className={styles.anchor}>
                <p className={styles.anchorNum}>{destItems.length}</p>
                <p className={styles.anchorLabel}>destinations</p>
              </div>
            )}
            <div className={styles.anchor}>
              <p className={styles.anchorNum}>$75K</p>
              <p className={styles.anchorLabel}>BMC-84 bond</p>
            </div>
            <div className={styles.anchor}>
              <p className={styles.anchorNum}>#4427359</p>
              <p className={styles.anchorLabel}>USDOT</p>
            </div>
          </div>
        </div>

        <div className={styles.portsGrid}>
          {Array.isArray(portList) && portList.map((port, i) => {
            const { slug, code } = portMeta(port.name);
            const card = (
              <div className={styles.portCard}>
                <div className={styles.portTop}>
                  <span className={styles.portPin} aria-hidden="true" />
                  <span className={styles.portCode}>{code}</span>
                </div>
                <div className={styles.portName}>{port.name}</div>
                <div className={styles.portDesc}>{port.desc}</div>
                {slug && <div className={styles.portCta}>{t('crosslinks.viewPortDetails')}</div>}
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
      </div>

      {/* Request Form */}
      <div id="exporter-form" className={styles.formBlock}>
        {success ? (
          <div className={styles.successBlock}>
            <div className={styles.successIcon}><CheckIcon size={16} /></div>
            <h3 className={styles.successTitle}>{t('formSuccess.title')}</h3>
            <p className={styles.successMsg}>{t('formSuccess.message')}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.formTitle}>{t('form.title')}</h2>
            <p className={styles.formSubtitle}>{t('form.subtitle')}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-company" className={forms.label}>{t('form.companyName')}</label>
                  <input id="exporter-company" className={forms.input} value={form.company_name} onChange={e => set('company_name', e.target.value)} />
                </div>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-name" className={forms.label}>{t('form.contactName')} *</label>
                  <input id="exporter-name" className={`${forms.input} ${fieldErrors.contact_name ? styles.fieldError : ''}`} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} aria-invalid={fieldErrors.contact_name ? 'true' : undefined} />
                  {fieldErrors.contact_name && <span className={styles.fieldErrorMsg}>{fieldErrors.contact_name}</span>}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-email" className={forms.label}>{t('form.email')} *</label>
                  <input id="exporter-email" type="email" className={`${forms.input} ${fieldErrors.email ? styles.fieldError : ''}`} value={form.email} onChange={e => set('email', e.target.value)} aria-invalid={fieldErrors.email ? 'true' : undefined} />
                  {fieldErrors.email && <span className={styles.fieldErrorMsg}>{fieldErrors.email}</span>}
                </div>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-phone" className={forms.label}>{t('form.phone')}</label>
                  <PhoneInput id="exporter-phone" className={`${forms.input} ${fieldErrors.phone ? styles.fieldError : ''}`} value={form.phone} onChange={v => set('phone', v)} />
                  {fieldErrors.phone && <span className={styles.fieldErrorMsg}>{fieldErrors.phone}</span>}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-volume" className={forms.label}>{t('form.monthlyVolume')}</label>
                  <select id="exporter-volume" className={forms.select} value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)}>
                    <option value="">{t('form.volumeSelect')}</option>
                    {Array.isArray(volumes) && volumes.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className={forms.inputGroup}>
                  <label htmlFor="exporter-port" className={forms.label}>{t('form.preferredPorts')}</label>
                  <input
                    id="exporter-port"
                    className={forms.input}
                    value={form.preferred_ports}
                    onChange={e => set('preferred_ports', e.target.value)}
                    placeholder={t('form.portsPlaceholder')}
                  />
                </div>
              </div>
              <div className={forms.inputGroup}>
                <label htmlFor="exporter-vins" className={forms.label}>{t('form.vins')}</label>
                <textarea
                  id="exporter-vins"
                  className={`${forms.textarea} ${styles.vinTextarea}`}
                  value={form.vins}
                  onChange={e => set('vins', e.target.value)}
                  placeholder={t('form.vinsPlaceholder')}
                  rows={4}
                />
              </div>
              <div className={forms.inputGroup}>
                <label htmlFor="exporter-notes" className={forms.label}>{t('form.notes')}</label>
                <textarea
                  id="exporter-notes"
                  className={forms.textarea}
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  placeholder={t('form.notesPlaceholder')}
                  rows={3}
                />
              </div>

              {error && <div className={styles.errorAlert} role="alert">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className={`${btn.btnAccent} ${styles.submitBtn}`}
              >
                {submitting ? t('form.submitting') : t('form.submit')}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Export documents checklist */}
      {exportDocs && docItems.length > 0 && (
        <section className={styles.docsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>&#9670; {exportDocs.kicker}</span>
            <h2 className={styles.sectionHeading}>{exportDocs.title}</h2>
          </div>
          <ul className={styles.docsList}>
            {docItems.map((item, i) => (
              <li key={i} className={styles.docsItem}>
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

      {/* Destinations */}
      {destinations && destItems.length > 0 && (
        <section className={styles.destinationsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>&#9670; {destinations.kicker}</span>
            <h2 className={styles.sectionHeading}>{destinations.title}</h2>
          </div>
          <div className={styles.destinationsGrid}>
            {destItems.map((item, i) => (
              <div key={i} className={styles.destItem}>
                <span className={styles.destBadge} aria-hidden="true">{countryCode(item.country)}</span>
                <div className={styles.destBody}>
                  <span className={styles.destRoute}>
                    <span className={styles.destFrom}>US Port</span>
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

      {/* Contextual CTA to dealers */}
      <ContextualCTA variant="card" to="/dealers" intlKey="dealers" tone="teal" />

      {/* Exporter FAQ */}
      {exporterFaq && faqItems.length > 0 && (
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>&#9670; {exporterFaq.kicker}</span>
            <h2 className={styles.sectionHeading}>{exporterFaq.title}</h2>
          </div>
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

      {/* Mid-page CTA: post-FAQ anchor scroll back to form */}
      <div className={styles.midCta}>
        <a href="#exporter-form" className={styles.midCtaButton}>
          {t('midCta')}
        </a>
      </div>

      {/* Cross-links */}
      <div className={styles.crosslinks}>
        <span className={styles.crosslinksTitle}>{t('crosslinks.title')}</span>
        <div className={styles.crosslinksRow}>
          <Link to="/door-to-port-auto-transport" className={styles.crosslink}>{t('crosslinks.deepDive')} &rarr;</Link>
          <Link to="/auction-to-port-transport" className={styles.crosslink}>{t('crosslinks.auction')} &rarr;</Link>
          <Link to="/copart-shipping" className={styles.crosslink}>{t('crosslinks.copartShipping')}</Link>
          <Link to="/copart-international-shipping" className={styles.crosslink}>{t('crosslinks.copartExport')}</Link>
          <Link to="/dealers" className={styles.crosslink}>{t('crosslinks.dealers')} &rarr;</Link>
        </div>
      </div>
      </div>
    </div>
  );
}
