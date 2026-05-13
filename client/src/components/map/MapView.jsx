import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import MapControls from './MapControls.jsx'
import VehicleMarker from './VehicleMarker.jsx'

function hasValidCoords(vehicle) {
  return (
    Number.isFinite(Number(vehicle['position.latitude'])) &&
    Number.isFinite(Number(vehicle['position.longitude']))
  )
}

function MapView({ vehicles }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const mappableVehicles = vehicles.filter(hasValidCoords)

  return (
    <Box sx={{ position: 'relative', height: '100%', minHeight: 420, borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer center={[33.5731, -7.5898]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mappableVehicles.map((vehicle) => (
          <VehicleMarker key={vehicle.ident} vehicle={vehicle} />
        ))}
        <MapControls vehicles={mappableVehicles} />
      </MapContainer>
    </Box>
  )
}

export default MapView
