const express = require('express')
const ingestController = require('../controllers/ingestController')
const { validateIngest } = require('../middleware/validateIngest')

const router = express.Router()

router.post('/', validateIngest, ingestController.handle)

module.exports = router
