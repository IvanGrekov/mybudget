import { useQueryClient, useMutation } from '@tanstack/react-query';

import { createTransactionCategory } from 'actions/createTransactionCategory';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { getAddSubcategory } from 'features/transaction-category-form-modal/components/create-transaction-category-modal/utils/getAddSubcategory';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { TransactionCategory } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getSingleTransactionCategoryQueryKey,
    getTransactionCategoriesQueryKey,
} from 'utils/queryKey.utils';

type TUseCreateTransactionCategory = (args: {
    userId: number;
    onCompleted: VoidFunction;
}) => {
    mutate: (data: TCreateTransactionCategoryFormValues) => void;
    isLoading: boolean;
};

export const useCreateTransactionCategory: TUseCreateTransactionCategory = ({
    userId,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: TCreateTransactionCategoryFormValues) => {
            return createTransactionCategory({ userId, ...data });
        },
        onSuccess: (newCategory) => {
            if (!newCategory) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            const { parent, type } = newCategory;
            const isSubcategory = !!parent;

            // eslint-disable-next-line no-extra-boolean-cast, @typescript-eslint/no-unnecessary-condition
            if (isSubcategory) {
                const addSubcategory = getAddSubcategory(newCategory);

                queryClient.setQueryData(
                    getSingleTransactionCategoryQueryKey(parent.id),
                    addSubcategory,
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey({
                        type,
                    }),
                    (oldTransactionCategoryList?: TransactionCategory[]) =>
                        oldTransactionCategoryList?.map(addSubcategory),
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey(),
                    (oldAllTransactionCategoryList?: TransactionCategory[]) =>
                        oldAllTransactionCategoryList?.map(addSubcategory),
                );
            } else {
                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey({
                        type,
                    }),
                    (oldTransactionCategoryList?: TransactionCategory[]) => [
                        ...(oldTransactionCategoryList || []),
                        newCategory,
                    ],
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey(),
                    (oldAllTransactionCategoryList?: TransactionCategory[]) => [
                        ...(oldAllTransactionCategoryList || []),
                        newCategory,
                    ],
                );
            }

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction Category',
                }),
            });
            onCompleted();
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    return {
        mutate,
        isLoading: isPending,
    };
};
