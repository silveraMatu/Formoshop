import { CreateUserSchema } from '../register/register.schema.ts';
import { z } from 'zod';

export const LoginUserSchema = CreateUserSchema.omit({ name: true, role: true });

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
