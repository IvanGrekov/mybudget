import { useQuery } from '@tanstack/react-query';

import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { Maybe } from 'types/utility.types';

interface IUseGetMeResult {
    me: Maybe<User>;
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
    timeZone: Maybe<string>;
    isLoading: boolean;
}

export const useGetMyTimeZone = (): IUseGetMyTimeZoneResult => {
    const { me, isLoading } = useGetMe();

    return {
        timeZone: me?.timeZone,
        isLoading,
    };
};
