import { useState, useLayoutEffect, useCallback } from 'react';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderAccount } from 'actions/reorderAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { useGetAccounts } from 'hooks/useGetAccounts';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { IReorderAccountArgs } from 'types/muBudgetApi.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

type TEditAccountOrder = (args: IReorderAccountArgs) => void;

type TUseEditAccountOrder = (args: {
    type: AccountTypeEnum;
    onSuccess: VoidFunction;
    onError: VoidFunction;
}) => {
    editAccountOrder: TEditAccountOrder;
    isEditOrderLoading: boolean;
};

const useEditAccountOrder: TUseEditAccountOrder = ({
    type,
    onSuccess,
    onError,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: IReorderAccountArgs) => {
            return reorderAccount({ type, ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                getAccountsQueryKey({
                    type,
                }),
                data,
            );
            addSuccessMessage({
                message: 'Account order has been updated!',
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
        editAccountOrder: mutate,
        isEditOrderLoading: isPending,
    };
};

interface IUseSortableAccountsResult {
    sortableItems: Account[];
    isGetAccountsLoading: boolean;
    isEditOrderLoading: boolean;
    handleDragEnd: (event: DragEndEvent) => void;
}

export const useSortableAccounts = (
    type: AccountTypeEnum,
): IUseSortableAccountsResult => {
    const [prevSortableItems, setPrevSortableItems] = useState<Account[]>([]);
    const [sortableItems, setSortableItems] = useState<Account[]>([]);

    const { accounts, isLoading: isGetAccountsLoading } = useGetAccounts(type);
    const { editAccountOrder, isEditOrderLoading } = useEditAccountOrder({
        type,
        onSuccess: () => {
            setPrevSortableItems(sortableItems);
        },
        onError: () => {
            setSortableItems(prevSortableItems);
        },
    });

    useLayoutEffect(() => {
        if (accounts) {
            setPrevSortableItems(accounts);
            setSortableItems(accounts);
        }
    }, [accounts]);

    const handleDragEnd = useCallback(
        ({ active, over }: DragEndEvent): void => {
            if (over && active.id !== over.id) {
                const oldIndex = sortableItems.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = sortableItems.findIndex(
                    (item) => item.id === over.id,
                );

                editAccountOrder({
                    id: Number(active.id),
                    order: newIndex,
                });

                setPrevSortableItems(sortableItems);
                setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
            }
        },
        [sortableItems, editAccountOrder],
    );

    return {
        sortableItems,
        isGetAccountsLoading,
        isEditOrderLoading,
        handleDragEnd,
    };
};
