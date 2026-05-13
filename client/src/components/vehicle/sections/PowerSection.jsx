import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import { Box, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'
import { formatVoltage } from '../../../utils/formatters.js'

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

function PowerSection({ vehicle }) {
  return (
    <SectionBlock title="Power" icon={<BatteryChargingFullIcon fontSize="small" />}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <Field label="Battery voltage" value={formatVoltage(vehicle['battery.voltage'])} />
        <Field label="Battery current" value={`${vehicle['battery.current']} A`} />
        <Field label="External voltage" value={formatVoltage(vehicle['external.powersource.voltage'])} />
        <Field
          label="Charging"
          value={vehicle['can.vehicle.battery.charging.status'] ? 'Yes' : 'No'}
        />
      </Box>
    </SectionBlock>
  )
}

export default PowerSection
