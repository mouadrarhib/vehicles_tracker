import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import EmptyState from '../components/common/EmptyState.jsx'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { formatCoords, formatSpeed, formatTimestamp } from '../utils/formatters.js'

function History({ vehicles, loading }) {
  if (loading) {
    return <LoadingScreen />
  }

  if (vehicles.length === 0) {
    return <EmptyState message="No history available" />
  }

  const historyRows = vehicles
    .map((vehicle) => ({
      ident: vehicle.ident,
      status: vehicle.status,
      timestamp: vehicle.timestamp,
      speed: vehicle['position.speed'],
      lat: vehicle['position.latitude'],
      lng: vehicle['position.longitude'],
      movement: vehicle['movement.status'],
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

  return (
    <Stack spacing={2}>
      <Typography variant="h5">History</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Events
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Latest telemetry snapshots from the fleet.
          </Typography>

          <Stack divider={<Divider flexItem />}>
            {historyRows.map((item) => (
              <Stack key={`${item.ident}-${item.timestamp}`} spacing={0.8} sx={{ py: 1.5 }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.ident}
                  </Typography>
                  <Chip
                    size="small"
                    label={item.movement ? 'Moving' : 'Stationary'}
                    color={item.movement ? 'info' : 'default'}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {formatTimestamp(item.timestamp)}
                </Typography>
                <Typography variant="body2">{formatCoords(item.lat, item.lng)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Speed: {formatSpeed(item.speed)} | Status: {item.status}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default History
