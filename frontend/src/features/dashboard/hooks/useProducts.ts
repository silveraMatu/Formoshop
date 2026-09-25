import { useCallback, useEffect, useState } from "react";
import { createProduct, getProductsByOwner } from "../api/products";
import type { CreateProductInput, Product } from "../types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await getProductsByOwner());
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const addProduct = async (input: CreateProductInput) => {
    const product = await createProduct(input);
    setProducts((currentProducts) => [product, ...currentProducts]);
    return product;
  };

  const editProduct = async (id: string | number, input: Partial<CreateProductInput>) => {
    const { updateProduct } = await import("../api/products");
    const updatedProduct = await updateProduct(id, input);
    setProducts((currentProducts) =>
      currentProducts.map((p) => (p.id === id ? updatedProduct : p))
    );
    return updatedProduct;
  };

  const removeProduct = async (id: string | number) => {
    const { deleteProduct } = await import("../api/products");
    await deleteProduct(id);
    setProducts((currentProducts) => currentProducts.filter((p) => p.id !== id));
  };

  return { products, loading, error, addProduct, editProduct, removeProduct, reload: loadProducts };
}
