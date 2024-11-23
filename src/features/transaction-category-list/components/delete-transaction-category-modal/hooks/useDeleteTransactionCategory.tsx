import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteTransactionCategory } from 'actions/deleteTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getTransactionCategoriesQueryKey,
    getTransactionsQueryKey,
} from 'utils/queryKey.utils';

type TUseDeleteTransactionCategory = (args: {
    id: number;
    type: TransactionCategoryTypeEnum;
    shouldRemoveChildren: boolean;
    hasChildren: boolean;
}) => {
    remove: VoidFunction;
    isLoading: boolean;
};

export const useDeleteTransactionCategory: TUseDeleteTransactionCategory = ({
    id,
    type,
    shouldRemoveChildren,
    hasChildren,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteTransactionCategory(id, shouldRemoveChildren);
        },
        onSuccess: () => {
            if (hasChildren) {
                queryClient.refetchQueries({
                    queryKey: getTransactionCategoriesQueryKey({
                        type,
                    }),
                });
                queryClient.refetchQueries({
                    queryKey: getTransactionCategoriesQueryKey(),
                });
            } else {
                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey({
                        type,
                    }),
                    (oldTransactionCategoryList?: TransactionCategory[]) =>
                        oldTransactionCategoryList?.filter(
                            (transactionCategory) =>
                                transactionCategory.id !== id,
                        ) || [],
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey(),
                    (oldAllTransactionCategoryList?: TransactionCategory[]) =>
                        oldAllTransactionCategoryList?.filter(
                            (transactionCategory) =>
                                transactionCategory.id !== id,
                        ) || [],
                );
            }

            queryClient.removeQueries({
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
