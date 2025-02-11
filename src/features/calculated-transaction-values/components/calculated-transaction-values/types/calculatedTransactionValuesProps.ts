import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';

export interface ICalculatedTransactionValuesProps
    extends Pick<
        ICalculatedTransactionValuesItemChipProps,
        'considerFromAsIncome' | 'considerToAsExpense'
    > {
    accountId?: number;
    categoryId?: number;
}
