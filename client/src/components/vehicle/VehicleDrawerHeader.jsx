import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { formatTimestamp } from '../../utils/formatters.js'
import StatusChip from '../common/StatusChip.jsx'

function VehicleDrawerHeader({ vehicle, onClose }) {
  return (
    <Box sx={{ p: 2, bgcolor: 'primary.dark' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <DirectionsCarIcon fontSize="small" />
          <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
            {vehicle.ident}
          </Typography>
          <StatusChip status={vehicle.status} />
        </Stack>
        <IconButton onClick={onClose} aria-label="close details" color="inherit" size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        VIN: {vehicle['vehicle.vin'] || 'N/A'}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
        Last update: {formatTimestamp(vehicle['timestamp'])}
      </Typography>
    </Box>
  )
}

export default VehicleDrawerHeader
