import { TTransactionTypesInput } from 'types/availableTransactionTypes';
import { TransactionTypeEnum } from 'types/generated.types';

export const DEFAULT_TRANSACTION_TYPES: TTransactionTypesInput = [
    TransactionTypeEnum.INCOME,
    TransactionTypeEnum.EXPENSE,
    TransactionTypeEnum.TRANSFER,
    TransactionTypeEnum.BALANCE_CORRECTION,
];
