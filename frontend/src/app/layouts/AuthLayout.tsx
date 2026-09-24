import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/shared/components/ThemeToggle";

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__toolbar">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  );
}
