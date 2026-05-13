const dotenv = require('dotenv')

dotenv.config()

const PG_HOST = process.env.PG_HOST || 'localhost'
const PG_PORT = Number(process.env.PG_PORT) || 5432
const PG_DATABASE = process.env.PG_DATABASE || 'vehicle_tracker'
const PG_USER = process.env.PG_USER || 'postgres'
const PG_PASSWORD = process.env.PG_PASSWORD || 'postgres'

const PG_CONNECTION_STRING =
  process.env.PG_CONNECTION_STRING ||
  `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`

module.exports = {
  PORT: Number(process.env.PORT) || 3001,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
  PG_CONNECTION_STRING,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
}
