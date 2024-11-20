import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveAccount } from 'actions/archiveAccount';
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

type TUseArchiveAccount = (args: { id: number; type: AccountTypeEnum }) => {
    archive: VoidFunction;
    isLoading: boolean;
};

export const useArchiveAccount: TUseArchiveAccount = ({ id, type }) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return archiveAccount(id);
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

            queryClient.removeQueries({
                queryKey: getTransactionsQueryKey(),
            });

            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Account',
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
