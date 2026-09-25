import type { Request, Response, NextFunction } from 'express';
import { ILike, type FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../../shared/db/index.ts'; 
import { Product } from '../../../shared/db/entity/Product/product.ts';

interface GetProductsResponse {
  success: boolean;
  data: Product[];
}


interface ProductQuery {
  name?: string;
}

export const getProducts = async (
  req: Request<unknown, unknown, unknown, ProductQuery>,
  res: Response<GetProductsResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.query;
    const productRepository = AppDataSource.getRepository(Product);

    const whereCondition: FindOptionsWhere<Product> = {};

    if (name) {
  
      whereCondition.title = ILike(`%${name}%`);
    }

    const products = await productRepository.find({
      where: whereCondition
    });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error: unknown) {
    next(error);
  }
};