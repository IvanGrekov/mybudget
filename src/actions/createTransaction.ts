'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { CreateTransactionDto, Transaction } from 'types/generated.types';

export async function createTransaction(
    dto: CreateTransactionDto,
): TAsyncApiClientResult<Transaction> {
    const { type, fromAccountId, toAccountId, fromCategoryId, toCategoryId } =
        dto;
    const categoryId = fromCategoryId || toCategoryId;

    const result = await SERVER_MY_BUDGET_API.createTransaction(dto);

    revalidateTag(EFetchingTags.TRANSACTIONS);
    revalidateTag(`${EFetchingTags.TRANSACTIONS}-${type}`);

    if (fromAccountId) {
        revalidateTag(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.ACCOUNT}_${fromAccountId}-${type}`,
        );
        revalidateTag(`${EFetchingTags.ACCOUNT}-${fromAccountId}`);
    }

    if (toAccountId) {
        revalidateTag(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.ACCOUNT}_${toAccountId}-${type}`,
        );
        revalidateTag(`${EFetchingTags.ACCOUNT}-${toAccountId}`);
    }

    if (categoryId) {
        revalidateTag(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.TRANSACTION_CATEGORY}_${categoryId}-${type}`,
        );
    }

    return result;
}
