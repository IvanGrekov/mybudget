import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAllAccountsResult {
    accounts?: TApiClientResult<Account[]>;
    isLoading: boolean;
}

export const useGetAllAccounts = (): IUseGetAllAccountsResult => {
    const { data, isPending } = useQuery({
        queryKey: getAccountsQueryKey(),
        queryFn: () => CLIENT_MY_BUDGET_API.getAccounts(),
    });

    return {
        accounts: data,
        isLoading: isPending,
    };
};
