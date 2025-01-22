import {
    TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
    TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
} from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { getTransactionTypesByFilterValue } from 'features/transaction-list/utils/transactionListFilters.utils';
import { useGetSearchParamsValue } from 'hooks/searchParams.hooks';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';

export const useTransactionListCurrentTypesFilterValue =
    (): TTransactionTypesInput => {
        const currentFilterValue = useGetSearchParamsValue(
            TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
        );

        return getTransactionTypesByFilterValue(currentFilterValue || '');
    };

export const useTransactionListCurrentAccountFilterValue = ():
    | number
    | undefined => {
    const currentFilterValue = useGetSearchParamsValue(
        TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    );

    return currentFilterValue ? parseInt(currentFilterValue) : undefined;
};

export const useTransactionListCurrentCategoryFilterValue = ():
    | number
    | undefined => {
    const currentFilterValue = useGetSearchParamsValue(
        TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    );

    return currentFilterValue ? parseInt(currentFilterValue) : undefined;
};

interface IUseTransactionListFilterValuesResult {
    types: TTransactionTypesInput;
    accountId?: number;
    categoryId?: number;
}

export const useTransactionListFilterValues =
    (): IUseTransactionListFilterValuesResult => {
        const types = useTransactionListCurrentTypesFilterValue();
        const accountId = useTransactionListCurrentAccountFilterValue();
        const categoryId = useTransactionListCurrentCategoryFilterValue();

        return { types, accountId, categoryId };
    };
