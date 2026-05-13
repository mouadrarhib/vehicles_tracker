# Realtime (WebSocket)

## Connection

- URL from `VITE_WS_URL`
- Fallback: `ws://localhost:3001`

## Handled events

- `vehicle:update` → updates a vehicle in UI state instantly.

## Reconnect strategy

- On close, mark disconnected.
- Retry connection after 3000ms.
- Cleanup on unmount: clear timer and close socket.

## Expected behavior

With `server/simulate.js` running, vehicles should move on map every tick and table values should refresh without page reload.
