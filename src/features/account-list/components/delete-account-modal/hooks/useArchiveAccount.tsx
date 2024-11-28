import { useQueryClient, useMutation } from '@tanstack/react-query';

import { archiveAccount } from 'actions/archiveAccount';
import { deleteAccount as deleteAccountService } from 'features/account-list/components/delete-account-modal/services/deleteAccount';
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
