import 'server-only';

import { QueryClient } from '@tanstack/react-query';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult, TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import log from 'utils/log';

export const getMeOnServerSide = async (
    queryClient: QueryClient,
): TAsyncApiClientResult<User> => {
    try {
        const me: TApiClientResult<User> = await queryClient.fetchQuery({
            queryKey: [EFetchingTags.ME],
            queryFn: () => SERVER_MY_BUDGET_API.getMe(),
        });

        return me;
    } catch (error) {
        log(error);

        return null;
    }
};
