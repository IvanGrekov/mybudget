'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import {
    getAccountsFetchingTags,
    getSingleAccountFetchingTag,
    getTransactionsFetchingTags,
} from 'utils/fetchingTags.utils';

export async function deleteAccount(
    accountId: number,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.deleteAccount(accountId);

    revalidateTag(getSingleAccountFetchingTag(accountId));

    getAccountsFetchingTags().forEach(revalidateTag);

    getTransactionsFetchingTags().forEach(revalidateTag);

    return result;
}
