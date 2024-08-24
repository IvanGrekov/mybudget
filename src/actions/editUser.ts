'use server';

import { revalidateTag } from 'next/cache';

import { MyBudgetApi } from 'models/myBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';

export async function editUser({
    userId,
    ...data
}: IEditUserArgs): TApiClientResult<User> {
    const result = await MyBudgetApi.editUser({ userId, ...data });

    revalidateTag(`${EFetchingTags.USER}${userId}`);

    return result;
}
