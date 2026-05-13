import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

function StatCard({ title, value, icon, color = 'primary.main', subtitle }) {
  return (
    <Card sx={{ minWidth: 220, borderLeft: `4px solid ${color}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700 }}>
              {value}
            </Typography>
            {subtitle ? (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          <Box color={color}>{icon}</Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default StatCard
