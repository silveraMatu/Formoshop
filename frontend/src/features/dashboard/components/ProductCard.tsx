import { MapPin, Package } from "lucide-react";
import type { Product } from "../types/product";
// Importamos el sello (ajustá los ../ si este archivo está muy profundo en las carpetas)
import { PaippaBadge } from "../../auth/components/PaippaBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      {product.image ? (
        <img src={product.image} alt={product.title} className="product-card__image" />
      ) : (
        <div className="product-card__image product-card__image--empty"><Package size={28} /></div>
      )}
      <div className="product-card__body">
        <div className="product-card__heading">
          <h3>{product.title}</h3>
          <span className={`product-card__status product-card__status--${product.status === "Disponible" ? "available" : "sold-out"}`}>
            {product.status}
          </span>
        </div>
        
        {/* ACÁ AGREGAMOS EL SELLO PAIPPA */}
        <div className="mb-2">
          {/* Le pasamos true para forzar que aparezca y veas cómo queda */}
              <PaippaBadge isVerified={product.isPaippa} />
        </div>

        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <div className="product-card__meta">
          <span>Stock: {product.stock}</span>
          <span><MapPin size={14} />{product.ubicacion}</span>
        </div>
        {product.description && <p className="product-card__description">{product.description}</p>}
      </div>
    </article>
  );
}
