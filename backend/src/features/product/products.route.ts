import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";
<<<<<<< HEAD
import generateMetadataRoutes from './generate-metadata/generateMetadata.routes.ts';
=======
import { getProductsByOwnerRouter } from "./get-product-by-owner/getProductByOwner.routes.ts";
import { authenticateToken } from "../../shared/Middlewares/auth.middleware.ts";
>>>>>>> devlau

export const productRouter = Router()

// 1. ZONA PÚBLICA (No piden token)
// Liberamos el catálogo general y la vista de producto individual
productRouter.use(getProductsRouter)
productRouter.use(getProductByIdRouter)
<<<<<<< HEAD
productRouter.use(generateMetadataRoutes);
=======

// 2. CANDADO DE SEGURIDAD
// Todo lo que esté de acá para abajo va a exigir inicio de sesión
productRouter.use(authenticateToken);

// 3. ZONA PRIVADA
// Solo los dueños logueados pueden crear o ver sus propios productos
productRouter.use(createProductRouter)
productRouter.use(getProductsByOwnerRouter)
>>>>>>> devlau
