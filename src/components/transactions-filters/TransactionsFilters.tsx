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

    return (
        <Accordion title="Transactions Filtering">
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
                        text="Clear filters"
                        onClick={clearFilters}
                    />
                </Show>
            </div>
        </Accordion>
    );
}
