import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { API_URL } from '../config';
import styles from './CareerApplication.module.css';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const MC_PATTERN = /^(MC-?)?\d{6,7}$/i;
const USDOT_PATTERN = /^\d{6,8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatPhone(v) {
  const d = (v || '').replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function CareerApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    legalName: '',
    mcNumber: '',
    usdotNumber: '',
    equipmentType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    operatingStates: [],
    notes: '',
    coiFile: null,
    w9File: null,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleState = (s) => {
    setForm((f) => ({
      ...f,
      operatingStates: f.operatingStates.includes(s)
        ? f.operatingStates.filter((x) => x !== s)
        : [...f.operatingStates, s],
    }));
  };

  const step1Valid =
    form.legalName.trim() &&
    MC_PATTERN.test(form.mcNumber.trim()) &&
    USDOT_PATTERN.test(form.usdotNumber.trim()) &&
    ['open', 'enclosed', 'both'].includes(form.equipmentType);

  const step2Valid =
    form.contactName.trim() &&
    EMAIL_PATTERN.test(form.contactEmail.trim()) &&
    form.contactPhone.replace(/\D/g, '').length === 10 &&
    form.operatingStates.length > 0;

  const step3Valid =
    form.coiFile &&
    form.w9File &&
    form.coiFile.size <= MAX_FILE_SIZE &&
    form.w9File.size <= MAX_FILE_SIZE;

  const handleFile = (k) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError(`${file.name} is larger than 10MB.`);
      return;
    }
    setError(null);
    set(k, file);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('legal_name', form.legalName.trim());
      fd.append('mc_number', form.mcNumber.trim());
      fd.append('usdot_number', form.usdotNumber.trim());
      fd.append('equipment_type', form.equipmentType);
      fd.append('contact_name', form.contactName.trim());
      fd.append('contact_email', form.contactEmail.trim());
      fd.append('contact_phone', form.contactPhone.replace(/\D/g, ''));
      fd.append('operating_states', form.operatingStates.join(','));
      if (form.notes.trim()) fd.append('notes', form.notes.trim());
      fd.append('coi_file', form.coiFile);
      fd.append('w9_file', form.w9File);

      const res = await fetch(`${API_URL}/api/public/carrier-application`, {
        method: 'POST',
        body: fd,
      });

      if (res.status === 409) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `MC #${form.mcNumber} is already in our system. If this is your company, contact dispatch@y7agency.com.`);
      }
      if (res.status === 429) {
        throw new Error('Too many applications from this IP in the last hour. Please wait and try again.');
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Submission failed (HTTP ${res.status}).`);
      }

      await res.json();
      setSubmitted(true);
    } catch (e) {
      setError(e.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }, { name: 'Apply', url: '/careers/apply' }]} />
        <PageMeta
          title="Application Received | Y7 Logistics"
          description="Your carrier application has been received."
          path="/careers/apply"
        />
        <section className={styles.successSection}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>&#x2713;</div>
            <h1 className={styles.successTitle}>Application received</h1>
            <p className={styles.successMsg}>
              Check your email at <strong>{form.contactEmail}</strong> for the onboarding link
              within 5 minutes (up to 30 during high-volume periods).
            </p>
            <p className={styles.successNote}>
              Didn&apos;t receive it? Check spam, then email{' '}
              <a href="mailto:dispatch@y7agency.com" className={styles.successLink}>dispatch@y7agency.com</a>.
            </p>
            <button onClick={() => navigate('/careers')} className={styles.successButton}>
              Back to careers
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }, { name: 'Apply', url: '/careers/apply' }]} />
      <PageMeta
        title="Carrier Application Form | Y7 Logistics"
        description="Submit your carrier application: MC#, USDOT#, COI, W9. Quick 3-step form. Secure onboarding portal for ACH banking setup."
        path="/careers/apply"
      />

      <section className={styles.heroSection}>
        <div className={styles.inner}>
          <Link to="/careers" className={styles.backLink}>&larr; Back to careers</Link>
          <h1 className={styles.title}>Carrier Application</h1>
          <p className={styles.subtitle}>Three short steps. Five minutes total. COI + W9 required.</p>

          <div className={styles.progress}>
            <div className={`${styles.progressStep} ${step >= 1 ? styles.progressActive : ''}`}>
              <span className={styles.progressNum}>1</span>
              <span className={styles.progressLabel}>Company</span>
            </div>
            <div className={styles.progressBar}><div className={`${styles.progressFill} ${step >= 2 ? styles.progressActive : ''}`} /></div>
            <div className={`${styles.progressStep} ${step >= 2 ? styles.progressActive : ''}`}>
              <span className={styles.progressNum}>2</span>
              <span className={styles.progressLabel}>Contact</span>
            </div>
            <div className={styles.progressBar}><div className={`${styles.progressFill} ${step >= 3 ? styles.progressActive : ''}`} /></div>
            <div className={`${styles.progressStep} ${step >= 3 ? styles.progressActive : ''}`}>
              <span className={styles.progressNum}>3</span>
              <span className={styles.progressLabel}>Documents</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formInner}>
          {step === 1 && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Company &amp; authority</h2>

              <label className={styles.label}>
                Legal company name <span className={styles.req}>*</span>
                <input
                  className={styles.input}
                  value={form.legalName}
                  onChange={(e) => set('legalName', e.target.value)}
                  placeholder="ACME Auto Transport LLC"
                />
              </label>

              <div className={styles.row}>
                <label className={styles.label}>
                  MC number <span className={styles.req}>*</span>
                  <input
                    className={styles.input}
                    value={form.mcNumber}
                    onChange={(e) => set('mcNumber', e.target.value)}
                    placeholder="MC-1234567 or 1234567"
                  />
                  <span className={styles.hint}>FMCSA motor carrier authority number.</span>
                </label>
                <label className={styles.label}>
                  USDOT number <span className={styles.req}>*</span>
                  <input
                    className={styles.input}
                    value={form.usdotNumber}
                    onChange={(e) => set('usdotNumber', e.target.value)}
                    placeholder="1234567"
                  />
                  <span className={styles.hint}>6-8 digit USDOT registration.</span>
                </label>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Equipment type <span className={styles.req}>*</span></legend>
                <div className={styles.radioRow}>
                  {['open', 'enclosed', 'both'].map((v) => (
                    <label key={v} className={styles.radio}>
                      <input
                        type="radio"
                        name="equipment"
                        value={v}
                        checked={form.equipmentType === v}
                        onChange={() => set('equipmentType', v)}
                      />
                      <span>{v === 'both' ? 'Both' : v.charAt(0).toUpperCase() + v.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.footer}>
                <button
                  className={styles.primary}
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Contact &amp; operations</h2>

              <label className={styles.label}>
                Primary contact name <span className={styles.req}>*</span>
                <input
                  className={styles.input}
                  value={form.contactName}
                  onChange={(e) => set('contactName', e.target.value)}
                  placeholder="John Smith"
                />
              </label>

              <div className={styles.row}>
                <label className={styles.label}>
                  Contact email <span className={styles.req}>*</span>
                  <input
                    type="email"
                    className={styles.input}
                    value={form.contactEmail}
                    onChange={(e) => set('contactEmail', e.target.value)}
                    placeholder="dispatch@yourcompany.com"
                  />
                </label>
                <label className={styles.label}>
                  Contact phone <span className={styles.req}>*</span>
                  <input
                    type="tel"
                    className={styles.input}
                    value={form.contactPhone}
                    onChange={(e) => set('contactPhone', formatPhone(e.target.value))}
                    placeholder="(555) 555-5555"
                    inputMode="numeric"
                    maxLength={14}
                  />
                </label>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Operating states <span className={styles.req}>*</span></legend>
                <p className={styles.hint}>Select the states where you regularly run loads. Affects lane matching.</p>
                <div className={styles.statesGrid}>
                  {STATES.map((s) => (
                    <label key={s} className={form.operatingStates.includes(s) ? styles.stateChipActive : styles.stateChip}>
                      <input
                        type="checkbox"
                        checked={form.operatingStates.includes(s)}
                        onChange={() => toggleState(s)}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={styles.label}>
                Notes (optional)
                <textarea
                  className={styles.textarea}
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Preferred lanes, factoring company, fleet size — anything we should know."
                />
              </label>

              <div className={styles.footer}>
                <button className={styles.secondary} onClick={() => setStep(1)}>&larr; Back</button>
                <button className={styles.primary} disabled={!step2Valid} onClick={() => setStep(3)}>
                  Next &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepCard}>
              <h2 className={styles.stepTitle}>Documents</h2>
              <p className={styles.stepIntro}>
                PDF or JPG/PNG. Max 10MB each. Files are validated by content type on the server.
              </p>

              <label className={styles.label}>
                Certificate of Insurance (COI) <span className={styles.req}>*</span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={handleFile('coiFile')}
                  className={styles.fileInput}
                />
                {form.coiFile && (
                  <span className={styles.fileOk}>
                    &#x2713; {form.coiFile.name} ({Math.round(form.coiFile.size / 1024)} KB)
                  </span>
                )}
              </label>

              <label className={styles.label}>
                W9 (current tax year) <span className={styles.req}>*</span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={handleFile('w9File')}
                  className={styles.fileInput}
                />
                {form.w9File && (
                  <span className={styles.fileOk}>
                    &#x2713; {form.w9File.name} ({Math.round(form.w9File.size / 1024)} KB)
                  </span>
                )}
              </label>

              <p className={styles.legal}>
                By submitting, you confirm that the information and uploaded documents are
                accurate. Y7 Logistics may verify details via FMCSA SAFER and your insurance
                provider before activating your carrier account.
              </p>

              {error && <div className={styles.errorBox} role="alert">{error}</div>}

              <div className={styles.footer}>
                <button className={styles.secondary} onClick={() => setStep(2)} disabled={submitting}>
                  &larr; Back
                </button>
                <button
                  className={styles.primary}
                  disabled={!step3Valid || submitting}
                  onClick={submit}
                >
                  {submitting ? 'Submitting...' : 'Submit application'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
