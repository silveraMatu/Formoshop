export type UserRole = "CLIENT" | "PRODUCER" | "ADMIN";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: Extract<UserRole, "CLIENT" | "PRODUCER">;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isPaippaVerified?: boolean;
  };
}

export interface BackendAuthResponse {
  status?: string;
  statusCode?: number;
  status_code?: number;
  message: string;
  data: AuthResponse["user"];
}
