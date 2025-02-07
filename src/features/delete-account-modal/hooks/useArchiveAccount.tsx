import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveAccount } from 'actions/archiveAccount';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { deleteAccount as deleteAccountService } from 'features/delete-account-modal/services/deleteAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import {
    Account,
    AccountStatusEnum,
    AccountTypeEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import { getSingleAccountQueryKey } from 'utils/queryKey.utils';

type TUseArchiveAccount = (args: {
    id: number;
    type: AccountTypeEnum;
    onCompleted?: VoidFunction;
}) => {
    isLoading: boolean;
    archive: VoidFunction;
};

export const useArchiveAccount: TUseArchiveAccount = ({
    id,
    type,
    onCompleted,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return archiveAccount(id);
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

            queryClient.setQueryData(
                getSingleAccountQueryKey(id),
                (account?: Account) => {
                    if (account) {
                        return {
                            ...account,
                            status: AccountStatusEnum.ARCHIVED,
                        };
                    }

                    return account;
                },
            );

            onCompleted?.();

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Account',
                    isArchiving: true,
                }),
            );
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        archive: mutate,
        isLoading: isPending,
    };
};
