import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAreRelatedTransactionsExistResult {
    isLoading: boolean;
    areRelatedTransactionsExist: boolean;
}

const LIMIT = 1;
const OFFSET = 1;

export const useGetAreRelatedTransactionsExist = (
    transactionCategoryId: number,
): IUseGetAreRelatedTransactionsExistResult => {
    const queryArgs = {
        transactionCategoryId,
        limit: LIMIT,
        offset: OFFSET,
    };

    const { isPending, data } = useQuery({
        queryKey: getTransactionsQueryKey(queryArgs),
        queryFn: () => CLIENT_MY_BUDGET_API.getTransactions(queryArgs),
    });

    return {
        isLoading: isPending,
        areRelatedTransactionsExist: !!data?.items.length,
    };
};
