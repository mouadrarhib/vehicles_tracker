import { Chip } from '@mui/material'

function StatusChip({ status }) {
  const colorMap = {
    active: 'success',
    offline: 'error',
    idle: 'warning',
  }

  return (
    <Chip label={status} color={colorMap[status] ?? 'default'} size="small" />
  )
}

export default StatusChip
