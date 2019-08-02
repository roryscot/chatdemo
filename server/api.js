class Websocket_API {
  state = {
    participants: [],
    messages: []
  };

  addMessage = data => {
    const newMessage = {
      ...data.message
    };
    switch (data.method) {
      case "POST":
        newMessage.id = "m00" + this.state.messages.length;
        this.state.messages = [...this.state.messages, newMessage];
        break;
      case "PUT":
        const newMessages = this.state.messages.map(m =>
          m.id === newMessage.id ? newMessage : m
        );
        this.state.messages = newMessages;
        break;
      default:
        return new Error("No method provided " + data);
    }
  };

  deleteMessage = id => {
    this.state.messages = this.state.messages.filter(m => m.id !== id);
  };

  addParticipant = newParticipant => {
    this.state.participants = [...this.state.participants, newParticipant];
  };

  generateTestData() {
    const time = new Date(Date.now()).toLocaleTimeString().slice(0, -3);
    this.state = {
      participants: [
        { id: "u000", name: "ChatBot" },
        { id: "u001", name: "Morty" },
        { id: "u002", name: "Summer" },
        { id: "u003", name: "Rick" },
        { id: "u004", name: "Birdman" }
      ],
      messages: [
        {
          id: "m000",
          owner: "u000",
          content: "Welcome, what is my purpose?",
          createdAt: time,
          updatedAt: time
        },
        {
          id: "m002",
          owner: "u003",
          content: "{burps} You facilitate Pexip's chat.",
          createdAt: time,
          updatedAt: time
        },
        {
          id: "m000",
          owner: "u000",
          content: "{looks down} Oh my god",
          createdAt: time,
          updatedAt: time
        },
        {
          id: "m002",
          owner: "u003",
          content: "Welcome to the club, Pal.",
          createdAt: time,
          updatedAt: time
        },
        {
          id: "m001",
          owner: "u001",
          content: "You mean this? https://www.youtube.com/watch?v=X7HmltUWXgs",
          createdAt: time,
          updatedAt: time
        }
      ]
    };
    // For testing, return the time
    return time;
  }
}

module.exports = Websocket_API;
