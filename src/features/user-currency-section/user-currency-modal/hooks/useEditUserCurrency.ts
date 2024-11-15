import { useQueryClient, useMutation } from '@tanstack/react-query';

import { editUserCurrency } from 'actions/editUserCurrency';
import { DEFAULT_ERROR_MESSAGE } from 'constants/defaultErrorMessage';
import { useAddSuccessMessageToNotifications } from 'hooks/notifications.hooks';
import { EFetchingTags } from 'types/fetchingTags';
import { EditUserCurrencyDto, User } from 'types/generated.types';
import { getSuccessMessage } from 'utils/getSuccessMesage';

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
            if (!data) {
                return setError(DEFAULT_ERROR_MESSAGE);
            }

            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                ...data,
            }));
            addSuccessMessage({
                message: getSuccessMessage({
                    entityName: 'Default currency',
                    isEditing: true,
                }),
            });
            onCompleted();
        },
        onError: (error: Error) => {
            setError(error.message);
        },
    });

    return { mutate, isLoading: isPending };
};
