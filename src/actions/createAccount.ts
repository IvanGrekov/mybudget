'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    CreateAccountDto,
    Account,
    AccountStatusEnum,
} from 'types/generated.types';

export async function createAccount({
    type,
    ...dto
}: CreateAccountDto): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.createAccount({
        ...dto,
        type,
    });

    revalidateTag(`${EFetchingTags.ACCOUNTS}-${AccountStatusEnum.ACTIVE}`);
    revalidateTag(`${EFetchingTags.ACCOUNTS}-${type}`);

    return result;
}
