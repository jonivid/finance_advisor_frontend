import axios, { AxiosRequestConfig } from "axios";

import { ApiError } from "@/types/api";

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get the token from sessionStorage
const getToken = (): string | null => sessionStorage.getItem("token");

// Request interceptor to add the Authorization header if a token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Generic GET request
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Generic POST request
export const post = async <T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Error handling function
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const apiError: ApiError = {
      message: error.response?.data?.message || "An unexpected error occurred",
      statusCode: error.response?.status || 500,
    };
    throw apiError;
  } else {
    throw new Error("An unknown error occurred");
  }
};
