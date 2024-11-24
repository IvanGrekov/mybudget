import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteAccount } from 'actions/deleteAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getAccountsQueryKey,
    getTransactionsQueryKey,
} from 'utils/queryKey.utils';

type TUseDeleteAccount = (args: { id: number; type: AccountTypeEnum }) => {
    remove: VoidFunction;
    isLoading: boolean;
};

export const useDeleteAccount: TUseDeleteAccount = ({ id, type }) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteAccount(id);
        },
        onSuccess: () => {
            queryClient.setQueryData(
                getAccountsQueryKey({
                    type,
                }),
                (oldAccountList?: Account[]) =>
                    oldAccountList?.filter((account) => account.id !== id) ||
                    [],
            );

            queryClient.setQueryData(
                getAccountsQueryKey(),
                (oldAllAccountList?: Account[]) =>
                    oldAllAccountList?.filter((account) => account.id !== id) ||
                    [],
            );

            queryClient.invalidateQueries({
                queryKey: getTransactionsQueryKey(),
            });

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Account',
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
