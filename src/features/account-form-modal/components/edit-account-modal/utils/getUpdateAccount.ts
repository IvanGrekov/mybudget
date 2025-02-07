import { Account } from 'types/generated.types';

type TUpdateAccount = (account?: Account) => unknown;

type TGetUpdateAccount = (updatedAccount: Account) => TUpdateAccount;

export const getUpdateAccount: TGetUpdateAccount = (updatedAccount) => {
    const {
        status,
        name,
        balance,
        shouldHideFromOverallBalance,
        shouldShowAsIncome,
        shouldShowAsExpense,
        iconName,
        iconColor,
    } = updatedAccount;

    return (account) => {
        if (account?.id === updatedAccount.id) {
            return {
                ...account,
                status,
                name,
                balance,
                shouldHideFromOverallBalance,
                shouldShowAsIncome,
                shouldShowAsExpense,
                iconName,
                iconColor,
            };
        }

        return account;
    };
};
