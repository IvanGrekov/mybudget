'use client';

import Chip from 'components/chip/Chip';
import styles from 'components/exchange-rates/ExchangeRates.module.scss';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { roundCurrencyRate } from 'utils/roundCurrencyRate';

interface IExchangeRatesProps {
    userCurrency: UserDefaultCurrencyEnum;
}

export default function ExchangeRates({
    userCurrency,
}: IExchangeRatesProps): JSX.Element {
    const baseExchangeRates = useExchangeRatesContext(userCurrency);

    return (
        <div className={styles.container}>
            {Object.entries(baseExchangeRates).map(([currency, rate]) => {
                if (currency === userCurrency) {
                    return null;
                }

                return (
                    <Chip
                        key={currency}
                        title={`${currency}: ${roundCurrencyRate(rate)}`}
                        size="small"
                        titleVariant="body1"
                        className={styles.chip}
                    />
                );
            })}
        </div>
    );
}
