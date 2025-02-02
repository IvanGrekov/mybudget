import 'server-only';

import { DEFAULT_EXCHANGE_RATES_BASE } from 'constants/defaultExchangeRatesBase';
import { TExchangeRates } from 'types/exchangeRates';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { changeExchangeRatesBaseCurrency } from 'utils/changeExchangeRatesBaseCurrency';

const ACCESS_KEY = process.env.EXCHANGE_RATE_ACCESS_KEY;
const SYMBOLS = Object.values(UserDefaultCurrencyEnum).join();
const ERROR_MESSAGE = 'Failed to fetch exchange rates';

export const getExchangeRates = async (): Promise<TExchangeRates> => {
    const response = await fetch(
        `https://api.exchangeratesapi.io/v1/latest?access_key=${ACCESS_KEY}&symbols=${SYMBOLS}&format=1`,
        {
            next: {
                // NOTE: Revalidate every 3 days
                revalidate: 60 * 60 * 24 * 3,
            },
        },
    );

    if (!response.ok) {
        throw new Error(ERROR_MESSAGE);
    }

    const data = await response.json();

    if (!data.success || !data.rates) {
        throw new Error(ERROR_MESSAGE);
    }

    return changeExchangeRatesBaseCurrency({
        exchangeRates: data.rates,
        // NOTE: Base currency in APU is EUR
        // NOTE: Not able to change `base` currency in the free plan
        prevBaseCurrency: 'EUR',
        newBaseCurrency: DEFAULT_EXCHANGE_RATES_BASE,
    });
};
