import React, { Component } from "react";
import { ChatInput } from "components";
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
      console.log("MESSAGE", evt.data);
      const data = JSON.parse(evt.data);
      this.setState(data);
      console.warn("state", this.state);
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

  render() {
    const { participatns } = this.props;
    const { messages, currentMessage } = this.state;
    return (
      <div>
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
