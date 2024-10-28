'use client';

import { createContext, useContext, useMemo, PropsWithChildren } from 'react';

import { DEFAULT_EXCHANGE_RATES_BASE } from 'constants/defaultExchangeRatesBase';
import { TExchangeRates } from 'types/exchangeRates';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { changeExchangeRatesBaseCurrency } from 'utils/changeExchangeRatesBaseCurrency';

export const ExchangeRatesContext = createContext<TExchangeRates | null>(null);

interface IExchangeRatesProviderProps extends PropsWithChildren {
    exchangeRates: TExchangeRates;
}

export function ExchangeRatesProvider({
    exchangeRates,
    children,
}: IExchangeRatesProviderProps): JSX.Element {
    return (
        <ExchangeRatesContext.Provider value={exchangeRates}>
            {children}
        </ExchangeRatesContext.Provider>
    );
}

export const useExchangeRatesContext = (
    userCurrency?: keyof typeof UserDefaultCurrencyEnum,
): TExchangeRates => {
    const baseExchangeRates = useContext(ExchangeRatesContext);

    if (!baseExchangeRates) {
        throw new Error(
            'useExchangeRatesContext must be used within a ExchangeRatesProvider',
        );
    }

    return useMemo(() => {
        if (!userCurrency || userCurrency === DEFAULT_EXCHANGE_RATES_BASE) {
            return baseExchangeRates;
        }

        return changeExchangeRatesBaseCurrency({
            exchangeRates: baseExchangeRates,
            prevBaseCurrency: DEFAULT_EXCHANGE_RATES_BASE,
            newBaseCurrency: userCurrency,
        });
    }, [userCurrency, baseExchangeRates]);
};
