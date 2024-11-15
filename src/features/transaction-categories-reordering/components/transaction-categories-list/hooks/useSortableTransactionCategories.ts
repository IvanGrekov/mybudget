import { useCallback } from 'react';

import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderTransactionCategories } from 'actions/reorderTransactionCategories';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { ROOT_CONTAINER_ID } from 'constants/dragDrop.constants';
import { getNewSortableItemsOnParentChanging } from 'features/transaction-categories-reordering/components/transaction-categories-list/utils/getNewSortableItemsOnParentChanging';
import { getNewSortableItemsOnRootReordering } from 'features/transaction-categories-reordering/components/transaction-categories-list/utils/getNewSortableItemsOnRootReordering';
import { getNewSortableItemsOnSubcategoryReordering } from 'features/transaction-categories-reordering/components/transaction-categories-list/utils/getNewSortableItemsOnSubcategoryReordering';
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
import { getSuccessMessage } from 'utils/getSuccessMesage';
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
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            queryClient.setQueryData(
                getTransactionCategoriesQueryKey({
                    type,
                }),
                data,
            );
            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction Category order',
                    isEditing: true,
                }),
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
    activeItem: TransactionCategory | null;
    isGetTransactionCategoriesLoading: boolean;
    isEditOrderLoading: boolean;
    handleDragStart: (event: DragStartEvent) => void;
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
        activeItem,
        setActiveItem,
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
            const currentActiveItem = activeItem;
            setActiveItem(null);

            if (!over || over.id === active.id || !active.data.current) {
                return;
            }

            let newSortableItems: TransactionCategory[] | null = null;

            const sortableContainerId =
                active.data.current.sortable.containerId;
            const isRootReordering = sortableContainerId === ROOT_CONTAINER_ID;
            const overParentElement = isRootReordering
                ? null
                : sortableItems.find(({ id, children }) => {
                      if (id === over.id) {
                          return true;
                      }

                      return children.some((child) => child.id === over.id);
                  });
            const isParentChanging =
                currentActiveItem?.parent &&
                currentActiveItem.parent.id !== overParentElement?.id;

            if (isParentChanging) {
                newSortableItems = getNewSortableItemsOnParentChanging({
                    overParentElement,
                    currentActiveItem,
                    sortableItems,
                    active,
                    over,
                });
            } else if (isRootReordering) {
                newSortableItems = getNewSortableItemsOnRootReordering({
                    sortableItems,
                    active,
                    over,
                });
            } else {
                newSortableItems = getNewSortableItemsOnSubcategoryReordering({
                    sortableItems,
                    sortableContainerId,
                    active,
                    over,
                });
            }

            if (!newSortableItems) {
                return;
            }

            reorderTransactionCategories({
                parentNodes:
                    getReorderParentTransactionCategories(newSortableItems),
            });

            setPrevSortableItems(sortableItems);
            setSortableItems(newSortableItems);
        },
        [
            activeItem,
            sortableItems,
            reorderTransactionCategories,
            setPrevSortableItems,
            setSortableItems,
            setActiveItem,
        ],
    );

    const handleDragStart = ({
        active: { id: activeId },
    }: DragStartEvent): void => {
        for (const item of sortableItems) {
            const { id, children } = item;

            if (id === activeId) {
                setActiveItem(item);
                break;
            }

            if (children.length) {
                for (const child of children) {
                    if (child.id === activeId) {
                        setActiveItem({
                            ...child,
                            parent: item,
                        });
                        break;
                    }
                }
            }
        }
    };

    return {
        sortableItems,
        activeItem,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragStart,
        handleDragEnd,
    };
};
