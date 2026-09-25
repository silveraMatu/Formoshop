import { Router } from 'express';
import { createProductController } from './createProduct.controller.ts';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { productSchema } from './createProduct.schema.ts';
import { authenticateToken } from '../../../shared/Middlewares/auth.middleware.ts';
import { authorizeRoles } from '../../../shared/Middlewares/role.middleware.ts';

const createProductRouter = Router();

createProductRouter.post(
  '/',
  authenticateToken,
  authorizeRoles('PRODUCER', 'ADMIN'),
  validate(productSchema),
  createProductController,
);

export default createProductRouter;
