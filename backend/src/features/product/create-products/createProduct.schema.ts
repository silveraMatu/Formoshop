import { z } from 'zod';
import { StatusEnum } from '../../../shared/db/entity/Product/product.ts';

export const productSchema = z.object({
  image: z
    .string()
    .refine(
      (value) =>
        /^https?:\/\//i.test(value) || /^data:image\/[a-zA-Z0-9.+-]+;base64,/i.test(value),
      'Debe ser una URL válida o una imagen en Base64',
    )
    .nullish(),
  title: z.string().min(1, 'El título es obligatorio'),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  status: z.nativeEnum(StatusEnum),
  stock: z.number().int().nonnegative('El stock debe ser un entero no negativo'),
  description: z.string().nullish(),
  tag: z.array(z.string()).nullish(),
  ubicacion: z.string().min(1, 'La ubicación es requerida'),
  lat: z.number().min(-90).max(90).nullish(),
  lng: z.number().min(-180).max(180).nullish(),
  address: z.string().max(255).nullish(),
});

export const updateProductSchema = productSchema.partial();

// Inferencia de tipos
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
