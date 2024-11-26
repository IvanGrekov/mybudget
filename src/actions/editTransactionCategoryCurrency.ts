'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { IEditTransactionCategoryCurrency } from 'types/muBudgetApi.types';

export async function editTransactionCategoryCurrency(
    dto: IEditTransactionCategoryCurrency,
): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.editTransactionCategoryCurrency(
        dto,
    );

    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );
    revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${dto.id}`);

    return result;
}
