import { TransactionCategory } from 'types/generated.types';

export const calculateActiveTransactionCategories = (
    activeTransactionCategories: TransactionCategory[],
): number => {
    return activeTransactionCategories.reduce(
        (acc, { children }) => acc + (children?.length || 0) + 1,
        0,
    );
};
