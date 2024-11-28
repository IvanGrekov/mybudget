'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { Account, AccountStatusEnum } from 'types/generated.types';

export async function archiveAccount(
    accountId: number,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.archiveAccount(accountId);

    revalidateTag(`${EFetchingTags.ACCOUNT}-${accountId}`);
    revalidateTag(`${EFetchingTags.ACCOUNTS}-${AccountStatusEnum.ACTIVE}`);
    revalidateTag(`${EFetchingTags.ACCOUNT}-${accountId}`);

    return result;
}
