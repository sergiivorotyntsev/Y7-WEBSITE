import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavDropdown.module.css';

/**
 * NavDropdown — hover-and-click dropdown for desktop nav.
 *
 * Props:
 *   label       — string shown on the trigger button
 *   items       — [{ to, label, desc }]
 *   activeMatch — optional regex tested against location.pathname for "active" styling
 */
export default function NavDropdown({ label, items, activeMatch }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const location = useLocation();

  const isActive = activeMatch ? activeMatch.test(location.pathname) : false;

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Click-outside closes the panel
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Escape closes and restores focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      data-open={open ? 'true' : 'false'}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        className={isActive ? styles.triggerActive : styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <span className={styles.caret} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          className={styles.panel}
          role="menu"
          aria-label={label}
        >
          {items.map((it, idx) => {
            if (it.divider) {
              return <li key={`divider-${idx}`} role="separator" className={styles.divider} />;
            }
            const active = location.pathname === it.to;
            return (
              <li key={it.to} role="none">
                <Link
                  to={it.to}
                  role="menuitem"
                  className={active ? styles.itemActive : styles.item}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.itemTitle}>{it.label}</span>
                  {it.desc && <span className={styles.itemDesc}>{it.desc}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
