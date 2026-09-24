import { Router } from 'express';
import { getProductById } from './getProductById.controller.ts';

const getProductByIdRouter = Router();

// Express interpreta el :id como una variable en la URL
getProductByIdRouter.get('/:id', getProductById);

export default getProductByIdRouter;