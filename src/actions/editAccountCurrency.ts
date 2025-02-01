'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { IEditAccountCurrency } from 'types/muBudgetApi.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import {
    getAccountsFetchingTags,
    getSingleAccountFetchingTag,
} from 'utils/fetchingTags.utils';

export async function editAccountCurrency(
    dto: IEditAccountCurrency,
): TServerActionResponse<Account> {
    try {
        const result = await SERVER_MY_BUDGET_API.editAccountCurrency(dto);
        const accountId = dto.id;

        getAccountsFetchingTags().forEach(revalidateTag);

        revalidateTag(getSingleAccountFetchingTag(accountId));

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to edit account currency');
    }
}
