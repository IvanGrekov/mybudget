import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editTransaction } from 'actions/editTransaction';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { EditTransactionDto, Transaction } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleTransactionQueryKey } from 'utils/queryKey.utils';

type TUseEditTransaction = (args: {
    transactionId: number;
    onCompleted: VoidFunction;
}) => {
    mutate: (data: EditTransactionDto) => void;
    isLoading: boolean;
};

export const useEditTransaction: TUseEditTransaction = ({
    transactionId,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditTransactionDto) => {
            return editTransaction(transactionId, data);
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            queryClient.setQueryData(
                getSingleTransactionQueryKey(transactionId),
                (transaction?: Transaction) =>
                    transaction ? { ...transaction, ...data } : transaction,
            );

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction',
                    isEditing: true,
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

    return { mutate, isLoading: isPending };
};
