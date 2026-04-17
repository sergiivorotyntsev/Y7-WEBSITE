import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { ChevronRightIcon } from '../components/icons';
import styles from './FAQ.module.css';

function buildJsonLd(categories) {
  const entities = [];
  categories.forEach(cat => {
    cat.items.forEach(item => {
      entities.push({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      });
    });
  });
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entities,
  });
}

function QAItem({ question, answer, onToggle }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [answer, open]);

  function handleClick() {
    setOpen(o => !o);
    if (onToggle) setTimeout(onToggle, 50);
  }

  return (
    <div className={styles.qaItem}>
      <button onClick={handleClick} aria-expanded={open} className={styles.qaToggle}>
        <span>{question}</span>
        <span className={open ? styles.qaChevronOpen : styles.qaChevron} aria-hidden="true">
          <ChevronRightIcon size={16} />
        </span>
      </button>
      <div
        className={styles.qaBody}
        style={{ maxHeight: open ? `${height}px` : '0px' }}
      >
        <div ref={bodyRef}>
          <p className={styles.qaAnswer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

function Category({ name, items, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, []);

  useEffect(() => { measure(); }, [items, isOpen, measure]);

  const handleInnerToggle = useCallback(() => {
    setTimeout(measure, 10);
    setTimeout(measure, 320);
  }, [measure]);

  return (
    <div className={isOpen ? styles.categoryOpen : styles.category}>
      <button onClick={onToggle} aria-expanded={isOpen} className={styles.categoryToggle}>
        <span className={styles.categoryName}>{name}</span>
        <span className={isOpen ? styles.chevronOpen : styles.chevron} aria-hidden="true">
          <ChevronRightIcon size={16} />
        </span>
      </button>
      <div
        className={styles.categoryBody}
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={bodyRef} className={styles.categoryBodyInner}>
          {items.map((item, j) => (
            <QAItem key={j} question={item.q} answer={item.a} onToggle={handleInnerToggle} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation('faq');
  const categories = t('categories', { returnObjects: true });
  const [openCat, setOpenCat] = useState(0);

  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'FAQ',url:'/faq'}]} />
      <PageMeta
        title="FAQ"
        description="Common questions about auto transport: pricing, timing, insurance, BOL, auction pickup, port delivery."
        path="/faq"
        i18n
      />

      {validCategories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(validCategories) }}
        />
      )}

      <section className={styles.hero}>
        <span className={styles.kicker}>&#9670; Help Center</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </section>

      <div className={styles.body}>
        {validCategories.map((cat, i) => (
          <div key={i} style={{ '--i': i }}>
            <Category
              name={cat.name}
              items={cat.items}
              isOpen={openCat === i}
              onToggle={() => setOpenCat(prev => (prev === i ? -1 : i))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
