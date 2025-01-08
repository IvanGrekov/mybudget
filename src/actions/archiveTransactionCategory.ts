'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
import {
    getSingleTransactionCategoryFetchingTag,
    getTransactionCategoriesFetchingTags,
} from 'utils/fetchingTags.utils';

export async function archiveTransactionCategory(
    transactionCategoryId: number,
    parentId?: number,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.archiveTransactionCategory(
        transactionCategoryId,
    );

    revalidateTag(
        getSingleTransactionCategoryFetchingTag(transactionCategoryId),
    );

    getTransactionCategoriesFetchingTags().forEach(revalidateTag);

    if (parentId) {
        revalidateTag(getSingleTransactionCategoryFetchingTag(parentId));
    }

    return result;
}
