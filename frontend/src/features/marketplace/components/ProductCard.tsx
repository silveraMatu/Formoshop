import { ArrowRight, Leaf, MapPin } from "lucide-react";

export interface Product {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  onAction?: (id: string | number) => void;
  actionLabel?: string;
}

export function ProductCard({ 
  product, 
  onAction,
  actionLabel = "Ver detalles" 
}: ProductCardProps) {
  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/5 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100"
            >
              {tag.toLowerCase().includes('agro') ? <Leaf size={12} className="text-emerald-500" /> : <MapPin size={12} className="text-blue-500" />}
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">
            ${product.price.toLocaleString('es-AR')}
          </span>
          
          <button 
            onClick={() => onAction?.(product.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium transition-all duration-300 ease-out hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95"
          >
            {actionLabel}
            <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
