import { Router } from 'express';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../../shared/Middlewares/role.middleware.ts';
import { deleteProductController } from './deleteProduct.controller.ts';

const deleteProductRouter = Router();

deleteProductRouter.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('PRODUCER', 'ADMIN'),
  deleteProductController
);

export default deleteProductRouter;
