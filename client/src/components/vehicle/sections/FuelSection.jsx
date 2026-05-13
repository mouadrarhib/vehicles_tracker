import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import { Box, LinearProgress, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'
import { formatFuel, formatMileage } from '../../../utils/formatters.js'

function progressColor(value) {
  if (value < 20) {
    return 'error'
  }
  if (value <= 50) {
    return 'warning'
  }
  return 'success'
}

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}

function FuelSection({ vehicle }) {
  const fuelLevel = Number(vehicle['can.fuel.level'] ?? 0)

  return (
    <SectionBlock title="Fuel & Mileage" icon={<LocalGasStationIcon fontSize="small" />}>
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Fuel Level
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {formatFuel(fuelLevel)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={fuelLevel}
          color={progressColor(fuelLevel)}
          sx={{ height: 8, borderRadius: 999 }}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <Field label="Consumed" value={`${vehicle['can.tracker.counted.fuel.consumed']} L`} />
        <Field label="Odometer" value={formatMileage(vehicle['can.vehicle.mileage'])} />
        <Field label="Tracker mileage" value={formatMileage(vehicle['can.tracker.counted.mileage'])} />
        <Field label="Throttle" value={`${vehicle['can.throttle.pedal.level']}%`} />
      </Box>
    </SectionBlock>
  )
}

export default FuelSection
