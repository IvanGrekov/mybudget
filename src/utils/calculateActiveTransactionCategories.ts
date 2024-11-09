import { TransactionCategory } from 'types/generated.types';

export const calculateActiveTransactionCategories = (
    activeTransactionCategories: TransactionCategory[],
): number => {
    return activeTransactionCategories.reduce(
        (acc, { children }) => acc + children.length + 1,
        0,
    );
};
