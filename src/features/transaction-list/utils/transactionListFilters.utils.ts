import { ALL_FILTER_VALUE } from 'constants/allFilterValue';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import {
    TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
    TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
} from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { TransactionTypeEnum } from 'types/generated.types';
import { splitMultipleValuesSearchParam } from 'utils/searchParams.utils';

interface IGetTransactionTypesByFilterValueResult {
    value: TTransactionTypesInput;
    isDefault?: boolean;
}

export const getTransactionTypesByFilterValue = (
    currentFilterValue?: string,
): IGetTransactionTypesByFilterValueResult => {
    if (!currentFilterValue || currentFilterValue === ALL_FILTER_VALUE) {
        return {
            value: DEFAULT_TRANSACTION_TYPES,
            isDefault: true,
        };
    }

    const value = splitMultipleValuesSearchParam(currentFilterValue);

    if (!value.length) {
        return {
            value: DEFAULT_TRANSACTION_TYPES,
            isDefault: true,
        };
    }

    const filterValue: TTransactionTypesInput = [];
    for (const type of Object.values(TransactionTypeEnum)) {
        if (value.includes(type)) {
            filterValue.push(type);
        }
    }

    if (!filterValue.length) {
        return {
            value: DEFAULT_TRANSACTION_TYPES,
            isDefault: true,
        };
    }

    return {
        value: filterValue,
    };
};

const getTransactionTypesFromUrl = (url: string): TTransactionTypesInput => {
    const urlSearchParams = new URL(url).searchParams;
    const currentFilterValue =
        urlSearchParams.get(TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME) || '';

    return getTransactionTypesByFilterValue(currentFilterValue).value;
};

const getAccountIdFromUrl = (url: string): number | undefined => {
    const urlSearchParams = new URL(url).searchParams;
    const currentFilterValue = urlSearchParams.get(
        TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    );

    return currentFilterValue ? parseInt(currentFilterValue) : undefined;
};

const getCategoryIdFromUrl = (url: string): number | undefined => {
    const urlSearchParams = new URL(url).searchParams;
    const currentFilterValue = urlSearchParams.get(
        TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    );

    return currentFilterValue ? parseInt(currentFilterValue) : undefined;
};

const getDateFromFilterValue = (url: string): string | undefined => {
    const urlSearchParams = new URL(url).searchParams;
    const currentFilterValue = urlSearchParams.get(
        TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    );

    if (!currentFilterValue) {
        return;
    }

    return currentFilterValue;
};

const getDateToFilterValue = (url: string): string | undefined => {
    const urlSearchParams = new URL(url).searchParams;
    const currentFilterValue = urlSearchParams.get(
        TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
    );

    if (!currentFilterValue) {
        return;
    }

    return currentFilterValue;
};

interface IGetTransactionListFiltersFromUrlResult {
    types: TTransactionTypesInput;
    accountId: number | undefined;
    categoryId: number | undefined;
    from?: string;
    to?: string;
}

export const getTransactionListFiltersFromUrl = (
    url: string,
): IGetTransactionListFiltersFromUrlResult => {
    return {
        types: getTransactionTypesFromUrl(url),
        accountId: getAccountIdFromUrl(url),
        categoryId: getCategoryIdFromUrl(url),
        from: getDateFromFilterValue(url),
        to: getDateToFilterValue(url),
    };
};
