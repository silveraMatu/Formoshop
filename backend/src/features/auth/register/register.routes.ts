import { Router } from 'express';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { CreateUserSchema } from './register.schema.ts';
import { registerController } from './register.controller.ts';

export const registerRouter = Router();

registerRouter.post(
  '/register',
  validate(CreateUserSchema),
  registerController,
);
