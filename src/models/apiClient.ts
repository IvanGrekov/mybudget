import { TAsyncApiClientResult } from 'types/apiClient.types';

export class ApiClient {
    private constructor() {}

    private static baseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    ): TAsyncApiClientResult<T> {
        const { headers = ApiClient.getBaseHeaders(), ...rest } = options || {};

        // eslint-disable-next-line no-console
        console.log(`${ApiClient.baseUrl}${url}`, `${ApiClient.baseUrl}${url}`);

        const response = await fetch(`${ApiClient.baseUrl}${url}`, {
            headers,
            ...rest,
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    }

    static async get<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return ApiClient.request<T>(url, { ...options, method: 'GET' });
    }

    static async post<T>(
        url: string,
        data: Record<string, unknown>,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
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
    ): TAsyncApiClientResult<T> {
        return ApiClient.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}
