'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { IEditAccountCurrency } from 'types/muBudgetApi.types';
import {
    getAccountsFetchingTags,
    getSingleAccountFetchingTag,
} from 'utils/fetchingTags.utils';

export async function editAccountCurrency(
    dto: IEditAccountCurrency,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.editAccountCurrency(dto);
    const accountId = dto.id;

    getAccountsFetchingTags().forEach(revalidateTag);

    revalidateTag(getSingleAccountFetchingTag(accountId));

    return result;
}
