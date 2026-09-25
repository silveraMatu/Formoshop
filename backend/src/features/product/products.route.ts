import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";
import generateMetadataRoutes from './generate-metadata/generateMetadata.routes.ts';

export const productRouter = Router()

// 1. ZONA PÚBLICA (No piden token)
// Liberamos el catálogo general y la vista de producto individual
productRouter.use(getProductsRouter)
productRouter.use(getProductByIdRouter)
productRouter.use(generateMetadataRoutes);
