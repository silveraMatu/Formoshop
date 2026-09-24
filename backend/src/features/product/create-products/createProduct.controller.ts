import type {Request, Response, NextFunction} from "express"
import { AppDataSource } from "../../../shared/db/index.ts"
import { Product } from "../../../shared/db/entity/Product/product.ts"

const createProductController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const productRepo = AppDataSource.getRepository(Product)

        const newProduct = productRepo.create(req.body)
    } catch (err) {
        next(err)
    }
}