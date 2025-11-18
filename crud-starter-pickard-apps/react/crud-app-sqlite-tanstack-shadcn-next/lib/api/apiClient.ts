const API_URL_BASE = 'http://localhost:3000/api'; // Ensure your backend runs here

type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export const createApiError = (
  message: string, 
  statusCode: number = 500, 
  details?: any
): ApiErrorData => ({
  message,
  statusCode,
  details,
});

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      
      return failure(createApiError(message, response.status));
    }

    const data = await response.json();
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    return failure(createApiError(
      error.message || 'Network request failed',
      503
    ));
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