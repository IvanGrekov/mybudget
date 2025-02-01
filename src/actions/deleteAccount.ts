'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getAccountsFetchingTags,
    getSingleAccountFetchingTag,
    getTransactionsFetchingTags,
} from 'utils/fetchingTags.utils';

export async function deleteAccount(
    accountId: number,
): TServerActionResponse<Account> {
    try {
        const result = await SERVER_MY_BUDGET_API.deleteAccount(accountId);

        revalidateTag(getSingleAccountFetchingTag(accountId));

        getAccountsFetchingTags().forEach(revalidateTag);

        getTransactionsFetchingTags().forEach(revalidateTag);

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to delete account');
    }
}
