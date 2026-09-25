import { PackageSearch } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function ProductGrid({ products, loading, error }: ProductGridProps) {
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

  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
