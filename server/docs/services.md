# Services

## ingestService

`process(payload)` workflow:

1. Open PG client and `BEGIN` transaction.
2. `upsertVehicle`.
3. `insertPosition`.
4. `insertVehicleState`.
5. `insertCanFlags`.
6. `COMMIT` (or `ROLLBACK` on error).
7. Release PG client.
8. Build normalized `vehicleState` object.
9. Cache latest state in Redis.
10. Broadcast `vehicle:update` over WS.
11. Emit ingest logs.

## postgresService

- Write ops:
  - `upsertVehicle(client, payload)`
  - `insertPosition(client, payload, vehicleId)`
  - `insertVehicleState(client, payload, positionId)`
  - `insertCanFlags(client, payload, positionId)`
- Read ops:
  - `getLatestAllVehicles()`
  - `getLatestByIdent(ident)`
  - `getHistory(ident, { from, to, limit, offset })`

## redisService

- `setVehicle(ident, data)` stores `vehicle:{ident}`.
- `getVehicle(ident)` returns parsed object or `null`.
- `getAllVehicles()` loads all `vehicle:*` entries.

## socketService

- Thin service wrapper over `ws/socketServer.js`.
- Exposes:
  - `broadcast(event, data)`
  - `getConnectedCount()`

Broadcast path:

`ingestService` → `socketService.broadcast(...)` → `socketServer.broadcast(...)` → all OPEN WS clients.
