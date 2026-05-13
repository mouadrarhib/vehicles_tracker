import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import StatusChip from '../components/common/StatusChip.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import { formatFuel, formatSpeed, formatVoltage } from '../utils/formatters.js'

function Vehicles({ vehicles, loading }) {
  if (loading) {
    return <LoadingScreen />
  }

  if (vehicles.length === 0) {
    return <EmptyState message="No vehicles available" />
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Vehicles</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Fleet List
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Current status of all tracked vehicles.
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Speed</TableCell>
                  <TableCell>Fuel</TableCell>
                  <TableCell>Battery</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.ident} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 28, height: 28 }}>{vehicle.ident.slice(-2)}</Avatar>
                        <Stack>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {vehicle.ident}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {vehicle['vehicle.vin']}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={vehicle.status} />
                    </TableCell>
                    <TableCell>{formatSpeed(vehicle['position.speed'])}</TableCell>
                    <TableCell>{formatFuel(vehicle['can.fuel.level'])}</TableCell>
                    <TableCell>{formatVoltage(vehicle['external.powersource.voltage'])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default Vehicles
