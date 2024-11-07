import { useCallback } from 'react';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderTransactionCategories } from 'actions/reorderTransactionCategories';
import { getReorderParentTransactionCategories } from 'features/transaction-categories-reordering/components/transaction-categories-list/utils/getReorderParentTransactionCategories';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { useGetTransactionCategories } from 'hooks/useGetTransactionCategories';
import { useSortableItems } from 'hooks/useSortableItems';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { IReorderTransactionCategoriesArgs } from 'types/muBudgetApi.types';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

type TReorderTransactionCategories = (
    args: IReorderTransactionCategoriesArgs,
) => void;

type TUseReorderTransactionCategories = (args: {
    type: TransactionCategoryTypeEnum;
    onSuccess: VoidFunction;
    onError: VoidFunction;
}) => {
    reorderTransactionCategories: TReorderTransactionCategories;
    isEditOrderLoading: boolean;
};

const useReorderTransactionCategories: TUseReorderTransactionCategories = ({
    type,
    onSuccess,
    onError,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: IReorderTransactionCategoriesArgs) => {
            return reorderTransactionCategories({ type, ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                getTransactionCategoriesQueryKey({
                    type,
                }),
                data,
            );
            addSuccessMessage({
                message: 'Transaction Category order has been updated!',
            });
            onSuccess();
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
            onError();
        },
    });

    return {
        reorderTransactionCategories: mutate,
        isEditOrderLoading: isPending,
    };
};

interface IUseSortableTransactionCategoriesResult {
    sortableItems: TransactionCategory[];
    isGetTransactionCategoriesLoading: boolean;
    isEditOrderLoading: boolean;
    handleDragEnd: (event: DragEndEvent) => void;
}

export const useSortableTransactionCategories = (
    type: TransactionCategoryTypeEnum,
): IUseSortableTransactionCategoriesResult => {
    const {
        transactionCategories,
        isLoading: isGetTransactionCategoriesLoading,
    } = useGetTransactionCategories(type);

    const {
        sortableItems,
        setPrevSortableItems,
        setSortableItems,
        onSuccessfulUpdate,
        onFailedUpdate,
    } = useSortableItems(transactionCategories);

    const { reorderTransactionCategories, isEditOrderLoading } =
        useReorderTransactionCategories({
            type,
            onSuccess: onSuccessfulUpdate,
            onError: onFailedUpdate,
        });

    const handleDragEnd = useCallback(
        ({ active, over }: DragEndEvent): void => {
            if (over && active.id !== over.id) {
                const oldIndex = sortableItems.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = sortableItems.findIndex(
                    (item) => item.id === over.id,
                );

                const newSortableItems = arrayMove(
                    sortableItems,
                    oldIndex,
                    newIndex,
                );

                reorderTransactionCategories({
                    parentNodes:
                        getReorderParentTransactionCategories(newSortableItems),
                });

                setPrevSortableItems(sortableItems);
                setSortableItems(newSortableItems);
            }
        },
        [
            sortableItems,
            reorderTransactionCategories,
            setPrevSortableItems,
            setSortableItems,
        ],
    );

    return {
        sortableItems,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragEnd,
    };
};
