import { TApiClientResult } from 'types/apiClient.types';

export class ApiClient {
    private constructor() {}

    private static baseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    private static isDev = process.env.NODE_ENV === 'development';

    private static getApiKey(): string {
        return process.env.NEXT_PUBLIC_API_KEY || '';
    }

    static getBaseHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: ApiClient.getApiKey(),
        };
    }

    private static async request<T>(
        url: string,
        options?: RequestInit,
    ): TApiClientResult<T> {
        const { headers = ApiClient.getBaseHeaders(), ...rest } = options || {};

        const response = await fetch(`${ApiClient.baseUrl}${url}`, {
            headers,
            ...rest,
        });
        const result = await response.json();

        if (!response.ok) {
            return {
                data: null,
                error: ApiClient.isDev
                    ? result.message
                    : 'Something went wrong',
            };
        }

        return { data: result, error: null };
    }

    static async get<T>(
        url: string,
        options?: RequestInit,
    ): TApiClientResult<T> {
        return ApiClient.request<T>(url, { ...options, method: 'GET' });
    }

    static async post<T>(
        url: string,
        data: Record<string, unknown>,
        options?: RequestInit,
    ): TApiClientResult<T> {
        return ApiClient.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static async patch<T>(
        url: string,
        data: Record<string, unknown>,
        options?: RequestInit,
    ): TApiClientResult<T> {
        return ApiClient.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}
