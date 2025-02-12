import Typography from 'components/typography/Typography';
import styles from 'features/calculated-transaction-values/components/calculated-transaction-values-item-details/CalculatedTransactionValuesItemDetails.module.scss';
import { ICalculatedTransactionValuesItem } from 'features/calculated-transaction-values/types/calculatedTransactionValues';
import { roundValue } from 'utils/roundValue';

interface ICalculatedTransactionValuesItemDetailsProps {
    data: ICalculatedTransactionValuesItem;
}

export default function CalculatedTransactionValuesItemDetails({
    data,
}: ICalculatedTransactionValuesItemDetailsProps): JSX.Element | null {
    const entries = Object.entries(data).filter(
        ([currency]) => currency !== 'overall',
    );

    if (entries.length === 0) {
        return null;
    }

    return (
        <ul className={styles['item-details']}>
            {entries.map(([currency, value]) => (
                <li key={currency}>
                    <Typography>
                        {roundValue(value)} {currency}
                    </Typography>
                </li>
            ))}
        </ul>
    );
}
