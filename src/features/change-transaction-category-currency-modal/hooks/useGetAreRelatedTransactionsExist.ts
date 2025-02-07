import { useQuery } from '@tanstack/react-query';

import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAreRelatedTransactionsExistResult {
    areRelatedTransactionsExist: boolean;
    isLoading: boolean;
}

const LIMIT = 1;
const OFFSET = 1;

export const useGetAreRelatedTransactionsExist = (
    categoryId: number,
): IUseGetAreRelatedTransactionsExistResult => {
    const queryArgs = {
        categoryId,
        limit: LIMIT,
        offset: OFFSET,
    };

    const { data, isPending, error } = useQuery({
        queryKey: getTransactionsQueryKey(queryArgs),
        queryFn: () => CLIENT_MY_BUDGET_API.getTransactions(queryArgs),
    });

    useRequestErrorHandler(error);

    return {
        areRelatedTransactionsExist: !!data?.items.length,
        isLoading: isPending,
    };
};
