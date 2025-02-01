'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IEditUserArgs } from 'types/muBudgetApi.types';
import { getFailedResponse } from 'utils/failedResponse.utils';

export async function editUser({
    userId,
    ...data
}: IEditUserArgs): TServerActionResponse<User> {
    try {
        const result = await SERVER_MY_BUDGET_API.editUser({ userId, ...data });

        revalidateTag(EFetchingTags.ME);

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to edit user');
    }
}
