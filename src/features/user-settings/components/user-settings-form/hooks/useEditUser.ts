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
                return addErrorMessage(DEFAULT_ERROR_MESSAGE);
            }

            if ('error' in data) {
                return addErrorMessage(data.error);
            }

            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            onCompleted();
        },
        onError: (error: Error) => {
            addErrorMessage(error.message);
        },
    });

    return {
        mutate,
        isLoading: isPending,
    };
};
