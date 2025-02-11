import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editAccount } from 'actions/editAccount';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { getUpdateAccount } from 'features/account-form-modal/components/edit-account-modal/utils/getUpdateAccount';
import {
    useAddSuccessMessageToNotifications,
    useAddErrorMessageToNotifications,
} from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import {
    Account,
    EditAccountDto,
    AccountStatusEnum,
} from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMessage';
import {
    getSingleAccountQueryKey,
    getAccountsQueryKey,
    getCalculatedTransactionValuesQueryKey,
} from 'utils/queryKey.utils';

type TUseEditAccount = (args: {
    account: Account;
    onCompleted: VoidFunction;
}) => {
    mutate: (data: EditAccountDto) => void;
    isLoading: boolean;
};

export const useEditAccount: TUseEditAccount = ({ account, onCompleted }) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();
    const addErrorMessage = useAddErrorMessageToNotifications();

    const { id, status, balance, type } = account;

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditAccountDto) => {
            return editAccount(id, data);
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            const updateAccount = getUpdateAccount(data);

            const { status: newStatus, balance: newBalance } = data;

            queryClient.setQueryData(
                getSingleAccountQueryKey(id),
                updateAccount,
            );

            const isStatusChanging = status !== newStatus;
            const isArchiving =
                isStatusChanging && newStatus === AccountStatusEnum.ARCHIVED;
            const isActivating =
                isStatusChanging && newStatus === AccountStatusEnum.ACTIVE;
            const isBalanceChanging = balance !== newBalance;

            if (isArchiving) {
                queryClient.setQueryData(
                    getAccountsQueryKey({
                        types: [type],
                    }),
                    (oldAccountList?: Account[]) =>
                        oldAccountList?.filter((account) => account.id !== id),
                );

                queryClient.setQueryData(
                    getAccountsQueryKey(),
                    (oldAccountList?: Account[]) =>
                        oldAccountList?.filter((account) => account.id !== id),
                );
            }

            if (isActivating) {
                queryClient.refetchQueries({
                    queryKey: getAccountsQueryKey({
                        types: [type],
                    }),
                });

                queryClient.refetchQueries({
                    queryKey: getAccountsQueryKey(),
                });
            }

            if (isBalanceChanging) {
                queryClient.invalidateQueries({
                    queryKey: [EFetchingTags.TRANSACTIONS],
                });
                queryClient.invalidateQueries({
                    queryKey: getCalculatedTransactionValuesQueryKey({
                        accountId: id,
                    }),
                });
            }

            if (!isActivating) {
                queryClient.setQueryData(
                    getAccountsQueryKey({
                        types: [type],
                    }),
                    (oldAccountList?: Account[]) =>
                        oldAccountList?.map(updateAccount) || [],
                );

                queryClient.setQueryData(
                    getAccountsQueryKey(),
                    (oldAllAccountList?: Account[]) =>
                        oldAllAccountList?.map(updateAccount) || [],
                );
            }

            addSuccessMessage(
                getSuccessMessage({
                    entityName: 'Account',
                    isEditing: true,
                }),
            );
            onCompleted();
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return { mutate, isLoading: isPending };
};
