import axios from "axios";
import { environment } from "../environment/environment";
import { ChatResponse } from "../types/ChatResponse";

const API_BASE_URL = environment.apiUrl + "/chat";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
let currVilla: string, currDate: string;

export const chatService = {
  sendMessage: async (
    userMessage: string
  ): Promise<{ message: string; replies: string[] }> => {
    const response = await api.post<ChatResponse>("/", {
      message: userMessage,
      villa: currVilla,
      date: currDate,
    });
    const { message, replies, villa, date } = response.data;
    currVilla = villa;
    currDate = date;
    return { message: message, replies: replies };
  },
};
