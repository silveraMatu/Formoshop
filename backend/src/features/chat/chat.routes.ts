import { Router } from "express";
import { sendChatController } from "./chat.controllet.ts";
// import { authenticateToken } from "../../shared/Middlewares/auth.middleware.ts";

export const chatRouter = Router()

chatRouter.post("/", sendChatController)