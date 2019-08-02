import React, { Component } from "react";
import { ChatInput } from "components";
import INITIAL_STATE from "initialState";
import "./style.css";
import { Col, Form, FormGroup, Input } from "reactstrap";

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

  render() {
    const { messages, currentMessage } = this.state;
    return (
      <div>
        <Form
          onSubmit={event => {
            event.preventDefault();
            this.state.ws.send(JSON.stringify(this.state.currentMessage));
          }}
        >
          <FormGroup row>
            <Col>
              <Input
                type="text"
                name="userMessage"
                id="userMessage"
                placeholder="Message"
                value={currentMessage.content}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
