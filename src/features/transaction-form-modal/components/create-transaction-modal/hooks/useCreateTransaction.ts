import { useQueryClient, useMutation } from '@tanstack/react-query';

import { createTransaction } from 'actions/createTransaction';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { updateCacheOnTransactionCreate } from 'features/transaction-form-modal/components/create-transaction-modal/services/updateCacheOnTransactionCreate';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { CreateTransactionDto } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';

type TMutationData = Omit<CreateTransactionDto, 'userId'>;

type TUseCreateTransaction = (args: {
    userId: number;
    onCompleted: VoidFunction;
}) => {
    mutate: (data: TMutationData) => void;
    isLoading: boolean;
};

export const useCreateTransaction: TUseCreateTransaction = ({
    userId,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: TMutationData) => {
            return createTransaction({
                userId,
                ...data,
            });
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            // TODO: Set pagination to 1st page

            updateCacheOnTransactionCreate({
                data,
                queryClient,
            });
            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Transaction',
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
