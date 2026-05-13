import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import MapView from '../components/map/MapView.jsx'
import LoadingScreen from '../components/common/LoadingScreen.jsx'

function MapPage({ vehicles, loading }) {
  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Stack spacing={2} sx={{ height: 'calc(100vh - 120px)' }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Live Vehicle Map</Typography>
          <Typography variant="body2" color="text.secondary">
            Click a marker to inspect vehicle details.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ flex: 1 }}>
        <MapView vehicles={vehicles} />
      </Box>
    </Stack>
  )
}

export default MapPage
