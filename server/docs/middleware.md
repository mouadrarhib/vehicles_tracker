# Middleware

## requestLogger

Logs each request and completion:

- Request:
  - `[REQUEST] timestamp | method | path | ip`
- Response:
  - `[RESPONSE] timestamp | method | path | status | duration ms`

Mounted globally before routes.

## validateIngest

Validation rules for `POST /gps/ingest`:

- Required fields:
  - `ident` (non-empty)
  - `position.latitude`
  - `position.longitude`
  - `timestamp`
- Ident format:
  - string length 8..50
  - alphanumeric + dash only
- Coordinates:
  - latitude between `-90` and `90`
  - longitude between `-180` and `180`
- Time:
  - `timestamp` positive integer
  - not older than 24 hours
  - `server.timestamp` exists and is numeric

Error responses:

- `400`:

```json
{ "error": "Missing required fields", "missing": ["..."] }
```

- `422`:

```json
{ "error": "Validation failed", "details": ["..."] }
```

## errorHandler

Global handler behavior:

- Logs:
  - `[ERROR] timestamp | method | path | status | message`
- Mappings:
  - malformed JSON (`SyntaxError`) → `400` `Invalid JSON body`
  - Postgres unique violation (`23505`) → `409` `Duplicate entry`
  - connection refused (`ECONNREFUSED`) → `503` `Database unavailable`
  - fallback → `500` with `err.message` or default text
- In non-production, includes `stack` in response.
