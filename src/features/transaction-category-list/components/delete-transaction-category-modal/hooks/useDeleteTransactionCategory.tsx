import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteTransactionCategory } from 'actions/deleteTransactionCategory';
import { deleteTransactionCategory as deleteTransactionCategoryService } from 'features/transaction-category-list/components/delete-transaction-category-modal/services/deleteTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { TransactionCategoryTypeEnum } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getSingleTransactionCategoryQueryKey,
    getTransactionsQueryKey,
} from 'utils/queryKey.utils';

type TUseDeleteTransactionCategory = (args: {
    id: number;
    type: TransactionCategoryTypeEnum;
    shouldRemoveChildren: boolean;
    hasChildren: boolean;
    parentId?: number;
}) => {
    remove: VoidFunction;
    isLoading: boolean;
};

export const useDeleteTransactionCategory: TUseDeleteTransactionCategory = ({
    id,
    type,
    shouldRemoveChildren,
    hasChildren,
    parentId,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteTransactionCategory({
                id,
                shouldRemoveChildren,
                parentId,
            });
        },
        onSuccess: () => {
            deleteTransactionCategoryService({
                queryClient,
                id,
                type,
                hasChildren,
                parentId,
            });

            queryClient.invalidateQueries({
                queryKey: getSingleTransactionCategoryQueryKey(id),
            });

            queryClient.invalidateQueries({
                queryKey: getTransactionsQueryKey(),
            });

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction Category',
                    isRemoving: true,
                }),
            });
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    return {
        remove: mutate,
        isLoading: isPending,
    };
};
