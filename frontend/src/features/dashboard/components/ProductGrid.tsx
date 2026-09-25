import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/features/marketplace/components/ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export function ProductGrid({ products, loading, error, onEdit, onDelete }: ProductGridProps) {
  if (loading) return <p className="dashboard-catalog__feedback">Cargando productos...</p>;
  if (error) return <p className="dashboard-catalog__feedback dashboard-catalog__feedback--error">{error}</p>;
  if (!products.length) {
    return (
      <div className="dashboard-catalog__empty">
        <PackageSearch size={34} />
        <p>Todavía no hay productos cargados.</p>
        <span>Usá Agregar para crear el primero.</span>
      </div>
    );
  }

  return (
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          hideAction={true} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
