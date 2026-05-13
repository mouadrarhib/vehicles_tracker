import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { useVehicleContext } from '../../context/VehicleContext.jsx'

function createVehicleIcon(status) {
  const colorMap = {
    active: '#1976d2',
    offline: '#616161',
    idle: '#fb8c00',
  }

  return L.divIcon({
    html: `<div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${colorMap[status] || '#616161'};color:#fff;font-size:16px;border:2px solid #fff;">🚗</div>`,
    className: 'vehicle-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

function VehicleMarker({ vehicle }) {
  const { openDrawer } = useVehicleContext()
  const lat = Number(vehicle['position.latitude'])
  const lng = Number(vehicle['position.longitude'])

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null
  }

  return (
    <Marker
      position={[lat, lng]}
      icon={createVehicleIcon(vehicle.status)}
      eventHandlers={{ click: () => openDrawer(vehicle) }}
    />
  )
}

export default VehicleMarker
