import React from "react";
import { EditMessage } from "components";
import { parseLink } from "utils";

import "./style.css";

export const ChatItem = ({ message, ws, username, authorization }) => {
  return (
    <div id={message.id} className={"chat-item"}>
      <strong>{username || message.owner}</strong>
      <span className={"chat-item-info"}>
        {message.createdAt}{" "}
        {message.updatedAt !== message.createdAt ? "(edited)" : null}
      </span>
      <p
        style={message.owner === "u000" ? { color: "grey" } : null}
        dangerouslySetInnerHTML={{
          __html: parseLink(message.content)
        }}
      />
      {message.owner === authorization ? (
        <EditMessage message={message} ws={ws} authorization={authorization} />
      ) : null}
    </div>
  );
};
