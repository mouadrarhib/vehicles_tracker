# Hooks

## `useVehicles(lastUpdate)`

- Fetches full list from backend on mount.
- Exposes: `vehicles`, `loading`, `error`, `refresh`.
- Normalizes backend fields into UI dot-notation shape.
- Applies WebSocket updates by `ident` without refetch.

## `useSocket()`

- Connects to `VITE_WS_URL` (fallback `ws://localhost:3001`).
- Exposes: `connected`, `lastUpdate`.
- Reconnects after 3 seconds when disconnected.

## `useVehicle(ident)`

- Fetches a single vehicle by ident.
- Exposes: `vehicle`, `loading`, `error`, `refresh`.

## `useVehicleHistory(ident)`

- Fetches paginated history with query filters.
- Exposes history data, loading/error state, and fetch helper.
