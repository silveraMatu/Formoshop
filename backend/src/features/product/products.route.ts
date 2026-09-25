import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";
import { getProductsByOwnerRouter } from "./get-product-by-owner/getProductByOwner.routes.ts";
import { authenticateToken } from "../../shared/Middlewares/auth.middleware.ts";

export const productRouter = Router()

productRouter.use(authenticateToken);

productRouter.use(createProductRouter)
productRouter.use(getProductsRouter)
productRouter.use(getProductByIdRouter)
productRouter.use(getProductsByOwnerRouter)