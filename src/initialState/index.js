export default {
  tabContainer: {
    activeTab: "2",
    participants: [],
    messages: [],
    ws: new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
  },
  chatContainer: {
    // TODO: get UserID
    user: "u001",
    currentMessage: {
      content: ""
    }
  },
  editMessage: {
    modal: false,
    message: {
      owner: "",
      id: "",
      content: "",
      createdAt: "",
      updatedAt: ""
    }
  }
};
