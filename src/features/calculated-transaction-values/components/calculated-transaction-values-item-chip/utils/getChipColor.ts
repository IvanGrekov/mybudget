import { IChipProps } from 'components/chip/types/chipProps';
import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';

export default function getChipColor({
    title,
    considerFromAsIncome,
    considerToAsExpense,
}: ICalculatedTransactionValuesItemChipProps): IChipProps['color'] {
    if (title === 'from') {
        return considerFromAsIncome ? 'info' : 'error';
    }

    return considerToAsExpense ? 'info' : 'success';
}
