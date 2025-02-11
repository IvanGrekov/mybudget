import Chip from 'components/chip/Chip';
import getChipColor from 'features/calculated-transaction-values/components/calculated-transaction-values-item-chip/utils/getChipColor';
import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';
import { getCapitalizedString } from 'utils/string.utils';

export default function CalculatedTransactionValuesItemChip({
    title,
    considerFromAsIncome,
    considerToAsExpense,
}: ICalculatedTransactionValuesItemChipProps): JSX.Element {
    return (
        <Chip
            title={getCapitalizedString(title)}
            variant="contained"
            size="small"
            titleVariant="body2"
            color={getChipColor({
                title,
                considerFromAsIncome,
                considerToAsExpense,
            })}
        />
    );
}
