import { TAsyncApiClientResult } from 'types/apiClient.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

export abstract class BaseApiClient {
    baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    constructor(private getAccessToken: () => string) {}

    // private getApiKey(): string {
    //     return process.env.NEXT_PUBLIC_API_KEY || '';
    // }

    private getBaseHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.getAccessToken()}`,
        };
    }

    private async request<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        const { headers = this.getBaseHeaders(), ...rest } = options || {};

        const response = await fetch(`${this.baseUrl}${url}`, {
            headers,
            ...rest,
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(getFailedResponseMessage(result));
        }

        return result;
    }

    async get<T>(url: string, options?: RequestInit): TAsyncApiClientResult<T> {
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    async post<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async patch<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}
