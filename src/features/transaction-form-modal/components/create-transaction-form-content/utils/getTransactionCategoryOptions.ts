import { TransactionCategory } from 'types/generated.types';

export const getTransactionCategoryOptions = (
    transactionCategories: TransactionCategory[],
): TransactionCategory[] => {
    const result: TransactionCategory[] = [];

    for (const transactionCategory of transactionCategories) {
        const { children } = transactionCategory;

        result.push(transactionCategory);

        if (children?.length) {
            result.push(...children);
        }
    }

    return result;
};
