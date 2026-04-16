import { useRef, useState, useCallback } from 'react'
import { API_URL } from '../../config'

export default function useChatStream() {
  const [messages, setMessages] = useState([])
  const [streaming, setStreaming] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).slice(2, 14))
  // Server-assigned UUID from the first SSE `session` event of a conversation.
  // Stays stable across every follow-up `send()` so lead-capture can attribute
  // all messages back to one chat session.
  const [sessionUuid, setSessionUuid] = useState(null)
  const sessionUuidRef = useRef(null)
  const [quoteDone, setQuoteDone] = useState(null)
  const bufferRef = useRef('')
  const rafRef = useRef(null)

  const flushBuffer = useCallback(() => {
    const text = bufferRef.current
    if (!text) return
    bufferRef.current = ''
    setMessages(prev => {
      const last = prev[prev.length - 1]
      if (last && last.role === 'assistant' && last.streaming) {
        return [...prev.slice(0, -1), { ...last, content: last.content + text }]
      }
      return [...prev, { role: 'assistant', content: text, streaming: true }]
    })
  }, [])

  const send = useCallback(async (userText) => {
    if (!userText.trim() || streaming) return

    const userMsg = { role: 'user', content: userText.trim() }
    setMessages(prev => [...prev, userMsg])
    setStreaming(true)

    // Build conversation for API (only role + content)
    const apiMessages = [...messages, userMsg].map(m => ({
      role: m.role, content: m.content,
    })).filter(m => m.role === 'user' || m.role === 'assistant')

    try {
      const resp = await fetch(`${API_URL}/api/public/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          session_id: sessionId,
          session_uuid: sessionUuidRef.current || undefined,
          channel: 'ai_chat_website',
          landing_page: typeof window !== 'undefined' ? window.location.pathname : undefined,
          language: typeof document !== 'undefined' ? (document.documentElement.lang || 'en') : 'en',
        }),
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${resp.status}`)
      }

      const reader = resp.body.getReader()
      const decoder = new TextDecoder()
      let partialLine = ''
      // SSE: `event:` and `data:` arrive on separate lines. Track the most
      // recent event name so the matching data payload is dispatched correctly.
      let currentEvent = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = (partialLine + chunk).split('\n')
        partialLine = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim()
            continue
          }
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            try {
              const data = JSON.parse(dataStr)

              if (currentEvent === 'session') {
                const uuid = data.session_uuid || data.uuid || null
                if (uuid && !sessionUuidRef.current) {
                  sessionUuidRef.current = uuid
                  setSessionUuid(uuid)
                }
              } else if (data.text) {
                // Default payload: streamed assistant text.
                bufferRef.current += data.text
                if (!rafRef.current) {
                  rafRef.current = requestAnimationFrame(() => {
                    flushBuffer()
                    rafRef.current = null
                  })
                }
              }
            } catch { /* ignore parse errors */ }
            // A single event is consumed by its data line; reset so a stray
            // line without an `event:` header falls through to default handling.
            currentEvent = null
          } else if (line === '') {
            // Blank line terminates an SSE frame.
            currentEvent = null
          }
        }
      }

      // Final flush
      flushBuffer()

      // Mark last assistant message as not streaming
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last && last.role === 'assistant' && last.streaming) {
          return [...prev.slice(0, -1), { ...last, streaming: false }]
        }
        return prev
      })
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: err.message || 'Connection error. Please try again.', error: true },
      ])
    } finally {
      setStreaming(false)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [messages, streaming, sessionId, flushBuffer])

  const reset = useCallback(() => {
    setMessages([])
    setQuoteDone(null)
    setSessionUuid(null)
    sessionUuidRef.current = null
  }, [])

  return { messages, streaming, send, reset, sessionId, sessionUuid, quoteDone }
}
