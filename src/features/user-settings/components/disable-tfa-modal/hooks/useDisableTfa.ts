import { useQueryClient, useMutation } from '@tanstack/react-query';

import { disableTfa } from 'actions/disableTfa';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

type TUseDisableTfa = (args: {
    code: string;
    onCompleted: VoidFunction;
    setError: (error: string | null) => void;
}) => {
    mutate: VoidFunction;
    isLoading: boolean;
};

export const useDisableTfa: TUseDisableTfa = ({
    code,
    onCompleted,
    setError,
}) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return disableTfa(code);
        },
        onSuccess: () => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                isTfaEnabled: false,
            }));
            onCompleted();
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    return {
        mutate,
        isLoading: isPending,
    };
};
