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
    Transaction,
    CalculatedTransactionValuesDto,
    CreateAccountDto,
    EditAccountDtoStatusEnum,
    EditAccountDto,
    CreateTransactionCategoryDto,
    EditTransactionCategoryDtoStatusEnum,
    TransactionCategoryStatusEnum,
    EditTransactionCategoryDto,
    CreateTransactionDto,
    EditTransactionDto,
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
    TGetCalculatedTransactionValuesArgs,
} from 'types/muBudgetApi.types';
import { IPaginatedItemsResult } from 'types/paginatedItemsResult';
import {
    getFailedResponseMessage,
    getFailedResponseCause,
} from 'utils/failedResponse.utils';
import {
    getAccountsFetchingTags,
    getSingleAccountFetchingTag,
    getTransactionCategoriesFetchingTags,
    getSingleTransactionCategoryFetchingTag,
    getTransactionsFetchingTags,
    getCalculatedTransactionValuesFetchingTags,
} from 'utils/fetchingTags.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

export abstract class MyBudgetApi {
    constructor(
        private getAccessToken: () => Promise<string | null>,
        private apiUrl?: string,
        private isClient?: boolean,
    ) {
        if (!apiUrl) {
            throw new Error('Api URL is required');
        }
    }

    private async getBaseHeaders(): Promise<Record<string, string> | null> {
        const token = await this.getAccessToken().catch(() => null);

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
        const baseHeaders = await this.getBaseHeaders();

        if (!baseHeaders) {
            if (this.isClient) {
                window.location.href = EAppRoutes.Auth;

                return;
            } else {
                return redirect(EAppRoutes.Auth);
            }
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
                const message = getFailedResponseMessage(data);

                throw new Error(message, {
                    cause: getFailedResponseCause(data, message),
                });
            }

            return data;
        } catch (error) {
            const message = getFailedResponseMessage(error);

            throw new Error(message, {
                cause: getFailedResponseCause(error, message),
            });
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
        const baseHeaders = await this.getBaseHeaders();

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
        const baseHeaders = await this.getBaseHeaders();

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
        const { status = AccountStatusEnum.ACTIVE, types } = args || {};

        let url = `/accounts/my?status=${status}`;

        if (types) {
            url += `&types=${types.join(',')}`;
        }

        return this.get(url, {
            next: {
                tags: [
                    EFetchingTags.ACCOUNTS,
                    ...getAccountsFetchingTags({
                        status,
                        types,
                    }),
                ],
            },
        });
    }

    getAccount(id: number): TAsyncApiClientResult<Account> {
        return this.get(`/accounts/${id}`, {
            next: {
                tags: [EFetchingTags.ACCOUNT, getSingleAccountFetchingTag(id)],
            },
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

    editAccount(
        id: number,
        dto: EditAccountDto,
    ): TAsyncApiClientResult<Account> {
        return this.patch(`/accounts/${id}`, dto);
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

        if (type) {
            url += `&type=${type}`;
        }

        return this.get(url, {
            next: {
                tags: [
                    EFetchingTags.TRANSACTION_CATEGORIES,
                    ...getTransactionCategoriesFetchingTags({
                        status,
                        type,
                    }),
                ],
            },
        });
    }

    getTransactionCategory(
        id: number,
    ): TAsyncApiClientResult<TransactionCategory> {
        return this.get(`/transaction-categories/${id}`, {
            next: {
                tags: [
                    EFetchingTags.TRANSACTION_CATEGORY,
                    getSingleTransactionCategoryFetchingTag(id),
                ],
            },
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

    editTransactionCategory(
        id: number,
        dto: EditTransactionCategoryDto,
    ): TAsyncApiClientResult<TransactionCategory> {
        return this.patch(`/transaction-categories/${id}`, dto);
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
        categoryId,
        from,
        to,
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
    }: IGetTransactionsArgs): TAsyncApiClientResult<
        IPaginatedItemsResult<Transaction>
    > {
        const joinedTypes = types.join(',');
        let url = `/transactions/my?types=${joinedTypes}&limit=${limit}&offset=${offset}`;

        if (accountId) {
            url += `&accountId=${accountId}`;
        }

        if (categoryId) {
            url += `&transactionCategoryId=${categoryId}`;
        }

        if (from) {
            url += `&from=${from}`;
        }

        if (to) {
            url += `&to=${to}`;
        }

        return this.get(url, {
            next: {
                tags: getTransactionsFetchingTags({
                    joinedTypes,
                    accountId,
                    categoryId,
                    from,
                    to,
                    limit,
                    offset,
                }),
            },
        });
    }

    getCalculatedTransactionValues({
        accountId,
        categoryId,
        from,
        to,
    }: TGetCalculatedTransactionValuesArgs): TAsyncApiClientResult<CalculatedTransactionValuesDto> {
        let url = '/transactions/calculated-transaction-values?';

        if (accountId) {
            url += url.startsWith('?')
                ? `accountId=${accountId}`
                : `&accountId=${accountId}`;
        }

        if (categoryId) {
            url += url.startsWith('?')
                ? `transactionCategoryId=${categoryId}`
                : `&transactionCategoryId=${categoryId}`;
        }

        if (from) {
            url += url.startsWith('?') ? `from=${from}` : `&from=${from}`;
        }

        if (to) {
            url += url.startsWith('?') ? `to=${to}` : `&to=${to}`;
        }

        return this.get(url, {
            next: {
                tags: getCalculatedTransactionValuesFetchingTags({
                    accountId,
                    categoryId,
                    from,
                    to,
                }),
            },
        });
    }

    createTransaction(
        dto: CreateTransactionDto,
    ): TAsyncApiClientResult<Transaction> {
        return this.post('/transactions', dto);
    }

    editTransaction(
        id: number,
        dto: EditTransactionDto,
    ): TAsyncApiClientResult<Transaction> {
        return this.patch(`/transactions/${id}`, dto);
    }
}
