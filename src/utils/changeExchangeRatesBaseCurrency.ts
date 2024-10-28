import { TExchangeRates } from 'types/exchangeRates';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

type TChangeExchangeRatesBaseCurrency = (args: {
    exchangeRates: TExchangeRates;
    prevBaseCurrency: keyof typeof UserDefaultCurrencyEnum;
    newBaseCurrency: keyof typeof UserDefaultCurrencyEnum;
}) => TExchangeRates;

export const changeExchangeRatesBaseCurrency: TChangeExchangeRatesBaseCurrency =
    ({ exchangeRates, prevBaseCurrency, newBaseCurrency }) => {
        const newBaseCurrencyRate = 1 / exchangeRates[newBaseCurrency];

        const newExchangeRates: TExchangeRates = Object.entries(
            exchangeRates,
        ).reduce((acc, [key, rate]) => {
            const currency = key as UserDefaultCurrencyEnum;

            if (currency === newBaseCurrency) {
                return {
                    ...acc,
                    [currency]: 1,
                };
            }

            if (currency === prevBaseCurrency) {
                return {
                    ...acc,
                    [currency]: newBaseCurrencyRate,
                };
            }

            return {
                ...acc,
                [currency]: newBaseCurrencyRate * rate,
            };
        }, exchangeRates);

        return newExchangeRates;
    };
