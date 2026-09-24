import type { Request, Response, NextFunction } from 'express';
import type { ProductInput } from './createProduct.schema.ts';
import { productSchema } from './createProduct.schema.ts';
import { AppDataSource } from '../../../shared/db/index.ts';
import { Product } from '../../../shared/db/entity/Product/product.ts';

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedData: ProductInput = productSchema.parse(req.body);

    const productRepo = AppDataSource.getRepository(Product);

    const newProduct = new Product();
    Object.assign(newProduct, validatedData);

    const savedProduct = await productRepo.save(newProduct);

    res.status(201).json({
      status: 'Ok',
      status_code: 201,
      message: `Producto "${savedProduct.title}" creado correctamente`,
      data: savedProduct,
    });
  } catch (err) {
    next(err);
  }
};