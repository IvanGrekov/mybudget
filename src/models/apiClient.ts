import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { getCookie } from 'utils/getCookie';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

export class ApiClient {
    private constructor() {}

    static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    private static getApiKey(): string {
        return process.env.NEXT_PUBLIC_API_KEY || '';
    }

    private static getAccessToken(): string {
        if (typeof document !== 'undefined') {
            return getCookie(SESSION_COOKIE_NAME) || '';
        }

        return cookies().get(SESSION_COOKIE_NAME)?.value || '';
    }

    static getBaseHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.getAccessToken()}`,
        };
    }

    private static async request<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        const { headers = ApiClient.getBaseHeaders(), ...rest } = options || {};

        const response = await fetch(`${ApiClient.baseUrl}${url}`, {
            headers,
            ...rest,
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(getFailedResponseMessage(result));
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
        data: unknown,
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
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return ApiClient.request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}
