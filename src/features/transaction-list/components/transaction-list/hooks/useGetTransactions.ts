import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { Transaction } from 'types/generated.types';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

interface IUseGetTransactionsResult {
    transactions?: TApiClientResult<Transaction[]>;
    isLoading: boolean;
}

export const useGetTransactions = (
    types: TTransactionTypesInput,
): IUseGetTransactionsResult => {
    const { isPending, data } = useQuery({
        queryKey: getTransactionsQueryKey({ types }),
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getTransactions({
                types,
            }),
    });

    return {
        transactions: data,
        isLoading: isPending,
    };
};
