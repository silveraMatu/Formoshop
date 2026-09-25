import { useState } from "react";
import { ArrowRight, Leaf, MapPin, Package, CheckCircle, Pencil, Trash2 } from "lucide-react";
import { ProductDetailsModal } from "./ProductDetailsModal";

export interface BaseProduct {
  id: string | number;
  title: string;
  price: number;
  imageUrl?: string | null;
  image?: string | null;
  tags?: string[] | null;
  tag?: string[] | null;
  isPaippa?: boolean;
  status?: string;
  stock?: number;
  ubicacion?: string;
  description?: string | null;
  lat?: number | null;
  lng?: number | null;
}

interface ProductCardProps {
  product: BaseProduct;
  onAction?: (id: string | number) => void;
  actionLabel?: string;
  hideAction?: boolean;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export function ProductCard({ 
  product, 
  onAction,
  actionLabel = "Ver detalles",
  hideAction = false,
  onEdit,
  onDelete
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const imgSrc = product.imageUrl || product.image;
  const tagsList = product.tags || product.tag || [];
  
  return (
    <>
      <article 
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/90 dark:hover:border-white/20 hover:bg-white/70 dark:hover:bg-neutral-800/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col h-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100/60 dark:bg-neutral-800/60 rounded-xl m-2 flex items-center justify-center">
          {imgSrc ? (
            <img 
              src={imgSrc} 
              alt={product.title} 
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <Package size={40} className="text-neutral-300 dark:text-neutral-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-xl" />
          
          {product.isPaippa && (
            <div className="absolute top-2 left-2 bg-black/5 dark:bg-white/10 backdrop-blur-sm text-emerald-700 dark:text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
              <CheckCircle size={12} />
              Feria PAIPPA
            </div>
          )}

          {product.status && (
            <div className={`absolute top-2 right-2 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full border ${product.status === "Disponible" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20" : "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20"}`}>
              {product.status}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tagsList.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/10"
                >
                  {tag.toLowerCase().includes('agro') ? <Leaf size={10} className="text-emerald-500" /> : <MapPin size={10} className="text-blue-500" />}
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-1 leading-tight line-clamp-2">
            {product.title}
          </h3>

          {product.stock !== undefined && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Stock: <span className="font-medium text-neutral-700 dark:text-neutral-300">{product.stock}</span>
            </p>
          )}
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              ${Number(product.price).toFixed(2)}
            </span>
            
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(product.id);
                  }}
                  className="p-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <Pencil size={18} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product.id);
                  }}
                  className="p-1.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
              {!hideAction && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction?.(product.id);
                  }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium transition-all duration-150 ease-out hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.97] shadow-sm"
                >
                  {actionLabel}
                  <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      
      {isModalOpen && (
        <ProductDetailsModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
