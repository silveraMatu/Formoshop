import { useState } from "react";
import { registerUser } from "../api";
import { useAuth } from "./useAuth";
import type { RegisterDTO } from "../types";

export function useRegister() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: RegisterDTO) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(data);
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
