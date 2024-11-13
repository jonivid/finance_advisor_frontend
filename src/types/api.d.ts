// types/api.d.ts

// Request Payloads
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Response Types
export interface LoginResponse {
  name: string;
  accessToken: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

// Error Type
export interface ApiError {
  message: string;
  statusCode: number;
}
