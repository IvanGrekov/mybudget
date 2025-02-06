import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_OFFSET } from 'constants/pagination';
import { useTransactionListFilterValues } from 'hooks/transactionListFilters.hooks';
import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { Transaction } from 'types/generated.types';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';
import { Maybe } from 'types/utility.types';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

interface IUseGetTransactionsResult {
    transactions?: Maybe<Transaction[]>;
    hasMore: boolean;
    isLoading: boolean;
    isFetching: boolean;
    next: VoidFunction;
    refetch: VoidFunction;
}

export const useGetTransactions = (
    args?: ITransactionsFiltersArgs,
): IUseGetTransactionsResult => {
    const { types, accountId, categoryId, from, to } =
        useTransactionListFilterValues();

    const { selectedAccountId, selectedCategoryId } = args || {};

    const {
        data,
        error,
        isFetching,
        isLoading,
        hasNextPage: hasMore,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: getTransactionsQueryKey({
            types,
            accountId: selectedAccountId || accountId,
            categoryId: selectedCategoryId || categoryId,
            from,
            to,
        }),
        queryFn: ({ pageParam }) => {
            return CLIENT_MY_BUDGET_API.getTransactions({
                types,
                accountId: selectedAccountId || accountId,
                categoryId: selectedCategoryId || categoryId,
                from,
                to,
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
