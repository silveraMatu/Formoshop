import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/components/Button";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50 dark:bg-neutral-900">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        Hola, {user?.name}
      </h1>
      <p className="text-sm text-neutral-500">{user?.email}</p>
      <div className="w-40">
        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
