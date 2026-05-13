const { pool } = require('../db/postgres')
const postgresService = require('./postgresService')
const redisService = require('./redisService')
const socketService = require('./socketService')

function buildVehicleState(payload) {
  return {
    ident: payload['ident'],
    vin: payload['vehicle.vin'] ?? null,
    latitude: payload['position.latitude'] ?? null,
    longitude: payload['position.longitude'] ?? null,
    altitude: payload['position.altitude'] ?? null,
    speed: payload['position.speed'] ?? null,
    direction: payload['position.direction'] ?? null,
    engine_ignition: payload['engine.ignition.status'] ?? null,
    engine_rpm: payload['can.engine.rpm'] ?? null,
    engine_temperature: payload['can.engine.temperature'] ?? null,
    fuel_level: payload['can.fuel.level'] ?? null,
    fuel_consumed: payload['can.tracker.counted.fuel.consumed'] ?? null,
    vehicle_speed: payload['can.vehicle.speed'] ?? null,
    vehicle_mileage: payload['can.vehicle.mileage'] ?? null,
    battery_voltage: payload['battery.voltage'] ?? null,
    external_voltage: payload['external.powersource.voltage'] ?? null,
    gsm_signal: payload['gsm.signal.level'] ?? null,
    gsm_operator_code: payload['gsm.operator.code'] ?? null,
    movement_status: payload['movement.status'] ?? null,
    driver_seatbelt: payload['can.driver.seatbelt.status'] ?? null,
    door_open: payload['door.open.status'] ?? null,
    device_timestamp: payload['timestamp'] ?? null,
    server_timestamp: payload['server.timestamp'] ?? null,
  }
}

async function process(payload) {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const vehicle = await postgresService.upsertVehicle(client, payload)
    const position = await postgresService.insertPosition(client, payload, vehicle.id)
    await postgresService.insertVehicleState(client, payload, position.id)
    await postgresService.insertCanFlags(client, payload, position.id)

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }

  const vehicleState = buildVehicleState(payload)
  await redisService.setVehicle(payload['ident'], vehicleState)
  socketService.broadcast('vehicle:update', vehicleState)

  console.log(
    `[INGEST] ${payload['ident']} | ${payload['position.latitude']},${payload['position.longitude']} | ${payload['position.speed']}`,
  )
  console.log(
    `[INGEST COMPLETE] ${payload['ident']} | saved to DB | Redis updated | WS broadcast sent`,
  )

  return vehicleState
}

module.exports = {
  process,
}
