import { UserDefaultCurrencyEnum } from 'types/generated.types';

export type TExchangeRates = {
    [key in UserDefaultCurrencyEnum]: number;
};
