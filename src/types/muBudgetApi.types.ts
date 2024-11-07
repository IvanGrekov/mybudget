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
