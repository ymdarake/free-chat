"use strict";
let WebSocketServer = require('ws').Server;

module.exports = function () {
  const addrInfo = getWebSocketServer().address()
  return addrInfo.port
}

//TODO: handle server close
const ports = [];
const servers = [];
function getWebSocketServer () {
  const port = 9000
  if (!ports.includes(port)) {
    console.log(`port ${port} created`)
    ports.push(port)
    const server = new WebSocketServer({ port })
    server.on('connection', function (ws) {
      console.log(`-- websocket connected ${server.address().address}${server.address().port} --`);
      console.log(`-- ${server.clients.size} clients online --`)
      ws.on('message', function (message) {
        server.clients.forEach(function (client) {
          if (ws !== client) {
            client.send(message);
          }
        });
      });
      ws.on('close', () => {
        console.log('-- a client left --')
      })
    });
    servers.push(server)
    return server
  }
  console.log(`port ${port} again connected`)
  return servers.find(s => s.options.port == port)
}
