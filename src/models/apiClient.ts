import { TApiClientResult } from 'types/apiClient.types';

export class ApiClient {
    private constructor() {}

    private static baseUrl = process.env.API_URL || 'http://localhost:3000';
    private static isDev = process.env.NODE_ENV === 'development';

    private static getApiKey(): string {
        return process.env.API_KEY || '';
    }

    static getBaseHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: ApiClient.getApiKey(),
        };
    }

    static async request<T>(
        url: string,
        options?: RequestInit,
    ): TApiClientResult<T> {
        const { headers = ApiClient.getBaseHeaders(), ...rest } = options || {};

        const response = await fetch(`${ApiClient.baseUrl}${url}`, {
            headers,
            ...rest,
        });
        const result = await response.json();

        console.log('result', result);

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
}
