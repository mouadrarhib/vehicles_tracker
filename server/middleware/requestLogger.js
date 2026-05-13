function requestLogger(req, res, next) {
  const start = Date.now()
  const requestTs = new Date().toISOString()

  console.log(`[REQUEST] ${requestTs} | ${req.method} | ${req.originalUrl} | ${req.ip}`)

  res.on('finish', () => {
    const responseTs = new Date().toISOString()
    const duration = Date.now() - start
    console.log(
      `[RESPONSE] ${responseTs} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${duration} ms`,
    )
  })

  next()
}

module.exports = {
  requestLogger,
}
