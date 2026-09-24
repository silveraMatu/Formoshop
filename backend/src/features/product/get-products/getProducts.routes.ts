import { Router } from 'express'
import { getProducts } from './getProducts.controller.ts'

const router = Router();

router.get('/', getProducts)

export default router;