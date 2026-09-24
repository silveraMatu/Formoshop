import { apiClient } from "@/lib/api-client";
import type { AuthResponse, LoginDTO, RegisterDTO } from "../types";

export async function loginUser(data: LoginDTO): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function registerUser(data: RegisterDTO): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>("/auth/register", data);
  return res.data;
}
