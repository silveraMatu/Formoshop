import { Router } from 'express';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { getProductsByOwnerController } from './getProductByOwner.controller.ts';

export const getProductsByOwnerRouter = Router();

getProductsByOwnerRouter.get('/', authenticateToken, getProductsByOwnerController);