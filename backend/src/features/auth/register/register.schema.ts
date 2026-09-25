import { z } from 'zod';
import { UserRole } from '../../../shared/db/entity/User/user.ts';

// Roles que un usuario puede auto-asignarse en el registro.
// ADMIN nunca se permite por esta vía (solo asignable por otro ADMIN).
export const SELF_ASSIGNABLE_ROLES = [UserRole.CLIENT, UserRole.PRODUCER] as const;

//schema de validacion para la creacion del usuario
export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nombre de usuario inválido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(SELF_ASSIGNABLE_ROLES).optional().default(UserRole.CLIENT),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
