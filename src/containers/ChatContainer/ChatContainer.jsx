import React, { Component } from "react";
import { ChatInput, ChatItem } from "components";
import INITIAL_STATE from "initialState";
import { timeFormatter } from "utils";

import "./style.css";

export default class ChatContainer extends Component {
  state = INITIAL_STATE.chatContainer;

  onChange = e => {
    let message = { ...this.state.currentMessage };
    message.content = e.target.value;
    this.setState({ currentMessage: message });
  };

  componentWillMount() {
    const { ws } = this.state;
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = evt => {
      const data = JSON.parse(evt.data);
      this.setState(data);
    };

    ws.onclose = () => {
      console.log("disconnected");
      // reconnect
      this.setState({
        ws: new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
      });
    };
  }

  submitMessage = e => {
    e.preventDefault();
    const { ws, user, currentMessage } = this.state;
    const time = timeFormatter(new Date(Date.now()));
    const message = {
      owner: user,
      content: currentMessage.content,
      createdAt: time,
      updatedAt: time
    };
    const data = { message: message, method: "POST" };
    try {
      this.setState({
        currentMessage: {
          content: ""
        }
      });
      ws.send(JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: store users as well as participants
  render() {
    const { participatns } = this.props;
    const { messages, currentMessage } = this.state;
    return (
      <div>
        {messages
          ? messages.map((m, i) => (
              <ChatItem
                message={m}
                key={"message_" + i}
                ws={this.state.ws}
                username={
                  participatns && participatns.find(u => u.id === m.owner).name
                }
                authorization={this.state.user}
              />
            ))
          : "No messages to display"}
        <ChatInput
          onSubmitMessage={this.submitMessage}
          onChange={this.onChange}
          currentMessage={currentMessage}
          id={"principle-chat"}
        />
      </div>
    );
  }
}
