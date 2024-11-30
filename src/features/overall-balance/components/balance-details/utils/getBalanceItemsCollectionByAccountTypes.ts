import { IBalanceItemsCollection } from 'features/overall-balance/components/balance-details/types/balanceItems';
import { Account } from 'types/generated.types';

export const getBalanceItemsCollectionByAccountTypes = (
    accounts: Account[],
): IBalanceItemsCollection => {
    const result: IBalanceItemsCollection = {};

    accounts.forEach((account) => {
        const { type, balance, currency, shouldHideFromOverallBalance } =
            account;

        if (balance === 0 || shouldHideFromOverallBalance) {
            return;
        }

        const currentBalanceItems = result[type] || [];
        currentBalanceItems.push({ balance, currency });
        result[type] = currentBalanceItems;
    });

    return result;
};
