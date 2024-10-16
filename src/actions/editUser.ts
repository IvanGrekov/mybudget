'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';

export async function editUser({
    userId,
    ...data
}: IEditUserArgs): TAsyncApiClientResult<User> {
    const result = await SERVER_MY_BUDGET_API.editUser({ userId, ...data });
    revalidateTag(EFetchingTags.ME);

    return result;
}
