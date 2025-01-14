'use client';

import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import Typography from 'components/typography/Typography';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import TransactionCard from 'features/transaction-list/components/transaction-card/TransactionCard';
import transactionListStyles from 'features/transaction-list/components/transaction-list/TransactionList.module.scss';
import TransactionListEmptyState from 'features/transaction-list/components/transaction-list/TransactionListEmptyState';
import TransactionListHeader from 'features/transaction-list/components/transaction-list/TransactionListHeader';
import { useGetTransactions } from 'features/transaction-list/components/transaction-list/hooks/useGetTransactions';
import { useGetMyTimeZone } from 'hooks/me.hooks';
import styles from 'styles/ItemList.module.scss';
import { getDate } from 'utils/date.utils';

export default function TransactionList(): JSX.Element {
    const { transactions, isLoading, hasMore, next, refetch } =
        useGetTransactions();
    const { timeZone } = useGetMyTimeZone();

    const isEmptyState = !transactions?.length;

    return (
        <div className={styles.container}>
            <TransactionListHeader refetchTransactionList={refetch} />

            {/* TODO: Implement filter */}
            <UnderDevelopmentMessage />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <TransactionListEmptyState />
            </Show>

            {!isEmptyState && (
                <InfiniteScroll
                    dataLength={transactions.length} //This is important field to render the next data
                    next={next}
                    hasMore={hasMore}
                    loader={<LinearProgress />}
                    className={styles.list}
                >
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
                                    <Typography
                                        className={transactionListStyles.date}
                                    >
                                        {transactionDate}
                                    </Typography>
                                </Show>

                                <TransactionCard transaction={transaction} />
                            </Fragment>
                        );
                    })}
                </InfiniteScroll>
            )}
        </div>
    );
}
