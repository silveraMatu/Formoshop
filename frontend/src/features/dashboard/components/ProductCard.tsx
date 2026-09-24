import { MapPin, Package } from "lucide-react";
import type { Product } from "../types/product";

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
