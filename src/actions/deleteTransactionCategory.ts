'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getTransactionCategoriesFetchingTags,
    getSingleTransactionCategoryFetchingTag,
    getTransactionsFetchingTags,
} from 'utils/fetchingTags.utils';

interface IDeleteTransactionCategoryArgs {
    id: number;
    shouldRemoveChildren?: boolean;
    parentId?: number;
}

export async function deleteTransactionCategory({
    id,
    shouldRemoveChildren,
    parentId,
}: IDeleteTransactionCategoryArgs): TServerActionResponse<TransactionCategory> {
    try {
        const result = await SERVER_MY_BUDGET_API.deleteTransactionCategory(
            id,
            shouldRemoveChildren,
        );

        revalidateTag(getSingleTransactionCategoryFetchingTag(id));

        getTransactionCategoriesFetchingTags().forEach(revalidateTag);

        getTransactionsFetchingTags().forEach(revalidateTag);

        if (parentId) {
            revalidateTag(getSingleTransactionCategoryFetchingTag(parentId));
        }

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to delete category');
    }
}
