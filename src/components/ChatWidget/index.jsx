import { useState, useEffect, useRef } from 'react'
import { colors, fonts, v2 } from '../../theme'
import useChatStream from './useChatStream'
import LeadForm from './LeadForm'

const QUICK_REPLIES = [
  'I need a transport quote',
  'Track my shipment',
  'What are your rates?',
]

// Strip markdown that Claude may return despite prompt instructions
function cleanMd(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#{1,3}\s/gm, '')
    .replace(/^[-*]\s/gm, '\u2022 ')
}

// ── Bubble button ──────────────────────────────────────────────

function ChatBubbleButton({ onClick, open }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close chat' : 'Chat with us'}
      style={{
        position: 'fixed', bottom: 90, right: 24, zIndex: 9999,
        width: 56, height: 56, borderRadius: '50%',
        background: v2.colors.panel, color: v2.colors.textOnDark,
        border: `1px solid ${v2.colors.lineOnDarkStrong}`, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
        transform: open ? 'rotate(90deg)' : 'none',
        fontSize: 24,
      }}
    >
      {open ? '\u2715' : '\uD83D\uDCAC'}
    </button>
  )
}

// ── Chat message bubbles ───────────────────────────────────────

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 10, animation: 'fadeUp 0.25s ease',
    }}>
      <div style={{
        maxWidth: '85%', padding: '10px 14px', borderRadius: 16,
        background: isUser ? v2.colors.red : '#fff',
        color: isUser ? '#fff' : colors.text,
        fontSize: 14, lineHeight: 1.5,
        fontFamily: fonts.sans,
        border: isUser ? 'none' : `1px solid ${colors.border}`,
        boxShadow: isUser ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word',
      }}>
        {isUser ? msg.content : cleanMd(msg.content)}
        {msg.streaming && <span style={{ animation: 'pulse 1s infinite', marginLeft: 2 }}>{'\u2588'}</span>}
      </div>
    </div>
  )
}

// ── Quick reply buttons ────────────────────────────────────────

function QuickReplies({ onSelect, show }) {
  if (!show) return null
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 16px' }}>
      {QUICK_REPLIES.map(text => (
        <button key={text} onClick={() => onSelect(text)} style={{
          padding: '6px 12px', fontSize: 12, borderRadius: 16,
          border: `1px solid ${colors.border}`, background: '#fff',
          color: colors.text, cursor: 'pointer', fontFamily: fonts.sans,
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.target.style.background = colors.bgMuted}
          onMouseLeave={e => e.target.style.background = '#fff'}
        >{text}</button>
      ))}
    </div>
  )
}

// ── Input bar ──────────────────────────────────────────────────

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
  }

  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus()
  }, [disabled])

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', gap: 8, padding: '8px 12px',
      borderTop: `1px solid ${colors.border}`, background: '#fff',
      alignItems: 'center',
    }}>
      <input
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        style={{
          flex: 1, minWidth: 0, padding: '10px 14px',
          fontSize: 16,  /* 16px prevents iOS zoom on focus */
          border: `1px solid ${colors.border}`, borderRadius: 22,
          outline: 'none', fontFamily: fonts.sans,
          background: colors.bgInput,
        }}
      />
      <button type="submit" disabled={disabled || !text.trim()} style={{
        minWidth: 48, height: 44, /* WCAG touch target */
        padding: '0 16px', borderRadius: 22, border: 'none',
        flexShrink: 0,
        background: text.trim() && !disabled ? v2.colors.red : colors.bgMuted,
        color: text.trim() && !disabled ? '#fff' : colors.textMuted,
        fontSize: 16, fontWeight: 600, cursor: text.trim() && !disabled ? 'pointer' : 'default',
        fontFamily: fonts.sans, transition: 'background 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>Send</button>
    </form>
  )
}

// ── Main ChatWidget ────────────────────────────────────────────

