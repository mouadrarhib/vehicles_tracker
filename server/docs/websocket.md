# WebSocket

## Connection

- URL: `ws://localhost:3001`
- Server is initialized at startup via `socketServer.init(httpServer)`.

## Welcome message

On connection, client receives:

```json
{
  "event": "connected",
  "data": {
    "message": "Connected to vehicle tracker",
    "timestamp": 1715593600000
  }
}
```

## `vehicle:update` event

Broadcast payload format:

```json
{
  "event": "vehicle:update",
  "data": {
    "ident": "861327087811118",
    "latitude": 33.561132,
    "longitude": -7.116593
  },
  "timestamp": 1715593600000
}
```

`data` contains the full `vehicleState` object from `ingestService`.

## Ping/pong behavior

- Client sends: `{ "event": "ping" }`
- Server responds: `{ "event": "pong", "data": { "timestamp": ... } }`

## Broadcast logic

- `broadcast(event, data)`: sends to OPEN clients only and logs reached count.
- `broadcastToAll(event, data)`: same behavior + logs skipped client count.

## Example React hook

```js
import { useEffect } from 'react'

export function useSocket(onVehicleUpdate) {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001')

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data)
      if (msg.event === 'vehicle:update') {
        onVehicleUpdate?.(msg.data)
      }
    }

    return () => ws.close()
  }, [onVehicleUpdate])
}
```
