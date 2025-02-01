'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import {
    CreateTransactionCategoryDto,
    TransactionCategory,
} from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getSingleTransactionCategoryFetchingTag,
    getTransactionCategoriesFetchingTags,
} from 'utils/fetchingTags.utils';

export async function createTransactionCategory(
    dto: CreateTransactionCategoryDto,
): TServerActionResponse<TransactionCategory> {
    try {
        const result = await SERVER_MY_BUDGET_API.createTransactionCategory(
            dto,
        );

        getTransactionCategoriesFetchingTags().forEach(revalidateTag);

        const parentId = dto.parentId;
        if (parentId) {
            revalidateTag(getSingleTransactionCategoryFetchingTag(parentId));
        }

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to create category');
    }
}
