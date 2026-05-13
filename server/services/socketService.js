const socketServer = require('../ws/socketServer')

function broadcast(event, data) {
  socketServer.broadcast(event, data)
}

function getConnectedCount() {
  return socketServer.getConnectedCount()
}

module.exports = {
  broadcast,
  getConnectedCount,
}
