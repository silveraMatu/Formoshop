import { z } from 'zod';

export const generateMetadataSchema = z.object({
    imagenBase64: z.string({
        message: 'La imagen en base64 es requerida y su formato debe ser texto',
    }).min(1, 'La imagen no puede estar vacía'),
});
