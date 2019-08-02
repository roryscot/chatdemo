import React from "react";
import { Col, Form, FormGroup, Input, Button } from "reactstrap";
import EmojiPicker from "emoji-picker-react";

import "./style.css";

import JSEMOJI from "emoji-js";
const jsemoji = new JSEMOJI();

export const ChatInput = ({
  currentMessage,
  onChange,
  onSubmitMessage,
  handleEmojiPick,
  toggleEmojiPicker,
  emojiPicker,
  id
}) => {
  return (
    <Form onSubmit={onSubmitMessage} id={id}>
      <FormGroup row>
        <Col>
          <Input
            type="text"
            name="userMessage"
            id="userMessage"
            placeholder="Message"
            value={currentMessage.content}
            onChange={onChange}
          />
        </Col>
        <Button
          onClick={toggleEmojiPicker}
          color="none"
          className={"emoji-button"}
        >
          {jsemoji.replace_colons(`:smile:`)}
          {emojiPicker ? <EmojiPicker onEmojiClick={handleEmojiPick} /> : null}
        </Button>
      </FormGroup>
    </Form>
  );
};
