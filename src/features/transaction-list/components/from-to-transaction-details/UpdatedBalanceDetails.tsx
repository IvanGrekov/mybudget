import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import { AccountCurrencyEnum } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface IUpdatedBalanceDetailsProps {
    value: number;
    currency: AccountCurrencyEnum;
}

export default function UpdatedBalanceDetails({
    value,
    currency,
}: IUpdatedBalanceDetailsProps): JSX.Element {
    return (
        <Typography className={styles['updated-balance']}>
            Updated balance: {`${roundValue(value)} ${currency}`}
        </Typography>
    );
}