// Persist the "lead already captured for this session" flag so a page
// reload doesn't re-prompt the same visitor. Stored against the current
// sessionUuid so switching sessions (via reset) wipes it.
const LS_LEAD_UUID = 'y7_chat_lead_for'
function readLeadSubmittedFor(uuid) {
  if (!uuid) return false
  try { return localStorage.getItem(LS_LEAD_UUID) === uuid } catch { return false }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { messages, streaming, send, reset, sessionUuid } = useChatStream()
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(() => readLeadSubmittedFor(
    typeof window !== 'undefined' ? localStorage.getItem('y7_chat_session') : null
  ))
  const scrollRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // When the restored session's lead flag matches the current uuid, skip the
  // prompt. If uuid changes (new session, or server rotated), re-evaluate.
  useEffect(() => {
    if (sessionUuid && readLeadSubmittedFor(sessionUuid)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLeadSubmitted(true)
    }
  }, [sessionUuid])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, showLeadForm, leadSubmitted])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  // Reset lead-capture state whenever a new chat is started
  useEffect(() => {
    if (messages.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLeadForm(false)
      setLeadSubmitted(false)
    }
  }, [messages.length])

  const showQuickReplies = messages.length === 0
  // Show the "get a personal quote" prompt once 3 user + 3 assistant turns
  // have happened AND we have a server-assigned session UUID to hand off.
  const showLeadPrompt = !showLeadForm && !leadSubmitted && sessionUuid && messages.length >= 6
  const telegramLink = sessionUuid
    ? `https://t.me/y7dispatch_bot?start=chat_${sessionUuid}`
    : null

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <ChatBubbleButton onClick={() => setOpen(o => !o)} open={open} />

      {open && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? 0 : 160,
          right: isMobile ? 0 : 24,
          width: isMobile ? '100vw' : 400,
          height: isMobile ? '100dvh' : 520,
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : 0,
          background: colors.bg,
          borderRadius: isMobile ? 0 : 16,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          zIndex: 10000, overflow: 'hidden',
          animation: 'slideUp 0.3s ease',
          border: isMobile ? 'none' : `1px solid ${colors.border}`,
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px', background: colors.dark, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 700 }}>Y7</span>
              <span style={{ color: colors.accent, fontFamily: fonts.serif, fontSize: 18, fontWeight: 700 }}>.</span>
              <span style={{ fontSize: 13, color: '#aaa', fontFamily: fonts.sans }}>Transport Assistant</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {messages.length > 0 && (
                <button onClick={reset} style={{
                  background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 12,
                  fontFamily: fonts.sans,
                }}>New chat</button>
              )}
              <button onClick={() => setOpen(false)} style={{
                background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18,
              }}>{'\u2715'}</button>
            </div>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: 'auto', padding: '16px 12px',
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{'\uD83D\uDE9B'}</div>
                <div style={{
                  fontFamily: fonts.serif, fontSize: 18, fontWeight: 700,
                  color: colors.text, marginBottom: 8,
                }}>Get a Transport Quote</div>
                <div style={{
                  fontSize: 13, color: colors.textMuted, lineHeight: 1.5,
                  fontFamily: fonts.sans,
                }}>
                  I'll help you get a vehicle transport quote in under 2 minutes.
                  Just tell me about your vehicle and route!
                </div>
              </div>
            )}
            {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}

            {showLeadForm && !leadSubmitted && (
              <LeadForm
                sessionUuid={sessionUuid}
                onSubmitted={() => {
                  setLeadSubmitted(true)
                  setShowLeadForm(false)
                  if (sessionUuid) {
                    try { localStorage.setItem(LS_LEAD_UUID, sessionUuid) } catch { /* ignore */ }
                  }
                }}
                onCancel={() => setShowLeadForm(false)}
              />
            )}

            {leadSubmitted && (
              <div style={{
                padding: '10px 14px',
                background: colors.successBg,
                border: `1px solid ${colors.success}33`,
                borderRadius: 12,
                margin: '6px 4px 2px',
                fontSize: 13,
                lineHeight: 1.5,
                color: colors.success,
                fontFamily: fonts.sans,
              }}>
                Thanks! We'll get back to you shortly with a personalized quote.
              </div>
            )}

            {showLeadPrompt && (
              <div style={{
                padding: '12px 14px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                margin: '6px 4px 2px',
                fontSize: 13,
                lineHeight: 1.5,
                fontFamily: fonts.sans,
                color: colors.text,
              }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Want a personalized quote?
                </div>
                <div style={{ color: colors.textMuted, marginBottom: 10 }}>
                  Leave your contact info or continue in Telegram — we'll get
                  back to you with a firm quote.
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowLeadForm(true)}
                    style={{
                      padding: '8px 14px',
                      background: colors.accent,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 18,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: fonts.sans,
                      letterSpacing: '0.3px',
                    }}
                  >
                    Leave contact info
                  </button>
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 14px',
                      background: '#0088cc',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 18,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: fonts.sans,
                      letterSpacing: '0.3px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    Continue in Telegram
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <QuickReplies onSelect={send} show={showQuickReplies} />

          {/* Input */}
          <ChatInput onSend={send} disabled={streaming} />
        </div>
      )}
    </>
  )
}
