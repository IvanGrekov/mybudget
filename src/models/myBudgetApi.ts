import { ApiClient } from 'models/apiClient';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User, Account, TransactionCategory } from 'types/generated.types';
import {
    IGetAccountsArgs,
    IGetTransactionCategoriesArgs,
} from 'types/muBudgetApi.types';

export class MyBudgetApi {
    private constructor() {}

    static async getUser(id: string): TApiClientResult<User> {
        return ApiClient.request<User>(`/users/${id}`);
    }

    static async getAccounts({
        userId,
    }: IGetAccountsArgs): TApiClientResult<Account[]> {
        return ApiClient.request<Account[]>(`/accounts?userId=${userId}`, {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    static async getTransactionCategories({
        userId,
    }: IGetTransactionCategoriesArgs): TApiClientResult<TransactionCategory[]> {
        return ApiClient.request<TransactionCategory[]>(
            `/transaction-categories?userId=${userId}`,
            {
                next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
            },
        );
    }
}
