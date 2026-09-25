import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../shared/db/index.ts';
import { Product } from '../../../shared/db/entity/Product/product.ts';

export const deleteProductController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    const userId = req.user!.id;

    if (isNaN(productId)) {
      res.status(400).json({ success: false, message: 'El ID proporcionado debe ser un número válido' });
      return;
    }

    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id: productId });

    if (!product) {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
      return;
    }

    if (product.userId !== userId && req.user!.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'No tienes permisos para eliminar este producto' });
      return;
    }

    await productRepo.remove(product);

    res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
