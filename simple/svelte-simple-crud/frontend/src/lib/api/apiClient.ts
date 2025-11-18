// src/lib/api/apiClient.ts
import { PUBLIC_API_BASE } from '$env/static/public';

// Fallback for dev if env is missing
const API_URL_BASE = PUBLIC_API_BASE || 'http://localhost:3000/api';

type Result<T, E = string> =
	| { success: true; data: T }
	| { success: false; error: E };

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
	message: string;
	statusCode: number;
	details?: any;
}

export const createApiError = (message: string, statusCode = 500, details?: any): ApiErrorData => ({
	message,
	statusCode,
	...(details ? { details } : {})
});

export const isApiError = (error: any): error is ApiErrorData =>
	typeof error?.message === 'string' && typeof error?.statusCode === 'number';

const request = async <T>(
	method: string,
	endpoint: string,
	body?: any
): Promise<Result<T, ApiErrorData>> => {
	try {
		const response = await fetch(`${API_URL_BASE}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		if (!response.ok) {
			let message = `Request failed with status ${response.status}`;
			try {
				const errorData = await response.json();
				if (errorData && typeof errorData === 'object' && typeof errorData.message === 'string') {
					message = errorData.message;
				}
			} catch {
				// ignore JSON parse errors for error responses
			}
			return failure(createApiError(message, response.status));
		}

		const data = await response.json();
		// Support both { data } envelope and raw payload
		return success(data?.data ?? data);
	} catch (error: any) {
		return failure(
			createApiError(error?.message ?? 'Network request failed', 503, {
				originalError: error
			})
		);
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

export const get = <T>(endpoint: string) => unwrapResult<T>(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
	unwrapResult<TResponse>(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
	unwrapResult<TResponse>(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
	unwrapResult<TResponse>(request<TResponse>('DELETE', endpoint));

export const api = {
	get,
	post,
	patch,
	delete: del
};