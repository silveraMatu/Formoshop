import { useState, useEffect } from "react";
import { AppShell } from "../../../shared/components/layout/AppShell";
import { ProductGrid } from "../components/ProductGrid";
import { ProductCard, Product } from "../components/ProductCard";
import { ProductSkeleton } from "../components/ProductSkeleton";

// Datos de ejemplo para la demo
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Frasco de Miel Pura de Monte",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=600",
    tags: ["Agroecológico", "Formosa Capital"]
  },
  {
    id: "2",
    title: "Cajón de Cebollas Tempranas",
    price: 8900,
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600",
    tags: ["PAIPPA", "Laguna Naineck"]
  },
  {
    id: "3",
    title: "Mermelada Artesanal de Mango",
    price: 3200,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600",
    tags: ["Artesanal", "Herradura"]
  },
  {
    id: "4",
    title: "Dulce de Mamón en Almíbar",
    price: 3800,
    imageUrl: "https://images.unsplash.com/photo-1605197584547-c917ee7b24b6?auto=format&fit=crop&q=80&w=600",
    tags: ["Tradicional", "Clorinda"]
  }
];

export function MarketplaceDemo() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulamos una carga desde el backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Descubrí Formosa
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Explora los mejores productos agrícolas y artesanales de la región, directos del productor a tu mesa.
        </p>
      </div>

      <ProductGrid>
        {isLoading
          ? // Mostramos 4 skeletons mientras "carga"
            Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          : // Mostramos los productos reales
            MOCK_PRODUCTS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAction={(id) => console.log("Ver producto:", id)} 
              />
            ))
        }
      </ProductGrid>
    </AppShell>
  );
}
