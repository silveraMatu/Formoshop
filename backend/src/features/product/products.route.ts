import { Router } from "express";
import { createProductController } from "./create-products/createProduct.controller.ts";

const productRouter = Router()

productRouter.use(createProductController)