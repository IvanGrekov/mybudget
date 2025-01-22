import 'server-only';

import { QueryClient } from '@tanstack/react-query';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

export const prefetchAllTransactionCategories = (
    queryClient: QueryClient,
): Promise<void> => {
    return queryClient.prefetchQuery({
        queryKey: getTransactionCategoriesQueryKey(),
        queryFn: () => SERVER_MY_BUDGET_API.getTransactionCategories(),
    });
};
