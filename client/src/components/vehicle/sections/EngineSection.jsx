import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Stack, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'
import { formatRPM, formatTemp } from '../../../utils/formatters.js'

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

function EngineSection({ vehicle }) {
  const ignitionOn = Boolean(vehicle['engine.ignition.status'])

  return (
    <SectionBlock title="Engine" icon={<SettingsIcon fontSize="small" />}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        {ignitionOn ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {ignitionOn ? 'Ignition ON' : 'Ignition OFF'}
        </Typography>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <Field label="RPM" value={formatRPM(vehicle['can.engine.rpm'])} />
        <Field label="Temperature" value={formatTemp(vehicle['can.engine.temperature'])} />
        <Field label="Motor hours" value={`${vehicle['can.counted.engine.motorhours']} hrs`} />
        <Field label="Working" value={vehicle['can.engine.working.status'] ? 'Yes' : 'No'} />
      </Box>
    </SectionBlock>
  )
}

export default EngineSection
