import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../shared/db/index.ts'; //
import { Product } from '../../../shared/db/entity/Product/product.ts'; 

interface GetProductByIdResponse {
  success: boolean;
  data?: Product;
  message?: string;
}

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response<GetProductByIdResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      res.status(400).json({
        success: false,
        message: 'El ID proporcionado debe ser un número válido'
      });
      return; 
    }

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id: productId });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
      return; 
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: unknown) {
    next(error);
  }
};