import { useCallback } from 'react';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderAccount } from 'actions/reorderAccount';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { useGetAccounts } from 'hooks/useGetAccounts';
import { useSortableItems } from 'hooks/useSortableItems';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { IReorderAccountArgs } from 'types/muBudgetApi.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
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
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            queryClient.setQueryData(
                getAccountsQueryKey({
                    types: [type],
                }),
                data,
            );
            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Account order',
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
    const { accounts, isLoading: isGetAccountsLoading } = useGetAccounts(type);

    const {
        sortableItems,
        setPrevSortableItems,
        setSortableItems,
        onSuccessfulUpdate,
        onFailedUpdate,
    } = useSortableItems(accounts);

    const { editAccountOrder, isEditOrderLoading } = useEditAccountOrder({
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

                editAccountOrder({
                    id: Number(active.id),
                    order: newIndex,
                });

                setPrevSortableItems(sortableItems);
                setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
            }
        },
        [
            sortableItems,
            editAccountOrder,
            setPrevSortableItems,
            setSortableItems,
        ],
    );

    return {
        sortableItems,
        isGetAccountsLoading,
        isEditOrderLoading,
        handleDragEnd,
    };
};
