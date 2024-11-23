import { TransactionCategory } from 'types/generated.types';

export type TDeleteTransactionCategoryModalDataProps = Pick<
    TransactionCategory,
    'id' | 'type' | 'name'
> & {
    hasChildren: boolean;
    isSubcategory?: boolean;
};
