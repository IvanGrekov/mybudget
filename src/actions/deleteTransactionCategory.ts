'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

export async function deleteTransactionCategory(
    transactionCategoryId: number,
    shouldRemoveChildTransactionCategories?: boolean,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.deleteTransactionCategory(
        transactionCategoryId,
        shouldRemoveChildTransactionCategories,
    );

    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );
    revalidateTag(EFetchingTags.TRANSACTIONS);

    return result;
}
