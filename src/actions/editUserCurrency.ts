'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User, EditUserCurrencyDto } from 'types/generated.types';

export async function editUserCurrency(
    userId: number,
    dto: EditUserCurrencyDto,
): TAsyncApiClientResult<User> {
    const result = await SERVER_MY_BUDGET_API.editUserCurrency({
        userId,
        ...dto,
    });

    revalidateTag(EFetchingTags.ME);

    const {
        isAccountsCurrencySoftUpdate,
        isTransactionCategoriesCurrencySoftUpdate,
        isTransactionCategoriesCurrencyForceUpdate,
    } = dto;

    if (isAccountsCurrencySoftUpdate) {
        revalidateTag(EFetchingTags.ACCOUNTS);
        revalidateTag(EFetchingTags.ACCOUNT);
    }

    if (
        isTransactionCategoriesCurrencySoftUpdate ||
        isTransactionCategoriesCurrencyForceUpdate
    ) {
        revalidateTag(EFetchingTags.TRANSACTION_CATEGORIES);
        revalidateTag(EFetchingTags.TRANSACTION_CATEGORY);
    }

    return result;
}
