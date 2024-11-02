import { TransactionTypeEnum } from 'types/generated.types';

export type TAvailableTransactionTypes =
    | TransactionTypeEnum.INCOME
    | TransactionTypeEnum.EXPENSE
    | TransactionTypeEnum.TRANSFER;

export type TTransactionTypesInput = TAvailableTransactionTypes[];
