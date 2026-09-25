import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";
import generateMetadataRoutes from './generate-metadata/generateMetadata.routes.ts';
import { getProductsByOwnerRouter } from "./get-product-by-owner/getProductByOwner.routes.ts";
import updateProductRouter from "./update-product/updateProduct.routes.ts";
import deleteProductRouter from "./delete-product/deleteProduct.routes.ts";

export const productRouter = Router()

// 1. ZONA PÚBLICA (No piden token)
// Catálogo general
productRouter.use(getProductsRouter)

// 2. ZONA PRIVADA (cada router aplica authenticateToken + authorizeRoles)
// - createProductRouter: PRODUCER | ADMIN
// - getProductsByOwnerRouter: PRODUCER | ADMIN
// - generateMetadataRoutes: PRODUCER | ADMIN
productRouter.use(createProductRouter)
productRouter.use(getProductsByOwnerRouter)
productRouter.use(generateMetadataRoutes);

// 3. RUTAS CON PARÁMETROS DINÁMICOS
// Se colocan al final para evitar colisiones (ej. /owner capturado por /:id)
productRouter.use(getProductByIdRouter)
productRouter.use(updateProductRouter)
productRouter.use(deleteProductRouter)
