'use client';

import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCategoryCard from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard';
import TransactionCategoryListHeader from 'features/transaction-category-list/components/transaction-category-list/TransactionCategoryListHeader';
import { useGetTransactionCategories } from 'features/transaction-category-list/components/transaction-category-list/hooks/useGetTransactionCategories';
import TransactionCategoryListTabs from 'features/transaction-category-list/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list/hooks/useTransactionCategoryListCurrentTab';
import styles from 'styles/ItemList.module.scss';

interface ITransactionCategoryListProps {
    currentItemsLength: number;
}

export default function TransactionCategoryList({
    currentItemsLength,
}: ITransactionCategoryListProps): JSX.Element {
    const type = useTransactionCategoryListCurrentTab();
    const { transactionCategories, isLoading } =
        useGetTransactionCategories(type);

    const isEmptyState = !transactionCategories?.length;

    return (
        <div className={styles.container}>
            <TransactionCategoryListHeader
                currentItemsLength={currentItemsLength}
            />

            <TransactionCategoryListTabs />

            <Show when={isLoading}>
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isLoading}>
                <EmptyState
                    text={`No '${type}' transaction categories found`}
                />
            </Show>

            {!isEmptyState && (
                <ul className={styles['grid-list']}>
                    {transactionCategories.map((transactionCategory) => (
                        <li key={transactionCategory.id}>
                            <TransactionCategoryCard
                                transactionCategory={transactionCategory}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
