'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    CreateTransactionCategoryDto,
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

export async function createTransactionCategory(
    dto: CreateTransactionCategoryDto,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.createTransactionCategory(dto);

    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );

    const parentId = dto.parentId;
    if (parentId) {
        revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${parentId}`);
    }

    return result;
}
