'use client';

import TransactionList from 'features/transaction-list/components/transaction-list/TransactionList';
import TransactionListHeader from 'features/transaction-list-page/components/transaction-list-header/TransactionListHeader';
import { useGetTransactions } from 'hooks/useGetTransactions';
import styles from 'styles/ItemList.module.scss';

export default function TransactionListPage(): JSX.Element {
    const { transactions, isLoading, hasMore, next, refetch } =
        useGetTransactions();

    return (
        <div className={styles.container}>
            <TransactionListHeader refetchTransactionList={refetch} />

            <TransactionList
                transactions={transactions}
                hasMore={hasMore}
                isLoading={isLoading}
                next={next}
            />
        </div>
    );
}
