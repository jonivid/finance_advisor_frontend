import { post } from "@/api/axiosInstance";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/api";

// Register API call

// Login API call
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  return await post<LoginResponse, LoginRequest>("/auth/login", data);
};
export const registerUser = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return await post<RegisterResponse, RegisterRequest>("/user/register", data);
};
