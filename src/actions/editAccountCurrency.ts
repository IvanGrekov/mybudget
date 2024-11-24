'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { Account, AccountStatusEnum } from 'types/generated.types';
import { IEditAccountCurrency } from 'types/muBudgetApi.types';

export async function editAccountCurrency(
    dto: IEditAccountCurrency,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.editAccountCurrency(dto);

    revalidateTag(`${EFetchingTags.ACCOUNTS}-${AccountStatusEnum.ACTIVE}`);
    revalidateTag(`${EFetchingTags.ACCOUNT}-${dto.id}`);

    return result;
}
