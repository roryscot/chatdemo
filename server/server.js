const WebSocket = require("ws");
const API = require("./api");
console.log("starting websocket server");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    const parsed = JSON.parse(data);
    console.log("Here", parsed);
    if (
      typeof parsed.message === "object" &&
      parsed.participant === undefined
    ) {
      // update messages
      API.addMessage(parsed);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          console.log("messages:", API.state.messages);
          data = JSON.stringify({ messages: API.state.messages });
          client.send(data);
        }
      });
    } else if (
      typeof parsed.participant === "object" &&
      parsed.message === undefined
    ) {
      // update users
      API.addParticipant(data);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          data = JSON.stringify({ users: API.state.participants });
          client.send(data);
        }
      });
    } else {
      console.log("Default case", data);
    }
  });
});
