import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_OFFSET } from 'constants/pagination';
import { useTransactionListCurrentTypesFilterValue } from 'features/transaction-list/hooks/transactionListFilters.hooks';
import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { Transaction } from 'types/generated.types';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

interface IUseGetTransactionsResult {
    transactions?: TApiClientResult<Transaction[]>;
    hasMore: boolean;
    isLoading: boolean;
    isFetching: boolean;
    next: VoidFunction;
    refetch: VoidFunction;
}

export const useGetTransactions = (): IUseGetTransactionsResult => {
    const types = useTransactionListCurrentTypesFilterValue();

    const {
        data,
        error,
        isFetching,
        isLoading,
        hasNextPage: hasMore,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: getTransactionsQueryKey({ types }),
        queryFn: ({ pageParam }) => {
            return CLIENT_MY_BUDGET_API.getTransactions({
                types,
                offset: pageParam || DEFAULT_OFFSET,
            });
        },
        initialPageParam: DEFAULT_OFFSET,
        getNextPageParam: (lastPage) => {
            if (!lastPage?.hasMore) {
                return;
            }

            return lastPage.page + 1;
        },
    });

    useRequestErrorHandler(error);

    return {
        transactions: data?.pages.flatMap((page) => page?.items || []),
        hasMore,
        isLoading,
        isFetching,
        next: fetchNextPage,
        refetch,
    };
};
