import { useQueryClient, useMutation } from '@tanstack/react-query';

import { enableTfa } from 'actions/enableTfa';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

type TUseEnableTfa = (args: {
    code: string;
    onCompleted: VoidFunction;
    setError: (error: string | null) => void;
}) => {
    mutate: VoidFunction;
    isLoading: boolean;
};

export const useEnableTfa: TUseEnableTfa = ({
    code,
    onCompleted,
    setError,
}) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return enableTfa(code);
        },
        onSuccess: (data) => {
            if (data && 'error' in data) {
                return setError(data.error);
            }

            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                isTfaEnabled: true,
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
