'use client';

import { Fragment } from 'react';

import cx from 'classnames';

import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCard from 'features/transaction-list/components/transaction-card/TransactionCard';
import transactionListStyles from 'features/transaction-list/components/transaction-list/TransactionList.module.scss';
import TransactionListEmptyState from 'features/transaction-list/components/transaction-list/TransactionListEmptyState';
import TransactionListHeader from 'features/transaction-list/components/transaction-list/TransactionListHeader';
import { useGetTransactions } from 'features/transaction-list/components/transaction-list/hooks/useGetTransactions';
import { useTransactionListCurrentFilterValue } from 'features/transaction-list/hooks/useTransactionListCurrentFilterValue';
import { useGetMyTimeZone } from 'hooks/me.hooks';
import styles from 'styles/ItemList.module.scss';
import { getDate } from 'utils/date.utils';

export default function TransactionList(): JSX.Element {
    const types = useTransactionListCurrentFilterValue();
    const { transactions, isLoading } = useGetTransactions(types);
    const { timeZone } = useGetMyTimeZone();

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
                    {transactions.map((transaction, i) => {
                        const transactionDate = getDate(
                            transaction.createdAt,
                            timeZone,
                        );
                        const prevTransactionCreatedAt =
                            transactions[i - 1]?.createdAt;
                        const prevTransactionDate =
                            prevTransactionCreatedAt &&
                            getDate(prevTransactionCreatedAt, timeZone);
                        const shouldShowDate =
                            i === 0 || transactionDate !== prevTransactionDate;

                        return (
                            <Fragment key={transaction.id}>
                                <Show when={shouldShowDate}>
                                    <li className={transactionListStyles.date}>
                                        {transactionDate}
                                    </li>
                                </Show>
                                <li>
                                    <TransactionCard
                                        transaction={transaction}
                                    />
                                </li>
                            </Fragment>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
