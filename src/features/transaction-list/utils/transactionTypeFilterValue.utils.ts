import { ALL_FILTER_VALUE } from 'constants/allFilterValue';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { TransactionTypeEnum } from 'types/generated.types';
import { splitMultipleValuesSearchParam } from 'utils/searchParams.utils';

export const getTransactionTypesByFilterValue = (
    currentFilterValue?: string,
): TTransactionTypesInput => {
    if (!currentFilterValue || currentFilterValue === ALL_FILTER_VALUE) {
        return DEFAULT_TRANSACTION_TYPES;
    }

    const value = splitMultipleValuesSearchParam(currentFilterValue);

    if (!value.length) {
        return DEFAULT_TRANSACTION_TYPES;
    }

    const filterValue: TTransactionTypesInput = [];
    for (const type of Object.values(TransactionTypeEnum)) {
        if (value.includes(type)) {
            filterValue.push(type);
        }
    }

    return filterValue.length ? filterValue : DEFAULT_TRANSACTION_TYPES;
};

export const getTransactionTypesFromUrl = (
    url: string,
): TTransactionTypesInput => {
    const urlSearchParams = new URL(url).searchParams;

    const currentFilterValue =
        urlSearchParams.get(TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME) || '';

    return getTransactionTypesByFilterValue(currentFilterValue);
};
