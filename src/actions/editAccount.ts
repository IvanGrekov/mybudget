'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { Account, EditAccountDto } from 'types/generated.types';
import {
    getSingleAccountFetchingTag,
    getAccountsFetchingTags,
    getTransactionsFetchingTags,
} from 'utils/fetchingTags.utils';

export async function editAccount(
    id: number,
    dto: EditAccountDto,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.editAccount(id, dto);

    revalidateTag(getSingleAccountFetchingTag(id));

    getAccountsFetchingTags().forEach(revalidateTag);

    getTransactionsFetchingTags().forEach(revalidateTag);

    return result;
}
