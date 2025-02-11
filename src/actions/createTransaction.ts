'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { CreateTransactionDto, Transaction } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getCalculatedTransactionValuesFetchingTags,
    getSingleAccountFetchingTag,
    getSingleTransactionCategoryFetchingTag,
} from 'utils/fetchingTags.utils';

export async function createTransaction(
    dto: CreateTransactionDto,
): TServerActionResponse<Transaction> {
    try {
        const { fromAccountId, toAccountId, fromCategoryId, toCategoryId } =
            dto;

        const result = await SERVER_MY_BUDGET_API.createTransaction(dto);

        revalidateTag(EFetchingTags.TRANSACTIONS);

        getCalculatedTransactionValuesFetchingTags({
            accountId: fromAccountId || toAccountId,
            categoryId: fromCategoryId || toCategoryId,
        }).forEach(revalidateTag);

        if (fromAccountId) {
            revalidateTag(getSingleAccountFetchingTag(fromAccountId));
        }

        if (fromCategoryId) {
            revalidateTag(
                getSingleTransactionCategoryFetchingTag(fromCategoryId),
            );
        }

        if (toAccountId) {
            revalidateTag(getSingleAccountFetchingTag(toAccountId));
        }

        if (toCategoryId) {
            revalidateTag(
                getSingleTransactionCategoryFetchingTag(toCategoryId),
            );
        }

        if (fromAccountId || toAccountId) {
            revalidateTag(EFetchingTags.ACCOUNTS);
        }

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to create transaction');
    }
}
