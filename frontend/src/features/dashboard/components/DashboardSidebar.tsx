import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`dashboard-sidebar${isMenuOpen ? " dashboard-sidebar--menu-open" : ""}`}
    >
      <div className="dashboard-profile">
        <div className="dashboard-profile__avatar">
          <UserRound size={21} strokeWidth={1.8} />
        </div>
        <span className="dashboard-profile__name">
          {user?.name ?? "Usuario"}
        </span>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Navegación principal">
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="dashboard-icon-button"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="dashboard-menu-panel">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="dashboard-sidebar__logout"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </aside>
  );
}