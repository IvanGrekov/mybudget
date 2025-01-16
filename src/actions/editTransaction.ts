'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { EditTransactionDto, Transaction } from 'types/generated.types';
import { getSingleTransactionFetchingTag } from 'utils/fetchingTags.utils';

export async function editTransaction(
    transactionId: number,
    dto: EditTransactionDto,
): TAsyncApiClientResult<Transaction> {
    const result = await SERVER_MY_BUDGET_API.editTransaction(
        transactionId,
        dto,
    );

    revalidateTag(EFetchingTags.TRANSACTIONS);
    revalidateTag(getSingleTransactionFetchingTag(transactionId));

    return result;
}
