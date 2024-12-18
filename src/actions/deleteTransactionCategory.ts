'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

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

    revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${id}`);
    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );
    revalidateTag(EFetchingTags.TRANSACTIONS);

    if (parentId) {
        revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${parentId}`);
    }

    return result;
}
