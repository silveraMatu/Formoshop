import { UserRound, CheckCircle, Home, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

interface DashboardSidebarProps {
  onAddClick?: () => void;
}

export function DashboardSidebar({ onAddClick }: DashboardSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar flex flex-col justify-between py-6 px-4">
      <div className="flex flex-col gap-8">
        <div className="dashboard-profile flex items-center gap-3">
          <div className="dashboard-profile__avatar w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
            <UserRound size={20} strokeWidth={1.8} className="text-neutral-700 dark:text-neutral-300" />
          </div>
          <div className="flex flex-col">
            <span className="dashboard-profile__name font-semibold text-neutral-900 dark:text-neutral-50 text-sm">
              {user?.name ?? "Usuario"}
            </span>
            {user?.isPaippaVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                <CheckCircle size={10} /> Productor Verificado
              </span>
            )}
          </div>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Navegación principal">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-black/5 dark:text-neutral-400 dark:hover:text-neutral-50 dark:hover:bg-white/10 rounded-xl transition-colors"
          >
            <Home size={18} strokeWidth={2} />
            Inicio
          </button>

          {onAddClick && (
            <button
              type="button"
              onClick={onAddClick}
              className="mt-2 flex items-center gap-3 px-3 py-2.5 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-xl transition-all active:scale-[0.98] shadow-sm"
            >
              <Plus size={18} strokeWidth={2.5} />
              Crear producto
            </button>
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-2 pt-6 border-t border-black/5 dark:border-white/10">
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Apariencia</span>
          <ThemeToggle />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={18} strokeWidth={2} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
