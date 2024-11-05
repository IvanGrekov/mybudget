'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { IReorderAccountArgs } from 'types/muBudgetApi.types';

interface IReorderAccountActionArgs extends IReorderAccountArgs {
    type: AccountTypeEnum;
}

export async function reorderAccount({
    type,
    id,
    order,
}: IReorderAccountActionArgs): TAsyncApiClientResult<Account[]> {
    const result = await SERVER_MY_BUDGET_API.reorderAccount({ id, order });

    revalidateTag(`${EFetchingTags.ACCOUNTS}-${type}`);
    revalidateTag(`${EFetchingTags.ACCOUNT}-${id}`);

    return result;
}
