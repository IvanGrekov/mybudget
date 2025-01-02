import { TransactionCategory } from 'types/generated.types';

type TAddSubcategory = (
    category?: TransactionCategory | null,
) => TransactionCategory | null | undefined;

type TGetAddSubcategory = (newCategory: TransactionCategory) => TAddSubcategory;

export const getAddSubcategory: TGetAddSubcategory = (newCategory) => {
    return (
        parentCategory?: TransactionCategory | null,
    ): TransactionCategory | null | undefined => {
        if (parentCategory && parentCategory.id === newCategory.parent?.id) {
            return {
                ...parentCategory,
                children: [
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    ...(parentCategory?.children || []),
                    newCategory,
                ],
            };
        }

        return parentCategory;
    };
};
