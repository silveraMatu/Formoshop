import { z } from 'zod';
import { UserRole } from '../../../shared/db/entity/User/user.ts';

export const SELF_ASSIGNABLE_ROLES = [UserRole.CLIENT, UserRole.PRODUCER] as const;

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nombre de usuario inválido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(SELF_ASSIGNABLE_ROLES).optional().default(UserRole.CLIENT),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
