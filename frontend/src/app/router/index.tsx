import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../layouts/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { AdminDashboard } from "@/features/admin/pages/AdminDashboard";
import { PublicCatalog } from "@/features/dashboard/pages/PublicCatalog"; 
import { LandingPage } from "@/features/landing/pages/LandingPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/catalogo", element: <PublicCatalog /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/dashboard", element: <DashboardPage /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["PRODUCER", "ADMIN"]} />,
    children: [{ path: "/generate", element: <DashboardPage /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ path: "/admin", element: <AdminDashboard /> }],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
