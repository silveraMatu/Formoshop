import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../layouts/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
// 1. Usamos el alias @/ igual que en las otras importaciones
import { AdminDashboard } from "@/features/admin/pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    // Metemos la ruta del admin adentro de las protegidas para que pida login
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      // 2. Formato de objeto, sin la etiqueta <Route>
      { path: "/admin", element: <AdminDashboard /> },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);