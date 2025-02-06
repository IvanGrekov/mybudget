import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editTransactionCategory } from 'actions/editTransactionCategory';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { getUpdateTransactionCategory } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/utils/getUpdateTransactionCategory';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    TransactionCategory,
    EditTransactionCategoryDto,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getSingleTransactionCategoryQueryKey,
    getTransactionCategoriesQueryKey,
} from 'utils/queryKey.utils';

type TUseEditTransactionCategory = (args: {
    transactionCategory: TransactionCategory;
    parentId?: number;
    hasChildren?: boolean;
    onCompleted: VoidFunction;
    onArchive?: VoidFunction;
}) => {
    mutate: (data: EditTransactionCategoryDto) => void;
    isLoading: boolean;
};

export const useEditTransactionCategory: TUseEditTransactionCategory = ({
    transactionCategory,
    parentId,
    hasChildren,
    onCompleted,
    onArchive,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const { id, status, type } = transactionCategory;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditTransactionCategoryDto) => {
            return editTransactionCategory({
                id,
                parentId,
                dto: data,
            });
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            const { status: newStatus } = data;

            const isStatusChanging = status !== newStatus;
            const isArchiving =
                isStatusChanging &&
                newStatus === TransactionCategoryStatusEnum.ARCHIVED;
            const isActivating =
                isStatusChanging &&
                newStatus === TransactionCategoryStatusEnum.ACTIVE;

            const updateTransactionCategory = getUpdateTransactionCategory({
                updatedTransactionCategory: data,
                parentId,
                isArchiving,
                isActivating,
            });

            queryClient.setQueryData(
                getSingleTransactionCategoryQueryKey(id),
                updateTransactionCategory,
            );

            if (parentId) {
                queryClient.setQueryData(
                    getSingleTransactionCategoryQueryKey(parentId),
                    updateTransactionCategory,
                );
            }

            if (isArchiving) {
                if (hasChildren) {
                    queryClient.refetchQueries({
                        queryKey: getTransactionCategoriesQueryKey({
                            type,
                        }),
                    });
                    queryClient.refetchQueries({
                        queryKey: getTransactionCategoriesQueryKey(),
                    });
                } else if (parentId) {
                    queryClient.setQueryData(
                        getTransactionCategoriesQueryKey({
                            type,
                        }),
                        (oldTransactionCategoryList?: TransactionCategory[]) =>
                            oldTransactionCategoryList?.map(
                                updateTransactionCategory,
                            ),
                    );

                    queryClient.setQueryData(
                        getTransactionCategoriesQueryKey(),
                        (oldTransactionCategoryList?: TransactionCategory[]) =>
                            oldTransactionCategoryList?.map(
                                updateTransactionCategory,
                            ),
                    );
                } else {
                    queryClient.setQueryData(
                        getTransactionCategoriesQueryKey({
                            type,
                        }),
                        (oldTransactionCategoryList?: TransactionCategory[]) =>
                            oldTransactionCategoryList?.filter(
                                (transactionCategory) =>
                                    transactionCategory.id !== id,
                            ),
                    );

                    queryClient.setQueryData(
                        getTransactionCategoriesQueryKey(),
                        (oldTransactionCategoryList?: TransactionCategory[]) =>
                            oldTransactionCategoryList?.filter(
                                (transactionCategory) =>
                                    transactionCategory.id !== id,
                            ),
                    );
                }
            }

            if (isActivating) {
                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey({
                        type,
                    }),
                    (oldTransactionCategoryList?: TransactionCategory[]) => [
                        ...(oldTransactionCategoryList || []),
                        data,
                    ],
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey(),
                    (oldTransactionCategoryList?: TransactionCategory[]) => [
                        ...(oldTransactionCategoryList || []),
                        data,
                    ],
                );
            }

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Transaction Category',
                    isEditing: true,
                }),
            );
            onCompleted();
            isArchiving && onArchive?.();
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        mutate,
        isLoading: isPending,
    };
};
