import { ApiClient } from 'models/apiClient';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User, Account, TransactionCategory } from 'types/generated.types';
import {
    IEditUserArgs,
    IGetAccountsArgs,
    IGetTransactionCategoriesArgs,
} from 'types/muBudgetApi.types';

export class MyBudgetApi {
    private constructor() {}

    static async getUser(id: number): TApiClientResult<User> {
        return ApiClient.get<User>(`/users/${id}`, {
            next: { tags: [`${EFetchingTags.USER}${id}`] },
        });
    }

    static async editUser({
        userId,
        ...data
    }: IEditUserArgs): TApiClientResult<User> {
        return ApiClient.patch<User>(`/users/${userId}`, data);
    }

    static async getAccounts({
        userId,
    }: IGetAccountsArgs): TApiClientResult<Account[]> {
        return ApiClient.get<Account[]>(`/accounts?userId=${userId}`, {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    static async getTransactionCategories({
        userId,
    }: IGetTransactionCategoriesArgs): TApiClientResult<TransactionCategory[]> {
        return ApiClient.get<TransactionCategory[]>(
            `/transaction-categories?userId=${userId}`,
            {
                next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
            },
        );
    }
}
