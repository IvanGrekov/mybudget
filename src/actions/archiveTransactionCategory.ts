'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

export async function archiveTransactionCategory(
    transactionCategoryId: number,
    parentId?: number,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.archiveTransactionCategory(
        transactionCategoryId,
    );

    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORY}-${transactionCategoryId}`,
    );
    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );

    if (parentId) {
        revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${parentId}`);
    }

    return result;
}
