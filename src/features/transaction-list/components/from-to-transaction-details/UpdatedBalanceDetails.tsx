import Typography from 'components/typography/Typography';
import styles from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import { AccountCurrencyEnum } from 'types/generated.types';

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
            Updated balance: {`${value} ${currency}`}
        </Typography>
    );
}
