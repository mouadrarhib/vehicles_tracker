const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const { PORT, REDIS_URL } = require('./config/env')
const { swaggerSpec } = require('./config/swagger')
const ingestRoutes = require('./routes/ingest')
const vehiclesRoutes = require('./routes/vehicles')
const { errorHandler } = require('./middleware/errorHandler')
const { requestLogger } = require('./middleware/requestLogger')
const { testPostgresConnection, runMigrations } = require('./db/postgres')
const { testRedisConnection } = require('./db/redis')
const socketServer = require('./ws/socketServer')

const app = express()

app.use(cors())
app.use(helmet())
app.use(requestLogger)
app.use(express.json())

app.use('/gps/ingest', ingestRoutes)
app.use('/vehicles', vehiclesRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
app.get('/ws/stats', (req, res) => {
  const stats = socketServer.getStats()
  res.json({ event: 'stats', connected: stats.connected, timestamp: stats.timestamp })
})

app.use(errorHandler)

async function startServer() {
  await testPostgresConnection()
  await runMigrations()
  await testRedisConnection()

  const httpServer = app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}`)
    console.log(`Redis URL: ${REDIS_URL}`)
    console.log(`Swagger UI: http://localhost:${PORT}/docs`)
    console.log(`Swagger JSON: http://localhost:${PORT}/docs.json`)
  })

  socketServer.init(httpServer)
  console.log('[WS] WebSocket server initialized')
}

startServer()
