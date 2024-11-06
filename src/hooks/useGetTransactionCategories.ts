import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

interface IUseGetTransactionCategoriesResult {
    transactionCategories?: TApiClientResult<TransactionCategory[]>;
    isLoading: boolean;
}

export const useGetTransactionCategories = (
    type: TransactionCategoryTypeEnum,
): IUseGetTransactionCategoriesResult => {
    const { isPending, data } = useQuery({
        queryKey: getTransactionCategoriesQueryKey({
            type,
        }),
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getTransactionCategories({
                type,
            }),
    });

    return {
        transactionCategories: data,
        isLoading: isPending,
    };
};
