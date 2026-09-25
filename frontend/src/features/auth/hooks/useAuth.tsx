import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthResponse } from "../types";

interface AuthCtx {
  user: AuthResponse["user"] | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthResponse["user"];
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (data: AuthResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
