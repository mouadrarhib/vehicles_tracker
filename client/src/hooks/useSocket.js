import { useEffect, useRef, useState } from 'react'

function resolveWsUrl() {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL
  }

  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${protocol}//localhost:3001`
  }

  return 'ws://localhost:3001'
}

const WS_URL = resolveWsUrl()

export function useSocket() {
  const [connected, setConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)
  const reconnectTimer = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    let disposed = false

    const connect = () => {
      if (disposed) {
        return
      }

      console.log('[WS] Connecting to', WS_URL)
      const ws = new WebSocket(WS_URL)
      socketRef.current = ws

      ws.onopen = () => {
        setConnected(true)
        console.log('[WS] Connected')
      }

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          if (message.event === 'vehicle:update') {
            setLastUpdate(message.data)
          }
        } catch (error) {
          console.error('[WS ERROR]', error)
        }
      }

      ws.onclose = () => {
        setConnected(false)
        console.log('[WS] Disconnected')
        if (!disposed) {
          reconnectTimer.current = setTimeout(connect, 3000)
        }
      }

      ws.onerror = (error) => {
        console.error('[WS ERROR] Could not connect to', WS_URL, error)
      }
    }

    connect()

    return () => {
      disposed = true
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current)
      }
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  return { connected, lastUpdate }
}
