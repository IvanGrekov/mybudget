import { Account } from 'types/generated.types';

type TUpdateAccount = (account?: Account) => unknown;

type TGetUpdateAccount = (updatedAccount: Account) => TUpdateAccount;

export const getUpdateAccount: TGetUpdateAccount = (updatedAccount) => {
    return (account) => {
        if (account?.id === updatedAccount.id) {
            const {
                status,
                name,
                balance,
                shouldHideFromOverallBalance,
                shouldShowAsIncome,
                shouldShowAsExpense,
            } = updatedAccount;

            return {
                ...account,
                status,
                name,
                balance,
                shouldHideFromOverallBalance,
                shouldShowAsIncome,
                shouldShowAsExpense,
            };
        }

        return account;
    };
};
