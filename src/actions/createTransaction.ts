'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { CreateTransactionDto, Transaction } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getSingleAccountFetchingTag } from 'utils/fetchingTags.utils';

export async function createTransaction(
    dto: CreateTransactionDto,
): TServerActionResponse<Transaction> {
    try {
        const { fromAccountId, toAccountId } = dto;

        const result = await SERVER_MY_BUDGET_API.createTransaction(dto);

        revalidateTag(EFetchingTags.TRANSACTIONS);

        if (fromAccountId) {
            revalidateTag(getSingleAccountFetchingTag(fromAccountId));
        }

        if (toAccountId) {
            revalidateTag(getSingleAccountFetchingTag(toAccountId));
        }

        if (fromAccountId || toAccountId) {
            revalidateTag(EFetchingTags.ACCOUNTS);
        }

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to create transaction');
    }
}
