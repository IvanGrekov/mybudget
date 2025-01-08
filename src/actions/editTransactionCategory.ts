'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import {
    EditTransactionCategoryDto,
    TransactionCategory,
    EditTransactionCategoryDtoStatusEnum,
} from 'types/generated.types';
import {
    getSingleTransactionCategoryFetchingTag,
    getTransactionCategoriesFetchingTags,
    getTransactionsFetchingTags,
} from 'utils/fetchingTags.utils';

interface IEditTransactionCategoryArgs {
    id: number;
    dto: EditTransactionCategoryDto;
    parentId?: number;
}

export async function editTransactionCategory({
    id,
    dto,
    parentId,
}: IEditTransactionCategoryArgs): TAsyncApiClientResult<TransactionCategory> {
    const result = await SERVER_MY_BUDGET_API.editTransactionCategory(id, dto);

    revalidateTag(getSingleTransactionCategoryFetchingTag(id));

    getTransactionCategoriesFetchingTags().forEach(revalidateTag);

    if (
        parentId &&
        dto.status === EditTransactionCategoryDtoStatusEnum.ARCHIVED
    ) {
        revalidateTag(getSingleTransactionCategoryFetchingTag(parentId));
    }

    getTransactionsFetchingTags().forEach(revalidateTag);

    return result;
}
