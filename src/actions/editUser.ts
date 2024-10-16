'use server';

import { revalidateTag } from 'next/cache';

import { MyBudgetApi } from 'models/myBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';

export async function editUser({
    userId,
    ...data
}: IEditUserArgs): TAsyncApiClientResult<User> {
    const result = await MyBudgetApi.editUser({ userId, ...data });
    revalidateTag(EFetchingTags.ME);

    return result;
}
