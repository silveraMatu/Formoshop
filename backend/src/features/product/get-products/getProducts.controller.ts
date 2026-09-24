import type { Request, Response, NextFunction } from 'express';
// Importas tu conexión de base de datos y la entidad
import { AppDataSource } from '../../../shared/db/index.ts'; 
import { Product } from '../../../shared/db/entity/Product/product.ts';
Product

// Puedes tipar la respuesta reutilizando directamente la entidad Product
interface GetProductsResponse {
  success: boolean;
  data: Product[]; // TypeORM ya provee la forma de tus datos aquí
}

export const getProducts = async (
  req: Request,
  res: Response<GetProductsResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error: unknown) {
    next(error);
  }
};