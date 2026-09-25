import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, CheckCircle, Package, X, Trash2 } from "lucide-react";
import type { Product } from "@/features/dashboard/types/product";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { CartProvider, useCart } from "../hooks/CartContext"; 
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChatWidget } from "@/features/chat/components/ChatWidget";
import { ProductCard } from "@/features/marketplace/components/ProductCard";

// --- COMPONENTE DEL CATÁLOGO (ahora usa el Context) ---
function CatalogContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, cartTotal, cartCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPublicProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data || []);
        }
      } catch (error) {
        console.error("Error al cargar el catálogo", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen transition-colors">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/65 dark:bg-neutral-900/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900 font-bold shadow-sm">
              F
            </div>
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">FormoShop</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-full relative transition-colors duration-150 active:scale-95"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* LISTA DE PRODUCTOS */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 tracking-tight">
            Directo del productor a tu mesa
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Descubrí productos frescos y locales. Buscá el sello PAIPPA para garantizar la compra directa a familias productoras de Formosa.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Buscar verduras, miel, quesos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 focus:border-black/20 dark:focus:border-white/20 focus:ring-0 outline-none transition-all duration-150"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-neutral-500">Cargando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAction={() => addToCart(product)} 
                actionLabel="Agregar" 
              />
            ))}
          </div>
        )}
      </main>

      {/* MODAL / DRAWER DEL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white/75 dark:bg-neutral-950/70 backdrop-blur-2xl backdrop-saturate-150 h-full shadow-2xl flex flex-col border-l border-white/40 dark:border-white/10 animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <ShoppingCart size={20} /> Mi Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors duration-150 active:scale-95">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">{item.title}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-emerald-600 dark:text-emerald-400 font-medium">${Number(item.price).toFixed(2)} x {item.quantity}</p>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1 hover:bg-red-500/10 rounded-lg transition-colors duration-150 active:scale-95">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-black/5 dark:border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-500 font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => alert("¡Simulación de Checkout Exitosa! En una app real, acá se abriría Mercado Pago o se guardaría la orden.")}
                className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-lg transition-all duration-150 active:scale-[0.98] shadow-sm"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
      {user?.role === "CLIENT" && <ChatWidget />}
    </div>
  );
}

// Exportamos el componente envuelto en el Provider para que funcione el contexto
export function PublicCatalog() {
  return (
    <CartProvider>
      <CatalogContent />
    </CartProvider>
  );
}
