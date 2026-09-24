import { Router } from 'express';
import { createProductController } from './createProduct.controller.ts';
import { validate } from '../../../shared/Middlewares/valildateSchema.ts';
import { productSchema } from './createProduct.schema.ts';

const createProductRouter = Router();

createProductRouter.post('/', validate(productSchema), createProductController);

export default createProductRouter;