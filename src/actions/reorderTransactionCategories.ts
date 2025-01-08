'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { IReorderTransactionCategoriesArgs } from 'types/muBudgetApi.types';
import { getTransactionCategoriesFetchingTagByType } from 'utils/fetchingTags.utils';

interface IReorderTransactionCategoriesActionArgs
    extends IReorderTransactionCategoriesArgs {
    type: TransactionCategoryTypeEnum;
}

export async function reorderTransactionCategories({
    type,
    parentNodes,
}: IReorderTransactionCategoriesActionArgs): TAsyncApiClientResult<
    TransactionCategory[]
> {
    const result = await SERVER_MY_BUDGET_API.reorderTransactionCategories({
        parentNodes,
    });

    revalidateTag(getTransactionCategoriesFetchingTagByType(type));
    revalidateTag(EFetchingTags.TRANSACTION_CATEGORY);

    return result;
}
