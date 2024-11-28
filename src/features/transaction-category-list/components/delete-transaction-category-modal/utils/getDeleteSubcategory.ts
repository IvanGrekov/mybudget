import { TransactionCategory } from 'types/generated.types';

type TDeleteSubcategory = (
    category?: TransactionCategory | null,
) => TransactionCategory | null | undefined;

type TGetDeleteSubcategory = (
    id: number,
    parentId: number,
) => TDeleteSubcategory;

export const getDeleteSubcategory: TGetDeleteSubcategory = (id, parentId) => {
    return (
        parentCategory?: TransactionCategory | null,
    ): TransactionCategory | null | undefined => {
        if (parentCategory && parentCategory.id === parentId) {
            return {
                ...parentCategory,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                children: (parentCategory?.children || []).filter(
                    (child) => child.id !== id,
                ),
            };
        }

        return parentCategory;
    };
};
