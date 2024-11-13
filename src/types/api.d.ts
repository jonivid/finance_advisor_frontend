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
export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UserProfileResponse {
  userId: string;
  name: string;
  email: string;
  createdAt: string;
}

// Error Type
export interface ApiError {
  message: string;
  statusCode: number;
}
