import { Router } from 'express';
import { loginController } from './login.controller.ts';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { LoginUserSchema } from './login.schema.ts';

export const loginRouter = Router();

loginRouter.post('/login', validate(LoginUserSchema), loginController);
