import { ClipboardIcon, DollarIcon, HandshakeIcon, TruckIcon, CheckIcon } from './icons';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    icon: <ClipboardIcon size={14} />,
    title: 'Submit Your Quote',
    desc: 'Enter your VIN and route details. We decode your vehicle instantly and show estimated pricing.',
    stat: 'Under 1 hour',
  },
  {
    icon: <DollarIcon size={14} />,
    title: 'Get Your Pricing',
    desc: 'Receive a competitive price range within 1 hour. Confirm when you are ready — no pressure.',
    stat: 'Transparent',
  },
  {
    icon: <HandshakeIcon size={14} />,
    title: 'Sign Agreement',
    desc: 'Quick digital signature on our transport agreement. Review terms, check boxes, type your name.',
    stat: '~2 min',
  },
  {
    icon: <TruckIcon size={14} />,
    title: 'Carrier Assigned',
    desc: 'We match your load with a vetted, insured carrier from our network. You get carrier name and phone.',
    stat: '100+ carriers',
  },
  {
    icon: <CheckIcon size={14} />,
    title: 'Vehicle Delivered',
    desc: 'Follow your shipment status via portal. Inspect on arrival, sign BOL, and you are done.',
    stat: '3–10 days',
  },
];

export default function HowItWorks() {
  return (
    <div className={styles.wrap}>
      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={step.title} className={styles.step} style={{ '--i': i }}>
            <div className={styles.num}>
              {String(i + 1).padStart(2, '0')}
              <span className={styles.numIconOverlay}>{step.icon}</span>
            </div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.desc}</p>
            <span className={styles.stat}>{step.stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
