import { QueryClient } from '@tanstack/react-query';

import { Account, AccountTypeEnum } from 'types/generated.types';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

interface IDeleteAccountArgs {
    queryClient: QueryClient;
    id: number;
    type: AccountTypeEnum;
}

export const deleteAccount = ({
    queryClient,
    id,
    type,
}: IDeleteAccountArgs): void => {
    queryClient.setQueryData(
        getAccountsQueryKey({
            types: [type],
        }),
        (oldAccountList?: Account[]) =>
            oldAccountList?.filter((account) => account.id !== id) || [],
    );

    queryClient.setQueryData(
        getAccountsQueryKey(),
        (oldAllAccountList?: Account[]) =>
            oldAllAccountList?.filter((account) => account.id !== id) || [],
    );
};
