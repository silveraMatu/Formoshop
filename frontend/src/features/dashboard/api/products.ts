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