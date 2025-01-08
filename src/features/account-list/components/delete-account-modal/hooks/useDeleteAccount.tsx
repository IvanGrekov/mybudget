import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteAccount } from 'actions/deleteAccount';
import { deleteAccount as deleteAccountService } from 'features/account-list/components/delete-account-modal/services/deleteAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { AccountTypeEnum } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleAccountQueryKey } from 'utils/queryKey.utils';

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
            deleteAccountService({
                queryClient,
                id,
                type,
            });

            queryClient.invalidateQueries({
                queryKey: getSingleAccountQueryKey(id),
            });

            queryClient.invalidateQueries({
                queryKey: [EFetchingTags.TRANSACTIONS],
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
