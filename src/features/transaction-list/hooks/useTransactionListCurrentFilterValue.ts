import { useSearchParams } from 'next/navigation';

import { TRANSACTION_LIST_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListFilterParamName';
import { getTransactionTypesByFilterValue } from 'features/transaction-list/utils/transactionTypeFilterValue.utils';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';

export const useTransactionListCurrentFilterValue =
    (): TTransactionTypesInput => {
        const searchParams = useSearchParams();
        const currentFilterValue =
            searchParams.get(TRANSACTION_LIST_FILTER_PARAM_NAME) || '';

        return getTransactionTypesByFilterValue(currentFilterValue);
    };
