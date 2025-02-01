'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getSingleTransactionCategoryFetchingTag,
    getTransactionCategoriesFetchingTags,
} from 'utils/fetchingTags.utils';

export async function archiveTransactionCategory(
    transactionCategoryId: number,
    parentId?: number,
): TServerActionResponse<TransactionCategory> {
    try {
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
    } catch (error) {
        return getFailedResponse(error, 'failed to archive category');
    }
}
