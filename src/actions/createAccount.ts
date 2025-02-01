'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TServerActionResponse } from 'types/apiClient.types';
import { CreateAccountDto, Account } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getAccountsFetchingTags } from 'utils/fetchingTags.utils';

export async function createAccount(
    dto: CreateAccountDto,
): TServerActionResponse<Account> {
    try {
        const result = await SERVER_MY_BUDGET_API.createAccount(dto);

        getAccountsFetchingTags().forEach(revalidateTag);

        return result;
    } catch (error) {
        return getFailedResponse(error, 'failed to create account');
    }
}
