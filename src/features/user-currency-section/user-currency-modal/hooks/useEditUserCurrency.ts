import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUserCurrency } from 'actions/editUserCurrency';
import { useAddSuccessMessageToNotifications } from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { EditUserCurrencyDto, User } from 'types/generated.types';

type TUseEditUserCurrency = (args: {
    userId: number;
    onCompleted: VoidFunction;
    setError: (error: string | null) => void;
}) => {
    mutate: (data: EditUserCurrencyDto) => void;
    isLoading: boolean;
};

export const useEditUserCurrency: TUseEditUserCurrency = ({
    userId,
    onCompleted,
    setError,
}) => {
    const addSuccessMessage = useAddSuccessMessageToNotifications();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditUserCurrencyDto) => {
            return editUserCurrency(userId, { ...data });
        },
        onSuccess: (data) => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            addSuccessMessage({
                message: 'Default currency has been updated!',
            });
            onCompleted();
        },
        onError: (error: Error) => {
            setError(error.message);
        },
    });

    return { mutate, isLoading: isPending };
};
