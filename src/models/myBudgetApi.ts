import { redirect } from 'next/navigation';

import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { EFetchingTags } from 'types/fetchingTags';
import {
    Account,
    InitiateTfaEnablingDtoResult,
    TransactionCategory,
    User,
} from 'types/generated.types';
import { IEditUserArgs, IEditUserCurrencyArgs } from 'types/muBudgetApi.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { makeApiFetch } from 'utils/makeApiFetch';

export abstract class MyBudgetApi {
    constructor(private getAccessToken: () => string, private apiUrl?: string) {
        if (!apiUrl) {
            throw new Error('Api URL is required');
        }
    }

    private getBaseHeaders(): Record<string, string> | null {
        const token = this.getAccessToken();

        if (!token) {
            return null;
        }

        return {
            Authorization: `Bearer ${token}`,
        };
    }

    private async request<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        const baseHeaders = this.getBaseHeaders();

        if (!baseHeaders) {
            return redirect(EAppRoutes.Auth);
        }

        try {
            const { headers: optionsHeaders, ...requestOptions } =
                options || {};

            const response = await makeApiFetch({
                url,
                headers: {
                    ...baseHeaders,
                    ...optionsHeaders,
                },
                requestOptions,
                apiUrl: this.apiUrl,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(getFailedResponseMessage(data));
            }

            return data;
        } catch (error) {
            throw new Error(getFailedResponseMessage(error));
        }
    }

    private async get<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    async post<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async getMe(): TAsyncApiClientResult<User> {
        return this.get('/users/me', {
            next: { tags: [EFetchingTags.ME] },
        });
    }

    async editUser({
        userId,
        ...data
    }: IEditUserArgs): TAsyncApiClientResult<User> {
        return this.patch(`/users/${userId}`, data);
    }

    async editUserCurrency({
        userId,
        ...dto
    }: IEditUserCurrencyArgs): TAsyncApiClientResult<User> {
        return this.patch(`/users/currency/${userId}`, dto);
    }

    async initiateTfaEnabling(
        signal?: AbortSignal,
    ): TAsyncApiClientResult<InitiateTfaEnablingDtoResult> {
        return this.post('/authentication/initiate-tfa-enabling', null, {
            signal,
        });
    }

    async enableTfa(tfaToken: string): TAsyncApiClientResult<void> {
        const baseHeaders = this.getBaseHeaders();

        if (!baseHeaders) {
            throw new Error('Forbidden');
        }

        const response = await makeApiFetch({
            url: '/authentication/enable-tfa',
            headers: baseHeaders,
            body: { tfaToken },
            requestOptions: { method: 'POST' },
            apiUrl: this.apiUrl,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(getFailedResponseMessage(error));
        }
    }

    async disableTfa(tfaToken: string): TAsyncApiClientResult<void> {
        const baseHeaders = this.getBaseHeaders();

        if (!baseHeaders) {
            throw new Error('Forbidden');
        }

        const response = await makeApiFetch({
            url: '/authentication/disable-tfa',
            headers: baseHeaders,
            body: { tfaToken },
            requestOptions: { method: 'POST' },
            apiUrl: this.apiUrl,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(getFailedResponseMessage(error));
        }
    }

    async getAccounts(): TAsyncApiClientResult<Account[]> {
        return this.get('/accounts/my', {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    async getTransactionCategories(): TAsyncApiClientResult<
        TransactionCategory[]
    > {
        return this.get('/transaction-categories/my', {
            next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
        });
    }
}
