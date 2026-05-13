function getPayloadValue(payload, key) {
  if (Object.prototype.hasOwnProperty.call(payload, key)) {
    return payload[key]
  }

  const segments = key.split('.')
  let value = payload

  for (const segment of segments) {
    if (value == null || typeof value !== 'object' || !(segment in value)) {
      return undefined
    }
    value = value[segment]
  }

  return value
}

function validateIngest(req, res, next) {
  const requiredFields = ['ident', 'position.latitude', 'position.longitude', 'timestamp']
  const missing = requiredFields.filter((field) => {
    const fieldValue = getPayloadValue(req.body, field)
    if (field === 'ident') {
      return fieldValue === undefined || fieldValue === null || String(fieldValue).trim() === ''
    }
    return fieldValue === undefined || fieldValue === null
  })

  if (missing.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missing,
    })
  }

  const details = []
  const ident = getPayloadValue(req.body, 'ident')
  const latitude = Number(getPayloadValue(req.body, 'position.latitude'))
  const longitude = Number(getPayloadValue(req.body, 'position.longitude'))
  const timestamp = Number(getPayloadValue(req.body, 'timestamp'))
  const serverTimestamp = getPayloadValue(req.body, 'server.timestamp')

  if (typeof ident !== 'string') {
    details.push('ident must be a string')
  } else {
    if (ident.length < 8 || ident.length > 50) {
      details.push('ident must be between 8 and 50 characters')
    }
    if (!/^[A-Za-z0-9-]+$/.test(ident)) {
      details.push('ident must contain only alphanumeric characters and dashes')
    }
  }

  if (
    Number.isNaN(latitude) ||
    Number.isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    details.push('position.latitude and position.longitude must be valid coordinates')
  }

  if (!Number.isInteger(timestamp) || timestamp <= 0) {
    details.push('timestamp must be a positive integer')
  } else {
    const nowSeconds = Math.floor(Date.now() / 1000)
    if (nowSeconds - timestamp > 24 * 60 * 60) {
      details.push('timestamp must not be older than 24 hours')
    }
  }

  if (serverTimestamp === undefined || serverTimestamp === null || Number.isNaN(Number(serverTimestamp))) {
    details.push('server.timestamp must exist and be a number')
  }

  if (details.length > 0) {
    return res.status(422).json({
      error: 'Validation failed',
      details,
    })
  }

  next()
}

module.exports = {
  validateIngest,
}
