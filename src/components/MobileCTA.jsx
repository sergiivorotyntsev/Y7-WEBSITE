import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TelegramIcon, EmailIcon, ClipboardIcon } from './icons';
import styles from './MobileCTA.module.css';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPortal = location.pathname.startsWith('/portal');

  useEffect(() => {
    if (isPortal) return;
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPortal]);

  if (isPortal) return null;

  const handleQuote = () => {
    if (location.pathname === '/' || location.pathname.match(/^\/[a-z]{2}$/)) {
      const el = document.getElementById('quote-section');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/quote');
  };

  return (
    <div className={`${styles.bar} ${visible ? styles.barVisible : ''}`}>
      <a
        href="https://t.me/y7dispatch_bot"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        <TelegramIcon size={16} color="#fff" /> Telegram
      </a>
      <a href="mailto:info@y7agency.com" className={styles.btn}>
        <EmailIcon size={16} color="#fff" /> Email
      </a>
      <button onClick={handleQuote} className={styles.btn}>
        <ClipboardIcon size={16} color="#fff" /> Quote
      </button>
    </div>
  );
}
