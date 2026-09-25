    import { Router } from 'express';
import { getProductById } from './getProductById.controller.ts';

const getProductByIdRouter = Router();

getProductByIdRouter.get('/:id', getProductById);

export default getProductByIdRouter;