'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';

export async function disableTfa(
    tfaToken: string,
): TAsyncApiClientResult<void> {
    const result = await SERVER_MY_BUDGET_API.disableTfa(tfaToken);
    revalidateTag(EFetchingTags.ME);

    return result;
}
