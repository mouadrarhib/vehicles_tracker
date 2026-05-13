# Simulation

## What `simulate.js` does

`simulate.js` sends a mock GPS payload to `POST /gps/ingest` every 3 seconds.

Per tick it updates a local vehicle object and emits realistic telemetry changes.

## State changes each tick

- Slight random movement on latitude/longitude.
- Speed fluctuates within bounds.
- RPM fluctuates within bounds.
- Fuel slowly decreases.
- Temperature fluctuates in realistic range.

## Run simulation

From `server/`:

```bash
npm run simulate
```

Ensure backend is running first:

```bash
npm start
```

## Expected backend logs

For each ingest cycle you should see:

- `[REQUEST] ... POST /gps/ingest ...`
- `[INGEST] ident | lat,lng | speed`
- `[INGEST COMPLETE] ident | saved to DB | Redis updated | WS broadcast sent`
- `[WS BROADCAST] vehicle:update | X clients reached`
- `[RESPONSE] ... POST /gps/ingest ...`

## Manual test with curl

```bash
curl -X POST http://localhost:3001/gps/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "ident":"861327087811118",
    "position.latitude":33.561132,
    "position.longitude":-7.116593,
    "timestamp":1715593600,
    "server.timestamp":1715593600
  }'
```

Use this in Postman by creating a POST request with raw JSON body and the same fields.
