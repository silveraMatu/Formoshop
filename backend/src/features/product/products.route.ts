import { Router } from "express";
import getProductsRouter from "./get-products/getProducts.routes.ts";
import createProductRouter from "./create-products/createProduct.routes.ts";
import getProductByIdRouter from "./get-product-by-id/getProductById.routes.ts";
import generateMetadataRoutes from './generate-metadata/generateMetadata.routes.ts';
import { getProductsByOwnerRouter } from "./get-product-by-owner/getProductByOwner.routes.ts";
import updateProductRouter from "./update-product/updateProduct.routes.ts";
import deleteProductRouter from "./delete-product/deleteProduct.routes.ts";

export const productRouter = Router()


productRouter.use(getProductsRouter)


productRouter.use(createProductRouter)
productRouter.use(getProductsByOwnerRouter)
productRouter.use(generateMetadataRoutes);


productRouter.use(getProductByIdRouter)
productRouter.use(updateProductRouter)
productRouter.use(deleteProductRouter)
