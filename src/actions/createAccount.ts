'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { CreateAccountDto, Account } from 'types/generated.types';
import { getAccountsFetchingTags } from 'utils/fetchingTags.utils';

export async function createAccount(
    dto: CreateAccountDto,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.createAccount(dto);

    getAccountsFetchingTags().forEach(revalidateTag);

    return result;
}
