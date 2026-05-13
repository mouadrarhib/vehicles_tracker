const { pool } = require('../db/postgres')

function value(payload, key) {
  return payload[key] ?? null
}

function toInt(input) {
  if (input === undefined || input === null || input === '') {
    return null
  }

  const parsed = Number(input)
  return Number.isFinite(parsed) ? Math.round(parsed) : null
}

async function upsertVehicle(client, payload) {
  const query = `
    INSERT INTO vehicles (ident, vin, channel_id, codec_id, protocol_id)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (ident) DO UPDATE SET
      vin = EXCLUDED.vin,
      channel_id = EXCLUDED.channel_id,
      codec_id = EXCLUDED.codec_id,
      protocol_id = EXCLUDED.protocol_id,
      updated_at = NOW()
    RETURNING id
  `

  const values = [
    value(payload, 'ident'),
    value(payload, 'vehicle.vin'),
    toInt(value(payload, 'channel.id')),
    toInt(value(payload, 'codec.id')),
    toInt(value(payload, 'protocol.id')),
  ]

  const { rows } = await client.query(query, values)
  return rows[0]
}

async function insertPosition(client, payload, vehicleId) {
  const query = `
    INSERT INTO gps_positions (
      vehicle_id, ident, device_timestamp, server_timestamp, latitude, longitude,
      altitude, speed, direction, hdop, pdop, satellites, position_valid, gnss_status,
      gnss_state, engine_ignition, can_engine_ignition, engine_rpm, engine_temperature,
      engine_motorhours, vehicle_speed, vehicle_mileage, tracker_mileage, fuel_level,
      fuel_consumed, throttle_level, battery_voltage, battery_current, external_voltage,
      gsm_signal, gsm_mcc, gsm_mnc, gsm_operator_code, peer, movement_status, sleep_mode
    )
    VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11, $12, $13, $14,
      $15, $16, $17, $18, $19,
      $20, $21, $22, $23, $24,
      $25, $26, $27, $28, $29,
      $30, $31, $32, $33, $34, $35, $36
    )
    RETURNING id
  `

  const values = [
    vehicleId,
    value(payload, 'ident'),
    toInt(value(payload, 'timestamp')),
    value(payload, 'server.timestamp'),
    value(payload, 'position.latitude'),
    value(payload, 'position.longitude'),
    value(payload, 'position.altitude'),
    value(payload, 'position.speed'),
    value(payload, 'position.direction'),
    value(payload, 'position.hdop'),
    value(payload, 'position.pdop'),
    toInt(value(payload, 'position.satellites')),
    value(payload, 'position.valid'),
    value(payload, 'gnss.status'),
    toInt(value(payload, 'gnss.state.enum')),
    value(payload, 'engine.ignition.status'),
    value(payload, 'can.engine.ignition.status'),
    toInt(value(payload, 'can.engine.rpm')),
    value(payload, 'can.engine.temperature'),
    value(payload, 'can.counted.engine.motorhours'),
    value(payload, 'can.vehicle.speed'),
    value(payload, 'can.vehicle.mileage'),
    value(payload, 'can.tracker.counted.mileage'),
    value(payload, 'can.fuel.level'),
    value(payload, 'can.tracker.counted.fuel.consumed'),
    value(payload, 'can.throttle.pedal.level'),
    value(payload, 'battery.voltage'),
    value(payload, 'battery.current'),
    value(payload, 'external.powersource.voltage'),
    toInt(value(payload, 'gsm.signal.level')),
    toInt(value(payload, 'gsm.mcc')),
    toInt(value(payload, 'gsm.mnc')),
    value(payload, 'gsm.operator.code'),
    value(payload, 'peer'),
    value(payload, 'movement.status'),
    toInt(value(payload, 'sleep.mode.enum')),
  ]

  const { rows } = await client.query(query, values)
  return rows[0]
}

