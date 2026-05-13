import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'
import { formatSpeed } from '../../../utils/formatters.js'

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

function PositionSection({ vehicle }) {
  return (
    <SectionBlock title="Position" icon={<LocationOnIcon fontSize="small" />}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <Field label="Latitude" value={vehicle['position.latitude']} />
        <Field label="Longitude" value={vehicle['position.longitude']} />
        <Field label="Altitude" value={`${vehicle['position.altitude']}m`} />
        <Field label="Speed" value={formatSpeed(vehicle['position.speed'])} />
        <Field label="Direction" value={`${vehicle['position.direction']}°`} />
        <Field label="Satellites" value={vehicle['position.satellites']} />
        <Field label="HDOP" value={vehicle['position.hdop']} />
        <Field label="GNSS" value={vehicle['gnss.status'] ? 'Fixed' : 'No fix'} />
      </Box>
    </SectionBlock>
  )
}

export default PositionSection
