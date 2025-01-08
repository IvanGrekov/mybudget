import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { TApiClientResult } from 'types/apiClient.types';
import {
    Account,
    AccountTypeEnum,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface IUseCalculateOverallBalanceArgs {
    accounts?: TApiClientResult<Account[]>;
    userCurrency: UserDefaultCurrencyEnum;
}

export const useCalculateOverallBalance = ({
    accounts,
    userCurrency,
}: IUseCalculateOverallBalanceArgs): number => {
    const baseExchangeRates = useExchangeRatesContext(userCurrency);

    const balance = accounts?.reduce(
        (
            sum,
            {
                type,
                balance,
                currency,
                shouldShowAsIncome,
                shouldShowAsExpense,
                shouldHideFromOverallBalance,
            },
        ) => {
            if (shouldHideFromOverallBalance) {
                return sum;
            }

            const formattedBalance = Math.round(
                balance / baseExchangeRates[currency],
            );

            if (type === AccountTypeEnum.OWE_ME) {
                return shouldShowAsIncome ? sum + formattedBalance : sum;
            }

            if (type === AccountTypeEnum.I_OWE) {
                return shouldShowAsExpense ? sum - formattedBalance : sum;
            }

            return sum + formattedBalance;
        },
        0,
    );

    return roundValue(balance) || 0;
};
