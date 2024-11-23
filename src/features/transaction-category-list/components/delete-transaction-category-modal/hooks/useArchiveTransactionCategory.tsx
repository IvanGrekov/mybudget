import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveTransactionCategory } from 'actions/archiveTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

type TUseArchiveTransactionCategory = (args: {
    id: number;
    type: TransactionCategoryTypeEnum;
    hasChildren: boolean;
}) => {
    archive: VoidFunction;
    isLoading: boolean;
};

export const useArchiveTransactionCategory: TUseArchiveTransactionCategory = ({
    id,
    type,
    hasChildren,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return archiveTransactionCategory(id);
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
