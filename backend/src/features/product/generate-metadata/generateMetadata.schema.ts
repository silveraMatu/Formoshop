import { z } from 'zod';

export const generateMetadataSchema = z.object({
    body: z.object({
        imagenBase64: z.string().min(1, 'La imagen en base64 es requerida y no puede estar vacía'),
    }),
});