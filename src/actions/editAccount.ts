'use server';

import { revalidateTag } from 'next/cache';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    Account,
    AccountStatusEnum,
    EditAccountDto,
} from 'types/generated.types';

export async function editAccount(
    id: number,
    dto: EditAccountDto,
): TAsyncApiClientResult<Account> {
    const result = await SERVER_MY_BUDGET_API.editAccount(id, dto);

    revalidateTag(`${EFetchingTags.ACCOUNT}-${id}`);
    revalidateTag(`${EFetchingTags.ACCOUNTS}-${AccountStatusEnum.ACTIVE}`);
    revalidateTag(EFetchingTags.TRANSACTIONS);

    return result;
}
