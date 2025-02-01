'use client';

import { DragOverlay } from '@dnd-kit/core';

import Card from 'components/card/Card';
import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import DragDropContext from 'contexts/DragDropContext';
import RootDroppableContainer from 'features/transaction-categories-reordering/components/transaction-categories-list/RootDroppableContainer';
import TransactionCategoriesListHeader from 'features/transaction-categories-reordering/components/transaction-categories-list/TrancactionCategoriesListHeader';
import { useSortableTransactionCategories } from 'features/transaction-categories-reordering/components/transaction-categories-list/hooks/useSortableTransactionCategories';
import SubcategoryItem from 'features/transaction-categories-reordering/components/transaction-category-card/SubcategoryItem';
import TransactionCategoryCard from 'features/transaction-categories-reordering/components/transaction-category-card/TransactionCategoryCard';
import TransactionCategoryListTabs from 'features/transaction-category-list-tabs/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import styles from 'styles/ItemList.module.scss';

export default function TransactionCategoriesList(): JSX.Element {
    const type = useTransactionCategoryListCurrentTab();
    const {
        sortableItems,
        activeItem,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragStart,
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
                <TransactionCategoriesEmptyState
                    categoriesType={type}
                    notWrappedByContainer={true}
                />
            </Show>

            {!isEmptyState && (
                <DragDropContext
                    items={sortableItems}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                >
                    <RootDroppableContainer isTop={true} />
                    <ul
                        className={styles['grid-list']}
                        style={{
                            opacity: activeItem ? 0.5 : 1,
                            transition: 'opacity 0.2s',
                        }}
                    >
                        {sortableItems.map((transactionCategory) => (
                            <DragDropListItem
                                key={transactionCategory.id}
                                id={transactionCategory.id}
                                isLoading={isEditOrderLoading}
                                hasChildren={
                                    !!transactionCategory.children?.length
                                }
                            >
                                <TransactionCategoryCard
                                    transactionCategory={transactionCategory}
                                    isLoading={isEditOrderLoading}
                                />
                            </DragDropListItem>
                        ))}
                    </ul>
                    <RootDroppableContainer />

                    <DragOverlay>
                        {activeItem &&
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            (activeItem.children ? (
                                <TransactionCategoryCard
                                    transactionCategory={activeItem}
                                />
                            ) : (
                                <Card>
                                    <SubcategoryItem subcategory={activeItem} />
                                </Card>
                            ))}
                    </DragOverlay>
                </DragDropContext>
            )}
        </div>
    );
}
