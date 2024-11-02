import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAccountsResult {
    accounts?: TApiClientResult<Account[]>;
    isLoading: boolean;
}

export const useGetAccounts = (
    type: AccountTypeEnum,
): IUseGetAccountsResult => {
    const { isPending, data } = useQuery({
        queryKey: getAccountsQueryKey({
            type,
        }),
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getAccounts({
                type,
            }),
    });

    return {
        accounts: data,
        isLoading: isPending,
    };
};
