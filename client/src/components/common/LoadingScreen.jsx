import { CircularProgress, Stack, Typography } from '@mui/material'

function LoadingScreen() {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        Loading...
      </Typography>
    </Stack>
  )
}

export default LoadingScreen
