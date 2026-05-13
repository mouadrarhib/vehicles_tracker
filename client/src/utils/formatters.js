export function formatSpeed(value) {
  return `${value} km/h`
}

export function formatFuel(value) {
  return `${value}%`
}

export function formatCoords(lat, lng) {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

export function formatTimestamp(value) {
  return new Date(value * 1000).toLocaleString()
}

export function formatVoltage(value) {
  return `${value}V`
}

export function formatSignal(value) {
  return `${value}%`
}

export function formatTemp(value) {
  return `${value}°C`
}

export function formatRPM(value) {
  return `${value} RPM`
}

export function formatMileage(value) {
  return `${value} km`
}
