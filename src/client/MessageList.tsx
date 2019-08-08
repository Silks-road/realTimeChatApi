import { Map } from "immutable";
import React, { SyntheticEvent, useEffect, useState } from "react";

import "./MessageList.scss";

const MessageList = ({ socket }) => {
  const [messages, setMessages] = useState(Map());

  useEffect(() => {
    const messageListener = (message: IMessage) => {
      setMessages((prevMessages) => prevMessages.set(message.id, message));
    };

    const deleteListener = (messageID: string) => {
      setMessages((prevMessages) => prevMessages.delete(messageID);)
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("message", deleteMessageListener);
    };

  } [socket]);

return (
  <div className="message-list">
    { messages
      .toSet()
      .sortBy(( message: IMessage ) => message.time)
      .map(( message: IMessage ) => (
        <div
          key={ message.id }
          className="message-list--message-container"
          title={ `Sent at ${ new Date(message.time).toLocalTimeString() }` }
        >
          <span className="message-list--message">{ message.value }</span>
          <span className="message-list--user">{ message.user.name }</span>
        </div>
      )).toArray();
    }
  </div>
);

};

export default MessageList;
