'use client';

import Accordion from 'components/accordion/Accordion';
import Button from 'components/button/Button';
import Show from 'components/show/Show';
import TransactionsAccountFilter from 'components/transactions-filters/TransactionsAccountFilter';
import TransactionsCategoryFilter from 'components/transactions-filters/TransactionsCategoryFilter';
import TransactionsDateRangeFilter from 'components/transactions-filters/TransactionsDateRangeFilter';
import styles from 'components/transactions-filters/TransactionsFilters.module.scss';
import TransactionsTypesFilter from 'components/transactions-filters/TransactionsTypesFilter';
import { useClearTransactionsFilters } from 'components/transactions-filters/hooks/useClearTransactionsFilters';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';

export default function TransactionsFilters({
    selectedAccountId,
    selectedCategoryId,
}: ITransactionsFiltersArgs): JSX.Element {
    const { shouldShowClearFiltersButton, clearFilters } =
        useClearTransactionsFilters({
            selectedAccountId,
            selectedCategoryId,
        });

    const [title, clearFiltersText] = useGetFeatureTranslations({
        featureName: 'Transactions',
        keys: ['filters_title', 'clear_filters'],
    });

    return (
        <Accordion title={title}>
            <div className={styles.filters}>
                <TransactionsTypesFilter />

                <TransactionsAccountFilter
                    selectedAccountId={selectedAccountId}
                />

                <TransactionsCategoryFilter
                    selectedCategoryId={selectedCategoryId}
                />

                <TransactionsDateRangeFilter />

                <Show when={!!shouldShowClearFiltersButton}>
                    <Button
                        variant="contained"
                        text={clearFiltersText}
                        onClick={clearFilters}
                    />
                </Show>
            </div>
        </Accordion>
    );
}
