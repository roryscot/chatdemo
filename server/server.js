const WebSocket = require("ws");
let API = require("./api");

console.log("starting websocket server");
const wss = new WebSocket.Server({ port: 8080 });

API = new API();

wss.on("connection", function connection(ws) {
  // just for fun
  if (API.state.initialized === false) {
    API.state.initialized = true;
    API.generateTestData();
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      let data = JSON.stringify(API.state);
      client.send(data);
    }
  });
  ws.on("message", function incoming(data) {
    const parsed = JSON.parse(data);
    if (parsed.method === "DELETE") {
      // TODO: check id of sender
      API.deleteMessage(parsed.message.id);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          data = JSON.stringify({ messages: API.state.messages });
          client.send(data);
        }
      });
    }
    if (
      typeof parsed.message === "object" &&
      parsed.participant === undefined
    ) {
      // update messages
      API.addMessage(parsed);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
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
          data = JSON.stringify({ participants: API.state.participants });
          client.send(data);
        }
      });
    } else {
      console.log("Default case", data);
    }
  });
});
