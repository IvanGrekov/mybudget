import Typography from 'components/typography/Typography';
import { TTypographyVariants } from 'components/typography/types/typographyVariants';
import styles from 'features/transaction-list/components/additional-info/AdditionalInfo.module.scss';
import { Transaction } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface IAdditionalInfoProps {
    transaction: Transaction;
    textVariant?: TTypographyVariants;
}

export default function AdditionalInfo({
    transaction,
    textVariant = 'body2',
}: IAdditionalInfoProps): JSX.Element | null {
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
