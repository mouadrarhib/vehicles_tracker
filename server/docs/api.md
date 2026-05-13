# API

Base URL: `http://localhost:3001`

## 1) POST `/gps/ingest`

- **Description**: ingest one GPS payload.
- **Middleware**: `validateIngest`.
- **Request body**: full telemetry payload (dot-key fields).

Example minimal body:

```json
{
  "ident": "861327087811118",
  "position.latitude": 33.561132,
  "position.longitude": -7.116593,
  "timestamp": 1715593600,
  "server.timestamp": 1715593600
}
```

- **Success** `200`:

```json
{ "received": true, "ident": "861327087811118" }
```

- **Errors**:
  - `400`: missing required fields
  - `422`: validation failed
  - `500`: internal server error

## 2) GET `/vehicles`

- **Description**: list latest state per vehicle.
- **Data source**:
  - Primary: Redis `getAllVehicles()`
  - Fallback: PostgreSQL `getLatestAllVehicles()`
- **Success** `200`:

```json
{ "vehicles": [], "count": 0 }
```

## 3) GET `/vehicles/:ident`

- **Description**: latest state for one vehicle.
- **Params**:
  - `ident` (path)
- **Data source**:
  - Primary: Redis `getVehicle(ident)`
  - Fallback: PostgreSQL `getLatestByIdent(ident)`
- **Success** `200`:

```json
{ "vehicle": {} }
```

- **Errors**:
  - `404`: vehicle not found

## 4) GET `/vehicles/:ident/history`

- **Description**: paginated historical positions for a vehicle.
- **Params**:
  - `ident` (path)
  - `from` (query, optional)
  - `to` (query, optional)
  - `limit` (query, default `100`)
  - `offset` (query, default `0`)
- **Data source**: PostgreSQL `getHistory(...)`
- **Success** `200`:

```json
{ "ident": "861327087811118", "history": [], "count": 0 }
```

## 5) GET `/ws/stats` and GET `/vehicles/ws/stats`

- **Description**: current WebSocket connection stats.
- **Success** `200`:

```json
{ "event": "stats", "connected": 0, "timestamp": 1715593600000 }
```
