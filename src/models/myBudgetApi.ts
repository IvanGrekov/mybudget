import { ApiClient } from 'models/apiClient';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    CreateUserDto,
    GeneratedTokensDto,
    InitiateResetPasswordDto,
    ResetPasswordDto,
    User,
    Account,
    TransactionCategory,
} from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';

export class MyBudgetApi {
    private constructor() {}

    static async createUser(
        dto: CreateUserDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return ApiClient.post<GeneratedTokensDto>(
            '/authentication/sign-up',
            dto,
        );
    }

    static async initiateResetPassword(
        dto: InitiateResetPasswordDto,
    ): TAsyncApiClientResult<void> {
        return ApiClient.post<void>(
            '/authentication/initiate-reset-password',
            dto,
        );
    }

    static async resetPassword(
        dto: ResetPasswordDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return ApiClient.post<GeneratedTokensDto>(
            '/authentication/reset-password',
            dto,
        );
    }

    static async getMe(): TAsyncApiClientResult<User> {
        return ApiClient.get<User>('/users/me', {
            next: { tags: [EFetchingTags.ME] },
        });
    }

    static async editUser({
        userId,
        ...data
    }: IEditUserArgs): TAsyncApiClientResult<User> {
        return ApiClient.patch<User>(`/users/${userId}`, data);
    }

    static async getAccounts(): TAsyncApiClientResult<Account[]> {
        return ApiClient.get<Account[]>('/accounts/my', {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    static async getTransactionCategories(): TAsyncApiClientResult<
        TransactionCategory[]
    > {
        return ApiClient.get<TransactionCategory[]>(
            '/transaction-categories/my',
            {
                next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
            },
        );
    }
}
