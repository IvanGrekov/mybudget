import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveTransactionCategory } from 'actions/archiveTransactionCategory';
import { deleteTransactionCategory } from 'features/transaction-category-list/components/delete-transaction-category-modal/services/deleteTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleTransactionCategoryQueryKey } from 'utils/queryKey.utils';

type TUseArchiveTransactionCategory = (args: {
    id: number;
    type: TransactionCategoryTypeEnum;
    hasChildren: boolean;
    parentId?: number;
}) => {
    archive: VoidFunction;
    isLoading: boolean;
};

export const useArchiveTransactionCategory: TUseArchiveTransactionCategory = ({
    id,
    type,
    hasChildren,
    parentId,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return archiveTransactionCategory(id, parentId);
        },
        onSuccess: () => {
            deleteTransactionCategory({
                queryClient,
                id,
                type,
                hasChildren,
                parentId,
            });

            queryClient.setQueryData(
                getSingleTransactionCategoryQueryKey(id),
                (category?: TransactionCategory) => {
                    if (category) {
                        return {
                            ...category,
                            status: TransactionCategoryStatusEnum.ARCHIVED,
                        };
                    }

                    return category;
                },
            );

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction Category',
                    isArchiving: true,
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
        archive: mutate,
        isLoading: isPending,
    };
};
