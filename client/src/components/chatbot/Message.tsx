import React from "react";
import { MessageType } from "../../types/MessageType";

const Message: React.FC<MessageType> = ({ index, sender, text, created }) => {
  return (
    <div
      key={index}
      className={`p-2 rounded-lg font-medium flex gap-2 text-base max-w-[80%] ${
        sender === "bot"
          ? "bg-gray-200 text-gray-800 self-start"
          : "bg-primary text-white self-end ml-auto"
      } ${
        text === "wait" &&
        sender === "bot" &&
        "w-24 flex items-center gap-2 h-10"
      } ${created && "animate-fadeIn [animation-fill-mode:backwards]"}`}
    >
      {text === "wait" && sender === "bot" ? (
        <>
          <div className="ml-2 w-2 h-2 rounded-full bg-gray-800 animate-typing [animation-delay:-1s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800 animate-typing [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800 animate-typing [animation-delay:0.4s]"></div>
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default Message;
