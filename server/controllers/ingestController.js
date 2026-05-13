const ingestService = require('../services/ingestService')

/**
 * @openapi
 * /gps/ingest:
 *   post:
 *     tags:
 *       - Ingest
 *     summary: Ingest one GPS payload
 *     description: Receives a full telemetry payload and stores it in PostgreSQL, Redis, and WebSocket stream.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ident:
 *                 type: string
 *                 example: 861327087811118
 *               position.latitude:
 *                 type: number
 *                 example: 33.561132
 *               position.longitude:
 *                 type: number
 *                 example: -7.116593
 *               timestamp:
 *                 type: integer
 *                 example: 1715593600
 *               server.timestamp:
 *                 type: number
 *                 example: 1715593600
 *     responses:
 *       200:
 *         description: Payload received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                 ident:
 *                   type: string
 */

async function handle(req, res, next) {
  try {
    const payload = req.body
    await ingestService.process(payload)
    res.status(200).json({ received: true, ident: payload.ident })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  handle,
}
