import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategoryStatusEnum,
    TransactionCategoryTypeEnum,
    AccountStatusEnum,
    AccountTypeEnum,
} from 'types/generated.types';

interface IGetTransactionsQueryKeyArgs {
    types: TTransactionTypesInput;
}

export const getTransactionsQueryKey = ({
    types,
}: IGetTransactionsQueryKeyArgs): string[] => {
    // TODO: Add offset and limit to keys
    return [EFetchingTags.TRANSACTIONS, ...types.join()];
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
