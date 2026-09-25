import { apiClient } from "@/lib/api-client";

export async function sendMessageToIA(message: string, sessionId: string) {
  const response = await apiClient.post("/chat", { message, sessionId });
  return response.data;
}
