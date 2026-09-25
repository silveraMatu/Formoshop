import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Wand2, 
  Settings, 
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Panel Principal", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Inventario", icon: Package, path: "/inventory" },
    { name: "Generar Producto (IA)", icon: Wand2, path: "/generate", highlight: true },
    { name: "Configuración", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl glass-surface text-neutral-800 dark:text-neutral-100 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200 ease-out active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 flex flex-col transition-all duration-300 ease-out z-40 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl backdrop-saturate-150 border-r border-black/5 dark:border-white/10 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xl shadow-sm">
            F
          </div>
          <span className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">Formoshop</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-150 ease-out ${
                  isActive 
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm" 
                    : item.highlight 
                      ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/15"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon 
                  size={22} 
                  className={`transition-transform duration-300 ease-out group-hover:scale-110 group-hover:translate-x-0.5 ${
                    item.highlight && !isActive ? "text-indigo-600" : ""
                  }`} 
                />
                <span className="font-medium transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/10">
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 ease-out group active:scale-[0.98]">
            <LogOut size={22} className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
