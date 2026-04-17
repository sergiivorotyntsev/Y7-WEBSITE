import ScrollReveal from './ScrollReveal';
import { ShieldCheckIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, ClockIcon } from './icons';
import styles from './WhyY7.module.css';

const ITEMS = [
  { icon: <ShieldCheckIcon />, title: 'Licensed & Insured', desc: 'USDOT #4427359, MC #1741537. Fully licensed property broker.' },
  { icon: <VerifiedIcon />, title: 'Central Dispatch Verified', desc: '90% of our orders go through CD. Verified broker with top ratings.' },
  { icon: <EyeIcon />, title: 'Transparent Pricing', desc: 'No hidden fees. Carrier rate + service fee. What you see is what you pay.' },
  { icon: <MapPinIcon />, title: 'Shipment Status Updates', desc: 'Monitor your shipment via portal, email, SMS, or Telegram. Carrier phone number provided after dispatch.' },
  { icon: <GlobeIcon />, title: 'Multilingual Support', desc: 'EN, RU, PL, UK — we speak your language. Global exporter network.' },
  { icon: <ClockIcon />, title: 'Fast Dispatch Response', desc: 'Quotes typically within 1 hour during business hours. Dedicated dispatch coordinator.' },
];

export default function WhyY7() {
  return (
    <div>
      <h2 className={styles.title}>Why Shippers Choose Y7</h2>
      <div className={styles.grid}>
        {ITEMS.map(({ icon, title, desc }, i) => (
          <ScrollReveal key={title} delay={i * 80} style={{ display: 'flex' }}>
            <div className={styles.item}>
              <span className={styles.iconWrap}>{icon}</span>
              <div>
                <div className={styles.itemTitle}>{title}</div>
                <div className={styles.itemDesc}>{desc}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
