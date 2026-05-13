const postgresService = require('../services/postgresService')
const redisService = require('../services/redisService')

function toCachedVehicle(row) {
  return {
    ident: row.ident,
    vin: row.vin || null,
    latitude: row.latitude,
    longitude: row.longitude,
    altitude: row.altitude,
    speed: row.speed,
    direction: row.direction,
    engine_ignition: row.engine_ignition,
    engine_rpm: row.engine_rpm,
    engine_temperature: row.engine_temperature,
    fuel_level: row.fuel_level,
    fuel_consumed: row.fuel_consumed,
    vehicle_speed: row.vehicle_speed,
    vehicle_mileage: row.vehicle_mileage,
    battery_voltage: row.battery_voltage,
    external_voltage: row.external_voltage,
    gsm_signal: row.gsm_signal,
    gsm_operator_code: row.gsm_operator_code,
    movement_status: row.movement_status,
    driver_seatbelt: null,
    door_open: null,
    device_timestamp: row.device_timestamp,
    server_timestamp: row.server_timestamp,
  }
}

/**
 * @openapi
 * /vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get latest state for all vehicles
 *     responses:
 *       200:
 *         description: Vehicles fetched successfully
 */

async function getAll(req, res, next) {
  try {
    const redisVehicles = await redisService.getAllVehicles()
    const pgVehicles = await postgresService.getLatestAllVehicles()

    const byIdent = new Map()

    for (const vehicle of pgVehicles) {
      byIdent.set(vehicle.ident, vehicle)
    }

    for (const vehicle of redisVehicles) {
      byIdent.set(vehicle.ident, vehicle)
    }

    const vehicles = Array.from(byIdent.values())

    res.json({ vehicles, count: vehicles.length })
  } catch (error) {
    next(error)
  }
}

async function getOne(req, res, next) {
  try {
    const { ident } = req.params
    let vehicle = await redisService.getVehicle(ident)

    if (!vehicle) {
      vehicle = await postgresService.getLatestByIdent(ident)
    }

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    return res.json({ vehicle })
  } catch (error) {
    next(error)
  }
}

/**
 * @openapi
 * /vehicles/{ident}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get latest state for one vehicle
 *     parameters:
 *       - in: path
 *         name: ident
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *       404:
 *         description: Vehicle not found
 */

async function getHistory(req, res, next) {
  try {
    const { ident } = req.params
    const { from, to } = req.query
    const limit = Number(req.query.limit ?? 100)
    const offset = Number(req.query.offset ?? 0)

    const history = await postgresService.getHistory(ident, { from, to, limit, offset })

    res.json({ ident, history, count: history.length })
  } catch (error) {
    next(error)
  }
}

/**
 * @openapi
 * /vehicles/cache/sync:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Sync all latest vehicles from PostgreSQL to Redis cache
 *     responses:
 *       200:
 *         description: Cache sync completed successfully
 */
async function syncCache(req, res, next) {
  try {
    const pgVehicles = await postgresService.getLatestAllVehicles()
    let synced = 0

    for (const row of pgVehicles) {
      const cached = toCachedVehicle(row)
      await redisService.setVehicle(row.ident, cached)
      synced += 1
    }

    res.json({ message: 'Cache sync completed', synced })
  } catch (error) {
    next(error)
  }
}

/**
 * @openapi
 * /vehicles/{ident}/history:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Get vehicle position history
 *     parameters:
 *       - in: path
 *         name: ident
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *       - in: query
 *         name: to
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: History fetched successfully
 */

/**
 * @openapi
 * /ws/stats:
 *   get:
 *     tags:
 *       - WebSocket
 *     summary: Get current websocket connection stats
 *     responses:
 *       200:
 *         description: WebSocket stats response
 */

module.exports = {
  getAll,
  getOne,
  getHistory,
  syncCache,
}
