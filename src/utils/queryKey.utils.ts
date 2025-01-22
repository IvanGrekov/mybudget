import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'constants/pagination';
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
    categoryId?: number;
    limit?: number;
    offset?: number;
}

export const getTransactionsQueryKey = ({
    types = DEFAULT_TRANSACTION_TYPES,
    accountId,
    categoryId,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
}: IGetTransactionsQueryKeyArgs): unknown[] => {
    return [
        EFetchingTags.TRANSACTIONS,
        {
            types,
            accountId,
            categoryId,
            limit,
            offset,
        },
    ];
};

interface IGetTransactionCategoriesQueryKeyArgs {
    status?: TransactionCategoryStatusEnum;
    type?: TransactionCategoryTypeEnum;
}

export const getTransactionCategoriesQueryKey = (
    args?: IGetTransactionCategoriesQueryKeyArgs,
): unknown[] => {
    const { status = TransactionCategoryStatusEnum.ACTIVE, type } = args || {};

    return [EFetchingTags.TRANSACTION_CATEGORIES, { status, type }];
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
): unknown[] => {
    const { status = AccountStatusEnum.ACTIVE, type } = args || {};

    return [EFetchingTags.ACCOUNTS, { status, type }];
};

export const getSingleAccountQueryKey = (accountId: number): string[] => {
    return [EFetchingTags.ACCOUNT, accountId.toString()];
};

export const getSingleTransactionQueryKey = (
    transactionId: number,
): string[] => {
    return [EFetchingTags.TRANSACTION, transactionId.toString()];
};
