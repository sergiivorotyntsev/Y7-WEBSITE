import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { colors, fonts } from '../theme';
import { apiPost } from '../hooks/useApi';
import PageMeta from '../components/PageMeta';
import { trackEvent } from '../utils/analytics';

export default function ReviewSubmit() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const preRating = parseInt(searchParams.get('rating'), 10);

  const [rating, setRating] = useState(preRating >= 1 && preRating <= 5 ? preRating : 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    trackEvent('review_page_view', { has_rating_param: preRating >= 1 && preRating <= 5 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setStatus('submitting');
    try {
      await apiPost('/api/public/review', {
        token,
        rating,
        review_text: reviewText || null,
        customer_name: customerName || null,
      });
      setStatus('success');
      trackEvent('review_submit', { rating });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong');
    }
  };

  const displayRating = hoverRating || rating;

  if (status === 'success') {
    return (
      <>
        <PageMeta title="Thank You | Y7 Logistics" description="Review submitted" />
        <div style={{
          maxWidth: 520, margin: '0 auto', padding: '80px 20px', textAlign: 'center',
          fontFamily: fonts.sans,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(22px, 4vw, 28px)', color: colors.text, marginBottom: 12 }}>
            Thank you for your review!
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 15, lineHeight: 1.6 }}>
            Your feedback helps other shippers make informed decisions and helps us improve our service.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Leave a Review | Y7 Logistics" description="Share your shipping experience with Y7 Logistics" />
      <div style={{
        maxWidth: 520, margin: '0 auto', padding: '60px 20px 80px',
        fontFamily: fonts.sans,
      }}>
        <h1 style={{
          fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 32px)',
          color: colors.text, marginBottom: 8, textAlign: 'center',
        }}>
          How was your experience?
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 15, textAlign: 'center', marginBottom: 32 }}>
          Your honest feedback helps us serve you better.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Star rating */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'inline-flex', gap: 8, cursor: 'pointer' }}
                 onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map(i => (
                <span
                  key={i}
                  role="button"
                  aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  style={{
                    fontSize: 40, lineHeight: 1, transition: 'transform 0.15s',
                    transform: displayRating >= i ? 'scale(1.1)' : 'scale(1)',
                    color: displayRating >= i ? '#F5A623' : '#ddd',
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {rating === 0 && <p style={{ fontSize: 13, color: colors.accent, marginTop: 8 }}>Please select a rating</p>}
          </div>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
              Your name (optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="e.g. John D."
              maxLength={100}
              style={{
                width: '100%', padding: '10px 12px', fontSize: 14, border: `1px solid ${colors.border}`,
                borderRadius: 8, background: colors.bgCard, outline: 'none', boxSizing: 'border-box',
                fontFamily: fonts.sans,
              }}
            />
          </div>

          {/* Review text */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
              Your review (optional)
            </label>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Tell us about your shipping experience..."
              maxLength={2000}
              rows={4}
              style={{
                width: '100%', padding: '10px 12px', fontSize: 14, border: `1px solid ${colors.border}`,
                borderRadius: 8, background: colors.bgCard, outline: 'none', resize: 'vertical',
                fontFamily: fonts.sans, boxSizing: 'border-box', lineHeight: 1.5,
              }}
            />
            <div style={{ fontSize: 11, color: colors.textMuted, textAlign: 'right', marginTop: 2 }}>
              {reviewText.length}/2000
            </div>
          </div>

          {/* Error message */}
          {status === 'error' && (
            <div style={{
              padding: '10px 14px', marginBottom: 16, borderRadius: 8,
              background: '#FEE2E2', color: '#991B1B', fontSize: 13,
            }}>
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={rating === 0 || status === 'submitting'}
            style={{
              width: '100%', padding: '14px 24px', fontSize: 15, fontWeight: 700,
              background: rating === 0 ? '#ccc' : colors.accent,
              color: '#fff', border: 'none', borderRadius: 24, cursor: rating === 0 ? 'default' : 'pointer',
              fontFamily: fonts.sans, letterSpacing: 0.5,
              opacity: status === 'submitting' ? 0.7 : 1,
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </>
  );
}
