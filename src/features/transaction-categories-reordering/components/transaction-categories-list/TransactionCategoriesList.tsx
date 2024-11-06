'use client';

import EmptyState from 'components/empty-state/EmptyState';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import DragDropContext from 'contexts/DragDropContext';
import TransactionCategoriesListHeader from 'features/transaction-categories-reordering/components/transaction-categories-list/TrancactionCategoriesListHeader';
import { useSortableTransactionCategories } from 'features/transaction-categories-reordering/components/transaction-categories-list/hooks/useSortableTransactionCategories';
import TransactionCategoryCard from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard';
import TransactionCategoryListTabs from 'features/transaction-category-list-tabs/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import styles from 'styles/ItemList.module.scss';

export default function TransactionCategoriesList(): JSX.Element {
    const type = useTransactionCategoryListCurrentTab();
    const {
        sortableItems,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragEnd,
    } = useSortableTransactionCategories(type);
    const isEmptyState = !sortableItems.length;

    return (
        <div className={styles.container}>
            <TransactionCategoriesListHeader
                isBackButtonDisabled={isEditOrderLoading}
            />

            <TransactionCategoryListTabs isDisabled={isEditOrderLoading} />

            <Show
                when={isGetTransactionCategoriesLoading || isEditOrderLoading}
            >
                <LinearProgress />
            </Show>

            <Show when={isEmptyState && !isGetTransactionCategoriesLoading}>
                <EmptyState
                    text={`No '${type}' transaction categories found`}
                />
            </Show>

            {!isEmptyState && (
                <DragDropContext
                    items={sortableItems}
                    handleDragEnd={handleDragEnd}
                >
                    <ul className={styles['grid-list']}>
                        {sortableItems.map((transactionCategory) => (
                            <TransactionCategoryCard
                                key={transactionCategory.id}
                                transactionCategory={transactionCategory}
                                isLoading={isEditOrderLoading}
                            />
                        ))}
                    </ul>
                </DragDropContext>
            )}
        </div>
    );
}
