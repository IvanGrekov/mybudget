import { redirect } from 'next/navigation';

import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { EFetchingTags } from 'types/fetchingTags';
import {
    Account,
    CreateUserDto,
    GeneratedTokensDto,
    InitiateResetPasswordDto,
    ResetPasswordDto,
    TransactionCategory,
    User,
} from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

export abstract class MyBudgetApi {
    constructor(private getAccessToken: () => string) {}

    private getBaseHeaders(): Record<string, string> | null {
        const token = this.getAccessToken();

        if (!token) {
            return null;
        }

        return {
            'Content-Type': 'application/json',
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

        const { headers: optionsHeaders, ...rest } = options || {};

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${url}`,
            {
                headers: {
                    ...baseHeaders,
                    ...optionsHeaders,
                },
                ...rest,
            },
        );
        const result = await response.json();

        if (!response.ok) {
            throw new Error(getFailedResponseMessage(result));
        }

        return result;
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
            body: JSON.stringify(data),
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

    async createUser(
        dto: CreateUserDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return this.post('/authentication/sign-up', dto);
    }

    async resetPassword(
        dto: ResetPasswordDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return this.post('/authentication/reset-password', dto);
    }

    async initiateResetPassword(
        dto: InitiateResetPasswordDto,
    ): TAsyncApiClientResult<void> {
        return this.post('/authentication/initiate-reset-password', dto);
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
