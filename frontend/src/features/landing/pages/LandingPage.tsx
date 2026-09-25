import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
} from "lucide-react";
import { Card } from "@/shared/components/Card";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { ProductCard } from "@/features/marketplace/components/ProductCard";
import type { BaseProduct } from "@/features/marketplace/components/ProductCard";
import heroImage from "@/assets/hero.png";
import { useAuth } from "@/features/auth/hooks/useAuth";

const featuredProducts: BaseProduct[] = [
  {
    id: 1,
    title: "Miel pura de monte",
    price: 4500,
    imageUrl: heroImage,
    tags: ["Agroecológico", "Formosa"],
  },
  {
    id: 2,
    title: "Queso artesanal de cabra",
    price: 6200,
    imageUrl: heroImage,
    tags: ["Agroecológico", "Local"],
  },
  {
    id: 3,
    title: "Cajón de verduras de estación",
    price: 3800,
    imageUrl: heroImage,
    tags: ["Fresco", "Formosa"],
  },
  {
    id: 4,
    title: "Dulce de mamón casero",
    price: 2900,
    imageUrl: heroImage,
    tags: ["Artesanal", "Local"],
  },
];

const benefits = [
  {
    icon: Sprout,
    title: "Frescura garantizada",
    description:
      "Productos cosechados y despachados en el día, directo del campo a tu mesa sin intermediarios.",
  },
  {
    icon: BadgeCheck,
    title: "Comercio justo",
    description:
      "El productor define su precio. Sin comisiones abusivas, sin cadenas largas de intermediarios.",
  },
  {
    icon: Sparkles,
    title: "Asistente con IA",
    description:
      "Cargá una foto de tu producto y nuestra IA completa título, descripción y precio sugerido.",
  },
];

export function LandingPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen antialiased text-neutral-900 dark:text-neutral-50 selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-100">
      {/* NAVBAR FLOTANTE DE CRISTAL */}
      <header className="sticky top-4 z-50 px-4">
        <nav className="max-w-6xl mx-auto bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 dark:border-white/10 rounded-full px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold shadow-sm">
              F
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">
              Formoshop
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <a
              href="#catalogo"
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Catálogo
            </a>
            <a
              href="#caracteristicas"
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Características
            </a>
            <a
              href="#productores"
              className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Productores
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            {user ? (
              <button
                onClick={logout}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150 active:scale-[0.97]"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 active:scale-[0.97]"
              >
                Iniciar sesión
              </Link>
            )}
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all duration-150 active:scale-[0.97]"
            >
              Ver catálogo
              <ArrowRight size={14} />
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative px-4 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] text-neutral-700 dark:text-neutral-200">
            <Leaf size={14} className="text-emerald-500" />
            Productos locales directo del productor
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="block text-neutral-900 dark:text-neutral-50">
              Del formoseño
            </span>
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-500 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
              directo a tus manos
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Formoshop conecta a familias productoras de Formosa con consumidores
            locales. Comercio justo y frescura garantizada
            en cada producto.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all duration-150 active:scale-[0.97] w-full sm:w-auto"
            >
              Explorar catálogo
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 transition-all duration-150 active:scale-[0.97] w-full sm:w-auto"
            >
              Soy productor
            </Link>
          </div>

          {/* MOCKUP VENTANA macOS */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="rounded-3xl overflow-hidden bg-white/75 dark:bg-neutral-950/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              
              
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID DE BENEFICIOS */}
      <section id="caracteristicas" className="px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              Por qué Formoshop
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Una plataforma pensada para vos
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
              Cada detalle está diseñado para que productores y consumidores
              tengan la mejor experiencia posible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="max-w-none p-8 rounded-3xl hover:-translate-y-1 hover:border-white/90 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5">
                    <Icon
                      size={22}
                      className="text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* FOOTER */}
      <footer className="px-4 py-12 border-t border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-sm">
              F
            </div>
            <span className="font-semibold tracking-tight">Formoshop</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href="#catalogo"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Catálogo
            </a>
            <a
              href="#caracteristicas"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Características
            </a>
            <a
              href="#productores"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
            >
              Productores
            </a>
            {user ? (
              <button
                onClick={logout}
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-150"
              >
                Iniciar sesión
              </Link>
            )}
          </nav>

          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Formoshop. Hecho en Formosa.
          </p>
        </div>
      </footer>
    </div>
  );
}
