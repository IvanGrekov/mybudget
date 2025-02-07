import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteAccount } from 'actions/deleteAccount';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { deleteAccount as deleteAccountService } from 'features/delete-account-modal/services/deleteAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { AccountTypeEnum } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleAccountQueryKey } from 'utils/queryKey.utils';

type TUseDeleteAccount = (args: {
    id: number;
    type: AccountTypeEnum;
    onCompleted?: VoidFunction;
}) => {
    isLoading: boolean;
    remove: VoidFunction;
};

export const useDeleteAccount: TUseDeleteAccount = ({
    id,
    type,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteAccount(id);
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

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

            onCompleted?.();

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Account',
                    isRemoving: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        remove: mutate,
        isLoading: isPending,
    };
};
