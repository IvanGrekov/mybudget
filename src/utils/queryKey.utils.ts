import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
// TODO: Implement caching by limit and offset (IG)
// import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'constants/pagination';
import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategoryStatusEnum,
    TransactionCategoryTypeEnum,
    AccountStatusEnum,
    AccountTypeEnum,
} from 'types/generated.types';

interface IGetTransactionsQueryKeyArgs {
    types?: TTransactionTypesInput;
    accountId?: number;
    transactionCategoryId?: number;
    limit?: number;
    offset?: number;
}

export const getTransactionsQueryKey = (
    args?: IGetTransactionsQueryKeyArgs,
): string[] => {
    const {
        types = DEFAULT_TRANSACTION_TYPES,
        accountId,
        transactionCategoryId,
        // TODO: Implement caching by limit and offset (IG)
        // limit = DEFAULT_LIMIT,
        // offset = DEFAULT_OFFSET,
    } = args || {};

    const result: string[] = [
        EFetchingTags.TRANSACTIONS,
        ...types.join(),
        // limit.toString(),
        // offset.toString(),
    ];

    if (accountId) {
        result.push(`account-${accountId}`);
    }

    if (transactionCategoryId) {
        result.push(`category-${transactionCategoryId}`);
    }

    return result;
};

interface IGetTransactionCategoriesQueryKeyArgs {
    status?: TransactionCategoryStatusEnum;
    type?: TransactionCategoryTypeEnum;
}

export const getTransactionCategoriesQueryKey = (
    args?: IGetTransactionCategoriesQueryKeyArgs,
): string[] => {
    const { status = TransactionCategoryStatusEnum.ACTIVE, type } = args || {};
    const result: string[] = [EFetchingTags.TRANSACTION_CATEGORIES, status];

    if (type) {
        result.push(type);
    }

    return result;
};

export const getSingleTransactionCategoryQueryKey = (
    categoryId: number,
): string[] => [EFetchingTags.TRANSACTION_CATEGORY, categoryId.toString()];

interface IGetAccountsQueryKeyArgs {
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
}

export const getAccountsQueryKey = (
    args?: IGetAccountsQueryKeyArgs,
): string[] => {
    const { status = AccountStatusEnum.ACTIVE, type } = args || {};
    const result: string[] = [EFetchingTags.ACCOUNTS, status];

    if (type) {
        result.push(type);
    }

    return result;
};

export const getSingleAccountQueryKey = (accountId: number): string[] => [
    EFetchingTags.ACCOUNT,
    accountId.toString(),
];
