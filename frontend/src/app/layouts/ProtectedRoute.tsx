import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChatWidget } from "@/features/chat/components/ChatWidget";

export function ProtectedRoute() {
  const { user } = useAuth();
  return user ? (
    <>
      <Outlet />
      <ChatWidget />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
