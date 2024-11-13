import { post } from "@/api/axiosInstance";
import { RegisterRequest,  AuthResponse } from "@/types/api";

// Fetch user profile API call
export const registerUser = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  return await post<AuthResponse, RegisterRequest>("/user/register", data);
};