const { redisClient } = require('../db/redis')

async function setVehicle(ident, data) {
  try {
    await redisClient.set(`vehicle:${ident}`, JSON.stringify(data))
  } catch (error) {
    console.error('Redis setVehicle failed:', error.message)
  }
}

async function getVehicle(ident) {
  try {
    const raw = await redisClient.get(`vehicle:${ident}`)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error('Redis getVehicle failed:', error.message)
    return null
  }
}

async function getAllVehicles() {
  try {
    const keys = await redisClient.keys('vehicle:*')

    if (keys.length === 0) {
      return []
    }

    const rawVehicles = await redisClient.mget(keys)
    return rawVehicles.filter((item) => item !== null).map((item) => JSON.parse(item))
  } catch (error) {
    console.error('Redis getAllVehicles failed:', error.message)
    return []
  }
}

module.exports = {
  setVehicle,
  getVehicle,
  getAllVehicles,
}
