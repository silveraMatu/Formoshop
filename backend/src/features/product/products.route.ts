import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";

export const productRouter = Router()

productRouter.use(createProductRouter)
productRouter.use(getProductsRouter)
productRouter.use(getProductByIdRouter)