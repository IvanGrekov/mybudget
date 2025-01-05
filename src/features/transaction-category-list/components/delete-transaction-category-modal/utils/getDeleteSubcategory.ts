import { TransactionCategory } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

type TDeleteSubcategory = (
    category?: Maybe<TransactionCategory>,
) => Maybe<TransactionCategory>;

type TGetDeleteSubcategory = (
    id: number,
    parentId: number,
) => TDeleteSubcategory;

export const getDeleteSubcategory: TGetDeleteSubcategory = (id, parentId) => {
    return (
        parentCategory?: Maybe<TransactionCategory>,
    ): Maybe<TransactionCategory> => {
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
