import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

interface UserInputProps {
  handleReply: (text: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ handleReply }) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const resetInput = (text: string) => {
    setUserInput("");
    inputRef.current?.blur();
    handleReply(text);
  };

  return (
    <div className="mt-4 flex items-center border-t pt-8 tb:pt-4">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 p-2 border rounded-lg text-base font-medium focus:outline-none"
        placeholder="Type a message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && resetInput(userInput)}
      />
      <button
        onClick={() => resetInput(userInput)}
        className="ml-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-opacity-80 transition"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
      </button>
    </div>
  );
};

export default UserInput;
