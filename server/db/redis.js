const Redis = require('ioredis')
const { REDIS_URL } = require('../config/env')

const redisClient = new Redis(REDIS_URL, {
  lazyConnect: true,
  retryStrategy: () => null,
})

redisClient.on('error', (error) => {
  console.error('Redis connection error:', error.message)
})

async function testRedisConnection() {
  try {
    await redisClient.connect()
    await redisClient.ping()
    console.log('Redis connected')
  } catch (error) {
    console.error('Redis connection error:', error.message)
  }
}

async function setVehicle(ident, data) {
  const key = `vehicle:${ident}`
  await redisClient.set(key, JSON.stringify(data))
}

async function getVehicle(ident) {
  const key = `vehicle:${ident}`
  const value = await redisClient.get(key)
  return value ? JSON.parse(value) : null
}

async function getAllVehicles() {
  const keys = await redisClient.keys('vehicle:*')

  if (keys.length === 0) {
    return []
  }

  const values = await redisClient.mget(keys)
  return values.filter(Boolean).map((item) => JSON.parse(item))
}

module.exports = {
  redisClient,
  testRedisConnection,
  setVehicle,
  getVehicle,
  getAllVehicles,
}
