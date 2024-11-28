'use client';

import Button from 'components/button/Button';
import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCategoryCard from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard';
import TransactionCategoryListHeader from 'features/transaction-category-list/components/transaction-category-list/TransactionCategoryListHeader';
import TransactionCategoryListTabs from 'features/transaction-category-list-tabs/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import { useGetTransactionCategories } from 'hooks/useGetTransactionCategories';
import styles from 'styles/ItemList.module.scss';
import { EAppRoutes } from 'types/appRoutes';

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
                type={type}
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
                <>
                    <ul className={styles['grid-list']}>
                        {transactionCategories.map((transactionCategory) => (
                            <li key={transactionCategory.id}>
                                <TransactionCategoryCard
                                    transactionCategory={transactionCategory}
                                />
                            </li>
                        ))}
                    </ul>

                    <Button
                        text="Reorder transaction categories"
                        variant="contained"
                        href={EAppRoutes.TransactionCategoriesReordering}
                        style={{ width: '100%' }}
                        linkClassName={styles.action}
                    />
                </>
            )}
        </div>
    );
}
