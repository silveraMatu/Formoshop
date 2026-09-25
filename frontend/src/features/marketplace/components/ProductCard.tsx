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
    <article className="group relative bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/70 dark:hover:bg-neutral-800/60 hover:shadow-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100/60 dark:bg-neutral-800/60 rounded-xl m-2">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-xl" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/10"
            >
              {tag.toLowerCase().includes('agro') ? <Leaf size={12} className="text-emerald-500" /> : <MapPin size={12} className="text-blue-500" />}
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2 leading-tight line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            ${product.price.toLocaleString('es-AR')}
          </span>
          
          <button 
            onClick={() => onAction?.(product.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium transition-all duration-150 ease-out hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98] shadow-sm"
          >
            {actionLabel}
            <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
