import { Box, Divider, Stack, Typography } from '@mui/material'

function SectionBlock({ icon, title, children }) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.25 }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {children}
    </Box>
  )
}

export default SectionBlock
