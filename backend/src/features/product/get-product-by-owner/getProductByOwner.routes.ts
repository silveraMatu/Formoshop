import { Router } from 'express';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../../shared/Middlewares/role.middleware.ts';
import { getProductsByOwnerController } from './getProductByOwner.controller.ts';

export const getProductsByOwnerRouter = Router();

getProductsByOwnerRouter.get(
  '/',
  authenticateToken,
  authorizeRoles('PRODUCER', 'ADMIN'),
  getProductsByOwnerController,
);
