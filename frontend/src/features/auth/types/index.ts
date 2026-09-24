export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: { id: number; name: string; email: string };
}

export interface BackendAuthResponse {
  status?: string;
  statusCode?: number;
  status_code?: number;
  message: string;
  data: AuthResponse["user"];
}
