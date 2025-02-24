import { Request, Response } from "express";
import { sendMessageToChatGPT } from "../services/chatService";

export const chatWithAI = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, message } = req.body;

    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const aiResponse = await sendMessageToChatGPT(userId, message);
    res.json(aiResponse);
  } catch (error) {
    res.status(500).json({ message: "Error processing AI request", error });
  }
};
