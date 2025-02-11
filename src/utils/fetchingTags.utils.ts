import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'constants/pagination';
import { EFetchingTags } from 'types/fetchingTags';
import {
    AccountStatusEnum,
    AccountTypeEnum,
    TransactionCategoryStatusEnum,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';

type TFetchingTags = string[];

export const getAccountsFetchingTagByType = (
    types: AccountTypeEnum[],
): string => {
    return `${EFetchingTags.ACCOUNTS}-${types.join('-')}`;
};

interface IGetAccountsFetchingTagsArgs {
    status?: AccountStatusEnum;
    types?: AccountTypeEnum[];
}

export const getAccountsFetchingTags = (
    args?: IGetAccountsFetchingTagsArgs,
): TFetchingTags => {
    const { status = AccountStatusEnum.ACTIVE, types } = args || {};

    const result: TFetchingTags = [`${EFetchingTags.ACCOUNTS}-${status}`];

    if (types) {
        result.push(getAccountsFetchingTagByType(types));
    }

    return result;
};

export const getSingleAccountFetchingTag = (accountId: number): string => {
    return `${EFetchingTags.ACCOUNT}-${accountId}`;
};

export const getTransactionCategoriesFetchingTagByType = (
    type: TransactionCategoryTypeEnum,
): string => {
    return `${EFetchingTags.TRANSACTION_CATEGORIES}-${type}`;
};

interface IGetTransactionCategoriesFetchingTagsArgs {
    status?: TransactionCategoryStatusEnum;
    type?: TransactionCategoryTypeEnum;
}

export const getTransactionCategoriesFetchingTags = (
    args?: IGetTransactionCategoriesFetchingTagsArgs,
): TFetchingTags => {
    const { status = TransactionCategoryStatusEnum.ACTIVE, type } = args || {};

    const result: TFetchingTags = [
        `${EFetchingTags.TRANSACTION_CATEGORIES}-${status}`,
    ];

    if (type) {
        result.push(getTransactionCategoriesFetchingTagByType(type));
    }

    return result;
};

export const getSingleTransactionCategoryFetchingTag = (
    transactionCategoryId: number,
): string => {
    return `${EFetchingTags.TRANSACTION_CATEGORY}-${transactionCategoryId}`;
};

interface IGetTransactionsFetchingTagsArgs {
    joinedTypes?: string;
    accountId?: number;
    categoryId?: number;
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
}

export const getTransactionsFetchingTags = (
    args?: IGetTransactionsFetchingTagsArgs,
): TFetchingTags => {
    const {
        joinedTypes,
        accountId,
        categoryId,
        from,
        to,
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
    } = args || {};

    const result: string[] = [EFetchingTags.TRANSACTIONS];

    if (joinedTypes) {
        result.push(`${EFetchingTags.TRANSACTIONS}-${joinedTypes}`);
    }

    result.push(`${EFetchingTags.TRANSACTIONS}-offset-${offset}`);
    result.push(`${EFetchingTags.TRANSACTIONS}-limit-${limit}`);

    if (accountId) {
        result.push(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.ACCOUNT}_${accountId}`,
        );

        if (joinedTypes) {
            result.push(
                `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.ACCOUNT}_${accountId}-${joinedTypes}`,
            );
        }
    }

    if (categoryId) {
        result.push(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.TRANSACTION_CATEGORY}_${categoryId}`,
        );

        if (joinedTypes) {
            result.push(
                `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.TRANSACTION_CATEGORY}_${categoryId}-${joinedTypes}`,
            );
        }
    }

    if (from) {
        result.push(`${EFetchingTags.TRANSACTIONS}-from-${from}`);
    }

    if (to) {
        result.push(`${EFetchingTags.TRANSACTIONS}-to-${to}`);
    }

    return result;
};

type TGetCalculatedTransactionValuesFetchingTagsArgs = Pick<
    IGetTransactionsFetchingTagsArgs,
    'accountId' | 'categoryId' | 'from' | 'to'
>;

export const getCalculatedTransactionValuesFetchingTags = (
    args: TGetCalculatedTransactionValuesFetchingTagsArgs,
): TFetchingTags => {
    const { accountId, categoryId, from, to } = args;

    const result: string[] = [];

    if (accountId) {
        result.push(
            `${EFetchingTags.CALCULATED_TRANSACTION_VALUES}-${accountId}`,
        );
    }

    if (categoryId) {
        result.push(
            `${EFetchingTags.CALCULATED_TRANSACTION_VALUES}-${categoryId}`,
        );
    }

    if (from) {
        result.push(
            `${EFetchingTags.CALCULATED_TRANSACTION_VALUES}-from-${from}`,
        );
    }

    if (to) {
        result.push(`${EFetchingTags.CALCULATED_TRANSACTION_VALUES}-to-${to}`);
    }

    return result;
};

export const getSingleTransactionFetchingTag = (
    transactionId: number,
): string => {
    return `${EFetchingTags.TRANSACTION}-${transactionId}`;
};
