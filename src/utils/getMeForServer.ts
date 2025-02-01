import 'server-only';

import { QueryClient } from '@tanstack/react-query';

import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

export const getMeOnServerSide = async (
    queryClient: QueryClient,
): TAsyncApiClientResult<User> => {
    return queryClient.fetchQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => SERVER_MY_BUDGET_API.getMe(),
    });
};
