import { useEffect, useRef, useState } from "react";
import { faRobot, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "./Message";
import UserInput from "./UserInput";
import { useChatStore } from "../../store/useChatStore";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, replies, addUserMessage, addBotMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleReply = (message: string) => {
    addUserMessage(message);
    setTimeout(() => addBotMessage(message), 300);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end tb:text-base z-50">
      {/* Floating Button */}
      <FontAwesomeIcon
        icon={faRobot}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white h-10 w-10 p-3 rounded-full shadow-lg hover:bg-primary hover:bg-opacity-80 cursor-pointer transition duration-300"
      ></FontAwesomeIcon>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`w-96 max-w-[80vw] bg-white shadow-xl z-50 rounded-lg p-4 mt-3 border border-gray-300 ${
            isOpen ? "animate-fadeIn" : "animate-fadeOut"
          } [animation-fill-mode:backwards]`}
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Chat with us</h2>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="cursor-pointer h-6 w-6"
              onClick={() => setIsOpen(false)}
            ></FontAwesomeIcon>
          </div>

          {/* Chat Messages */}
          <div className="relative mt-3 h-40 max-h-60 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <Message
                key={"message" + index}
                index={index}
                text={msg.text}
                created={true}
                sender={msg.sender}
              />
            ))}

            {/* Scroll to Bottom Ref */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {replies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleReply(reply)}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-md"
              >
                {reply}
              </button>
            ))}
          </div>
          <UserInput handleReply={handleReply} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
