import styles from 'components/transaction-card-additional-info/TransactionCardAdditionalInfo.module.scss';
import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import { Transaction } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface ITransactionCardAdditionalInfoProps {
    transaction: Transaction;
    textVariant?: TTypographyVariants;
}

export default function TransactionCardAdditionalInfo({
    transaction,
    textVariant = 'body2',
}: ITransactionCardAdditionalInfoProps): JSX.Element | null {
    const {
        fromAccount,
        toAccount,
        toCategory,
        value,
        currency,
        fee,
        currencyRate,
    } = transaction;

    if (typeof fee !== 'number' && typeof currencyRate !== 'number') {
        return null;
    }

    const toCurrency = toAccount?.currency || toCategory?.currency;
    const feeForConvertedValue = fromAccount ? 0 : fee || 0;

    return (
        <div className={styles['additional-info-wrapper']}>
            {fee && (
                <Typography
                    variant={textVariant}
                    className={styles['additional-info-value']}
                >
                    Fee: {`${roundValue(fee)} ${currency}`}
                </Typography>
            )}

            {currencyRate && (
                <Typography
                    variant={textVariant}
                    className={styles['additional-info-value']}
                >
                    Converted to:{' '}
                    {`${roundValue(
                        (value - feeForConvertedValue) * currencyRate,
                    )} ${toCurrency}`}
                </Typography>
            )}
        </div>
    );
}
