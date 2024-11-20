import { TBalanceItems } from 'features/overall-balance/components/balance-details/types/balanceItems';

interface IGetBalancesByCurrencyResult {
    [key: string]: number;
}

export const getBalancesByCurrency = (
    balanceItems: TBalanceItems,
): IGetBalancesByCurrencyResult => {
    const result: IGetBalancesByCurrencyResult = {};

    balanceItems.forEach(({ balance, currency }) => {
        const currentBalance = result[currency] || 0;
        result[currency] = currentBalance + balance;
    });

    return result;
};
