import type { Request, Response, NextFunction } from 'express';

export const sendChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, sessionId } = req.body;

    const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL!;
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.CHAT_SECRET_KEY!,
      },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en el servicio de IA (Status: ${response.status})`);
    }

    const data = await response.json();

    res.status(200).json({
      status: 'Ok',
      status_code: 200,
      data,
    });
  } catch (err) {
    next(err);
  }
};