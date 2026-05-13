# Database

## Tables

### `vehicles`

Stores identity-level metadata per device/vehicle (`ident`, `vin`, channel/codec/protocol IDs) and audit timestamps.

### `gps_positions`

Stores each telemetry sample with geo, engine, fuel, power, GSM, and movement fields. This is the time-series core table.

### `vehicle_state`

Stores detailed boolean state flags (doors, seatbelts, lights, gears, handbrake, occupancy) per position sample.

### `can_flags`

Stores CAN indicator/warning/status flags (engine warnings, ABS/airbag, drivetrain, alarm, immobilizer, trailer, etc.) per position sample.

## Relationships

- `gps_positions.vehicle_id` → `vehicles.id` (`ON DELETE CASCADE`)
- `vehicle_state.position_id` → `gps_positions.id` (`ON DELETE CASCADE`)
- `can_flags.position_id` → `gps_positions.id` (`ON DELETE CASCADE`)

## Indexes

- `gps_positions(ident)` for lookup by vehicle.
- `gps_positions(device_timestamp DESC)` for latest/history queries.
- `gps_positions(vehicle_id)` for join/filter by FK.
- `gps_positions(latitude, longitude)` for geo-oriented scans.
- `vehicle_state(ident)` and `vehicle_state(position_id)`.
- `can_flags(ident)` and `can_flags(position_id)`.

## `updated_at` trigger

`vehicles` uses trigger `set_vehicles_updated_at` calling `update_updated_at_column()` before each update so `updated_at` is always refreshed automatically.

## Migration safety

`runMigrations()` executes `db/migrations/001_init.sql` on every startup. DDL uses `IF NOT EXISTS` for table/index creation, making repeated execution safe and idempotent.

## Example inserts

```sql
INSERT INTO vehicles (ident, vin) VALUES ('861327087811118', 'WF0HXQQQGHRE22418');

INSERT INTO gps_positions (
  vehicle_id, ident, device_timestamp, latitude, longitude
) VALUES (
  1, '861327087811118', 1715593600, 33.561132, -7.116593
);

INSERT INTO vehicle_state (position_id, ident, device_timestamp, door_open)
VALUES (1, '861327087811118', 1715593600, false);

INSERT INTO can_flags (position_id, ident, device_timestamp, check_engine)
VALUES (1, '861327087811118', 1715593600, false);
```
