'use client';

import cx from 'classnames';

import Chip from 'components/chip/Chip';
import styles from 'components/exchange-rates/ExchangeRates.module.scss';
import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { roundCurrencyRate } from 'utils/roundCurrencyRate';

interface IExchangeRatesProps {
    userCurrency: UserDefaultCurrencyEnum;
    className?: string;
}

export default function ExchangeRates({
    userCurrency,
    className,
}: IExchangeRatesProps): JSX.Element {
    const baseExchangeRates = useExchangeRatesContext(userCurrency);

    return (
        <div className={cx(styles.container, className)}>
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
