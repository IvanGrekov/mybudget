import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteTransactionCategory } from 'actions/deleteTransactionCategory';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { deleteTransactionCategory as deleteTransactionCategoryService } from 'features/transaction-category-list/components/delete-transaction-category-modal/services/deleteTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { TransactionCategoryTypeEnum } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleTransactionCategoryQueryKey } from 'utils/queryKey.utils';

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
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

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
                queryKey: [EFetchingTags.TRANSACTIONS],
            });

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Transaction Category',
                    isRemoving: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        remove: mutate,
        isLoading: isPending,
    };
};
