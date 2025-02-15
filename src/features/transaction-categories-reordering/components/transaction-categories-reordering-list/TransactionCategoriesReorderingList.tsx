'use client';

import { DragOverlay } from '@dnd-kit/core';

import Card from 'components/card/Card';
import DragDropListItem from 'components/drag-drop-list-item/DragDropListItem';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import DragDropContext from 'contexts/DragDropContext';
import RootDroppableContainer from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/RootDroppableContainer';
import TransactionCategoriesReorderingListHeader from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/TransactionCategoriesReorderingListHeader';
import { useSortableTransactionCategories } from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/hooks/useSortableTransactionCategories';
import SubcategoryItem from 'features/transaction-categories-reordering/components/transaction-category-reordering-card/SubcategoryItem';
import TransactionCategoryReorderingCard from 'features/transaction-categories-reordering/components/transaction-category-reordering-card/TransactionCategoryReorderingCard';
import TransactionCategoryListTabs from 'features/transaction-category-list-tabs/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import {
    useGetEntityNameTranslations,
    useGetEmptyStateTranslations,
} from 'hooks/translations.hooks';
import styles from 'styles/ItemList.module.scss';

export default function TransactionCategoriesReorderingList(): JSX.Element {
    const type = useTransactionCategoryListCurrentTab();
    const {
        sortableItems,
        activeItem,
        isGetTransactionCategoriesLoading,
        isEditOrderLoading,
        handleDragStart,
        handleDragEnd,
    } = useSortableTransactionCategories(type);

    const entityNameTranslations = useGetEntityNameTranslations();
    const emptyStateTranslations = useGetEmptyStateTranslations();

    const isEmptyState = !sortableItems.length;

    return (
        <div className={styles.container}>
            <TransactionCategoriesReorderingListHeader
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
                    emptyStateTranslations={emptyStateTranslations}
                    entityNameTranslations={entityNameTranslations}
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
                                <TransactionCategoryReorderingCard
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
                                <TransactionCategoryReorderingCard
                                    transactionCategory={activeItem}
                                    isDragging={true}
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
