import { useCallback, useEffect, useState } from 'react'
import { getVehicles } from '../services/api.js'

function normalizeVehicle(raw) {
  return {
    ident: raw.ident,
    status: raw.movement_status ? 'active' : 'offline',
    'vehicle.vin': raw.vin || 'N/A',
    'position.latitude': raw.latitude,
    'position.longitude': raw.longitude,
    'position.altitude': raw.altitude,
    'position.speed': raw.speed,
    'position.direction': raw.direction,
    'position.satellites': raw.satellites,
    'position.hdop': raw.hdop,
    'position.pdop': raw.pdop,
    'position.valid': raw.position_valid,
    'engine.ignition.status': raw.engine_ignition,
    'can.engine.ignition.status': raw.can_engine_ignition,
    'can.engine.rpm': raw.engine_rpm,
    'can.engine.temperature': raw.engine_temperature,
    'can.counted.engine.motorhours': raw.engine_motorhours,
    'can.fuel.level': raw.fuel_level,
    'can.tracker.counted.fuel.consumed': raw.fuel_consumed,
    'can.vehicle.speed': raw.vehicle_speed,
    'can.vehicle.mileage': raw.vehicle_mileage,
    'can.tracker.counted.mileage': raw.tracker_mileage,
    'battery.voltage': raw.battery_voltage,
    'battery.current': raw.battery_current,
    'external.powersource.voltage': raw.external_voltage,
    'gsm.signal.level': raw.gsm_signal,
    'gsm.mcc': raw.gsm_mcc,
    'gsm.mnc': raw.gsm_mnc,
    'gsm.operator.code': raw.gsm_operator_code,
    'movement.status': raw.movement_status,
    'can.driver.seatbelt.status': null,
    'door.open.status': null,
    'can.handbrake.status': null,
    'can.parking.status': null,
    timestamp: raw.device_timestamp,
    'server.timestamp': raw.server_timestamp,
  }
}

export function useVehicles(lastUpdate) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getVehicles()
      const list = (response.data.vehicles || []).map(normalizeVehicle)
      setVehicles(list)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!lastUpdate || !lastUpdate.ident) {
      return
    }

    setVehicles((prev) => {
      const nextVehicle = {
        ident: lastUpdate.ident,
        status: lastUpdate.movement_status ? 'active' : 'offline',
        'vehicle.vin': lastUpdate.vin ?? 'N/A',
        'position.latitude': lastUpdate.latitude,
        'position.longitude': lastUpdate.longitude,
        'position.altitude': lastUpdate.altitude,
        'position.speed': lastUpdate.speed,
        'position.direction': lastUpdate.direction,
        'engine.ignition.status': lastUpdate.engine_ignition,
        'can.engine.rpm': lastUpdate.engine_rpm,
        'can.engine.temperature': lastUpdate.engine_temperature,
        'can.fuel.level': lastUpdate.fuel_level,
        'can.tracker.counted.fuel.consumed': lastUpdate.fuel_consumed,
        'can.vehicle.speed': lastUpdate.vehicle_speed,
        'can.vehicle.mileage': lastUpdate.vehicle_mileage,
        'battery.voltage': lastUpdate.battery_voltage,
        'external.powersource.voltage': lastUpdate.external_voltage,
        'gsm.signal.level': lastUpdate.gsm_signal,
        'gsm.operator.code': lastUpdate.gsm_operator_code,
        'movement.status': lastUpdate.movement_status,
        'can.driver.seatbelt.status': lastUpdate.driver_seatbelt,
        'door.open.status': lastUpdate.door_open,
        timestamp: lastUpdate.device_timestamp,
        'server.timestamp': lastUpdate.server_timestamp,
      }

      const existingIndex = prev.findIndex((vehicle) => vehicle.ident === lastUpdate.ident)
      if (existingIndex === -1) {
        return [...prev, nextVehicle]
      }

      return prev.map((vehicle, index) =>
        index === existingIndex
          ? {
              ...vehicle,
              ...nextVehicle,
            }
          : vehicle,
      )
    })
  }, [lastUpdate])

  return { vehicles, loading, error, refresh }
}
