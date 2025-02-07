import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveTransactionCategory } from 'actions/archiveTransactionCategory';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { deleteTransactionCategory } from 'features/delete-transaction-category-modal/services/deleteTransactionCategory';
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
    onCompleted?: VoidFunction;
}) => {
    archive: VoidFunction;
    isLoading: boolean;
};

export const useArchiveTransactionCategory: TUseArchiveTransactionCategory = ({
    id,
    type,
    hasChildren,
    parentId,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return archiveTransactionCategory(id, parentId);
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

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

            onCompleted?.();

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Transaction Category',
                    isArchiving: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        archive: mutate,
        isLoading: isPending,
    };
};
