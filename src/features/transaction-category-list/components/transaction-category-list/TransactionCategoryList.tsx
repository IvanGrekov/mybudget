'use client';

import Button from 'components/button/Button';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Show from 'components/show/Show';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import TransactionCategoryCard from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard';
import TransactionCategoryListHeader from 'features/transaction-category-list/components/transaction-category-list/TransactionCategoryListHeader';
import TransactionCategoryListTabs from 'features/transaction-category-list-tabs/components/transaction-category-list-tabs/TransactionCategoryListTabs';
import { useTransactionCategoryListCurrentTab } from 'features/transaction-category-list-tabs/hooks/useTransactionCategoryListCurrentTab';
import {
    useGetEmptyStateTranslations,
    useGetEntityNameTranslations,
    useGetFeatureTranslations,
} from 'hooks/translations.hooks';
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

    const entityNameTranslations = useGetEntityNameTranslations();
    const emptyStateTranslations = useGetEmptyStateTranslations();
    const [reorderCategoriesButtonText] = useGetFeatureTranslations({
        featureName: 'ReorderTransactionCategoriesPage',
        keys: ['reorder_categories_button'],
    });

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
                <TransactionCategoriesEmptyState
                    emptyStateTranslations={emptyStateTranslations}
                    entityNameTranslations={entityNameTranslations}
                    categoriesType={type}
                    notWrappedByContainer={true}
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

                    <Show when={transactionCategories.length > 1}>
                        <div className={styles['action-wrapper']}>
                            <Button
                                text={reorderCategoriesButtonText}
                                variant="contained"
                                href={
                                    EAppRoutes.TransactionCategoriesReordering
                                }
                            />
                        </div>
                    </Show>
                </>
            )}
        </div>
    );
}
