import { useEffect, useState } from "react";
import { Search, ShoppingCart, CheckCircle, Package, X, Trash2 } from "lucide-react";
import type { Product } from "@/features/dashboard/types/product";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { CartProvider, useCart } from "../hooks/CartContext"; // Ajustá la ruta si lo guardaste en otro lado

// --- COMPONENTE DEL CATÁLOGO (ahora usa el Context) ---
function CatalogContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, cartTotal, cartCount } = useCart();

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
      {/* HEADER */}
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="text-xl font-bold text-neutral-900 dark:text-white">FormoShop</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full relative"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-neutral-800">
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
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
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
              className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-neutral-500">Cargando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <article key={product.id} className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-48 bg-neutral-100 dark:bg-neutral-700 relative overflow-hidden flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <Package size={40} className="text-neutral-300 dark:text-neutral-600" />
                  )}
                  {product.isPaippa && (
                    <div className="absolute top-2 left-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <CheckCircle size={12} />
                      Feria PAIPPA
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-1 leading-tight">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-bold text-xl text-neutral-900 dark:text-white">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* MODAL / DRAWER DEL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <ShoppingCart size={20} /> Mi Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full">
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
                    <div key={item.id} className="flex gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700">
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-green-600 font-medium">${Number(item.price).toFixed(2)} x {item.quantity}</p>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-500 font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => alert("¡Simulación de Checkout Exitosa! En una app real, acá se abriría Mercado Pago o se guardaría la orden.")}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-green-600/20"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
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