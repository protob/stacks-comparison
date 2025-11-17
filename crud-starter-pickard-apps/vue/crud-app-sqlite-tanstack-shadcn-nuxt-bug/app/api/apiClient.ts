import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '@/types';

// In a real app, this would come from an environment variable
const API_URL_BASE = 'http://localhost:3000/api';

export const apiClient = ofetch.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  async onResponseError({ response }) {
    console.error('API Error:', response.status, response._data);
  },
});

const unwrapResult = async <T>(resultPromise: Promise<T>): Promise<T> => {
  try {
    const result = await resultPromise;
    // The actual data is often nested in a 'data' property in standardized APIs
    return (result as any).data || result;
  } catch (error: any) {
    const message = error.data?.message || error.message || 'An unknown error occurred';
    const newError = new Error(message);
    (newError as any).statusCode = error.response?.status || 500;
    (newError as any).details = error.data?.details;
    throw newError;
  }
};

export const get = <T>(endpoint: string) =>
  unwrapResult(apiClient.get<T>(endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(apiClient.post<TResponse>(endpoint, { body: data }));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(apiClient.patch<TResponse>(endpoint, { body: data }));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(apiClient.delete<TResponse>(endpoint));