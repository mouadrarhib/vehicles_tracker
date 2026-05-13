function errorHandler(error, req, res, next) {
  const timestamp = new Date().toISOString()
  let status = error.status || 500
  let message = error.message || 'Internal server error'

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    status = 400
    message = 'Invalid JSON body'
  } else if (error.code === '23505') {
    status = 409
    message = 'Duplicate entry'
  } else if (error.code === 'ECONNREFUSED') {
    status = 503
    message = 'Database unavailable'
  }

  console.error(`[ERROR] ${timestamp} | ${req.method} | ${req.originalUrl} | ${status} | ${message}`)

  const response = { error: message }
  if (process.env.NODE_ENV !== 'production' && error.stack) {
    response.stack = error.stack
  }

  res.status(status).json(response)
}

module.exports = {
  errorHandler,
}
