import {
    TransactionCategory,
    ReorderParentTransactionCategoryDto,
    ReorderTransactionCategoryDto,
} from 'types/generated.types';
import { Maybe } from 'types/utility.types';

const getReorderChildTransactionCategories = (
    items?: Maybe<TransactionCategory[]>,
): ReorderTransactionCategoryDto[] => {
    if (!items) {
        return [];
    }

    return items.map(({ id }, index) => {
        return {
            id,
            order: index,
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
