import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editTransactionCategoryCurrency } from 'actions/editTransactionCategoryCurrency';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { getUpdateTransactionCategoryCurrency } from 'features/change-transaction-category-currency-modal/utils/getUpdateTransactionCategoryCurrency';
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
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            const updateTransactionCategoryCurrency =
                getUpdateTransactionCategoryCurrency({
                    id,
                    currency,
                });

            queryClient.setQueryData(
                getTransactionCategoriesQueryKey({
                    type,
                }),
                (oldCategoryList?: TransactionCategory[]) =>
                    oldCategoryList?.map(updateTransactionCategoryCurrency) ||
                    [],
            );

            queryClient.setQueryData(
                getTransactionCategoriesQueryKey(),
                (oldAllCategoryList?: TransactionCategory[]) =>
                    oldAllCategoryList?.map(
                        updateTransactionCategoryCurrency,
                    ) || [],
            );

            queryClient.setQueryData(
                getSingleTransactionCategoryQueryKey(id),
                updateTransactionCategoryCurrency,
            );

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Transaction Category currency',
                    isEditing: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    mutate;

    return {
        change: mutate,
        isLoading: isPending,
    };
};
