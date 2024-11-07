import {
    TransactionCategory,
    ReorderParentTransactionCategoryDto,
    ReorderTransactionCategoryDto,
} from 'types/generated.types';

const getReorderChildTransactionCategories = (
    items: TransactionCategory[],
): ReorderTransactionCategoryDto[] => {
    return items.map(({ id, order }) => {
        return {
            id,
            order,
        };
    });
};

export const getReorderParentTransactionCategories = (
    items: TransactionCategory[],
): ReorderParentTransactionCategoryDto[] => {
    return items.map(({ id, children }, index) => {
        return {
            id,
            order: index,
            childNodes: getReorderChildTransactionCategories(children),
        };
    });
};
