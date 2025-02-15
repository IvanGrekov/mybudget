import Chip from 'components/chip/Chip';
import getChipColor from 'features/calculated-transaction-values/components/calculated-transaction-values-item-chip/utils/getChipColor';
import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

export default function CalculatedTransactionValuesItemChip({
    title,
    considerFromAsIncome,
    considerToAsExpense,
}: ICalculatedTransactionValuesItemChipProps): JSX.Element {
    const [fromText, toText] = useGetFeatureTranslations({
        featureName: 'Transactions',
        keys: ['from', 'to'],
    });

    return (
        <Chip
            title={title === 'from' ? fromText : toText}
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
