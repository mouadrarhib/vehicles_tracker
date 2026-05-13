const WebSocket = require('ws')

let wss = null

function getOpenClientCount() {
  if (!wss) {
    return 0
  }

  let count = 0
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      count += 1
    }
  })
  return count
}

function init(httpServer) {
  wss = new WebSocket.Server({ server: httpServer })

  wss.on('connection', (socket) => {
    console.log(`[WS] Client connected | total: ${getOpenClientCount()} clients`)

    socket.send(
      JSON.stringify({
        event: 'connected',
        data: {
          message: 'Connected to vehicle tracker',
          timestamp: Date.now(),
        },
      }),
    )

    socket.on('message', (raw) => {
      try {
        const parsed = JSON.parse(raw.toString())
        console.log('[WS] Message received', parsed)

        if (parsed && parsed.event === 'ping') {
          socket.send(JSON.stringify({ event: 'pong', data: { timestamp: Date.now() } }))
        }
      } catch (error) {
        console.log('[WS] Message received', raw.toString())
      }
    })

    socket.on('close', () => {
      console.log(`[WS] Client disconnected | total: ${getOpenClientCount()} clients`)
    })

    socket.on('error', (error) => {
      console.error(`[WS ERROR] ${error.message}`)
    })
  })

  return wss
}

function broadcast(event, data) {
  if (!wss) {
    console.warn('[WS] Broadcast attempted before initialization')
    return
  }

  let reached = 0
  const payload = JSON.stringify({ event, data, timestamp: Date.now() })
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload)
      reached += 1
    }
  })

  console.log(`[WS BROADCAST] ${event} | ${reached} clients reached`)
}

function broadcastToAll(event, data) {
  if (!wss) {
    console.warn('[WS] Broadcast attempted before initialization')
    return
  }

  let reached = 0
  let skipped = 0
  const payload = JSON.stringify({ event, data, timestamp: Date.now() })
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload)
      reached += 1
    } else {
      skipped += 1
    }
  })

  console.log(`[WS BROADCAST] ${event} | ${reached} clients reached | ${skipped} skipped`)
}

function getConnectedCount() {
  return getOpenClientCount()
}

function getStats() {
  return {
    connected: getConnectedCount(),
    timestamp: Date.now(),
  }
}

module.exports = {
  init,
  broadcast,
  broadcastToAll,
  getConnectedCount,
  getStats,
}
