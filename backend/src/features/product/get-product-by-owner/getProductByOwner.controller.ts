import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../shared/db/index.ts';
import { Product } from '../../../shared/db/entity/Product/product.ts';

export const getProductsByOwnerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const userId = req.user!.id;

    const products = await productRepo.find({
      where: {
        userId,
      },
    });

    res.status(200).json({
      status: 'Ok',
      status_code: 200,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
}