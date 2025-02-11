import { ICalculatedTransactionValues } from 'features/calculated-transaction-values/types/calculatedTransactionValues';
import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';

export interface ICalculatedTransactionValuesDetailsModalData
    extends Pick<
        ICalculatedTransactionValuesItemChipProps,
        'considerToAsExpense' | 'considerFromAsIncome'
    > {
    fromDateLabel?: string;
    toDateLabel?: string;
    entityName: string;
    mainCurrency: string;
    data: ICalculatedTransactionValues;
}
