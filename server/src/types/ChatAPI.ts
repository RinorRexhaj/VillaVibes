export interface ChatAPI {
  role: "system" | "user" | "assistant";
  content: string;
}
