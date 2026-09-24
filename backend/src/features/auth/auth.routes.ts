import { Router } from 'express';
import { registerRouter } from './register/register.routes.ts';
import { loginRouter } from './login/login.routes.ts';

export const authRouter = Router();

authRouter.use('/auth', registerRouter);
authRouter.use('/auth', loginRouter);
