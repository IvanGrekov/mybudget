import { QueryClient } from '@tanstack/react-query';

import { getDeleteSubcategory } from 'features/transaction-category-list/components/delete-transaction-category-modal/utils/getDeleteSubcategory';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import {
    getTransactionCategoriesQueryKey,
    getSingleTransactionCategoryQueryKey,
} from 'utils/queryKey.utils';

interface IDeleteTransactionCategoryArgs {
    queryClient: QueryClient;
    id: number;
    type: TransactionCategoryTypeEnum;
    hasChildren: boolean;
    parentId?: number;
}

export const deleteTransactionCategory = ({
    queryClient,
    id,
    type,
    hasChildren,
    parentId,
}: IDeleteTransactionCategoryArgs): void => {
    if (hasChildren) {
        queryClient.refetchQueries({
            queryKey: getTransactionCategoriesQueryKey({
                type,
            }),
        });
        queryClient.refetchQueries({
            queryKey: getTransactionCategoriesQueryKey(),
        });
    } else if (parentId) {
        const deleteSubcategory = getDeleteSubcategory(id, parentId);

        queryClient.setQueryData(
            getSingleTransactionCategoryQueryKey(parentId),
            deleteSubcategory,
        );

        queryClient.setQueryData(
            getTransactionCategoriesQueryKey({
                type,
            }),
            (oldTransactionCategoryList?: TransactionCategory[]) =>
                oldTransactionCategoryList?.map(deleteSubcategory),
        );

        queryClient.setQueryData(
            getTransactionCategoriesQueryKey(),
            (oldAllTransactionCategoryList?: TransactionCategory[]) =>
                oldAllTransactionCategoryList?.map(deleteSubcategory),
        );
    } else {
        queryClient.setQueryData(
            getTransactionCategoriesQueryKey({
                type,
            }),
            (oldTransactionCategoryList?: TransactionCategory[]) =>
                oldTransactionCategoryList?.filter(
                    (transactionCategory) => transactionCategory.id !== id,
                ) || [],
        );

        queryClient.setQueryData(
            getTransactionCategoriesQueryKey(),
            (oldAllTransactionCategoryList?: TransactionCategory[]) =>
                oldAllTransactionCategoryList?.filter(
                    (transactionCategory) => transactionCategory.id !== id,
                ) || [],
        );
    }
};
