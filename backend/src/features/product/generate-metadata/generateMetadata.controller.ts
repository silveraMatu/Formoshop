import type { Request, Response, NextFunction } from 'express';

export const generateMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imagenBase64 } = req.body;
        
        const n8nWebhookUrl = 'http://localhost:5678/webhook-test/generar-producto';

        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imagenBase64 })
        });

        if (!response.ok) {
            throw new Error('Fallo la comunicación con el motor de IA');
        }

        const data = await response.json();
        
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};