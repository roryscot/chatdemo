import React from "react";
import { Participant } from "components";
import { ListGroup } from "reactstrap";

export const ParticipantsContainer = ({ participants }) => {
  return (
    <ListGroup flush>
      {participants.map((p, i) => (
        <Participant participant={p} key={"participant_" + i} />
      ))}
    </ListGroup>
  );
};
