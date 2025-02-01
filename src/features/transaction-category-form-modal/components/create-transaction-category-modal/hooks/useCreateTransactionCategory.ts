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
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            const { parent, type } = data;
            const isSubcategory = !!parent;

            // eslint-disable-next-line no-extra-boolean-cast, @typescript-eslint/no-unnecessary-condition
            if (isSubcategory) {
                const addSubcategory = getAddSubcategory(data);

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
                        data,
                    ],
                );

                queryClient.setQueryData(
                    getTransactionCategoriesQueryKey(),
                    (oldAllTransactionCategoryList?: TransactionCategory[]) => [
                        ...(oldAllTransactionCategoryList || []),
                        data,
                    ],
                );
            }

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Transaction Category',
                }),
            );
            onCompleted();
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