async function insertVehicleState(client, payload, positionId) {
  const query = `
    INSERT INTO vehicle_state (
      position_id, ident, device_timestamp, front_left_door, front_right_door,
      rear_left_door, rear_right_door, trunk, hood, roof_opened, door_open,
      driver_seatbelt, driver_seatbelt_indicator, front_passenger_seatbelt,
      rear_left_seatbelt, rear_right_seatbelt, rear_central_seatbelt, low_beam,
      high_beam, front_fog, rear_fog, parking_lights, hazard_lights,
      additional_front_lights, additional_rear_lights, light_signal, drive_gear,
      neutral_gear, reverse_gear, parking_status, handbrake, handbrake_indicator,
      pedal_brake, pedal_clutch, front_passenger_present, operator_present
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10, $11,
      $12, $13, $14,
      $15, $16, $17, $18,
      $19, $20, $21, $22, $23,
      $24, $25, $26, $27,
      $28, $29, $30, $31, $32,
      $33, $34, $35, $36
    )
  `

  const values = [
    positionId,
    value(payload, 'ident'),
    toInt(value(payload, 'timestamp')),
    value(payload, 'can.front.left.door.status'),
    value(payload, 'can.front.right.door.status'),
    value(payload, 'can.rear.left.door.status'),
    value(payload, 'can.rear.right.door.status'),
    value(payload, 'can.trunk.status'),
    value(payload, 'can.hood.status'),
    value(payload, 'can.roof.opened.status'),
    value(payload, 'door.open.status'),
    value(payload, 'can.driver.seatbelt.status'),
    value(payload, 'can.driver.seatbelt.indicator.status'),
    value(payload, 'can.front.passenger.seatbelt.status'),
    value(payload, 'can.rear.left.seatbelt.status'),
    value(payload, 'can.rear.right.seatbelt.status'),
    value(payload, 'can.rear.central.seatbelt.status'),
    value(payload, 'can.low.beam.status'),
    value(payload, 'can.high.beam.status'),
    value(payload, 'can.front.fog.lights.status'),
    value(payload, 'can.rear.fog.lights.status'),
    value(payload, 'can.parking.lights.status'),
    value(payload, 'can.lights.hazard.lights.status'),
    value(payload, 'can.additional.front.lights.status'),
    value(payload, 'can.additional.rear.lights.status'),
    value(payload, 'can.light.signal.status'),
    value(payload, 'can.drive.gear.status'),
    value(payload, 'can.neutral.gear.status'),
    value(payload, 'can.reverse.gear.status'),
    value(payload, 'can.parking.status'),
    value(payload, 'can.handbrake.status'),
    value(payload, 'can.handbrake.indicator.status'),
    value(payload, 'can.pedal.brake.status'),
    value(payload, 'can.pedal.clutch.status'),
    value(payload, 'can.front.passenger.status'),
    value(payload, 'can.operator.present.status'),
  ]

  await client.query(query, values)
}

async function insertCanFlags(client, payload, positionId) {
  const query = `
    INSERT INTO can_flags (
      position_id, ident, device_timestamp, check_engine, warning_indicator,
      stop_indicator, oil_pressure_indicator, battery_indicator, coolant_level_low,
      fuel_level_low, tire_pressure_low, wear_brake_pads, soot_filter,
      maintenance_required, abs_failure, airbag_indicator, esp_indicator,
      eps_indicator, lights_failure, glow_plug_indicator, ready_to_drive,
      esp_status, cruise_status, air_condition, pto_status, webasto_status,
      cng_status, motor_status, engine_lock, engine_working, dynamic_ignition,
      ignition_key, electronic_power_control, interlock_active, standalone_engine,
      private_status, front_differential, rear_differential, central_diff_4hi,
      central_diff_4lo, automatic_retarder, manual_retarder, factory_armed,
      factory_alarm_actuated, factory_alarm_emulated, immobilizer_keys,
      immobilizer_service, car_closed, car_closed_remote, trailer_axle_lift_1,
      trailer_axle_lift_2, vehicle_battery_charging, can_module_sleep
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13,
      $14, $15, $16, $17,
      $18, $19, $20, $21,
      $22, $23, $24, $25, $26,
      $27, $28, $29, $30, $31,
      $32, $33, $34, $35,
      $36, $37, $38, $39,
      $40, $41, $42, $43,
      $44, $45, $46,
      $47, $48, $49, $50,
      $51, $52, $53
    )
  `

  const values = [
    positionId,
    value(payload, 'ident'),
    toInt(value(payload, 'timestamp')),
    value(payload, 'can.check.engine.indicator.status'),
    value(payload, 'can.warning.indicator.status'),
    value(payload, 'can.stop.indicator.status'),
    value(payload, 'can.oil.pressure.indicator.status'),
    value(payload, 'can.battery.indicator.status'),
    value(payload, 'can.coolant.level.low.indicator.status'),
    value(payload, 'can.fuel.level.low.indicator.status'),
    value(payload, 'can.tire.pressure.low.status'),
    value(payload, 'can.wear.brake.pads.indicator.status'),
    value(payload, 'can.soot.filter.indicator.status'),
    value(payload, 'can.maintenance.required.status'),
    value(payload, 'can.abs.failure.indicator.status'),
    value(payload, 'can.airbag.indicator.status'),
    value(payload, 'can.esp.indicator.status'),
    value(payload, 'can.eps.indicator.status'),
    value(payload, 'can.lights.failure.indicator.status'),
    value(payload, 'can.glow.plug.indicator.status'),
    value(payload, 'can.ready.to.drive.indicator.status'),
    value(payload, 'can.esp.status'),
    value(payload, 'can.cruise.status'),
    value(payload, 'can.air.condition.status'),
    value(payload, 'can.pto.status'),
    value(payload, 'can.webasto.status'),
    value(payload, 'can.cng.status'),
    value(payload, 'can.motor.status'),
    value(payload, 'can.engine.lock.status'),
    value(payload, 'can.engine.working.status'),
    value(payload, 'can.dynamic.ignition.status'),
    value(payload, 'can.ignition.key.status'),
    value(payload, 'can.electronic.power.control.status'),
    value(payload, 'can.interlock.active'),
    value(payload, 'can.standalone.engine'),
    value(payload, 'can.private.status'),
    value(payload, 'can.front.differential.status'),
    value(payload, 'can.rear.differential.status'),
    value(payload, 'can.central.differential.4hi.status'),
    value(payload, 'can.central.differential.4lo.status'),
    value(payload, 'can.automatic.retarder.status'),
    value(payload, 'can.manual.retarder.status'),
    value(payload, 'can.factory.armed.status'),
    value(payload, 'factory.alarm.actuated.status'),
    value(payload, 'factory.alarm.emulated.status'),
    value(payload, 'immobilizer.keys.status'),
    value(payload, 'immobilizer.service.status'),
    value(payload, 'can.car.closed.status'),
    value(payload, 'can.car.closed.remote.status'),
    value(payload, 'can.trailer.axle.lift.status.1'),
    value(payload, 'can.trailer.axle.lift.status.2'),
    value(payload, 'can.vehicle.battery.charging.status'),
    value(payload, 'can.module.sleep.mode'),
  ]

  await client.query(query, values)
}

