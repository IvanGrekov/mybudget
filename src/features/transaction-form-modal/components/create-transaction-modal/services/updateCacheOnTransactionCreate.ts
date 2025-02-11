import { QueryClient } from '@tanstack/react-query';

import { EFetchingTags } from 'types/fetchingTags';
import { Account, Transaction } from 'types/generated.types';
import {
    getSingleAccountQueryKey,
    getAccountsQueryKey,
    getCalculatedTransactionValuesQueryKey,
} from 'utils/queryKey.utils';

type TGetUpdateAccountBalanceInCache = (args: {
    accountId: number;
    newBalance: number;
}) => (account?: Account) => Account | undefined;

const getUpdateAccountBalanceInCache: TGetUpdateAccountBalanceInCache = ({
    accountId,
    newBalance,
}) => {
    return (account) => {
        if (account?.id === accountId) {
            return {
                ...account,
                balance: newBalance,
            };
        }

        return account;
    };
};

interface IUpdateCacheOnTransactionCreateArgs {
    data: Transaction;
    queryClient: QueryClient;
}

export const updateCacheOnTransactionCreate = ({
    data,
    queryClient,
}: IUpdateCacheOnTransactionCreateArgs): void => {
    const {
        fromAccount,
        toAccount,
        fromAccountUpdatedBalance,
        toAccountUpdatedBalance,
    } = data;

    queryClient.invalidateQueries({
        queryKey: [EFetchingTags.TRANSACTIONS],
    });

    queryClient.invalidateQueries({
        queryKey: getCalculatedTransactionValuesQueryKey({
            accountId: fromAccount?.id || toAccount?.id,
        }),
    });

    if (typeof fromAccountUpdatedBalance === 'number' && fromAccount) {
        const { id: accountId, type } = fromAccount;
        const updateFromAccountBalanceInCache = getUpdateAccountBalanceInCache({
            accountId,
            newBalance: fromAccountUpdatedBalance,
        });

        queryClient.setQueryData(
            getSingleAccountQueryKey(accountId),
            updateFromAccountBalanceInCache,
        );
        queryClient.setQueryData(
            getAccountsQueryKey(),
            (allAccounts?: Account[]) =>
                (allAccounts || []).map(updateFromAccountBalanceInCache),
        );
        queryClient.setQueryData(
            getAccountsQueryKey({ types: [type] }),
            (accountsByType?: Account[]) =>
                (accountsByType || []).map(updateFromAccountBalanceInCache),
        );
    }

    if (typeof toAccountUpdatedBalance === 'number' && toAccount) {
        const { id: accountId, type } = toAccount;
        const updateToAccountBalanceInCache = getUpdateAccountBalanceInCache({
            accountId,
            newBalance: toAccountUpdatedBalance,
        });

        queryClient.setQueryData(
            getSingleAccountQueryKey(accountId),
            updateToAccountBalanceInCache,
        );
        queryClient.setQueryData(
            getAccountsQueryKey(),
            (allAccounts?: Account[]) =>
                (allAccounts || []).map(updateToAccountBalanceInCache),
        );
        queryClient.setQueryData(
            getAccountsQueryKey({ types: [type] }),
            (accountsByType?: Account[]) =>
                (accountsByType || []).map(updateToAccountBalanceInCache),
        );
    }
};
