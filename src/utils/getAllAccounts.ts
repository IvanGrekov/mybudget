import 'server-only';

import { QueryClient } from '@tanstack/react-query';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

export const getAllAccounts = (
    queryClient: QueryClient,
): TAsyncApiClientResult<Account[]> => {
    return queryClient.fetchQuery({
        queryKey: getAccountsQueryKey(),
        queryFn: () => SERVER_MY_BUDGET_API.getAccounts(),
    });
};
