import { useState, useEffect } from "react";
import { X, TrendingDown, Package, MapPin } from "lucide-react";
import type { BaseProduct } from "./ProductCard";

interface PriceComparatorModalProps {
  product: BaseProduct;
  onClose: () => void;
}

export function PriceComparatorModal({ product, onClose }: PriceComparatorModalProps) {
  const [allProducts, setAllProducts] = useState<BaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data.data || []);
        }
      } catch (error) {
        console.error("Error al cargar productos para comparar", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const similarProducts = allProducts.filter(p => {
    if (!p.title || !product.title) return false;
    const word = product.title.toLowerCase().split(' ')[0];
    return p.title.toLowerCase().includes(word) && p.id !== product.id;
  }).sort((a, b) => Number(a.price) - Number(b.price));

  const allCompared = [product, ...similarProducts].sort((a, b) => Number(a.price) - Number(b.price));
  const lowestPrice = allCompared.length > 0 ? Number(allCompared[0].price) : Number(product.price);
  const isLowest = Number(product.price) <= lowestPrice;
  const difference = Number(product.price) - lowestPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <TrendingDown size={20} className="text-emerald-500" />
            Comparador de Precios
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
              <p className="text-neutral-500">Buscando los mejores precios...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-1 leading-tight">
                  {product.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Analizamos {similarProducts.length} producto(s) similar(es) en nuestra plataforma.
                </p>
              </div>

          {/* Stats Box */}
          <div className={`p-5 rounded-2xl border mb-6 ${isLowest ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm font-medium mb-1 ${isLowest ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                  {isLowest ? '¡Excelente precio!' : 'Hay opciones más económicas'}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {!isLowest && (
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1 line-through">
                      Estás pagando ${difference.toFixed(2)} extra
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Mejor precio del mercado</p>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${lowestPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* List of similar products */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-3">
              Opciones disponibles
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {allCompared.map((p) => (
                <div key={p.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${p.id === product.id ? 'bg-blue-500/5 border-blue-500/20' : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10'}`}>
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden">
                    {p.imageUrl || p.image ? (
                      <img src={p.imageUrl || p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={20} className="text-neutral-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 truncate">
                      {p.title} {p.id === product.id && '(Este)'}
                    </p>
                    {p.ubicacion && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin size={10} className="shrink-0" />
                        {p.ubicacion}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                      ${Number(p.price).toFixed(2)}
                    </p>
                    {Number(p.price) === lowestPrice && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Mejor
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
