import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../layouts/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { AdminDashboard } from "@/features/admin/pages/AdminDashboard";
import { PublicCatalog } from "@/features/dashboard/pages/PublicCatalog"; 

export const router = createBrowserRouter([
  { path: "/", element: <PublicCatalog /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/admin", element: <AdminDashboard /> },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);