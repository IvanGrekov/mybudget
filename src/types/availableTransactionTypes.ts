import { TransactionTypeEnum } from 'types/generated.types';

type TAvailableTransactionTypes =
    | TransactionTypeEnum.INCOME
    | TransactionTypeEnum.EXPENSE
    | TransactionTypeEnum.TRANSFER
    | TransactionTypeEnum.BALANCE_CORRECTION;

export type TTransactionTypesInput = TAvailableTransactionTypes[];
