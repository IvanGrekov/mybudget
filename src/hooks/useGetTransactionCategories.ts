import { useQuery } from '@tanstack/react-query';

import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { Maybe } from 'types/utility.types';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

interface IUseGetTransactionCategoriesResult {
    transactionCategories?: Maybe<TransactionCategory[]>;
    isLoading: boolean;
}

export const useGetTransactionCategories = (
    type: TransactionCategoryTypeEnum,
): IUseGetTransactionCategoriesResult => {
    const { data, isPending, error } = useQuery({
        queryKey: getTransactionCategoriesQueryKey({
            type,
        }),
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getTransactionCategories({
                type,
            }),
    });

    useRequestErrorHandler(error);

    return {
        transactionCategories: data,
        isLoading: isPending,
    };
};
