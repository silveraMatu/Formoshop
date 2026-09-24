import { useState } from "react";
import { loginUser } from "../api";
import { useAuth } from "./useAuth";
import type { LoginDTO } from "../types";

export function useLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: LoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(data);
      login(res);
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
