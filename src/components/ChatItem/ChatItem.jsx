import React, { Component } from "react";
import { EditMessage } from "components";
import { parseLink, extractURLs } from "utils";
import ReactTinyLink from "react-tiny-link";

import "./style.css";

export class ChatItem extends Component {
  render() {
    const { message, ws, username, authorization } = this.props;
    const urls = extractURLs(message.content);
    return (
      <div id={message.id} className={"chat-item"}>
        <strong>{username || message.owner}</strong>
        <span className={"chat-item-info"}>
          {message.createdAt}{" "}
          {message.updatedAt !== message.createdAt ? "(edited)" : null}
        </span>

        {urls.length ? (
          urls.map((u, i) => (
            <div key={u + i}>
              <p
                style={message.owner === "u000" ? { color: "grey" } : null}
                dangerouslySetInnerHTML={{
                  __html: parseLink(message.content)
                }}
              />
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={u}
              />
            </div>
          ))
        ) : (
          <p style={message.owner === "u000" ? { color: "grey" } : null}>
            {message.content}
          </p>
        )}
        {message.owner === authorization ? (
          <EditMessage
            message={message}
            ws={ws}
            authorization={authorization}
          />
        ) : null}
      </div>
    );
  }
}
