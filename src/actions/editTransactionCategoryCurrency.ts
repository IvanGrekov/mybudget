'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
import { IEditTransactionCategoryCurrency } from 'types/muBudgetApi.types';
import {
    getTransactionCategoriesFetchingTags,
    getSingleTransactionCategoryFetchingTag,
} from 'utils/fetchingTags.utils';

export async function editTransactionCategoryCurrency(
    dto: IEditTransactionCategoryCurrency,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.editTransactionCategoryCurrency(
        dto,
    );

    getTransactionCategoriesFetchingTags().forEach(revalidateTag);

    revalidateTag(getSingleTransactionCategoryFetchingTag(dto.id));

    return result;
}
