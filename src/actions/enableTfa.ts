'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { getFailedResponse } from 'utils/failedResponse.utils';

export async function enableTfa(tfaToken: string): TServerActionResponse {
    try {
        await SERVER_MY_BUDGET_API.enableTfa(tfaToken);

        return revalidateTag(EFetchingTags.ME);
    } catch (error) {
        return getFailedResponse(error, 'failed to enable tfa');
    }
}
