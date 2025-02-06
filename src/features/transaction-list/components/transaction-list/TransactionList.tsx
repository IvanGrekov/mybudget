'use client';

import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionListEmptyState from 'components/transaction-list-empty-state/TransactionListEmptyState';
import TransactionsFilters from 'components/transactions-filters/TransactionsFilters';
import Typography from 'components/typography/Typography';
import TransactionCard from 'features/transaction-card/components/transaction-card/TransactionCard';
import { useGetMyTimeZone } from 'hooks/me.hooks';
import styles from 'styles/ItemList.module.scss';
import transactionListStyles from 'styles/TransactionList.module.scss';
import { Transaction } from 'types/generated.types';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';
import { Maybe } from 'types/utility.types';
import { getDate } from 'utils/date.utils';

interface ITransactionListProps extends ITransactionsFiltersArgs {
    transactions?: Maybe<Transaction[]>;
    hasMore: boolean;
    isLoading: boolean;
    next: VoidFunction;
}

export default function TransactionList({
    transactions,
    hasMore,
    isLoading,
    selectedAccountId,
    selectedCategoryId,
    next,
}: ITransactionListProps): JSX.Element {
    const { timeZone } = useGetMyTimeZone();

    const isEmptyState = !transactions?.length;

    return (
        <div className={styles.container}>
            <TransactionsFilters
                selectedAccountId={selectedAccountId}
                selectedCategoryId={selectedCategoryId}
            />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <TransactionListEmptyState
                    isRelatedTransactionList={
                        !!selectedAccountId || !!selectedCategoryId
                    }
                />
            </Show>

            {!isEmptyState && (
                <InfiniteScroll
                    dataLength={transactions.length}
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
