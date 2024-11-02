'use client';

import cx from 'classnames';

import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCard from 'features/transaction-list/components/transaction-card/TransactionCard';
import TransactionListEmptyState from 'features/transaction-list/components/transaction-list/TransactionListEmptyState';
import TransactionListHeader from 'features/transaction-list/components/transaction-list/TransactionListHeader';
import { useGetTransactions } from 'features/transaction-list/components/transaction-list/hooks/useGetTransactions';
import { useTransactionListCurrentFilterValue } from 'features/transaction-list/hooks/useTransactionListCurrentFilterValue';
import styles from 'styles/ItemList.module.scss';

export default function TransactionList(): JSX.Element {
    const types = useTransactionListCurrentFilterValue();
    const { transactions, isLoading } = useGetTransactions(types);

    const isEmptyState = !transactions?.length;

    return (
        <div className={styles.container}>
            <TransactionListHeader />

            {/* TODO: Implement filter */}

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <TransactionListEmptyState />
            </Show>

            {!isEmptyState && (
                <ul className={cx(styles.list)}>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <TransactionCard transaction={transaction} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
