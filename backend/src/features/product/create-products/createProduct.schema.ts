import { z } from 'zod';
import { StatusEnum } from '../../../shared/db/entity/Product/product.ts';

export const productSchema = z.object({
  image: z.string().url('Debe ser una URL válida').nullish(),
  title: z.string().min(1, 'El título es obligatorio'),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  category: z.array(z.number().int()).min(1, 'Debe incluir al menos una categoría'),
  status: z.nativeEnum(StatusEnum),
  stock: z.number().int().nonnegative('El stock debe ser un entero no negativo'),
  description: z.string().nullish(),
  tag: z.array(z.string()).nullish(),
  ubicacion: z.string().min(1, 'La ubicación es requerida'),
  lat: z.number().min(-90).max(90).nullish(),
  lng: z.number().min(-180).max(180).nullish(),
  address: z.string().max(255).nullish(),
});

// Esquema para actualización (todos los campos opcionales)
export const updateProductSchema = productSchema.partial();

// Inferencia de tipos
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
