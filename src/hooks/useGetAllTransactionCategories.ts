import { useQuery } from '@tanstack/react-query';

import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { TransactionCategory } from 'types/generated.types';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

interface IUseGetAllTransactionCategoriesResult {
    transactionCategories?: TApiClientResult<TransactionCategory[]>;
    isLoading: boolean;
}

export const useGetAllTransactionCategories =
    (): IUseGetAllTransactionCategoriesResult => {
        const { data, isPending, error } = useQuery({
            queryKey: getTransactionCategoriesQueryKey(),
            queryFn: () => CLIENT_MY_BUDGET_API.getTransactionCategories(),
        });

        useRequestErrorHandler(error);

        return {
            transactionCategories: data,
            isLoading: isPending,
        };
    };
