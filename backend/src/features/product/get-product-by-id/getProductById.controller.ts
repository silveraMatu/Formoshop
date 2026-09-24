import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../shared/db/index.ts'; //
import { Product } from '../../../shared/db/entity/Product/product.ts'; //[cite: 2]

// Tipamos la respuesta. Data y message son opcionales porque dependen de si se encuentra el producto.
interface GetProductByIdResponse {
  success: boolean;
  data?: Product;
  message?: string;
}

// Tipamos req.params para que TypeScript sepa que recibimos un 'id' de tipo string
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

    // Buscamos un único producto que coincida con el ID
    const product = await productRepository.findOneBy({ id: productId });

    // Si no existe, cortamos la ejecución y enviamos un 404
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
      return; 
    }

    // Si existe, devolvemos el producto
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error: unknown) {
    next(error);
  }
};