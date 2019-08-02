const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("starting websocket server");

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(data);
        client.send(data);
      }
    });
  });
});
