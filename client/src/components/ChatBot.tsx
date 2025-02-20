import { faRobot, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const quickReplies = [
  "What are your villa prices?",
  "Do you have availability next weekend?",
  "What amenities do you offer?",
  "How can I make a reservation?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);

  const handleReply = (reply: string) => {
    setMessages([...messages, { text: reply, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'll get back to you on that!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end text-3xl tb:text-base ">
      {/* Floating Button */}
      <FontAwesomeIcon
        icon={faRobot}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white h-28 w-28 tb:h-10 tb:w-10 p-6 tb:p-3 rounded-full shadow-lg hover:bg-primary hover:bg-opacity-80 cursor-pointer transition duration-300"
      ></FontAwesomeIcon>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`w-[600px] tb:w-80 bg-white shadow-xl rounded-lg p-8 tb:p-4 mt-3 border border-gray-300 ${
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
          <div className="mt-3 max-h-60 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-primary text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleReply(reply)}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-md"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
