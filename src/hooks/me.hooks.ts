import { useQuery } from '@tanstack/react-query';

import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

interface IUseGetMeResult {
    me: TApiClientResult<User>;
    isLoading: boolean;
}

export const useGetMe = (): IUseGetMeResult => {
    const {
        data: me,
        isPending: isLoading,
        error,
    } = useQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => CLIENT_MY_BUDGET_API.getMe(),
    });

    useRequestErrorHandler(error);

    return { me, isLoading };
};

interface IUseGetMyTimeZoneResult {
    timeZone: TApiClientResult<string>;
    isLoading: boolean;
}

export const useGetMyTimeZone = (): IUseGetMyTimeZoneResult => {
    const { me, isLoading } = useGetMe();

    return {
        timeZone: me?.timeZone,
        isLoading,
    };
};
