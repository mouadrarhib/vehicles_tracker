import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PowerOffIcon from '@mui/icons-material/PowerOff'
import { Grid, Typography } from '@mui/material'
import LoadingScreen from '../components/common/LoadingScreen.jsx'
import StatCard from '../components/common/StatCard.jsx'

function Dashboard({ vehicles, loading }) {
  if (loading) {
    return <LoadingScreen />
  }

  const total = vehicles.length
  const active = vehicles.filter((vehicle) => vehicle.status === 'active').length
  const offline = vehicles.filter((vehicle) => vehicle.status === 'offline').length
  const alerts = vehicles.filter((vehicle) => vehicle['door.open.status']).length

  const stats = [
    {
      title: 'Total Vehicles',
      value: total,
      subtitle: 'All tracked units',
      icon: <DirectionsCarIcon />,
      color: '#42a5f5',
    },
    {
      title: 'Active',
      value: active,
      subtitle: 'Currently moving',
      icon: <FlashOnIcon />,
      color: '#66bb6a',
    },
    {
      title: 'Offline',
      value: offline,
      subtitle: 'No live movement',
      icon: <PowerOffIcon />,
      color: '#ef5350',
    },
    {
      title: 'Alerts',
      value: alerts,
      subtitle: 'Door open events',
      icon: <WarningAmberIcon />,
      color: '#ffa726',
    },
  ]

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Dashboard
