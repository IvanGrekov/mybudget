'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
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
}: IDeleteTransactionCategoryArgs): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.deleteTransactionCategory(
        id,
        shouldRemoveChildren,
    );

    revalidateTag(getSingleTransactionCategoryFetchingTag(id));

    getTransactionCategoriesFetchingTags().forEach(revalidateTag);

    getTransactionsFetchingTags({
        transactionCategoryId: id,
    }).forEach(revalidateTag);

    if (parentId) {
        revalidateTag(getSingleTransactionCategoryFetchingTag(parentId));
    }

    return result;
}
