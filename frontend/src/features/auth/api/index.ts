import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  BackendAuthResponse,
  LoginDTO,
  RegisterDTO,
} from "../types";

export async function loginUser(data: LoginDTO): Promise<AuthResponse> {
  const res = await apiClient.post<BackendAuthResponse>("/auth/login", data);
  return { token: "", user: res.data.data };
}

export async function registerUser(data: RegisterDTO): Promise<AuthResponse> {
  const res = await apiClient.post<BackendAuthResponse>("/auth/register", data);
  return { token: "", user: res.data.data };
}
