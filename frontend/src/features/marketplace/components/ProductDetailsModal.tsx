import { useState } from "react";
import { X, MapPin, Package, CheckCircle, Leaf, TrendingDown } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import type { BaseProduct } from "./ProductCard";
import { PriceComparatorModal } from "./PriceComparatorModal";

interface ProductDetailsModalProps {
  product: BaseProduct;
  onClose: () => void;
}

const markerIcon = L.divIcon({
  className: "formoshop-marker",
  html: `
    <span style="
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:9999px;
      background:#08a8e8;color:#fff;
      box-shadow:0 4px 12px rgba(8,168,232,0.45);
      border:2px solid #fff;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </span>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [showComparator, setShowComparator] = useState(false);
  const imgSrc = product.imageUrl || product.image;
  const tagsList = product.tags || product.tag || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-white/10 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col max-h-full overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/10">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 px-2">Detalles del producto</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Left: Image */}
            <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-neutral-100/60 dark:bg-neutral-800/60 flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 relative shrink-0">
              {imgSrc ? (
                <img 
                  src={imgSrc} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package size={48} className="text-neutral-300 dark:text-neutral-600" />
              )}
              {product.isPaippa && (
                <div className="absolute top-3 left-3 bg-black/5 dark:bg-white/10 backdrop-blur-sm text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                  <CheckCircle size={14} />
                  Feria PAIPPA
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col flex-1 gap-4">
              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/10"
                    >
                      {tag.toLowerCase().includes('agro') ? <Leaf size={12} className="text-emerald-500" /> : <MapPin size={12} className="text-blue-500" />}
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                {product.title}
              </h3>
              
              <div className="flex items-end gap-3 border-b border-black/5 dark:border-white/10 pb-4 flex-wrap">
                <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.status && (
                  <span className={`text-sm font-medium px-2.5 py-1 rounded-full border mb-1 ${product.status === "Disponible" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20" : "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20"}`}>
                    {product.status}
                  </span>
                )}
                
                <button
                  onClick={() => setShowComparator(true)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-500/20 transition-colors"
                >
                  <TrendingDown size={14} />
                  Comparar precios
                </button>
              </div>

              {product.stock !== undefined && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <Package size={16} />
                  <span>Stock disponible: <strong className="text-neutral-900 dark:text-white">{product.stock}</strong></span>
                </div>
              )}

              {/* Description */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Descripción</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
                  {product.description || "Este producto no tiene descripción."}
                </p>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              Ubicación
            </h4>
            
            {product.ubicacion && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {product.ubicacion}
              </p>
            )}

            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 mt-2">
              {(product.lat && product.lng) ? (
                <MapContainer
                  center={[product.lat, product.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[product.lat, product.lng]} icon={markerIcon} />
                </MapContainer>
              ) : (
                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm text-neutral-500">
                  Ubicación exacta no disponible
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      {showComparator && (
        <PriceComparatorModal 
          product={product} 
          onClose={() => setShowComparator(false)} 
        />
      )}
    </div>
  );
}
