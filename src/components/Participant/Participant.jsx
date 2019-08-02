import React from "react";

import { ListGroupItem } from "reactstrap";

export const Participant = ({ participant }) => (
  <ListGroupItem action>
    <div>{participant.name ? participant.name : "(Anonymous)"}</div>
  </ListGroupItem>
);
