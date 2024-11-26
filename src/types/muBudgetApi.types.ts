import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import {
    EditUserDto,
    EditUserCurrencyDto,
    User,
    AccountStatusEnum,
    AccountTypeEnum,
    TransactionCategoryStatusEnum,
    TransactionCategoryTypeEnum,
    ReorderParentTransactionCategoryDto,
    EditAccountCurrencyDto,
    EditTransactionCategoryCurrencyDto,
} from 'types/generated.types';

export interface IEditUserArgs extends EditUserDto {
    userId: User['id'];
}

export interface IEditUserCurrencyArgs extends EditUserCurrencyDto {
    userId: User['id'];
}

export interface IGetAccountsArgs {
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
}

export interface IGetTransactionCategoriesArgs {
    status?: TransactionCategoryStatusEnum;
    type?: TransactionCategoryTypeEnum;
}

export interface IGetTransactionsArgs {
    types?: TTransactionTypesInput;
    accountId?: number;
    transactionCategoryId?: number;
    limit?: number;
    offset?: number;
}

export interface IReorderAccountArgs {
    id: number;
    order: number;
}

export interface IReorderTransactionCategoriesArgs {
    parentNodes: ReorderParentTransactionCategoryDto[];
}

export interface IEditAccountCurrency extends EditAccountCurrencyDto {
    id: number;
}

export interface IEditTransactionCategoryCurrency
    extends EditTransactionCategoryCurrencyDto {
    id: number;
}
