const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Vehicle Tracker Backend API',
      version: '1.0.0',
      description: 'API for ingesting and reading vehicle telemetry data.',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./controllers/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = {
  swaggerSpec,
}
