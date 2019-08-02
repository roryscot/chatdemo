import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ChatInput } from "components";
import { timeFormatter } from "utils";
import INITIAL_STATE from "initialState";
import "./style.css";

export default class EditMessage extends Component {
  state = INITIAL_STATE.editMessage;

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      message: this.props.message
    }));
  };

  onChange = e => {
    let newMessage = { ...this.state.message };
    newMessage.content = e.target.value;
    this.setState({ message: newMessage });
  };

  submitMessage = e => {
    e.preventDefault();
    if (this.checkPermissions()) {
      const { ws } = this.props;
      const message = { ...this.state.message };
      const time = timeFormatter(new Date(Date.now()));
      message.updatedAt = time;
      const data = { method: "PUT", message: message };
      try {
        ws.send(JSON.stringify(data));

        this.setState(INITIAL_STATE.editMessage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  deleteMessage = e => {
    if (this.checkPermissions()) {
      const { ws } = this.props;
      const message = { ...this.state.message };
      const time = timeFormatter(new Date(Date.now()));
      message.updatedAt = time;
      const data = { method: "DELETE", message: message };
      try {
        ws.send(JSON.stringify(data));

        this.setState(INITIAL_STATE.editMessage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  checkPermissions() {
    const { message } = this.state;
    if (this.props.authorization === message.owner) {
      return true;
    } else {
      alert("You are not authorized to edit this message");
      return false;
    }
  }

  render() {
    return (
      <div>
        <Button color="none" onClick={this.toggle} className={"edit-button"}>
          ...
        </Button>

        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Message</ModalHeader>
          <ModalBody>
            <ChatInput
              currentMessage={this.state.message}
              onChange={this.onChange}
              onSubmitMessage={this.submitMessage}
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={this.deleteMessage}>
              Delete
            </Button>
            <Button color="primary" onClick={this.submitMessage}>
              Submit
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
