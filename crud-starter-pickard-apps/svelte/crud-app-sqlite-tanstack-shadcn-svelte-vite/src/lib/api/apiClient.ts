// src/lib/api/apiClient.ts
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '$lib/types';

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

const success = <T>(data: T): Result<T, ApiErrorData> => ({
  success: true,
  data,
});

const failure = (error: ApiErrorData): Result<any, ApiErrorData> => ({
  success: false,
  error,
});

const createApiError = (message: string, statusCode: number): ApiErrorData => ({
  message,
  statusCode,
});

const request = async <T>(
  method: string,
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await apiClient.raw(endpoint, {
      method,
      body: body ? body : undefined,
    });

    const data = response._data;
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    const statusCode = error.response?.status || 503;
    const message = error.data?.message || error.message || 'Network request failed';
    return failure(createApiError(message, statusCode));
  }
};

const unwrapResult = async <T>(resultPromise: Promise<Result<T, ApiErrorData>>): Promise<T> => {
  const result = await resultPromise;
  if (!result.success) {
    const error = new Error(result.error.message);
    (error as any).statusCode = result.error.statusCode;
    (error as any).details = result.error.details;
    throw error;
  }
  return result.data;
};

export const get = <T>(endpoint: string) =>
  unwrapResult(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };