import {
    TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
    TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
} from 'constants/transactionListFilterParams.constants';
import { getTransactionTypesByFilterValue } from 'features/transaction-list/utils/transactionListFilters.utils';
import { useGetSearchParamsValue } from 'hooks/searchParams.hooks';
import { ITransactionListFilterValues } from 'types/transactionListFilterValues';

export const useTransactionListCurrentTypesFilterValue = (): ReturnType<
    typeof getTransactionTypesByFilterValue
> => {
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

const useTransactionListCurrentDateRangeFromFilterValue = ():
    | string
    | undefined => {
    const currentFilterValue = useGetSearchParamsValue(
        TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    );

    return currentFilterValue || undefined;
};

const useTransactionListCurrentDateRangeToFilterValue = ():
    | string
    | undefined => {
    const currentFilterValue = useGetSearchParamsValue(
        TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
    );

    return currentFilterValue || undefined;
};

export const useTransactionListFilterValues =
    (): ITransactionListFilterValues => {
        const { value: types, isDefault: isDefaultTypesSelected } =
            useTransactionListCurrentTypesFilterValue();
        const accountId = useTransactionListCurrentAccountFilterValue();
        const categoryId = useTransactionListCurrentCategoryFilterValue();
        const from = useTransactionListCurrentDateRangeFromFilterValue();
        const to = useTransactionListCurrentDateRangeToFilterValue();

        return {
            types,
            isDefaultTypesSelected,
            accountId,
            categoryId,
            from,
            to,
        };
    };
