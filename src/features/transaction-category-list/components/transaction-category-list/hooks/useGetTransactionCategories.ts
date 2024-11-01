import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';

interface IUseGetTransactionCategoriesResult {
    transactionCategories?: TApiClientResult<TransactionCategory[]>;
    isLoading: boolean;
}

export const useGetTransactionCategories = (
    type: TransactionCategoryTypeEnum,
): IUseGetTransactionCategoriesResult => {
    const { isPending, data } = useQuery({
        queryKey: [
            EFetchingTags.TRANSACTION_CATEGORIES,
            type,
            TransactionCategoryStatusEnum.ACTIVE,
        ],
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getTransactionCategories({
                status: TransactionCategoryStatusEnum.ACTIVE,
                type,
            }),
    });

    return {
        transactionCategories: data,
        isLoading: isPending,
    };
};
