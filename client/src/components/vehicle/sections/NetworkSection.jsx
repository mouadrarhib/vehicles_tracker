import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import { Box, LinearProgress, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'
import { formatSignal } from '../../../utils/formatters.js'

function progressColor(value) {
  if (value < 30) {
    return 'error'
  }
  if (value <= 70) {
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

function NetworkSection({ vehicle }) {
  const signal = Number(vehicle['gsm.signal.level'] ?? 0)

  return (
    <SectionBlock title="Network" icon={<SignalCellularAltIcon fontSize="small" />}>
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Signal Strength
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {formatSignal(signal)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={signal}
          color={progressColor(signal)}
          sx={{ height: 8, borderRadius: 999 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <Field label="Operator" value={vehicle['gsm.operator.code']} />
        <Field label="MCC" value={vehicle['gsm.mcc']} />
        <Field label="MNC" value={vehicle['gsm.mnc']} />
        <Field label="Peer IP" value={vehicle['peer'] || '-'} />
      </Box>
    </SectionBlock>
  )
}

export default NetworkSection
