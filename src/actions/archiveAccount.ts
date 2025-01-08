'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import {
    getSingleAccountFetchingTag,
    getAccountsFetchingTags,
} from 'utils/fetchingTags.utils';

export async function archiveAccount(
    accountId: number,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.archiveAccount(accountId);

    revalidateTag(getSingleAccountFetchingTag(accountId));

    getAccountsFetchingTags().forEach(revalidateTag);

    return result;
}
