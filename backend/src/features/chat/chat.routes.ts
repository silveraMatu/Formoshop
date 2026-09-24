import { Router } from "express";
import { sendChatController } from "./chat.controllet.ts";

export const chatRouter = Router()
chatRouter.post("/", sendChatController)