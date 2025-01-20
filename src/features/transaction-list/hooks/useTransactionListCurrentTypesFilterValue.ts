import { TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListTypesFilterParamName';
import { getTransactionTypesByFilterValue } from 'features/transaction-list/utils/transactionTypeFilterValue.utils';
import { useGetSearchParamsValue } from 'hooks/searchParams.hooks';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';

export const useTransactionListCurrentTypesFilterValue =
    (): TTransactionTypesInput => {
        const currentFilterValue = useGetSearchParamsValue(
            TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
        );

        return getTransactionTypesByFilterValue(currentFilterValue || '');
    };
