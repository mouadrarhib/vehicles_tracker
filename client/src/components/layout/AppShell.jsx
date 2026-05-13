import { Box } from '@mui/material'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'

const drawerWidth = 240

function AppShell({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <TopBar />
        <Box component="main" sx={{ flex: 1, overflow: 'auto', p: 2, mt: '64px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default AppShell
