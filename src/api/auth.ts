import { post } from "@/api/axiosInstance";
import { LoginRequest, AuthResponse } from "@/types/api";

// Register API call

// Login API call
export const loginUser = async (data: LoginRequest): Promise<unknown> => {
  return await post<AuthResponse, LoginRequest>("/auth/login", data);
};
