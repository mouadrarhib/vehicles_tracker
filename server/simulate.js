const axios = require('axios')

const API_URL = 'http://localhost:3001/gps/ingest'
const INTERVAL_MS = 3000

const vehicles = [
  {
    ident: '861327087811118',
    vin: 'WF0HXQQQGHRE22418',
    lat: 33.5731,
    lng: -7.5898,
    speed: 60,
    fuel: 78,
    rpm: 2354,
    temp: 90,
    movement: true,
  },
  {
    ident: '861327087811119',
    vin: 'VF3AB8HZCDJ546812',
    lat: 33.58,
    lng: -7.61,
    speed: 0,
    fuel: 45,
    rpm: 0,
    temp: 71,
    movement: false,
  },
  {
    ident: '861327087811120',
    vin: 'WBA3A5C58DF600321',
    lat: 33.565,
    lng: -7.57,
    speed: 35,
    fuel: 92,
    rpm: 1890,
    temp: 86,
    movement: true,
  },
]

function randomDelta(range) {
  return (Math.random() - 0.5) * range
}

function buildPayload(v) {
  return {
    ident: v.ident,
    'vehicle.vin': v.vin,

    'position.latitude': v.lat,
    'position.longitude': v.lng,
    'position.altitude': 136,
    'position.speed': v.speed,
    'position.direction': Math.floor(Math.random() * 360),
    'position.satellites': 14,
    'position.hdop': 0.7,
    'position.pdop': 1.2,
    'position.valid': true,

    'engine.ignition.status': v.movement,
    'can.engine.ignition.status': v.movement,
    'can.engine.rpm': v.rpm,
    'can.engine.temperature': v.temp,
    'can.engine.working.status': v.movement,
    'can.counted.engine.motorhours': 160.15,

    'can.vehicle.speed': v.speed,
    'can.vehicle.mileage': 231354,
    'can.tracker.counted.mileage': 6108.66,
    'can.fuel.level': v.fuel,
    'can.tracker.counted.fuel.consumed': 669.8,
    'can.throttle.pedal.level': v.movement ? 5 : 0,

    'battery.voltage': 4.024,
    'battery.current': 0,
    'external.powersource.voltage': 14.261,

    'gsm.signal.level': 100,
    'gsm.mcc': 604,
    'gsm.mnc': 2,
    'gsm.operator.code': '60402',

    'movement.status': v.movement,
    'gnss.status': true,
    'gnss.state.enum': 1,
    'sleep.mode.enum': v.movement ? 0 : 2,
    'can.driver.seatbelt.status': true,
    'door.open.status': false,
    'can.handbrake.status': !v.movement,
    'can.parking.status': !v.movement,

    timestamp: Math.floor(Date.now() / 1000),
    'server.timestamp': Date.now() / 1000,
  }
}

function updateVehicle(v) {
  if (v.movement) {
    v.lat += randomDelta(0.001)
    v.lng += randomDelta(0.001)
    v.speed = Math.max(10, Math.min(120, v.speed + randomDelta(10)))
    v.rpm = Math.max(900, Math.min(4000, v.rpm + randomDelta(200)))
  } else {
    v.speed = 0
    v.rpm = 0
  }

  if (Math.random() < 0.08) {
    v.movement = !v.movement
  }

  v.fuel = Math.max(0, Math.min(100, v.fuel - 0.01))
  v.temp = Math.max(70, Math.min(100, v.temp + randomDelta(1)))
}

async function sendUpdate(vehicle) {
  updateVehicle(vehicle)
  const payload = buildPayload(vehicle)

  try {
    const res = await axios.post(API_URL, payload)
    console.log(
      `[${new Date().toISOString()}]`,
      `${vehicle.ident}`,
      `lat=${vehicle.lat.toFixed(6)}`,
      `lng=${vehicle.lng.toFixed(6)}`,
      `speed=${Math.round(vehicle.speed)}km/h`,
      `fuel=${vehicle.fuel.toFixed(1)}%`,
      `→ ${res.status}`,
    )
  } catch (err) {
    console.error(`[ERROR] ${vehicle.ident} ${err.message} — is the server running on port 3001?`)
  }
}

async function tick() {
  await Promise.all(vehicles.map((vehicle) => sendUpdate(vehicle)))
}

console.log('🚗 Multi-vehicle simulator started — sending updates every', INTERVAL_MS / 1000, 'seconds')
console.log('   Vehicles:', vehicles.map((v) => v.ident).join(', '))
console.log('   Target:  ', API_URL)
console.log('   Press Ctrl+C to stop\n')

tick()
setInterval(tick, INTERVAL_MS)
