import { z } from 'zod';
//schema de validacion para la creacion del usuario
export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nombre de usuario inválido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
