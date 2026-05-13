# Redis

## Why Redis with PostgreSQL

- PostgreSQL keeps full durable historical telemetry.
- Redis keeps the latest state per vehicle for very fast reads.
- API first tries Redis for current snapshots and falls back to PostgreSQL when cache is empty.

## Key format

- `vehicle:{ident}`
- Example: `vehicle:861327087811118`

## Value structure

Cached value is JSON (`vehicleState`) containing:

- `ident`, `vin`
- `latitude`, `longitude`, `altitude`, `speed`, `direction`
- `engine_ignition`, `engine_rpm`, `engine_temperature`
- `fuel_level`, `fuel_consumed`, `vehicle_speed`, `vehicle_mileage`
- `battery_voltage`, `external_voltage`
- `gsm_signal`, `gsm_operator_code`
- `movement_status`, `driver_seatbelt`, `door_open`
- `device_timestamp`, `server_timestamp`

## No expiry policy

`SET` is used without TTL so latest known state remains available until superseded by a newer ingest.

## Service functions

- `setVehicle(ident, data)` → stores latest vehicle JSON.
- `getVehicle(ident)` → loads one vehicle and parses JSON.
- `getAllVehicles()` → `KEYS vehicle:*`, then `MGET`, parse list and filter nulls.

## Fallback behavior

If Redis returns empty results, controllers call PostgreSQL read functions (`getLatestAllVehicles` / `getLatestByIdent`) to guarantee responses.
