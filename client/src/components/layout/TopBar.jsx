import { useEffect, useMemo, useState } from 'react'
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const drawerWidth = 240

const titles = {
  '/': 'Dashboard',
  '/map': 'Map',
  '/vehicles': 'Vehicles',
  '/history': 'History',
}

function TopBar() {
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())
  const title = useMemo(() => titles[location.pathname] ?? 'Dashboard', [location.pathname])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography variant="body2">Connected</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