async function insertFullPayload(client, payload, vehicleId, positionId) {
  void vehicleId
  await insertVehicleState(client, payload, positionId)
  await insertCanFlags(client, payload, positionId)
}

async function getLatestAllVehicles() {
  const query = `
    SELECT
      v.ident,
      v.vin,
      g.device_timestamp,
      g.server_timestamp,
      g.latitude,
      g.longitude,
      g.altitude,
      g.speed,
      g.direction,
      g.hdop,
      g.pdop,
      g.satellites,
      g.position_valid,
      g.gnss_status,
      g.gnss_state,
      g.engine_ignition,
      g.can_engine_ignition,
      g.engine_rpm,
      g.engine_temperature,
      g.engine_motorhours,
      g.vehicle_speed,
      g.vehicle_mileage,
      g.tracker_mileage,
      g.fuel_level,
      g.fuel_consumed,
      g.throttle_level,
      g.battery_voltage,
      g.battery_current,
      g.external_voltage,
      g.gsm_signal,
      g.gsm_mcc,
      g.gsm_mnc,
      g.gsm_operator_code,
      g.peer,
      g.movement_status,
      g.sleep_mode,
      g.created_at
    FROM vehicles v
    LEFT JOIN LATERAL (
      SELECT *
      FROM gps_positions gp
      WHERE gp.ident = v.ident
      ORDER BY gp.device_timestamp DESC
      LIMIT 1
    ) g ON true
    ORDER BY v.ident
  `
  const { rows } = await pool.query(query)
  return rows
}

async function getLatestByIdent(ident) {
  const query = `
    SELECT *
    FROM gps_positions
    WHERE ident = $1
    ORDER BY device_timestamp DESC
    LIMIT 1
  `
  const { rows } = await pool.query(query, [ident])
  return rows[0] || null
}

async function getHistory(ident, { from, to, limit, offset }) {
  const values = [ident]
  const conditions = ['ident = $1']

  if (from !== undefined && from !== null && from !== '') {
    values.push(Number(from))
    conditions.push(`device_timestamp >= $${values.length}`)
  }

  if (to !== undefined && to !== null && to !== '') {
    values.push(Number(to))
    conditions.push(`device_timestamp <= $${values.length}`)
  }

  values.push(limit)
  const limitParam = `$${values.length}`
  values.push(offset)
  const offsetParam = `$${values.length}`

  const query = `
    SELECT *
    FROM gps_positions
    WHERE ${conditions.join(' AND ')}
    ORDER BY device_timestamp DESC
    LIMIT ${limitParam}
    OFFSET ${offsetParam}
  `

  const { rows } = await pool.query(query, values)
  return rows
}

module.exports = {
  upsertVehicle,
  insertPosition,
  insertVehicleState,
  insertCanFlags,
  getLatestAllVehicles,
  getLatestByIdent,
  getHistory,
}
