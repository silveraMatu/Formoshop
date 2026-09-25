import { apiClient } from "@/lib/api-client";
import type {
  CreateProductInput,
  Product,
  ProductListResponse,
  ProductMutationResponse,
} from "../types/product";

export async function getProductsByOwner(name?: string): Promise<Product[]> {
  const response = await apiClient.get<ProductListResponse>("/products/owner", {
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

export async function updateProduct(
  id: string | number,
  input: Partial<CreateProductInput>,
): Promise<Product> {
  const response = await apiClient.patch<{ success: boolean, data: Product }>(
    `/products/${id}`,
    input,
  );
  return response.data.data;
}

export async function deleteProduct(id: string | number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}

// --- NUEVA INTEGRACION ---

export interface AIProductMetadataResponse {
  tituloSugerido?: string;
  descripcionSugerida?: string;
  precioEstimado?: number | string;
  categoriaSugerida?: string;
  etiquetas?: string[];
}

export async function generateProductMetadata(
  imagenBase64: string
): Promise<AIProductMetadataResponse> {
  const response = await apiClient.post<AIProductMetadataResponse>(
    "/products/generate-metadata", 
    { imagenBase64 }
  );
  return response.data;
}