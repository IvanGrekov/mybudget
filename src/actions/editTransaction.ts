'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { EditTransactionDto, Transaction } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getSingleTransactionFetchingTag } from 'utils/fetchingTags.utils';

export async function editTransaction(
    transactionId: number,
    dto: EditTransactionDto,
): TServerActionResponse<Transaction> {
    try {
        const result = await SERVER_MY_BUDGET_API.editTransaction(
            transactionId,
            dto,
        );

        revalidateTag(getSingleTransactionFetchingTag(transactionId));

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to edit transaction');
    }
}
