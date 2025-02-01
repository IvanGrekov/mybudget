'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getSingleAccountFetchingTag,
    getAccountsFetchingTags,
} from 'utils/fetchingTags.utils';

export async function archiveAccount(
    accountId: number,
): TServerActionResponse<Account> {
    try {
        const result = await SERVER_MY_BUDGET_API.archiveAccount(accountId);

        revalidateTag(getSingleAccountFetchingTag(accountId));

        getAccountsFetchingTags().forEach(revalidateTag);

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to archive account');
    }
}
