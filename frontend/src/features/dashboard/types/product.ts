export type ProductStatus = "Disponible" | "Agotado";

export interface Product {
  id: number;
  image?: string | null;
  title: string;
  price: number;
  category: number[];
  status: ProductStatus;
  stock: number;
  description?: string | null;
  tag?: string[] | null;
  ubicacion: string;
}

export interface CreateProductInput {
  image?: string;
  title: string;
  price: number;
  category: number[];
  status: ProductStatus;
  stock: number;
  description?: string;
  tag?: string[];
  ubicacion: string;
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
