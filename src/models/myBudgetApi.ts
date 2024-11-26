import { redirect } from 'next/navigation';

import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'constants/pagination';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { EFetchingTags } from 'types/fetchingTags';
import {
    InitiateTfaEnablingDtoResult,
    User,
    Account,
    AccountStatusEnum,
    TransactionCategory,
    TransactionCategoryStatusEnum,
    Transaction,
    CreateAccountDto,
    CreateTransactionCategoryDto,
    EditAccountDtoStatusEnum,
    EditTransactionCategoryDtoStatusEnum,
} from 'types/generated.types';
import {
    IEditUserArgs,
    IEditUserCurrencyArgs,
    IGetAccountsArgs,
    IReorderAccountArgs,
    IEditAccountCurrency,
    IGetTransactionCategoriesArgs,
    IReorderTransactionCategoriesArgs,
    IEditTransactionCategoryCurrency,
    IGetTransactionsArgs,
} from 'types/muBudgetApi.types';
import { IPaginatedItemsResult } from 'types/paginatedItemsResult';
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
            const {
                headers: optionsHeaders,
                method,
                body,
                ...requestOptions
            } = options || {};

            const response = await makeApiFetch({
                url,
                method,
                body,
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

    private get<T>(
        url: string,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    post<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            // eslint-disable-next-line
            // @ts-ignore
            body: data,
        });
    }

    patch<T>(
        url: string,
        data: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, {
            ...options,
            method: 'PATCH',
            // eslint-disable-next-line
            // @ts-ignore
            body: data,
        });
    }

    delete<T>(
        url: string,
        data?: unknown,
        options?: RequestInit,
    ): TAsyncApiClientResult<T> {
        return this.request<T>(url, {
            ...options,
            method: 'DELETE',
            // eslint-disable-next-line
            // @ts-ignore
            body: data,
        });
    }

    getMe(): TAsyncApiClientResult<User> {
        return this.get('/users/me', {
            next: { tags: [EFetchingTags.ME] },
        });
    }

    editUser({ userId, ...data }: IEditUserArgs): TAsyncApiClientResult<User> {
        return this.patch(`/users/${userId}`, data);
    }

    editUserCurrency({
        userId,
        ...dto
    }: IEditUserCurrencyArgs): TAsyncApiClientResult<User> {
        return this.patch(`/users/currency/${userId}`, dto);
    }

    initiateTfaEnabling(
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

    getAccounts(args?: IGetAccountsArgs): TAsyncApiClientResult<Account[]> {
        const { status = AccountStatusEnum.ACTIVE, type } = args || {};

        let url = `/accounts/my?status=${status}`;
        const tags: string[] = [
            EFetchingTags.ACCOUNTS,
            `${EFetchingTags.ACCOUNTS}-${status}`,
        ];

        if (type) {
            url += `&type=${type}`;
            tags.push(`${EFetchingTags.ACCOUNTS}-${type}`);
        }

        return this.get(url, {
            next: { tags },
        });
    }

    reorderAccount({
        id,
        order,
    }: IReorderAccountArgs): TAsyncApiClientResult<Account[]> {
        return this.patch(`/accounts/reorder/${id}`, {
            order,
        });
    }

    createAccount(dto: CreateAccountDto): TAsyncApiClientResult<Account> {
        return this.post('/accounts', dto);
    }

    archiveAccount(id: number): TAsyncApiClientResult<Account> {
        return this.patch(`/accounts/${id}`, {
            status: EditAccountDtoStatusEnum.ARCHIVED,
        });
    }

    editAccountCurrency({
        id,
        ...dto
    }: IEditAccountCurrency): TAsyncApiClientResult<Account> {
        return this.patch(`/accounts/currency/${id}`, dto);
    }

    deleteAccount(id: number): TAsyncApiClientResult<Account> {
        return this.delete(`/accounts/${id}`);
    }

    getTransactionCategories(
        args?: IGetTransactionCategoriesArgs,
    ): TAsyncApiClientResult<TransactionCategory[]> {
        const { status = TransactionCategoryStatusEnum.ACTIVE, type } =
            args || {};

        let url = `/transaction-categories/my?status=${status}`;

        const tags: string[] = [
            EFetchingTags.TRANSACTION_CATEGORIES,
            `${EFetchingTags.TRANSACTION_CATEGORIES}-${status}`,
        ];

        if (type) {
            url += `&type=${type}`;
            tags.push(`${EFetchingTags.TRANSACTION_CATEGORIES}-${type}`);
        }

        return this.get(url, {
            next: { tags },
        });
    }

    reorderTransactionCategories({
        parentNodes,
    }: IReorderTransactionCategoriesArgs): TAsyncApiClientResult<
        TransactionCategory[]
    > {
        return this.patch('/transaction-categories/reorder', {
            parentNodes,
        });
    }

    createTransactionCategory(
        dto: CreateTransactionCategoryDto,
    ): TAsyncApiClientResult<TransactionCategory> {
        return this.post('/transaction-categories', dto);
    }

    editTransactionCategoryCurrency({
        id,
        ...dto
    }: IEditTransactionCategoryCurrency): TAsyncApiClientResult<TransactionCategory> {
        return this.patch(`/transaction-categories/currency/${id}`, dto);
    }

    archiveTransactionCategory(
        id: number,
    ): TAsyncApiClientResult<TransactionCategory> {
        return this.patch(`/transaction-categories/${id}`, {
            status: EditTransactionCategoryDtoStatusEnum.ARCHIVED,
        });
    }

    deleteTransactionCategory(
        id: number,
        shouldRemoveChildTransactionCategories = false,
    ): TAsyncApiClientResult<TransactionCategory> {
        let url = `/transaction-categories/${id}`;

        if (shouldRemoveChildTransactionCategories) {
            url += `?shouldRemoveChildTransactionCategories=${shouldRemoveChildTransactionCategories}`;
        }

        return this.delete(url);
    }

    getTransactions({
        types = DEFAULT_TRANSACTION_TYPES,
        accountId,
        transactionCategoryId,
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
    }: IGetTransactionsArgs): TAsyncApiClientResult<
        IPaginatedItemsResult<Transaction>
    > {
        const joinedTypes = types.join(',');
        let url = `/transactions/my?types=${joinedTypes}&limit=${limit}&offset=${offset}`;
        const tags: string[] = [EFetchingTags.TRANSACTIONS];

        types.forEach((type) => {
            tags.push(`${EFetchingTags.TRANSACTIONS}-${type}`);
        });

        tags.push(`${EFetchingTags.TRANSACTIONS}-offset-${offset}`);
        tags.push(`${EFetchingTags.TRANSACTIONS}-limit-${limit}`);

        if (accountId) {
            url += `&accountId=${accountId}`;
            tags.push(`${EFetchingTags.TRANSACTIONS}-account-${accountId}`);
        }

        if (transactionCategoryId) {
            url += `&transactionCategoryId=${transactionCategoryId}`;
            tags.push(
                `${EFetchingTags.TRANSACTIONS}-transactionCategory-${transactionCategoryId}`,
            );
        }

        return this.get(url, {
            next: { tags },
        });
    }
}
