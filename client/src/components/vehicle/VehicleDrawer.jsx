import { Box, Divider, Drawer } from '@mui/material'
import VehicleDrawerHeader from './VehicleDrawerHeader.jsx'
import PositionSection from './sections/PositionSection.jsx'
import EngineSection from './sections/EngineSection.jsx'
import FuelSection from './sections/FuelSection.jsx'
import PowerSection from './sections/PowerSection.jsx'
import NetworkSection from './sections/NetworkSection.jsx'
import VehicleStateSection from './sections/VehicleStateSection.jsx'

const detailsDrawerWidth = 380

function VehicleDrawer({ vehicle, open, onClose }) {
  if (!vehicle) {
    return null
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: detailsDrawerWidth,
          maxWidth: '100%',
        },
      }}
    >
      <VehicleDrawerHeader vehicle={vehicle} onClose={onClose} />
      <Divider />
      <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100vh - 88px)' }}>
        <PositionSection vehicle={vehicle} />
        <EngineSection vehicle={vehicle} />
        <FuelSection vehicle={vehicle} />
        <PowerSection vehicle={vehicle} />
        <NetworkSection vehicle={vehicle} />
        <VehicleStateSection vehicle={vehicle} />
      </Box>
    </Drawer>
  )
}

export default VehicleDrawer
