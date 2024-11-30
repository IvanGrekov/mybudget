import { Account, EditAccountDto } from 'types/generated.types';

type TGetShouldEditAccount = (args: {
    account: Account;
    data: EditAccountDto;
}) => boolean;

export const getShouldEditAccount: TGetShouldEditAccount = ({
    account: {
        status,
        name,
        balance,
        shouldHideFromOverallBalance,
        shouldShowAsExpense,
        shouldShowAsIncome,
    },
    data: {
        status: newStatus,
        name: newName,
        balance: newBalance,
        shouldHideFromOverallBalance: newShouldHideFromOverallBalance,
        shouldShowAsExpense: newShouldShowAsExpense,
        shouldShowAsIncome: newShouldShowAsIncome,
    },
}) => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status !== newStatus ||
        name !== newName ||
        balance !== newBalance ||
        shouldHideFromOverallBalance !== newShouldHideFromOverallBalance ||
        shouldShowAsExpense !== newShouldShowAsExpense ||
        shouldShowAsIncome !== newShouldShowAsIncome
    );
};
