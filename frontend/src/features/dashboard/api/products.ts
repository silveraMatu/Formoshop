import { apiClient } from "@/lib/api-client";
import type {
  CreateProductInput,
  Product,
  ProductListResponse,
  ProductMutationResponse,
} from "../types/product";

export async function getProducts(name?: string): Promise<Product[]> {
  const response = await apiClient.get<ProductListResponse>("/products", {
    params: name ? { name } : undefined,
  });
  return response.data.data;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<Product> {
  const response = await apiClient.post<ProductMutationResponse>(
    "/products",
    input,
  );
  return response.data.data;
}
