import type { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../shared/db/index.ts';
import { Product } from '../../../shared/db/entity/Product/product.ts';
import { updateProductSchema } from '../create-products/createProduct.schema.ts';
import { z } from 'zod';

export const updateProductController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log("UPDATE PRODUCT CALLED! params:", req.params, "body:", req.body);
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
      res.status(403).json({ success: false, message: 'No tienes permisos para editar este producto' });
      return;
    }

    const validatedData = updateProductSchema.parse(req.body);
   
    Object.assign(product, validatedData);
    

    await productRepo.save(product);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error });
      return;
    }
    next(error);
  }
};
