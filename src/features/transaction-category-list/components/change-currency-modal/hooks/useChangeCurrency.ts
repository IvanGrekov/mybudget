import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editTransactionCategoryCurrency } from 'actions/editTransactionCategoryCurrency';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    TransactionCategory,
    TransactionCategoryTypeEnum,
    EditTransactionCategoryCurrencyDtoCurrencyEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getTransactionCategoriesQueryKey,
    getSingleTransactionCategoryQueryKey,
} from 'utils/queryKey.utils';

type TUseChangeCurrency = (args: {
    id: number;
    type: TransactionCategoryTypeEnum;
    currency: EditTransactionCategoryCurrencyDtoCurrencyEnum;
}) => {
    change: VoidFunction;
    isLoading: boolean;
};

export const useChangeCurrency: TUseChangeCurrency = ({
    id,
    type,
    currency,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return editTransactionCategoryCurrency({
                id,
                currency,
            });
        },
        onSuccess: () => {
            queryClient.setQueryData(
                getTransactionCategoriesQueryKey({
                    type,
                }),
                (oldCategoryList?: TransactionCategory[]) =>
                    oldCategoryList?.map((category) => {
                        if (category.id === id) {
                            return {
                                ...category,
                                currency,
                            };
                        }

                        return category;
                    }) || [],
            );

            queryClient.setQueryData(
                getTransactionCategoriesQueryKey(),
                (oldAllCategoryList?: TransactionCategory[]) =>
                    oldAllCategoryList?.map((category) => {
                        if (category.id === id) {
                            return {
                                ...category,
                                currency,
                            };
                        }

                        return category;
                    }) || [],
            );

            queryClient.setQueryData(
                getSingleTransactionCategoryQueryKey(id),
                (category?: TransactionCategory) => {
                    if (category) {
                        return {
                            ...category,
                            currency,
                        };
                    }

                    return category;
                },
            );

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Category currency',
                    isEditing: true,
                }),
            });
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    mutate;

    return {
        change: mutate,
        isLoading: isPending,
    };
};
