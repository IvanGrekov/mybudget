'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    EditTransactionCategoryDto,
    TransactionCategory,
    TransactionCategoryStatusEnum,
    EditTransactionCategoryDtoStatusEnum,
} from 'types/generated.types';

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

    revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${id}`);
    revalidateTag(
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${TransactionCategoryStatusEnum.ACTIVE}`,
    );

    if (
        parentId &&
        dto.status === EditTransactionCategoryDtoStatusEnum.ARCHIVED
    ) {
        revalidateTag(`${EFetchingTags.TRANSACTION_CATEGORY}-${parentId}`);
    }

    return result;
}
