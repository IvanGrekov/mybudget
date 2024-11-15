import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUser } from 'actions/editUser';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { IUserSettingsFormData } from 'features/user-settings/components/user-settings-form/types/userSettingsFormData';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

type TUseEditUser = (args: { userId: number; onCompleted: VoidFunction }) => {
    mutate: (data: IUserSettingsFormData) => void;
    isLoading: boolean;
};

export const useEditUser: TUseEditUser = ({ userId, onCompleted }) => {
    const addErrorMessage = useAddErrorMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: IUserSettingsFormData) => {
            return editUser({ userId, ...data });
        },
        onSuccess: (data) => {
            if (!data) {
                return addErrorMessage({
                    message: DEFAULT_ERROR_MESSAGE,
                });
            }

            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            onCompleted();
        },
        onError: (error: Error) => {
            addErrorMessage({
                message: error.message,
            });
        },
    });

    return {
        mutate,
        isLoading: isPending,
    };
};
