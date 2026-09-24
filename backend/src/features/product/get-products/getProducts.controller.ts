import type { Request, Response, NextFunction } from 'express';
import { ILike, type FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../../shared/db/index.ts'; 
import { Product } from '../../../shared/db/entity/Product/product.ts';

interface GetProductsResponse {
  success: boolean;
  data: Product[];
}

// 1. Tipamos req.query para aceptar 'name' como opcional
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

    // 2. Tipamos la condición de búsqueda de TypeORM
    const whereCondition: FindOptionsWhere<Product> = {};

    // 3. Si el cliente envió un nombre en la URL, agregamos el filtro
    if (name) {
      // ILike(`%${name}%`) busca coincidencias parciales sin importar mayúsculas
      whereCondition.title = ILike(`%${name}%`);
    }

    // 4. Ejecutamos la consulta pasándole la condición
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