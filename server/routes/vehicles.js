const express = require('express')
const vehiclesController = require('../controllers/vehiclesController')
const socketServer = require('../ws/socketServer')

const router = express.Router()

router.get('/', vehiclesController.getAll)
router.post('/cache/sync', vehiclesController.syncCache)
router.get('/ws/stats', (req, res) => {
  const stats = socketServer.getStats()
  res.json({ event: 'stats', connected: stats.connected, timestamp: stats.timestamp })
})
router.get('/:ident/history', vehiclesController.getHistory)
router.get('/:ident', vehiclesController.getOne)

module.exports = router
