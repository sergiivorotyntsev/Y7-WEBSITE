import { colors } from '../theme';

/**
 * Canonical order status enum, labels, colors, and badge helper.
 * Single source of truth for status display across the app.
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  LINKED: 'linked',
  QUOTED: 'quoted',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  DISPATCHED: 'dispatched',
  LISTED: 'listed',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
};

export const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Quote Requested',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.REJECTED]: 'Rejected',
  [ORDER_STATUS.LINKED]: 'Carrier Matched',
  [ORDER_STATUS.QUOTED]: 'Quote Sent',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.DECLINED]: 'Declined',
  [ORDER_STATUS.DISPATCHED]: 'Carrier Assigned',
  [ORDER_STATUS.LISTED]: 'Sourcing New Carrier',
  [ORDER_STATUS.PICKED_UP]: 'Picked Up',
  [ORDER_STATUS.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.EXPIRED]: 'Expired',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#6c757d',
  [ORDER_STATUS.ACCEPTED]: '#28a745',
  [ORDER_STATUS.REJECTED]: '#dc3545',
  [ORDER_STATUS.LINKED]: '#17a2b8',
  [ORDER_STATUS.QUOTED]: '#0d6efd',
  [ORDER_STATUS.CONFIRMED]: '#28a745',
  [ORDER_STATUS.DECLINED]: '#dc3545',
  [ORDER_STATUS.DISPATCHED]: '#6f42c1',
  [ORDER_STATUS.LISTED]: '#fd7e14',
  [ORDER_STATUS.PICKED_UP]: '#17a2b8',
  [ORDER_STATUS.IN_TRANSIT]: '#fd7e14',
  [ORDER_STATUS.DELIVERED]: '#198754',
  [ORDER_STATUS.COMPLETED]: '#198754',
  [ORDER_STATUS.EXPIRED]: '#adb5bd',
  [ORDER_STATUS.CANCELLED]: '#adb5bd',
};

/** Ordered list of statuses for timeline progression */
export const STATUS_PIPELINE = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.QUOTED,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.DISPATCHED,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.IN_TRANSIT,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.COMPLETED,
];

/**
 * Returns a styled badge object { label, color, backgroundColor } for a given status.
 * @param {string} status - raw status string from the API
 * @returns {{ label: string, color: string, backgroundColor: string }}
 */
export function getStatusBadge(status) {
  const normalized = (status || '').toLowerCase();
  const label = STATUS_LABELS[normalized] || status || 'Unknown';
  const color = STATUS_COLORS[normalized] || colors.textMuted;
  // Derive a light background from the status color
  const backgroundColor = color + '18'; // ~10% opacity hex suffix
  return { label, color, backgroundColor };
}
