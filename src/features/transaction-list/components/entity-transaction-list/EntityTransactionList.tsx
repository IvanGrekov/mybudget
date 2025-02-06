'use client';

import Divider from 'components/divider/Divider';
import Spacing from 'components/spacing/Spacing';
import TransactionList from 'features/transaction-list/components/transaction-list/TransactionList';
import { useGetTransactions } from 'hooks/useGetTransactions';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';

export default function EntityTransactionList({
    selectedAccountId,
    selectedCategoryId,
}: ITransactionsFiltersArgs): JSX.Element {
    const { transactions, isLoading, hasMore, next } = useGetTransactions({
        selectedAccountId,
        selectedCategoryId,
    });

    return (
        <>
            <Spacing xs={40} md={50} />

            <Divider />

            <Spacing xs={20} />

            <TransactionList
                transactions={transactions}
                hasMore={hasMore}
                isLoading={isLoading}
                selectedAccountId={selectedAccountId}
                selectedCategoryId={selectedCategoryId}
                next={next}
            />
        </>
    );
}
