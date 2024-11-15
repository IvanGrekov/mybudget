import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAccountsResult {
    accounts?: TApiClientResult<Account[]>;
    currentAllItemsLength?: number;
    isLoading: boolean;
}

export const useGetAccounts = (
    type: AccountTypeEnum,
): IUseGetAccountsResult => {
    const { isPending: isAllAccountsLoading, data: allAccountsData } = useQuery(
        {
            queryKey: getAccountsQueryKey(),
            queryFn: () => CLIENT_MY_BUDGET_API.getAccounts(),
        },
    );

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
        currentAllItemsLength: allAccountsData?.length,
        isLoading: isPending || isAllAccountsLoading,
    };
};
