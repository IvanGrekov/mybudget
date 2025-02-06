import { TransactionCategory } from 'types/generated.types';

export interface IEditTransactionCategoryModalDataProps {
    transactionCategory: TransactionCategory;
    parentId?: number;
    hasChildren?: boolean;
    onArchive?: VoidFunction;
}
