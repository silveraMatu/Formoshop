import { Router } from 'express';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../../shared/Middlewares/role.middleware.ts';
import { updateProductController } from './updateProduct.controller.ts';

const updateProductRouter = Router();

updateProductRouter.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('PRODUCER', 'ADMIN'),
  updateProductController
);

export default updateProductRouter;
