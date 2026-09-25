export type ProductStatus = "Disponible" | "Agotado";

export interface Product {
  id: number;
  image?: string | null;
  title: string;
  price: number;
  status: ProductStatus;
  stock: number;
  description?: string | null;
  tag?: string[] | null;
  ubicacion: string;
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  isPaippa?: boolean; // <-- Listo el error
}

export interface CreateProductInput {
  image?: string;
  title: string;
  price: number;
  status: ProductStatus;
  stock: number;
  description?: string;
  tag?: string[];
  ubicacion: string;
  lat?: number;
  lng?: number;
  address?: string;
  isPaippa?: boolean; // <-- Para el formulario de carga
}

export interface ProductListResponse {
  success: boolean;
  data: Product[];
}

export interface ProductMutationResponse {
  status: string;
  status_code: number;
  message: string;
  data: Product;
}
