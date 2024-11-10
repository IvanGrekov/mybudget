import { useCallback } from 'react';

import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderTransactionCategories } from 'actions/reorderTransactionCategories';
import { ROOT_CONTAINER_ID } from 'constants/dragDrop.constants';
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
import { getIndexes } from 'utils/sortableItems.utils';

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
    handleDragOver: (event: DragOverEvent) => void;
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
            if (!over || over.id === active.id) {
                return;
            }

            let newSortableItems: TransactionCategory[] = [];

            const sortableContainerId =
                active.data.current?.sortable.containerId;
            const isRootReordering = sortableContainerId === ROOT_CONTAINER_ID;

            if (isRootReordering) {
                const { oldIndex, newIndex } = getIndexes({
                    items: sortableItems,
                    active,
                    over,
                });

                newSortableItems = arrayMove(sortableItems, oldIndex, newIndex);
            } else {
                const { id: parentId, children } =
                    sortableItems.find(
                        ({ id }) => id === parseInt(sortableContainerId),
                    ) || {};

                if (!parentId || !children) {
                    return;
                }

                const { oldIndex, newIndex } = getIndexes({
                    items: children,
                    active,
                    over,
                });

                const newSortableChildItems = arrayMove(
                    children,
                    oldIndex,
                    newIndex,
                );

                newSortableItems = sortableItems.map((item) =>
                    item.id === parentId
                        ? {
                              ...item,
                              children: newSortableChildItems,
                          }
                        : item,
                );
            }

            reorderTransactionCategories({
                parentNodes:
                    getReorderParentTransactionCategories(newSortableItems),
            });

            setPrevSortableItems(sortableItems);
            setSortableItems(newSortableItems);
        },
        [
            sortableItems,
            reorderTransactionCategories,
            setPrevSortableItems,
            setSortableItems,
        ],
    );

    const handleDragOver = useCallback((event: DragOverEvent) => {
        event;
        // console.log('over event', event);
    }, []);

    return {
        sortableItems,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragEnd,
        handleDragOver,
    };
};
