import { ALL_FILTER_VALUE } from 'constants/allFilterValue';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { EXCLUDED_TRANSACTION_TYPE } from 'features/transaction-list/constants/excludedTransactionType';
import { TRANSACTION_LIST_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListFilterParamName';
import {
    TTransactionTypesInput,
    TAvailableTransactionTypes,
} from 'types/availableTransactionTypes';
import { TransactionTypeEnum } from 'types/generated.types';

export const getTransactionTypesByFilterValue = (
    currentFilterValue?: string,
): TTransactionTypesInput => {
    if (!currentFilterValue || currentFilterValue === ALL_FILTER_VALUE) {
        return DEFAULT_TRANSACTION_TYPES;
    }

    const value = currentFilterValue.split(',');

    if (!value.length) {
        return DEFAULT_TRANSACTION_TYPES;
    }

    const filterValue: TAvailableTransactionTypes[] = [];
    for (const type of Object.values(TransactionTypeEnum)) {
        if (type !== EXCLUDED_TRANSACTION_TYPE && value.includes(type)) {
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
        urlSearchParams.get(TRANSACTION_LIST_FILTER_PARAM_NAME) || '';

    return getTransactionTypesByFilterValue(currentFilterValue);
};
