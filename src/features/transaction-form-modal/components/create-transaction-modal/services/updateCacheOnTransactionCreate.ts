import { QueryClient } from '@tanstack/react-query';

import { Account, Transaction } from 'types/generated.types';
import {
    getTransactionsQueryKey,
    getSingleAccountQueryKey,
} from 'utils/queryKey.utils';

interface IUpdateCacheOnTransactionCreateArgs {
    data: Transaction;
    queryClient: QueryClient;
}

export const updateCacheOnTransactionCreate = ({
    data,
    queryClient,
}: IUpdateCacheOnTransactionCreateArgs): void => {
    const {
        type,
        fromAccount,
        toAccount,
        fromCategory,
        toCategory,
        fromAccountUpdatedBalance,
        toAccountUpdatedBalance,
    } = data;

    queryClient.setQueryData(
        getTransactionsQueryKey({
            types: [type],
            transactionCategoryId: fromCategory?.id || toCategory?.id,
        }),
        (oldTransactionList?: Transaction[]) => [
            data,
            ...(oldTransactionList || []),
        ],
    );

    if (fromAccount) {
        queryClient.setQueryData(
            getTransactionsQueryKey({
                accountId: fromAccount.id,
            }),
            (oldTransactionList?: Transaction[]) => [
                data,
                ...(oldTransactionList || []),
            ],
        );

        queryClient.setQueryData(
            getTransactionsQueryKey({
                types: [type],
                accountId: fromAccount.id,
            }),
            (oldTransactionList?: Transaction[]) => [
                data,
                ...(oldTransactionList || []),
            ],
        );
    }

    if (toAccount) {
        queryClient.setQueryData(
            getTransactionsQueryKey({
                accountId: toAccount.id,
            }),
            (oldTransactionList?: Transaction[]) => [
                data,
                ...(oldTransactionList || []),
            ],
        );

        queryClient.setQueryData(
            getTransactionsQueryKey({
                types: [type],
                accountId: toAccount.id,
            }),
            (oldTransactionList?: Transaction[]) => [
                data,
                ...(oldTransactionList || []),
            ],
        );
    }

    if (typeof fromAccountUpdatedBalance === 'number' && fromAccount) {
        queryClient.setQueryData(
            getSingleAccountQueryKey(fromAccount.id),
            (account: Account) => ({
                ...account,
                balance: fromAccountUpdatedBalance,
            }),
        );
    }

    if (typeof toAccountUpdatedBalance === 'number' && toAccount) {
        queryClient.setQueryData(
            getSingleAccountQueryKey(toAccount.id),
            (account: Account) => ({
                ...account,
                balance: toAccountUpdatedBalance,
            }),
        );
    }

    queryClient.setQueryData(
        getTransactionsQueryKey(),
        (oldAllTransactionList?: Transaction[]) => [
            data,
            ...(oldAllTransactionList || []),
        ],
    );
};
