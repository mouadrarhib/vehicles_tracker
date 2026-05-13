import DashboardIcon from '@mui/icons-material/Dashboard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import HistoryIcon from '@mui/icons-material/History'
import MapIcon from '@mui/icons-material/Map'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const drawerWidth = 240

const navItems = [
  { label: 'Dashboard', to: '/', icon: <DashboardIcon /> },
  { label: 'Map', to: '/map' },
  { label: 'Vehicles', to: '/vehicles', icon: <DirectionsCarIcon /> },
  { label: 'History', to: '/history', icon: <HistoryIcon /> },
]

navItems[1].icon = <MapIcon />

function Sidebar() {
  const location = useLocation()

  return (
    <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 2.5 }}>
          <DirectionsCarIcon color="primary" />
          <Typography variant="h6">VehicleTracker</Typography>
        </Stack>
        <List sx={{ px: 1, py: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  borderRadius: 2,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default Sidebar
