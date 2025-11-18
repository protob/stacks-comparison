import { ofetch } from "ofetch";
import type { ApiResponse } from "~/types";

const API_URL_BASE = "http://localhost:3000/api";

export const apiClient = ofetch.create({
  baseURL: API_URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  async onResponseError(context) {
    console.error("API Error:", context.response?.status, context.response?.statusText);
  },
});

// Unwrap the API response to extract data
export async function get<T>(endpoint: string): Promise<T> {
  const response = await apiClient<ApiResponse<T>>(endpoint);
  return response.data;
}

export async function post<T, V>(endpoint: string, data: V): Promise<T> {
  const response = await apiClient<ApiResponse<T>>(endpoint, {
    method: "POST",
    body: data,
  });
  return response.data;
}

export async function patch<T, V>(endpoint: string, data: V): Promise<T> {
  const response = await apiClient<ApiResponse<T>>(endpoint, {
    method: "PATCH",
    body: data,
  });
  return response.data;
}

export async function del<T>(endpoint: string): Promise<T> {
  const response = await apiClient<ApiResponse<T>>(endpoint, {
    method: "DELETE",
  });
  return response.data;
}
