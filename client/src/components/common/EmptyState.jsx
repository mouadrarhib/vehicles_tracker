import InboxIcon from '@mui/icons-material/Inbox'
import { Stack, Typography } from '@mui/material'

function EmptyState({ message }) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240 }}>
      <InboxIcon color="disabled" sx={{ fontSize: 36 }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  )
}

export default EmptyState
