import { useQuery } from '@tanstack/react-query';

import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { useRequestErrorHandler } from 'hooks/useRequestErrorHandler';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { Account, AccountTypeEnum } from 'types/generated.types';
import { Maybe } from 'types/utility.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

interface IUseGetAccountsResult {
    accounts?: Maybe<Account[]>;
    currentAllItemsLength?: number;
    isLoading: boolean;
}

export const useGetAccounts = (
    type: AccountTypeEnum,
): IUseGetAccountsResult => {
    const { accounts: allAccountsData, isLoading: isAllAccountsLoading } =
        useGetAllAccounts();

    const { data, isPending, error } = useQuery({
        queryKey: getAccountsQueryKey({
            types: [type],
        }),
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getAccounts({
                types: [type],
            }),
    });

    useRequestErrorHandler(error);

    return {
        accounts: data,
        currentAllItemsLength: allAccountsData?.length,
        isLoading: isPending || isAllAccountsLoading,
    };
};
