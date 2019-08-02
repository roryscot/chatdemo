import React from "react";
import { Col, Form, FormGroup, Input } from "reactstrap";

export const ChatInput = ({
  currentMessage,
  onChange,
  onSubmitMessage,
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
      </FormGroup>
    </Form>
  );
};
