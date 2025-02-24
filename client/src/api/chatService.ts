import axios from "axios";
import { environment } from "../environment/environment";
import { ChatResponse } from "../types/ChatResponse";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = environment.apiUrl + "/chat";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const chatService = {
  sendMessage: async (
    userMessage: string
  ): Promise<{ message: string; replies: string[] }> => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    const response = await api.post<ChatResponse>("/", {
      userId,
      message: userMessage,
    });
    const { message, replies } = response.data;
    return { message: message, replies: replies };
  },
};
