import Typography from 'components/typography/Typography';
import styles from 'features/calculated-transaction-values/components/calculated-transaction-values-item/CalculatedTransactionValuesItem.module.scss';
import CalculatedTransactionValuesItemChip from 'features/calculated-transaction-values/components/calculated-transaction-values-item-chip/CalculatedTransactionValuesItemChip';
import { ICalculatedTransactionValuesItemChipProps } from 'features/calculated-transaction-values/types/calculatedTransactionValuesItemChipProps';
import { roundValue } from 'utils/roundValue';

interface ICalculatedTransactionValuesItemProps
    extends ICalculatedTransactionValuesItemChipProps {
    value?: number;
    currency: string;
}

export default function CalculatedTransactionValuesItem({
    value,
    currency,
    ...chipProps
}: ICalculatedTransactionValuesItemProps): JSX.Element | null {
    if (!value) {
        return null;
    }

    return (
        <div className={styles['calculated-transaction-values-item']}>
            <CalculatedTransactionValuesItemChip {...chipProps} />
            <Typography variant="subtitle1">{`${roundValue(
                value,
            )} ${currency}`}</Typography>
        </div>
    );
}
