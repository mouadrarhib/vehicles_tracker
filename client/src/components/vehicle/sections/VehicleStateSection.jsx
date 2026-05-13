import CarCrashIcon from '@mui/icons-material/CarCrash'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DoorFrontIcon from '@mui/icons-material/DoorFront'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import PanToolIcon from '@mui/icons-material/PanTool'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import { Box, Stack, Typography } from '@mui/material'
import SectionBlock from '../../common/SectionBlock.jsx'

function StateItem({ icon, label, value, color }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  )
}

function VehicleStateSection({ vehicle }) {
  const seatbelt = Boolean(vehicle['can.driver.seatbelt.status'])
  const doorOpen = Boolean(vehicle['door.open.status'])
  const moving = Boolean(vehicle['movement.status'])
  const handbrake = Boolean(vehicle['can.handbrake.status'])
  const parked = Boolean(vehicle['can.parking.status'])
  const cruise = Boolean(vehicle['can.cruise.status'])

  return (
    <SectionBlock title="Vehicle State" icon={<CarCrashIcon fontSize="small" />}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.5 }}>
        <StateItem
          icon={<SecurityIcon sx={{ color: seatbelt ? 'success.main' : 'error.main' }} />}
          label="Seatbelt"
          value={seatbelt ? 'Fastened' : 'Unfastened'}
          color={seatbelt ? 'success.main' : 'error.main'}
        />
        <StateItem
          icon={<DoorFrontIcon sx={{ color: doorOpen ? 'warning.main' : 'success.main' }} />}
          label="Door"
          value={doorOpen ? 'Open' : 'Closed'}
          color={doorOpen ? 'warning.main' : 'success.main'}
        />
        <StateItem
          icon={<DirectionsCarIcon sx={{ color: moving ? 'info.main' : 'text.disabled' }} />}
          label="Movement"
          value={moving ? 'Moving' : 'Stationary'}
          color={moving ? 'info.main' : 'text.disabled'}
        />
        <StateItem
          icon={<PanToolIcon sx={{ color: handbrake ? 'error.main' : 'success.main' }} />}
          label="Handbrake"
          value={handbrake ? 'Engaged' : 'Released'}
          color={handbrake ? 'error.main' : 'success.main'}
        />
        <StateItem
          icon={<LocalParkingIcon sx={{ color: parked ? 'info.main' : 'text.disabled' }} />}
          label="Parking"
          value={parked ? 'Parked' : 'Not parked'}
          color={parked ? 'info.main' : 'text.disabled'}
        />
        <StateItem
          icon={<SpeedIcon sx={{ color: cruise ? 'info.main' : 'text.disabled' }} />}
          label="Cruise"
          value={cruise ? 'Active' : 'Off'}
          color={cruise ? 'info.main' : 'text.disabled'}
        />
      </Box>
    </SectionBlock>
  )
}

export default VehicleStateSection
