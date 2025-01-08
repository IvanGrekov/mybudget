import { EFetchingTags } from 'types/fetchingTags';
import {
    AccountStatusEnum,
    AccountTypeEnum,
    TransactionCategoryStatusEnum,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';

type TFetchingTags = string[];

export const getAccountsFetchingTagByType = (type: AccountTypeEnum): string => {
    return `${EFetchingTags.ACCOUNTS}-${type}`;
};

interface IGetAccountsFetchingTagsArgs {
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
}

export const getAccountsFetchingTags = (
    args?: IGetAccountsFetchingTagsArgs,
): TFetchingTags => {
    const { status = AccountStatusEnum.ACTIVE, type } = args || {};

    const result: TFetchingTags = [`${EFetchingTags.ACCOUNTS}-${status}`];

    if (type) {
        result.push(getAccountsFetchingTagByType(type));
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

interface IGetSingleTransactionCategoryFetchingTagsArgs {
    joinedTypes?: string;
    accountId?: number;
    transactionCategoryId?: number;
}

export const getTransactionsFetchingTags = (
    args?: IGetSingleTransactionCategoryFetchingTagsArgs,
): TFetchingTags => {
    const { joinedTypes, accountId, transactionCategoryId } = args || {};

    const result: string[] = [EFetchingTags.TRANSACTIONS];

    if (joinedTypes) {
        result.push(`${EFetchingTags.TRANSACTIONS}-${joinedTypes}`);
    }

    // TODO: Implement caching by limit and offset (IG)
    // tags.push(`${EFetchingTags.TRANSACTIONS}-offset-${offset}`);
    // tags.push(`${EFetchingTags.TRANSACTIONS}-limit-${limit}`);

    // TODO: Implement caching by date range (IG)

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

    if (transactionCategoryId) {
        result.push(
            `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.TRANSACTION_CATEGORY}_${transactionCategoryId}`,
        );

        if (joinedTypes) {
            result.push(
                `${EFetchingTags.TRANSACTIONS}-${EFetchingTags.TRANSACTION_CATEGORY}_${transactionCategoryId}-${joinedTypes}`,
            );
        }
    }

    return result;
};
