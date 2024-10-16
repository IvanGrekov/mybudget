import { BaseApiClient } from 'models/apiClient';
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

export abstract class BaseMyBudgetApi {
    constructor(private apiClient: BaseApiClient) {}

    async createUser(
        dto: CreateUserDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return this.apiClient.post<GeneratedTokensDto>(
            '/authentication/sign-up',
            dto,
        );
    }

    async initiateResetPassword(
        dto: InitiateResetPasswordDto,
    ): TAsyncApiClientResult<void> {
        return this.apiClient.post<void>(
            '/authentication/initiate-reset-password',
            dto,
        );
    }

    async resetPassword(
        dto: ResetPasswordDto,
    ): TAsyncApiClientResult<GeneratedTokensDto> {
        return this.apiClient.post<GeneratedTokensDto>(
            '/authentication/reset-password',
            dto,
        );
    }

    async getMe(): TAsyncApiClientResult<User> {
        return this.apiClient.get<User>('/users/me', {
            next: { tags: [EFetchingTags.ME] },
        });
    }

    async editUser({
        userId,
        ...data
    }: IEditUserArgs): TAsyncApiClientResult<User> {
        return this.apiClient.patch<User>(`/users/${userId}`, data);
    }

    async getAccounts(): TAsyncApiClientResult<Account[]> {
        return this.apiClient.get<Account[]>('/accounts/my', {
            next: { tags: [EFetchingTags.ACCOUNTS] },
        });
    }

    async getTransactionCategories(): TAsyncApiClientResult<
        TransactionCategory[]
    > {
        return this.apiClient.get<TransactionCategory[]>(
            '/transaction-categories/my',
            {
                next: { tags: [EFetchingTags.TRANSACTION_CATEGORIES] },
            },
        );
    }
}
