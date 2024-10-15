import { ApiClient } from 'models/apiClient';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    CreateUserDto,
    GeneratedTokensDto,
    User,
    Account,
    TransactionCategory,
} from 'types/generated.types';
import {
    IEditUserArgs,
    IGetAccountsArgs,
    IGetTransactionCategoriesArgs,
} from 'types/muBudgetApi.types';

export class MyBudgetApi {
    private constructor() {}

    static async createUser({
        ...data
    }: CreateUserDto): TAsyncApiClientResult<GeneratedTokensDto> {
        return ApiClient.post<GeneratedTokensDto>(
            '/authentication/sign-up',
            data,
        );
    }

    static async getUser(id: number): TAsyncApiClientResult<User> {
        return ApiClient.get<User>(`/users/${id}`, {
            next: { tags: [`${EFetchingTags.USER}${id}`] },
        });
    }

    static async editUser({
        userId,
        ...data
    }: IEditUserArgs): TAsyncApiClientResult<User> {
        return ApiClient.patch<User>(`/users/${userId}`, data);
    }

    static async getAccounts({
        userId,
    }: IGetAccountsArgs): TAsyncApiClientResult<Account[]> {
        return ApiClient.get<Account[]>(`/accounts?userId=${userId}`, {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    static async getTransactionCategories({
        userId,
    }: IGetTransactionCategoriesArgs): TAsyncApiClientResult<
        TransactionCategory[]
    > {
        return ApiClient.get<TransactionCategory[]>(
            `/transaction-categories?userId=${userId}`,
            {
                next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
            },
        );
    }
}
