'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { IReorderAccountArgs } from 'types/muBudgetApi.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getAccountsFetchingTagByType,
    getSingleAccountFetchingTag,
} from 'utils/fetchingTags.utils';

interface IReorderAccountActionArgs extends IReorderAccountArgs {
    type: AccountTypeEnum;
}

export async function reorderAccount({
    type,
    id,
    order,
}: IReorderAccountActionArgs): TServerActionResponse<Account[]> {
    try {
        const result = await SERVER_MY_BUDGET_API.reorderAccount({ id, order });

        revalidateTag(getAccountsFetchingTagByType([type]));
        revalidateTag(getSingleAccountFetchingTag(id));

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to reorder account');
    }
}
