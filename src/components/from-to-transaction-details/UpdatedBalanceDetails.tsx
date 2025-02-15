import styles from 'components/from-to-transaction-details/FromToTransactionDetails.module.scss';
import Typography from 'components/typography/Typography';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
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
    const title = useGetEntityNameTranslations()('updated_balance');

    return (
        <Typography className={styles['updated-balance']}>
            {title}: {`${roundValue(value)} ${currency}`}
        </Typography>
    );
}
