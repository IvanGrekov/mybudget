import { useExchangeRatesContext } from 'contexts/ExchangeRatesContext';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import {
    AccountTypeEnum,
    UserDefaultCurrencyEnum,
} from 'types/generated.types';

interface IUseCalculateOverallBalanceResult {
    overallBalance: number;
    isLoading: boolean;
}

export const useCalculateOverallBalance = (
    userCurrency: UserDefaultCurrencyEnum,
): IUseCalculateOverallBalanceResult => {
    const baseExchangeRates = useExchangeRatesContext(userCurrency);
    const { accounts, isLoading } = useGetAllAccounts();

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

    return {
        overallBalance: balance || 0,
        isLoading,
    };
};
