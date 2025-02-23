import { Request, Response } from "express";
import { sendMessageToChatGPT } from "../services/chatService";

export const chatWithAI = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message, villa, date } = req.body;

    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    const aiResponse = await sendMessageToChatGPT(message);
    res.json(aiResponse);
  } catch (error) {
    res.status(500).json({ message: "Error processing AI request", error });
  }
};
