import { useQuery } from '@tanstack/react-query';

import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    Account,
    AccountTypeEnum,
    AccountStatusEnum,
} from 'types/generated.types';

interface IUseGetAccountsResult {
    accounts?: TApiClientResult<Account[]>;
    isLoading: boolean;
}

export const useGetAccounts = (
    type: AccountTypeEnum,
): IUseGetAccountsResult => {
    const { isPending, data } = useQuery({
        queryKey: [EFetchingTags.ACCOUNTS, type, AccountStatusEnum.ACTIVE],
        queryFn: () =>
            CLIENT_MY_BUDGET_API.getAccounts({
                status: AccountStatusEnum.ACTIVE,
                type,
            }),
    });

    return {
        accounts: data,
        isLoading: isPending,
    };
};
