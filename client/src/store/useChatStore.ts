import { create } from "zustand";
import { MessageType } from "../types/MessageType";
import { chatService } from "../api/chatService";

type ChatState = {
  messages: MessageType[];
  replies: string[];
  loading: boolean;
  error: string | null;
  addUserMessage: (message: string) => void;
  addBotMessage: (message: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { text: "Hello! How can I help you?", sender: "bot", created: false },
  ],
  replies: [
    "What are your villa prices?",
    "Do you have availability next weekend?",
    "Which villas are available tomorrow?",
    "How can I make a reservation?",
  ],
  loading: false,
  error: null,

  addUserMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { text: message, sender: "user", created: true },
      ],
      loading: true,
      error: null,
    }));
  },

  addBotMessage: async (message) => {
    set((state) => ({
      loading: true,
      error: null,
      messages: [
        ...state.messages,
        { text: "wait", sender: "bot", created: true },
      ],
    }));

    try {
      const response = await chatService.sendMessage(message);
      set((state) => ({
        messages: [
          ...state.messages.filter(
            (msg) => !(msg.text === "wait" && msg.sender === "bot")
          ),
          { text: response.message, sender: "bot", created: true },
        ],
        replies: response.replies,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: "Failed to get AI response" });
    }
  },
}));
