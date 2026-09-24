import { Router } from 'express'
import { getProducts } from './getProducts.controller.ts'

const getProductsRouter = Router();

getProductsRouter.get('/', getProducts)

export default getProductsRouter;