import { useQueryClient, useMutation } from '@tanstack/react-query';

import { createAccount } from 'actions/createAccount';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { Account } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

type TUseCreateAccount = (args: {
    userId: number;
    onCompleted: VoidFunction;
}) => {
    mutate: (data: TCreateAccountFormValues) => void;
    isLoading: boolean;
};

export const useCreateAccount: TUseCreateAccount = ({
    userId,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: TCreateAccountFormValues) => {
            return createAccount({ userId, ...data });
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            queryClient.setQueryData(
                getAccountsQueryKey({
                    types: [data.type],
                }),
                (oldAccountList?: Account[]) => [
                    ...(oldAccountList || []),
                    data,
                ],
            );

            queryClient.setQueryData(
                getAccountsQueryKey(),
                (oldAllAccountList?: Account[]) => [
                    ...(oldAllAccountList || []),
                    data,
                ],
            );
            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Account',
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
