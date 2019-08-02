export default {
  tabContainer: {
    activeTab: "2",
    participants: []
  },
  chatContainer: {
    // TODO: get UserID
    user: "u001",
    ws: new WebSocket(process.env.REACT_APP_WEBSOCKET_URL),
    currentMessage: {
      content: ""
    },
    messages: []
  }
};
