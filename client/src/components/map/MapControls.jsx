import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import L from 'leaflet'
import { useMap } from 'react-leaflet'

function MapControls({ vehicles }) {
  const map = useMap()

  const fitAll = () => {
    if (vehicles.length === 0) {
      return
    }

    const points = vehicles
      .map((vehicle) => [Number(vehicle['position.latitude']), Number(vehicle['position.longitude'])])
      .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng))

    if (points.length === 0) {
      return
    }

    const bounds = L.latLngBounds(points)
    map.fitBounds(bounds, { padding: [30, 30] })
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 1000,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 1,
      }}
    >
      <Stack spacing={1}>
        <Tooltip title="Fit all">
          <IconButton size="small" onClick={fitAll}>
            <FitScreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom in">
          <IconButton size="small" onClick={() => map.zoomIn()}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom out">
          <IconButton size="small" onClick={() => map.zoomOut()}>
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}

export default MapControls
