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
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-md text-slate-800 hover:bg-slate-50 transition-all duration-300 ease-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-out z-40 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
            F
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">Formoshop</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ease-out ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : item.highlight 
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
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

        <div className="p-4 border-t border-slate-50">
          <button className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 ease-out group">
            <LogOut size={22} className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
