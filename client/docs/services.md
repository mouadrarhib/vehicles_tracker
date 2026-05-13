# Services

## API client (`services/api.js`)

- Axios instance with base URL:
  - `import.meta.env.VITE_API_URL`
  - fallback: `http://localhost:3001`
- Interceptors:
  - request log: `[API REQUEST] METHOD URL`
  - response log: `[API RESPONSE] STATUS URL`
  - error log: `[API ERROR] STATUS MESSAGE`

## Exposed API methods

- `getVehicles()` → `GET /vehicles`
- `getVehicle(ident)` → `GET /vehicles/:ident`
- `getVehicleHistory(ident, params)` → `GET /vehicles/:ident/history`
- `ingest(payload)` → `POST /gps/ingest`
